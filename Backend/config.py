import os

class Config:
    """Base configuration."""
    SECRET_KEY = os.environ.get('SECRET_KEY', 'al;sk":8/0#34789asdjgfkaSKJdfl-0123jkhaSDFK#63q0t')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'mysql+pymysql://root:cloudysky@localhost/PTS')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class ProductionConfig(Config):
    """Production configuration."""
    DEBUG = False
    # Production database
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'mysql+pymysql://root:password@localhost/prod_db')

class DevelopmentConfig(Config):
    """Development configuration."""
    DEBUG = True
    # Development database
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'mysql+pymysql://root:cloudysky@localhost/PTS')

class TestingConfig(Config):
    """Testing configuration."""
    DEBUG = False
    TESTING = True
    # Test database
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'mysql+pymysql://username:password@localhost/test_db')
