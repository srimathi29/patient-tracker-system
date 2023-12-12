from flask import Flask
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from .config import Config
from flask_migrate import Migrate
from flask_admin import Admin

app = None
db = SQLAlchemy()
print(db)

def createApp():
    '''
    Creates a Flask app and returns it. This is a Factory function to create the app.
    '''
    global app
    if app is not None:
        return app
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    migrate = Migrate(app, db)
    api = Api(app)

    print("Connected to database:", app.config['SQLALCHEMY_DATABASE_URI'])

    # Add Flask-RESTful resources here
    app.secret_key = Config.SECRET_KEY

    # Add Flask-Login here
    app = flaskLogin(app)

    return app

def flaskLogin(app):
    '''
    This function is used to create the Flask-Login manager.
    '''
    login_manager = LoginManager()
    login_manager.init_app(app)

    from .Models.models import User
    @login_manager.user_loader
    def load_user(user_id):
        '''
        This function is used to reload the user object from the user ID stored in the session.
        '''
        return User.query.get(int(user_id))
    
    return app    


# if __name__ == '__main__':
#     app = createApp()
#     app.run(debug=True)
