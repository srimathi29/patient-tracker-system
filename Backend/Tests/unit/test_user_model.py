import pytest
from Backend.app import app, db
from Backend.Models.models import User

@pytest.fixture(scope='module')
def test_client():
    flask_app = app('testing')
    testing_client = flask_app.test_client()

    # Establish an application context
    ctx = flask_app.app_context()
    ctx.push()

    yield testing_client  # this is where the testing happens!

    ctx.pop()

@pytest.fixture(scope='module')
def init_database():
    # Push an application context
    app_context = app.app_context()
    app_context.push()

    # Create the database and the database table
    db.create_all()

    # Insert user data
    user1 = User(user_email='testuser@gmail.com',username="testuser",first_name="test",last_name="user",date_joined="2023-12-31",user_type="patient",password_hash='testpassword')
    db.session.add(user1)

    # Commit the changes for the users
    db.session.commit()

    yield db  # this is where the testing happens!

    db.session.remove()
    db.drop_all()
    app_context.pop()  # Pop the application context


def test_user_creation(init_database):
    user = User.query.filter_by(username='testuser').first()
    assert user is not None
    assert user.username == 'testuser'