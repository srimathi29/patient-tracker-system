from ..app import db, app
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from .enums import UserType
from datetime import datetime


admin = Admin(app, name='Patient Tracker Admin', template_mode='bootstrap3')


class User(db.Model):
    '''
    User model for the database.
    '''

    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    user_email = db.Column(db.String(120), unique=True, nullable=False)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    last_login = db.Column(db.DateTime, nullable=True)
    date_joined = db.Column(db.DateTime, nullable=False)
    is_authenticated = db.Column(db.Boolean, default=False)
    user_type = db.Column(db.Enum(UserType), nullable=False)
    gender = db.Column(db.String(10), nullable=True)
    contact_number = db.Column(db.String(15), nullable=True)
    address = db.Column(db.String(200), nullable=True)

    def __repr__(self):
        return '<User %r>' % self.username
    
    # Methods to implement for Flask-Login
    
    def get_id(self):
        """Return the id of the user."""
        return self.id
    
    def is_authenticated(self):
        """Return True if the user is authenticated."""
        return self.is_authenticated
    
    def is_active(self):
        """True, as all users are active."""
        return True
    def is_anonymous(self):
        """False, as anonymous users aren't supported."""
        return False

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "user_email": self.user_email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "last_login": str(self.last_login) if self.last_login else "",
            "date_joined": str(self.date_joined),
            "user_type": self.user_type.value,
            "gender": self.gender,
            "contact_number": self.contact_number if self.contact_number else "",
            "address": self.address if self.address else ""
        }



class Patient(db.Model):
    '''
    Patient model for the database.
    '''
    __tablename__ = 'patients'

    # Fields
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    # Relationships
    appointments = db.relationship('Appointment', backref='patient', lazy=True)
    medical_records = db.relationship('MedicalRecord', backref='doctor', lazy=True)
    

    def __repr__(self):
        """
        Returns a string representation of the patient object.
        """
        return f"<Patient {self.id}>"
    
    def serialize(self):
        user = User.query.get(self.user_id)  # Retrieve the associated User data
        full_name = f"{user.first_name} {user.last_name}" if user else None

        return {
            "id": self.id,
            "user_id": self.user_id,
            "full_name": full_name,
            # Add other fields you want to include in the serialization here...
        }
    
class Doctor(db.Model):
    '''
    Doctor model for the database.
    '''
    __tablename__ = 'doctors'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    specialization = db.Column(db.String(255), default="general",nullable=False)
    license_start_date = db.Column(db.Date, nullable=True)
    last_license_renewed = db.Column(db.Date, nullable=True)
    license_expiry_date = db.Column(db.Date, nullable=True)
    license_number = db.Column(db.String(255), nullable=True)

    # Relationships
    appointments = db.relationship('Appointment', backref='doctor', lazy=True)
    medical_records = db.relationship('MedicalRecord', backref='patient', lazy=True)
    
    def __repr__(self):
        """
        Returns a string representation of the doctor object.
        """
        return f"<Doctor {self.id}>"

    def serialize(self):
        user = User.query.get(self.user_id)  # Retrieve the associated User data
        full_name = f"{user.first_name} {user.last_name}" if user else None

        return {
            "user_id": self.user_id,
            "doctor_id": self.id,
            "full_name": full_name,
            "specialization": self.specialization,
            "license_start_date": self.license_start_date.isoformat() if self.license_start_date else "",
            "last_license_renewed": self.last_license_renewed.isoformat() if self.last_license_renewed else "",
            "license_expiry_date": self.license_expiry_date.isoformat() if self.license_expiry_date else "",
            "license_number": self.license_number if self.license_number else ""
            # Add other attributes as needed
        }

class Medicine(db.Model):
    __tablename__ = 'medicines'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    dosage = db.Column(db.String(50), nullable=True)
    manufacturer = db.Column(db.String(100), nullable=True)
    description = db.Column(db.Text, nullable=True)
    
    def __repr__(self):
        return f"<Medicine {self.name}>"
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "dosage": self.dosage,
            "manufacturer": self.manufacturer,
            "description": self.description
        }

