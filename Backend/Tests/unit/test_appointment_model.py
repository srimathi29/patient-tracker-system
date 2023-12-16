# test_appointment_model.py
import pytest
from datetime import date, time
from Backend.Models.models import Appointment, Patient, Doctor
from Backend.app import app, db

@pytest.fixture(scope='module')
def init_appointment_database(init_patient_database, init_doctor_database):
    # Use the existing init_patient_database and init_doctor_database fixtures to set up the patient and doctor
    patient = Patient.query.first()
    doctor = Doctor.query.first()

    # Create a test appointment
    appointment = Appointment(
        patient_id=patient.id,
        doctor_id=doctor.id,
        date=date.today(),
        start_time=time(9, 0),
        end_time=time(9, 30),
        notes='Test appointment notes',
        title='Test Appointment',
        time_slot_start=time(9, 0),
        time_slot_end=time(17, 0),
        time_slot_interval=30,
        doctor_visit=True,
        patient_visit=True
    )
    db.session.add(appointment)
    db.session.commit()

    yield db  # this is where the testing happens!

    # No need to drop_all since it will be handled by the init_database fixture

def test_appointment_creation(init_appointment_database):
    appointment = Appointment.query.first()
    assert appointment is not None
    assert appointment.patient_id == Patient.query.first().id
    assert appointment.doctor_id == Doctor.query.first().id
    assert appointment.notes == 'Test appointment notes'
    assert appointment.title == 'Test Appointment'
