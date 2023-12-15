
from flask import Flask
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from .config import Config
from flask_migrate import Migrate
from flask_admin import Admin
from flask_cors import CORS
import logging
from logging.handlers import RotatingFileHandler

db = SQLAlchemy()

print("Creating app...")

app = Flask(__name__)
CORS(app)

app.config.from_object(Config)
db.init_app(app)
migrate = Migrate(app, db)

api = Api(app)
app.debug = True

print("Connected to database:", app.config['SQLALCHEMY_DATABASE_URI'])

# Add Flask-RESTful resources here
app.secret_key = Config.SECRET_KEY

# Initialize the Flask-Login instance
login_manager = LoginManager()
login_manager.init_app(app)

# Add Flask Logging here
# Set up logging
log_file = 'app.log'  # Specify the log file name and path
log_level = logging.DEBUG  # Set the desired log level
file_handler = RotatingFileHandler(log_file, maxBytes=1024 * 1024, backupCount=10)
file_handler.setLevel(log_level)
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
file_handler.setFormatter(formatter)
app.logger.addHandler(file_handler)

app.logger.info(f'Connected to database: {app.config["SQLALCHEMY_DATABASE_URI"]}')

# Set the upload folder configuration
app.config['UPLOAD_FOLDER'] = '/Users/prudhvinikku/patient-tracker-system/Backend/Uploads'


from .Models.models import User   
@login_manager.user_loader
def load_user(user_id):
    '''
    This function is used to reload the user object from the user ID stored in the session.
    '''
    try:
        return User.query.get(int(user_id))
    except Exception as e:
        print("Error loading user: ", e)
        return None
  

# Register Endpoints
from .Controllers.user_controller import Login, Logout, Register, UserAPI
from .Controllers.doctor_controller import DoctorAPI
from .Controllers.appointment_controller import DoctorAppointmentsResource, AppointmentCreateResource, \
      AppointmentUpdateResource, PatientAppointmentsResource
from .Controllers.records_controller import MedicalRecordController, MedicalRecordAPI, DownloadFileAPI
from .Controllers.patient_controller import PatientAPI, PatientFullDataAPI
from .Controllers.medicine_controller import MedicineAPI
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(Register, '/register')
api.add_resource(UserAPI, '/users', '/users/<int:user_id>')


# Patients Endpoints
api.add_resource(PatientAPI, '/patients',  '/patients/<int:user_id>', endpoint='patients')
api.add_resource(PatientFullDataAPI, '/v2/patients/<int:patient_id>',endpoint='patient_full_data')
#Doctor Endpoints
api.add_resource(DoctorAPI, '/doctors', '/doctors/<int:user_id>', endpoint='doctor')


# Appointment Endpoints

api.add_resource(DoctorAppointmentsResource,'/doctors/<int:doctor_id>/appointments/', '/doctors/<int:doctor_id>/appointments/<string:date>')
api.add_resource(AppointmentCreateResource, '/appointments')
api.add_resource(AppointmentUpdateResource, '/appointments/<int:appointment_id>')
api.add_resource(
    PatientAppointmentsResource,
    '/patients/<int:patient_id>/appointments',
    '/patients/<int:patient_id>/appointments/<date>'
)


api.add_resource(MedicineAPI, '/medicine', '/medicine/<int:medicine_id>')


# Medical Records Endpoints
# api.add_resource(MedicalRecordController, '/medical-records', endpoint='medical_records')
# api.add_resource(MedicalRecordController, '/medical-records/<int:record_id>', endpoint='medical_record')
api.add_resource(MedicalRecordAPI, "/medical-records", "/medical-records/<int:patient_id>")

api.add_resource(DownloadFileAPI, '/download/<string:filename>')

class HelloWorld(Resource):
    def get(self):
        return {'message': 'Hello, Pumkas!'}

api.add_resource(HelloWorld, '/')


if __name__ == '__main__':
    print("Running app... from main")
    app.run(host='0.0.0.0', port=8080)