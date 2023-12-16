# conftest.py
import pytest
from Backend.app import app, db
from Backend.Models.models import User

@pytest.fixture(scope='module')
def init_database():
    # Create an application context before running the tests
    with app.app_context():
        # Create all database tables
        db.create_all()

        # Create a test user
        user1 = User(user_email='testuser@gmail.com', username="testuser", first_name="test", last_name="user",
                     date_joined="2023-12-31", user_type="patient", password_hash='testpassword')
        db.session.add(user1)
        db.session.commit()

        yield db  # this is where the testing happens!

        # Clean up / tear down
        db.session.remove()
        db.drop_all()

