from flask import Flask
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

def createApp():
    '''
    Creates a Flask app and returns it. This is a Factory function to create the app.
    '''
    app = Flask(__name__)
    api = Api(app)

    # Add Flask-RESTful resources here
    

    return app, api



if __name__ == '__main__':
    app, api = createApp()
    app.run(debug=True)
