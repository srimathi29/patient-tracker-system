from flask import request, jsonify
from flask_restful import Resource
from ..Models.models import db, Doctor, User

from flask import Response, json

class DoctorAPI(Resource):
    def get(self, user_id=None):
        if user_id:
            # Get a specific doctor by user_id
            doctor = Doctor.query.filter_by(user_id=user_id).first()
            if doctor:
                response_data = {
                    "data": {
                        "doctor": doctor.serialize()
                    }
                }
                return Response(json.dumps(response_data), mimetype="application/json", status=200)
            response_data = {
                "data": {
                    "message": "Doctor not found",
                    "isSuccess": 0
                }
            }
            return Response(json.dumps(response_data), mimetype="application/json", status=404)
        else:
            # Get all doctors
            doctors = Doctor.query.all()
            serialized_doctors = [doctor.serialize() for doctor in doctors]
            # print(serialized_doctors)
            response_data = {
                "data": serialized_doctors
            }
            # print(response_data)
            return Response(json.dumps(response_data), mimetype="application/json", status=200)

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
                response_data = {
                    "data": {
                        "message": "Doctor profile created successfully",
                        "isSuccess": 1
                    }
                }
                return Response(json.dumps(response_data), mimetype="application/json", status=201)
            except Exception as e:
                db.session.rollback()
                response_data = {
                    "data": {
                        "message": str(e),
                        "isSuccess": 0
                    }
                }
                return Response(json.dumps(response_data), mimetype="application/json", status=400)
        response_data = {
            "data": {
                "message": "User already has a doctor profile or does not exist",
                "isSuccess": 0
            }
        }
        return Response(json.dumps(response_data), mimetype="application/json", status=409)

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
            response_data = {
                "data": {
                    "message": "Doctor profile updated successfully",
                    "isSuccess": 1
                }
            }
            return Response(json.dumps(response_data), mimetype="application/json", status=200)
        response_data = {
            "data": {
                "message": "Doctor not found",
                "isSuccess": 0
            }
        }
        return Response(json.dumps(response_data), mimetype="application/json", status=404)

    def delete(self, user_id):
        doctor = Doctor.query.filter_by(user_id=user_id).first()
        if doctor:
            db.session.delete(doctor)
            db.session.commit()
            response_data = {
                "data": {
                    "message": "Doctor profile deleted successfully",
                    "isSuccess": 1
                }
            }
            return Response(json.dumps(response_data), mimetype="application/json", status=200)
        response_data = {
            "data": {
                "message": "Doctor not found",
                "isSuccess": 0
            }
        }
        return Response(json.dumps(response_data), mimetype="application/json", status=404)
