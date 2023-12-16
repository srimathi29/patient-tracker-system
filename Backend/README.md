# Project Name

A brief description of your project.

## Installation

### Prerequisites

- Python 3.x
- pip (Python package installer)

### Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/sh4nnu/patient-tracker-system
    ```
2. Navigate to the project directory:
```
cd your-repo
```
3. Create a new Python virtual environment:
``` 
python -m venv venv 
```

4. Activate the virtual environment:

For Windows:

```
venv\Scripts\activate
```

For Unix/MacOS:
```
source venv/bin/activate
```

5. Install the required packages:
```
pip install -r requirements.txt
```

## Database Setup

Inorder to setup the database
- Install Mysql server
- Create a database with the name PTS

## Run Migrations

To create tables in the Database , run the following commands

```
flask fb init
```

```
flask db migrate -m "Recreating Tables"
```

```
flask db upgrade
```

## Link to API Documentation
[API Documentation](https://documenter.getpostman.com/view/31798103/2s9Ykn82CA)

## Folder For Uploads
- create a folder called , if it doesnt exist
```
/Uploads
```

