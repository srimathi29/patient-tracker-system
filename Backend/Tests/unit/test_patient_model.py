# test_patient_model.py
import pytest
from Backend.app import app, db
from Backend.Models.models import User, Patient

@pytest.fixture(scope='module')
def init_patient_database(init_database):
    # Use the existing init_database fixture to set up the user
    user = User.query.filter_by(username='testuser').first()

    # Create a test patient linked to the test user
    patient = Patient(user_id=user.id)
    db.session.add(patient)
    db.session.commit()

    yield db  # this is where the testing happens!

    # No need to drop_all since it will be handled by the init_database fixture

def test_patient_creation(init_patient_database):
    patient = Patient.query.first()
    assert patient is not None
    assert patient.user_id == User.query.filter_by(username='testuser').first().id
