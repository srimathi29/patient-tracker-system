from flask import request, Response, json
from flask_restful import Resource
from ..Models.models import db, Medicine
from ..app import app
class MedicineAPI(Resource):
    def get(self, medicine_id=None):
        if medicine_id:
            # Get a specific medicine by ID
            medicine = Medicine.query.get(medicine_id)
            if medicine:
                response_data = {
                    "data": {
                        "medicine": medicine.serialize(),
                        "isSuccess": 1
                    }
                }
                app.logger.debug(response_data)
                return Response(json.dumps(response_data), mimetype="application/json", status=200)
            response_data = {
                "data": {
                    "message": "Medicine not found",
                    "isSuccess": 0
                }
            }
            app.logger.info(f"Medicine not found: {medicine_id}")
            return Response(json.dumps(response_data), mimetype="application/json", status=404)
        else:
            # Get all medicines
            medicines = Medicine.query.all()
            serialized_medicines = [medicine.serialize() for medicine in medicines]
            response_data = {
                "data": {
                    "medicines": serialized_medicines,
                    "isSuccess": 1
                }
            }
            app.logger.info(f"Medicines: {response_data}")
            return Response(json.dumps(response_data), mimetype="application/json", status=200)

    def post(self):
        data = request.json
        try:
            new_medicine = Medicine(
                name=data['name'],
                dosage=data.get('dosage'),
                manufacturer=data.get('manufacturer'),
                description=data.get('description')
            )
            db.session.add(new_medicine)
            db.session.commit()
            response_data = {
                "data": {
                    "message": "Medicine record created successfully",
                    "isSuccess": 1
                }
            }
            app.logger.info(f"Medicine record created successfully: {new_medicine.id}")
            return Response(json.dumps(response_data), mimetype="application/json", status=201)
        except Exception as e:
            db.session.rollback()
            response_data = {
                "data": {
                    "message": str(e),
                    "isSuccess": 0
                }
            }
            app.logger.info(f"Error creating medicine record: {e}")
            return Response(json.dumps(response_data), mimetype="application/json", status=400)

    def put(self, medicine_id):
        medicine = Medicine.query.get(medicine_id)
        if medicine:
            try:
                data = request.json
                medicine.name = data['name']
                medicine.dosage = data.get('dosage')
                medicine.manufacturer = data.get('manufacturer')
                medicine.description = data.get('description')
                db.session.commit()
                response_data = {
                    "data": {
                        "message": "Medicine record updated successfully",
                        "isSuccess": 1
                    }
                }
                app.logger.info(f"Medicine record updated successfully: {medicine.id}")
                return Response(json.dumps(response_data), mimetype="application/json", status=200)
            except Exception as e:
                db.session.rollback()
                response_data = {
                    "data": {
                        "message": str(e),
                        "isSuccess": 0
                    }
                }
                app.logger.info(f"Error updating medicine record: {e}")
                return Response(json.dumps(response_data), mimetype="application/json", status=400)
        response_data = {
            "data": {
                "message": "Medicine not found",
                "isSuccess": 0
            }
        }
        app.logger.info(f"Medicine not found: {medicine_id}")
        return Response(json.dumps(response_data), mimetype="application/json", status=404)

    def delete(self, medicine_id):
        medicine = Medicine.query.get(medicine_id)
        if medicine:
            db.session.delete(medicine)
            db.session.commit()
            response_data = {
                "data": {
                    "message": "Medicine record deleted successfully",
                    "isSuccess": 1
                }
            }
            app.logger.info(f"Medicine record deleted successfully: {medicine_id}")
            return Response(json.dumps(response_data), mimetype="application/json", status=200)
        response_data = {
            "data": {
                "message": "Medicine not found",
                "isSuccess": 0
            }
        }
        app.logger.info(f"Medicine not found: {medicine_id}")
        return Response(json.dumps(response_data), mimetype="application/json", status=404)
