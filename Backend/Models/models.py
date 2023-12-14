from ..app import db, app
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from .enums import UserType


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




class Patient(db.Model):
    '''
    Patient model for the database.
    '''
    __tablename__ = 'patients'

    # Fields
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    # Relationships

    def __repr__(self):
        """
        Returns a string representation of the patient object.
        """
        return f"<Patient {self.id}>"
    
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

    def __repr__(self):
        """
        Returns a string representation of the doctor object.
        """
        return f"<Doctor {self.id}>"

# class Medicine(db.Model):
#     '''
#     Medicine model for the database.
#     '''
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), nullable=False)
#     doctor_id = db.Column(db.Integer, db.ForeignKey('doctor.id'), nullable=False)
#     medication_id = db.Column(db.Integer, nullable=False)
#     dosage = db.Column(db.String(50), nullable=True)
#     patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'), nullable=False)
#     prescription_date = db.Column(db.Date, nullable=False)
#     medical_record_id = db.Column(db.Integer, db.ForeignKey('medical_record.id'), nullable=False)


# class MedicalRecord(db.Model):
#     '''
#     MedicalRecord model for the database.
#     '''
#     id = db.Column(db.Integer, primary_key=True)
#     patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'), nullable=False)
#     doctor_id = db.Column(db.Integer, db.ForeignKey('doctor.id'), nullable=False)
#     date = db.Column(db.Date, nullable=False)
#     diagnosis = db.Column(db.Text, nullable=True)
#     comments = db.Column(db.Text, nullable=True)
#     record_id = db.Column(db.Integer, nullable=False)
#     medication_id = db.Column(db.Integer, db.ForeignKey('medicine.id'), nullable=True)

# Add models to the admin interface
# admin.add_view(ModelView(User, db.session))
# admin.add_view(ModelView(Patient, db.session))
# admin.add_view(ModelView(Doctor, db.session))
# admin.add_view(ModelView(Medicine, db.session))
# admin.add_view(ModelView(MedicalRecord, db.session))

# if __name__ == '__main__':
#     db.create_all()
#     app.run(debug=True)
