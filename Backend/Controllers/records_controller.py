from flask import request, jsonify, Response, json, url_for
from ..Models.models import db, MedicalRecord, Prescription, Patient, Doctor, Medicine, MedicalRecordDocument
from datetime import datetime
from flask_restful import Resource
from werkzeug.utils import secure_filename, send_file
from ..app import app
import os
class MedicalRecordController(Resource):
    def post(self):
        try:
            data = request.json

            # Extract data from the request
            patient_id = data.get('patient_id')
            doctor_id = data.get('doctor_id')
            diagnosis = data.get('diagnosis')
            comments = data.get('comments')
            medicine_ids = data.get('medicine_ids', [])

            # Check if patient and doctor exist (you may want to add more validation)
            if not Patient.query.get(patient_id) or not Doctor.query.get(doctor_id):
                return jsonify({"message": "Patient or doctor not found"}), 404

            # Create a new medical record
            new_medical_record = MedicalRecord(
                patient_id=patient_id,
                doctor_id=doctor_id,
                diagnosis=diagnosis,
                comments=comments,
                date=datetime.utcnow()
            )

            # Create a new prescription and associate it with the medical record
            new_prescription = Prescription(medical_record=new_medical_record)

            # Add medicines to the prescription
            for medicine_id in medicine_ids:
                medicine = Medicine.query.get(medicine_id)
                if medicine:
                    new_prescription.medicines.append(medicine)

            # Add the medical record and prescription to the database
            db.session.add(new_medical_record)
            db.session.commit()

            return jsonify({"message": "Medical record created successfully"}), 201

        except Exception as e:
            db.session.rollback()
            return jsonify({"message": "Failed to create medical record", "error": str(e)}), 400

    def put(self, record_id):
        try:
            data = request.json

            # Retrieve the medical record by ID
            medical_record = MedicalRecord.query.get(record_id)

            if not medical_record:
                return jsonify({"message": "Medical record not found"}), 404

            # Update the medical record data
            medical_record.diagnosis = data.get('diagnosis', medical_record.diagnosis)
            medical_record.comments = data.get('comments', medical_record.comments)

            # Update the prescription associated with the medical record
            prescription = medical_record.prescriptions.first()  # Assuming one prescription per medical record
            if prescription:
                # Update prescription-related fields if needed
                # Example: prescription.field_name = data.get('field_name', prescription.field_name)
                pass
            # Commit the changes to the database
            db.session.commit()

            return jsonify({"message": "Medical record updated successfully"}), 200

        except Exception as e:
            db.session.rollback()
            return jsonify({"message": "Failed to update medical record", "error": str(e)}), 400


