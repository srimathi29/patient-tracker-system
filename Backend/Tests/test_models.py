import unittest
from Backend.Models import User
from app import db


class TestModels(unittest.TestCase):
    def setUp(self):
        # Set up any necessary test data or configurations
        db.create_all()

    def tearDown(self):
        # Clean up any resources used in the tests
        db.drop_all()

    def test_user_model(self):
        # Test the User model
        user = User(username='testuser', email='test@example.com')
        self.assertEqual(user.username, 'testuser')
        self.assertEqual(user.email, 'test@example.com')

    # def test_patient_model(self):
    #     # Test the Patient model
    #     patient = Patient(name='John Doe', age=30)
    #     self.assertEqual(patient.name, 'John Doe')
    #     self.assertEqual(patient.age, 30)

    # def test_doctor_model(self):
    #     # Test the Doctor model
    #     doctor = Doctor(name='Dr. Smith', specialization='Cardiology')
    #     self.assertEqual(doctor.name, 'Dr. Smith')
    #     self.assertEqual(doctor.specialization, 'Cardiology')

    # def test_medicine_model(self):
    #     # Test the Medicine model
    #     medicine = Medicine(name='Aspirin', dosage='500mg')
    #     self.assertEqual(medicine.name, 'Aspirin')
    #     self.assertEqual(medicine.dosage, '500mg')

    # def test_medical_record_model(self):
    #     # Test the MedicalRecord model
    #     medical_record = MedicalRecord(patient_id=1, doctor_id=1, date='2022-01-01', diagnosis='Fever', comments='Take rest')
    #     self.assertEqual(medical_record.patient_id, 1)
    #     self.assertEqual(medical_record.doctor_id, 1)
    #     self.assertEqual(medical_record.date, '2022-01-01')
    #     self.assertEqual(medical_record.diagnosis, 'Fever')
    #     self.assertEqual(medical_record.comments, 'Take rest')
