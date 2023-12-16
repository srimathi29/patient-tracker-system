# test_doctor_model.py
import pytest
from Backend.app import app, db
from Backend.Models.models import User, Doctor

@pytest.fixture(scope='module')
def init_doctor_database(init_database):
    # Use the existing init_database fixture to set up the user
    user = User.query.filter_by(username='testuser').first()

    # Create a test doctor linked to the test user
    doctor = Doctor(user_id=user.id, specialization='general')
    db.session.add(doctor)
    db.session.commit()

    yield db  # this is where the testing happens!

    # No need to drop_all since it will be handled by the init_database fixture

def test_doctor_creation(init_doctor_database):
    doctor = Doctor.query.first()
    assert doctor is not None
    assert doctor.user_id == User.query.filter_by(username='testuser').first().id
    assert doctor.specialization == 'general'