class MedicalRecord(db.Model):
    __tablename__ = 'medical_records'
    
    id = db.Column(db.Integer, primary_key=True)
    diagnosis = db.Column(db.Text)
    comments = db.Column(db.Text)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Foreign keys
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctors.id'), nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey('patients.id'), nullable=False)
    
    # Relationship to prescriptions (one-to-many)
    prescriptions = db.relationship('Prescription', backref='medical_record', lazy=True)
    documents = db.relationship('MedicalRecordDocument', backref='medical_record', lazy=True)
    
    def __repr__(self):
        return f"<MedicalRecord {self.id}>"
    
    def serialize(self):
        data = {
            "id": self.id,
            "diagnosis": self.diagnosis,
            "comments": self.comments,
            "date": self.date.strftime("%Y-%m-%d %H:%M:%S") if self.date else "",
            "doctor_id": self.doctor_id,
            "patient_id": self.patient_id,
            # "prescriptions": [prescription.serialize() for prescription in self.prescriptions],
            # "documents": [document.serialize() for document in self.documents]
            # You can add more attributes here as needed
        }
        return data

class Prescription(db.Model):
    __tablename__ = 'prescriptions'
    
    id = db.Column(db.Integer, primary_key=True)
    # Foreign key to the medical record
    medical_record_id = db.Column(db.Integer, db.ForeignKey('medical_records.id'), nullable=False)
    
    # Relationship to medicines (many-to-many)
    medicines = db.relationship('Medicine', secondary='prescription_medicines', backref='prescriptions')
    
    def __repr__(self):
        return f"<Prescription {self.id}>"

# Define the association table for the many-to-many relationship
prescription_medicines = db.Table('prescription_medicines',
    db.Column('prescription_id', db.Integer, db.ForeignKey('prescriptions.id'), primary_key=True),
    db.Column('medicine_id', db.Integer, db.ForeignKey('medicines.id'), primary_key=True)
)

class MedicalRecordDocument(db.Model):
    __tablename__ = 'medical_record_documents'

    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255), nullable=False)
    path = db.Column(db.String(255), nullable=False)
    
    # Foreign key to link to the medical record
    medical_record_id = db.Column(db.Integer, db.ForeignKey('medical_records.id'), nullable=False)

    def __repr__(self):
        return f"<MedicalRecordDocument {self.filename}>"
    
    

# Add models to the admin interface
# admin.add_view(ModelView(User, db.session))
# admin.add_view(ModelView(Patient, db.session))
# admin.add_view(ModelView(Doctor, db.session))
# admin.add_view(ModelView(Medicine, db.session))
# admin.add_view(ModelView(MedicalRecord, db.session))

# if __name__ == '__main__':
#     db.create_all()
#     app.run(debug=True)

class Appointment(db.Model):
    """
    The Appointment model class.
    """
    _tablename_ = 'appointments'

    # Fields
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey(
        'patients.id'), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey(
        'doctors.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    start_time = db.Column(db.Time, nullable=False)
    end_time = db.Column(db.Time, nullable=False)
    notes = db.Column(db.Text)
    title = db.Column(db.String(255), nullable=False)

    # Fields for time slots
    time_slot_start = db.Column(db.Time,default='09:00:00',nullable=False)
    time_slot_end = db.Column(db.Time,default='17:00:00',nullable=False)
    time_slot_interval = db.Column(db.Integer,default=30,nullable=False)
    doctor_visit = db.Column(db.Boolean,default=True,nullable=False)
    patient_visit = db.Column(db.Boolean,default=True,nullable=False)

    def _repr_(self):
        """
        Returns a string representation of the appointment object.
        """
        return f"<Appointment {self.id}>"
