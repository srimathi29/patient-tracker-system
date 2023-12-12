import pymysql

import sys
import os

# Add the parent directory of the current file to the Python module search path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))


from config import Config




def test_mysql_connection():
    try:
        connection = pymysql.connect(
            host='localhost',
            user='root',
            password='cloudysky',
            database='PTS',
            charset='utf8mb4',
            cursorclass=pymysql.cursors.DictCursor
        )
        print("Connected to MySQL server successfully!")
        connection.close()
    except pymysql.Error as e:
        print(f"Failed to connect to MySQL server: {e}")

# Run the test
test_mysql_connection()