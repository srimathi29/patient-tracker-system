from flask import request, Response, json
from flask_restful import Resource
from ..Models.models import db, Appointment, Doctor
from datetime import datetime, timedelta
from flask_login import login_required
<<<<<<< HEAD
from ..app import app

=======
>>>>>>> f12ed6bf76150229c43fbbebae5b9a75c99f419f
class AppointmentCreateResource(Resource):
    def post(self):
        data = request.get_json()
        patient_id = data.get('patient_id')
        doctor_id = data.get('doctor_id')
        date = data.get('date')
        start_time = data.get('start_time')
        end_time = data.get('end_time')
        notes = data.get('notes')
        time_slot_start = data.get('time_slot_start')
        time_slot_end = data.get('time_slot_end')
        doctor_visit = data.get('doctor_visit', True)
        title = data.get('title')
        if not all([patient_id, doctor_id, date, start_time, end_time]):
            response_data = {
                "data": {
                    "message": "Missing required data.",
                    "isSuccess": 0
                }
            }
            app.logger.info(f"Missing required data: {data}")
            return Response(json.dumps(response_data), mimetype="application/json", status=400)

        overlapping_appointments = Appointment.query.filter(
            Appointment.doctor_id == doctor_id,
            Appointment.date == date,
            Appointment.end_time > start_time,
            Appointment.start_time < end_time
        ).all()

        if overlapping_appointments:
            response_data = {
                "data": {
                    "message": "Doctor is not available at this time.",
                    "isSuccess": 0
                }
            }
            app.logger.info(f"Doctor is not available at this time: {data}")
            return Response(json.dumps(response_data), mimetype="application/json", status=400)

        appointment = Appointment(
            patient_id=patient_id,
            doctor_id=doctor_id,
            date=date,
            start_time=start_time,
            end_time=end_time,
            notes=notes,
            time_slot_start=time_slot_start,
            time_slot_end=time_slot_end,
            doctor_visit=doctor_visit,
            title=title
        )

        db.session.add(appointment)
        db.session.commit()

        response_data = {
            "data": {
                "message": "Appointment created successfully.",
                "appointment_id": appointment.id,
                "isSuccess": 1
            }
        }
        app.logger.info(f"Appointment created successfully: {appointment.id}")
        return Response(json.dumps(response_data), mimetype="application/json",status=201)

class AppointmentUpdateResource(Resource):
    def put(self, appointment_id):
        data = request.get_json()
        appointment = Appointment.query.get(appointment_id)

        if not appointment:
            response_data = {
                "data": {
                    "message": "Appointment not found.",
                    "isSuccess": 0
                }
            }
            app.logger.info(f"Appointment not found: {appointment_id}")
            return Response(json.dumps(response_data), mimetype="application/json", status=404)

        # Check if the provided data includes start_time and end_time
        if 'start_time' in data and 'end_time' in data:
            start_time = data['start_time']
            end_time = data['end_time']

            # Check doctor availability for the updated time slot
            overlapping_appointments = Appointment.query.filter(
                Appointment.doctor_id == appointment.doctor_id,
                Appointment.date == appointment.date,
                Appointment.id != appointment_id,  # Exclude the current appointment
                Appointment.end_time > start_time,
                Appointment.start_time < end_time
            ).all()

            if overlapping_appointments:
                response_data = {
                    "data": {
                        "message": "Doctor is not available at the updated time.",
                        "isSuccess": 0

                    }
                }
                app.logger.info(f"Doctor is not available at the updated time: {data}")
                return Response(json.dumps(response_data), mimetype="application/json", status=400)

        # Update appointment fields
        if 'date' in data:
            appointment.date = data['date']
        if 'start_time' in data:
            appointment.start_time = data['start_time']
        if 'end_time' in data:
            appointment.end_time = data['end_time']
        if 'notes' in data:
            appointment.notes = data['notes']
        if 'title' in data:
            appointment.title = data['title']

        db.session.commit()

        response_data = {
            "data": {
                "message": "Appointment updated successfully.",
                "appointment_id": appointment.id,
                "isSuccess": 1
            }
        }
        app.logger.info(f"Appointment updated successfully: {appointment.id}")
        return Response(json.dumps(response_data), mimetype="application/json", status=200)

