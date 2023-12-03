from app import db

class User(db.Model):
    '''
    User model for the database.
    '''
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    user_id = db.Column(db.Integer, unique=True, nullable=False)
    #password = db.Column(db.String(80), nullable=False)
    #email = db.Column(db.String(120), unique=True, nullable=False)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    # is_admin = db.Column(db.Boolean, default=False)
    # is_active = db.Column(db.Boolean, default=True)
    # is_superuser = db.Column(db.Boolean, default=False)
    last_login = db.Column(db.DateTime, nullable=True)
    date_joined = db.Column(db.DateTime, nullable=False)

class Patient(db.Model):
    '''
    Patient model for the database.
    '''
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    gender = db.Column(db.String(10), nullable=True)
    contact_number = db.Column(db.String(15), nullable=True)
    address = db.Column(db.String(200), nullable=True)

class Doctor(db.Model):
    '''
    Doctor model for the database.
    '''
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    credentials = db.Column(db.String(100), nullable=False)