from flask import request, jsonify
from flask_restful import Resource
from ..Models.models import db, Doctor, User

class DoctorAPI(Resource):
    def get(self, user_id):
        doctor = Doctor.query.filter_by(user_id=user_id).first()
        if doctor:
            return jsonify(doctor=doctor.serialize())
        return jsonify({"message": "Doctor not found"}), 404

    def post(self):
        data = request.json
        user = User.query.get(data['user_id'])
        if user and not Doctor.query.filter_by(user_id=user.id).first():
            try:
                new_doctor = Doctor(
                    user_id=user.id,
                    specialization=data.get('specialization', 'general'),
                    license_start_date=data.get('license_start_date'),
                    last_license_renewed=data.get('last_license_renewed'),
                    license_expiry_date=data.get('license_expiry_date'),
                    license_number=data.get('license_number')
                )
                db.session.add(new_doctor)
                db.session.commit()
                return jsonify({"message": "Doctor profile created successfully"}), 201
            except Exception as e:
                db.session.rollback()
                return jsonify({"message": str(e)}), 400
        return jsonify({"message": "User already has a doctor profile or does not exist"}), 409

    def put(self, user_id):
        doctor = Doctor.query.filter_by(user_id=user_id).first()
        if doctor:
            data = request.json
            doctor.specialization = data.get('specialization', doctor.specialization)
            doctor.license_start_date = data.get('license_start_date', doctor.license_start_date)
            doctor.last_license_renewed = data.get('last_license_renewed', doctor.last_license_renewed)
            doctor.license_expiry_date = data.get('license_expiry_date', doctor.license_expiry_date)
            doctor.license_number = data.get('license_number', doctor.license_number)
            
            db.session.commit()
            return jsonify({"message": "Doctor profile updated successfully"}), 200
        return jsonify({"message": "Doctor not found"}), 404

    def delete(self, user_id):
        doctor = Doctor.query.filter_by(user_id=user_id).first()
        if doctor:
            db.session.delete(doctor)
            db.session.commit()
            return jsonify({"message": "Doctor profile deleted successfully"}), 200
        return jsonify({"message": "Doctor not found"}), 404

# Add serialization method in Doctor model
def serialize(self):
    return {
        "user_id": self.user_id,
        "doctor_id": self.id,
        "specialization": self.specialization,
        # Include other fields as necessary
    }

Doctor.serialize = serialize

