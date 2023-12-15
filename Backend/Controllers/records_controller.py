from flask import request, jsonify
from ..Models.models import db, MedicalRecord, Prescription, Patient, Doctor, Medicine
from datetime import datetime
from flask_restful import Resource

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