class MedicalRecordAPI(Resource):
    # def get(self, medical_record_id=None):
    #     if medical_record_id:
    #         # Get a specific medical record by ID
    #         medical_record = MedicalRecord.query.get(medical_record_id)
    #         print(medical_record.documents)
    #         if medical_record:
    #             response_data = {
    #                 "data": {
    #                     "medical_record": medical_record.serialize(),
    #                     "download_link": url_for("downloadfileapi", filename=medical_record.documents[0].filename) if medical_record.documents else "",
    #                     "isSuccess": 1
    #                 }
    #             }
    #             return Response(json.dumps(response_data), mimetype="application/json", status=200)
    #         response_data = {
    #             "data": {
    #                 "message": "Medical record not found",
    #                 "isSuccess": 0
    #             }
    #         }
    #         return Response(json.dumps(response_data), mimetype="application/json", status=404)
    #     else:
    #         # Get all medical records
    #         medical_records = MedicalRecord.query.all()
    #         serialized_medical_records = [medical_record.serialize() for medical_record in medical_records]
    #         response_data = {
    #             "data": {
    #                 "medical_records": serialized_medical_records,
    #                 "isSuccess": 1
    #             }
    #         }
    #         return Response(json.dumps(response_data), mimetype="application/json", status=200)

    # def get(self, patient_id=None):
    #     if patient_id:
    #         # Get all medical records for a specific patient
    #         medical_records = MedicalRecord.query.filter_by(patient_id=patient_id).all()

    #         if medical_records:
    #             serialized_medical_records = [medical_record.serialize() for medical_record in medical_records]

    #             # Get all associated documents for the patient's medical records
    #             response_data = {
    #                 "data": {
    #                     "medical_records": serialized_medical_records,
    #                     "isSuccess": 1
    #                 }
    #             }
                
    #             # Generate download links for documents and add them to the response data
    #             for medical_record in medical_records:
    #                 documents = MedicalRecordDocument.query.filter_by(medical_record_id=medical_record.id).all()
    #                 serialized_documents = [document.serialize() for document in documents]

    #                 for doc in serialized_documents:
    #                     doc['download_link'] = url_for("downloadfileapi", filename=doc['filename'])

    #                 response_data['data']['documents'] = serialized_documents

    #             return Response(json.dumps(response_data), mimetype="application/json", status=200)

    #     # If patient_id is not provided or no records/documents are found, return an appropriate response
    #     response_data = {
    #         "data": {
    #             "message": "No medical records found for the specified patient",
    #             "isSuccess": 0
    #         }
    #     }
    #     return Response(json.dumps(response_data), mimetype="application/json", status=404)

    def get(self, patient_id=None):
        if patient_id:
            # Get all medical records for a specific patient
            medical_records = MedicalRecord.query.filter_by(patient_id=patient_id).all()

            if medical_records:
                serialized_medical_records = []

                # Iterate through the medical records
                for medical_record in medical_records:
                    serialized_record = medical_record.serialize()

                    # Retrieve the associated documents for the medical record
                    documents = medical_record.documents
                    print(documents)
                    serialized_documents = [document.serialize() for document in documents]
                    print(serialized_documents)
                    # Generate download links for documents and add them to the serialized record
                    for doc in serialized_documents:
                        doc['download_link'] = url_for("downloadfileapi", filename=doc['filename'])

                    #serialized_record['documents'] = serialized_documents
                    serialized_medical_records.append(serialized_record)

                response_data = {
                    "data": {
                        "medical_records": serialized_medical_records,
                        "documents": serialized_documents,
                        "isSuccess": 1
                    }
                }

                return Response(json.dumps(response_data), mimetype="application/json", status=200)

        # If patient_id is not provided or no records/documents are found, return an appropriate response
        response_data = {
            "data": {
                "message": "No medical records found for the specified patient",
                "isSuccess": 0
            }
        }
        return Response(json.dumps(response_data), mimetype="application/json", status=404)
    
    def post(self):
        data = request.form
        try:
            new_medical_record = MedicalRecord(
                diagnosis=data.get('diagnosis'),
                comments=data.get('comments'),
                doctor_id=data.get('doctor_id'),
                patient_id=data.get('patient_id')
            )
            db.session.add(new_medical_record)
            db.session.commit()
            
            # Handle file upload
            if 'file' in request.files:
                file = request.files['file']
                if file:
                    filename = secure_filename(file.filename)
                    
                    # Use the configured uploads folder
                    upload_folder = app.config['UPLOAD_FOLDER']
                    file.save(os.path.join(upload_folder, filename))
                    
                    new_document = MedicalRecordDocument(
                        filename=filename,
                        path=os.path.join(upload_folder, filename),
                        medical_record_id=new_medical_record.id
                    )
                    db.session.add(new_document)
                    db.session.commit()
            
                    db.session.refresh(new_medical_record)

            response_data = {
                "data": {
                    "message": "Medical record created successfully",
                    "medical_record_id": new_medical_record.id,
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

    def put(self, medical_record_id):
        medical_record = MedicalRecord.query.get(medical_record_id)
        if medical_record:
            try:
                data = request.form  # Use request.form for form data
                
                # Update medical record fields
                medical_record.diagnosis = data.get('diagnosis', medical_record.diagnosis)
                medical_record.comments = data.get('comments',medical_record.comments)
                medical_record.doctor_id = data.get('doctor_id',medical_record.doctor_id)
                medical_record.patient_id = data.get('patient_id',medical_record.patient_id)
                db.session.commit()
                
                # Handle file upload
                if 'file' in request.files:
                    file = request.files['file']
                    if file:
                        filename = secure_filename(file.filename)
                        
                        # Use the configured uploads folder
                        upload_folder = app.config['UPLOAD_FOLDER']
                        file.save(os.path.join(upload_folder, filename))
                        
                        new_document = MedicalRecordDocument(
                            filename=filename,
                            path=os.path.join(upload_folder, filename),
                            medical_record_id=medical_record.id
                        )
                        db.session.add(new_document)
                        db.session.commit()

                        db.session.refresh(medical_record)
                
                response_data = {
                    "data": {
                        "message": "Medical record updated successfully",
                        "isSuccess": 1
                    }
                }
                return Response(json.dumps(response_data), mimetype="application/json", status=200)
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
                "message": "Medical record not found",
                "isSuccess": 0
            }
        }
        return Response(json.dumps(response_data), mimetype="application/json", status=404)

    def delete(self, medical_record_id):
        medical_record = MedicalRecord.query.get(medical_record_id)
        if medical_record:
            db.session.delete(medical_record)
            db.session.commit()
            response_data = {
                "data": {
                    "message": "Medical record deleted successfully",
                    "isSuccess": 1
                }
            }
            return Response(json.dumps(response_data), mimetype="application/json", status=200)
        response_data = {
            "data": {
                "message": "Medical record not found",
                "isSuccess": 0
            }
        }
        return Response(json.dumps(response_data), mimetype="application/json", status=404)

class DownloadFileAPI(Resource):
    def get(self, filename):
        # Construct the full path to the file
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        
        # Check if the file exists
        if os.path.exists(file_path):
            # Return the file as an attachment
            return send_file(file_path, as_attachment=True,environ=request.environ)
        else:
            return {
                "data": {
                    "message": "File not found",
                    "isSuccess": 0
                }
            }, 404