class DoctorAppointmentsResource(Resource):
    def get(self, doctor_id, date=None):
        try:
            current_date = datetime.now().date()

            if date:
                date = datetime.strptime(date, "%Y-%m-%d").date()
                appointments = Appointment.query.filter(
                    Appointment.doctor_id == doctor_id,
                    Appointment.date == date
                ).all()

                # Convert start_time and end_time strings to datetime.time objects
                start_time = datetime.strptime('09:00:00', '%H:%M:%S').time()
                end_time = datetime.strptime('17:00:00', '%H:%M:%S').time()
                slot_duration = timedelta(minutes=30)

                available_slots = []

                current_time = datetime.combine(date, start_time)
                while current_time + slot_duration <= datetime.combine(date, end_time):
                    slot_end = current_time + slot_duration
                    slot_start_time = current_time.time()
                    slot_end_time = slot_end.time()

                    slot_available = all(
                        not (
                            appointment.start_time <= slot_start_time and
                            appointment.end_time >= slot_end_time
                        )
                        for appointment in appointments
                    )

                    if slot_available:
                        available_slots.append({
                            "start_time": slot_start_time.strftime('%H:%M:%S'),
                            "end_time": slot_end_time.strftime('%H:%M:%S'),
                        })

                    current_time += slot_duration

            else:
                appointments = Appointment.query.filter(
                    Appointment.doctor_id == doctor_id,
                    Appointment.date >= current_date
                ).all()
                available_slots = []

            appointment_data = [{
                "id": appointment.id,
                "patient_id": appointment.patient_id,
                "date": str(appointment.date),
                "start_time": str(appointment.start_time),
                "end_time": str(appointment.end_time),
                "notes": appointment.notes,
                "title": appointment.title
            } for appointment in appointments]

            response_data = {
                "data": {
                    "appointments": appointment_data,
                    "available_slots": available_slots,
                    "isSuccess": 1
                }
            }

            app.logger.info(f"Doctor appointments: {response_data}")
            return Response(json.dumps(response_data), mimetype="application/json", status=200)

        except Exception as e:
            response_data = {
                "data": {
                    "message": f"Error: {str(e)}",
                    "isSuccess": 0
                }
            }
            app.logger.error(f"Error getting doctor appointments: {e}")
            return Response(json.dumps(response_data), mimetype="application/json", status=500)

class PatientAppointmentsResource(Resource):
    def get(self, patient_id, date=None):
        try:
            current_date = datetime.now().date()

            if date:
                date = datetime.strptime(date, "%Y-%m-%d").date()
                appointments = Appointment.query.filter(
                    Appointment.patient_id == patient_id,
                    Appointment.date == date
                ).all()
            else:
                appointments = Appointment.query.filter(
                    Appointment.patient_id == patient_id,
                    Appointment.date >= current_date
                ).all()

            appointment_data = [{
                "id": appointment.id,
                "doctor_id": appointment.doctor_id,
                "date": str(appointment.date),
                "start_time": str(appointment.start_time),
                "end_time": str(appointment.end_time),
                "notes": appointment.notes,
                "title": appointment.title
            } for appointment in appointments]

            response_data = {
                "data": appointment_data,
                "isSuccess": 1
            }
            app.logger.info(f"Patient appointments: {response_data}")
            return Response(json.dumps(response_data), mimetype="application/json",status=200)

        except Exception as e:
            response_data = {
                "data": {
                    "message": f"Error: {str(e)}",
                    "isSuccess": 0
                }
            }
            app.logger.error(f"Error getting patient appointments: {e}")
            return Response(json.dumps(response_data), mimetype="application/json", status=500)