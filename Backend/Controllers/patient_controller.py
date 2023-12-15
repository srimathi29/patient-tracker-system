from flask import request, jsonify, Response, json
from flask_restful import Resource, Api
from ..Models.models import db, Patient, User

class PatientAPI(Resource):
    def get(self, user_id=None):
        if user_id:
            # Get a specific patient by user_id
            patient = Patient.query.filter_by(user_id=user_id).first()
            if patient:
                response_data = {
                    "data": {
                        "patient": patient.serialize()
                    }
                }
                return Response(json.dumps(response_data), mimetype="application/json", status=200)
            response_data = {
                "data": {
                    "message": "Patient not found"
                }
            }
            return Response(json.dumps(response_data), mimetype="application/json", status=404)
        else:
            # Get all patients
            patients = Patient.query.all()
            serialized_patients = [patient.serialize() for patient in patients]
            response_data = {
                "data": {
                    "patients": serialized_patients
                }
            }
            return Response(json.dumps(response_data), mimetype="application/json", status=200)

    def post(self):
        data = request.json
        user = User.query.get(data['user_id'])
        if user and not Patient.query.filter_by(user_id=user.id).first():
            try:
                new_patient = Patient(
                    user_id=user.id,
                    # Add other fields from data, if necessary...
                )
                db.session.add(new_patient)
                db.session.commit()
                response_data = {
                    "data": {
                        "message": "Patient profile created successfully"
                    }
                }
                return Response(json.dumps(response_data), mimetype="application/json", status=201)
            except Exception as e:
                db.session.rollback()
                response_data = {
                    "data": {
                        "message": str(e)
                    }
                }
                return Response(json.dumps(response_data), mimetype="application/json", status=400)
        response_data = {
            "data": {
                "message": "User already has a patient profile or does not exist"
            }
        }
        return Response(json.dumps(response_data), mimetype="application/json", status=409)

    def put(self, user_id):
        patient = Patient.query.filter_by(user_id=user_id).first()
        if patient:
            try:
                data = request.json
                # Update fields from data, if necessary...
                db.session.commit()
                response_data = {
                    "data": {
                        "message": "Patient profile updated successfully"
                    }
                }
                return Response(json.dumps(response_data), mimetype="application/json", status=200)
            except Exception as e:
                db.session.rollback()
                response_data = {
                    "data": {
                        "message": str(e)
                    }
                }
                return Response(json.dumps(response_data), mimetype="application/json", status=400)
        response_data = {
            "data": {
                "message": "Patient not found"
            }
        }
        return Response(json.dumps(response_data), mimetype="application/json", status=404)

    def delete(self, user_id):
        patient = Patient.query.filter_by(user_id=user_id).first()
        if patient:
            db.session.delete(patient)
            db.session.commit()
            response_data = {
                "data": {
                    "message": "Patient profile deleted successfully"
                }
            }
            return Response(json.dumps(response_data), mimetype="application/json", status=200)
        response_data = {
            "data": {
                "message": "Patient not found"
            }
        }
        return Response(json.dumps(response_data), mimetype="application/json", status=404)


