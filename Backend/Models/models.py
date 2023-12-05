from app import db

class User(db.Model):
    '''
    User model for the database.
    '''

    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    #password = db.Column(db.String(80), nullable=False)
    #email = db.Column(db.String(120), unique=True, nullable=False)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    # is_admin = db.Column(db.Boolean, default=False)
    # is_active = db.Column(db.Boolean, default=True)
    # is_superuser = db.Column(db.Boolean, default=False)
    last_login = db.Column(db.DateTime, nullable=True)
    date_joined = db.Column(db.DateTime, nullable=False)
    is_authenticated = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return '<User %r>' % self.username
    
    # Methods to implement for Flask-Login
    
    def get_id(self):
        """Return the id of the user."""
        return self.id
    
    def is_authenticated(self):
        """Return True if the user is authenticated."""
        return self.is_authenticated
    
    def is_active(self):
        """True, as all users are active."""
        return True
    def is_anonymous(self):
        """False, as anonymous users aren't supported."""
        return False



