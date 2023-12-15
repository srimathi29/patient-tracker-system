from ..app import app, db
from flask import request, jsonify, Response
from flask_restful import Resource
from ..Models.models import User, Doctor, Patient
from werkzeug.security import check_password_hash, generate_password_hash
from flask_login import login_user, login_required,logout_user
from datetime import datetime
from ..Models.enums import UserType
import json

class Login(Resource):
    def post(self):
        try:
            data = request.json
            user_email = data['user_email']
            password = data['password']
            
            user = User.query.filter_by(user_email=user_email).first()
            if user and check_password_hash(user.password_hash, password):
                login_user(user)
                roleId = -1
                if user.user_type == UserType.DOCTOR:
                    doctor = Doctor.query.filter_by(user_id=user.id).first()
                    roleId = doctor.id
                elif user.user_type == UserType.PATIENT:
                    patient = Patient.query.filter_by(user_id=user.id).first()
                    roleId = patient.id
                response_data = {
                    "user_id": str(user.id),  # Ensure ID is serialized to string
                    "roleId": str(roleId),  # Ensure ID is serialized to string
                    "username": user.username,
                    "role": user.user_type.value,
                    "firstName": user.first_name,
                    "lastName": user.last_name,
                    "email": user.user_email,
                    "age": 20,
                    "gender": user.gender,
                    "phone": user.contact_number,
                    "user_fullname": f"{user.first_name} {user.last_name}",
                    "additionalData": 'No additional information.',
                    "img": 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR04GWDTULmcrO5Gjnf_j-n3whWNEfKKQnChiOWkwidZ9DDgwzDU2SfnLMFQubt4mzwJj8&usqp=CAU',
                    "isSuccess": 1,
                    "message": "Successfully Logged In!"
                }


                return Response(json.dumps({"data":response_data}), mimetype="application/json", status=200)
            else:
                return Response(json.dumps({"data": {"isSuccess": 0, "message": "Invalid Credentials!"}}), mimetype="application/json", status=401)
        except Exception as e:
            print(f"Error logging in: {e}")
            return Response(json.dumps({"data": {"isSuccess": 0, "message": "Login error"}}), mimetype="application/json", status=500) 
            

    def get(self):
        return Response(json.dumps({"data": {"isSuccess": 0, "message": "Method not allowed"}}), mimetype="application/json", status=405)

class Logout(Resource):
    @login_required
    def get(self):
        try:
            logout_user()
            return Response(
                json.dumps({"data": "Successfully Logged Out!", "isSuccess": 1}),
                mimetype="application/json",
                status=200
            )
        except Exception as e:
            return Response(
                json.dumps({"data": str(e), "isSuccess": 0}),
                mimetype="application/json",
                status=400
            )

class Register(Resource):
    def post(self):
        try:
            data = request.json
            print(data)
            username = data['username']
            email = data['user_email']
            password = data['password']
            first_name = data['first_name']
            last_name = data['last_name']
            user_type = data['user_type']
            # Check if user already exists
            if User.query.filter((User.username == username) or (User.user_email == email)).first():
                return Response(json.dumps({"data": {"message": "Username or email already exists","isSuccess":0}}), mimetype="application/json", status=409)

            # Create a new user instance
            new_user = User(
                username=username,
                user_email=email,
                password_hash=generate_password_hash(password),
                first_name=first_name,
                last_name=last_name,
                date_joined=datetime.utcnow(),
                user_type=UserType(user_type.lower())
            )

            
            # Add new user to the database
            db.session.add(new_user)
            db.session.commit()
            app.logger.info(f"User {username} created successfully")


            # Create a new doctor or patient instance
            if(user_type.lower() == UserType.DOCTOR.value):

                new_doctor = Doctor(
                    user_id=new_user.id,
                    specialization = data.get('specialization', "general")
                )

                db.session.add(new_doctor)

            elif(user_type.lower() == UserType.PATIENT.value):
                new_patient = Patient(
                    user_id=new_user.id
                )

                db.session.add(new_patient)

            db.session.commit()
            return Response(json.dumps({"data": {"message": "User registered successfully","isSuccess":1}}), mimetype="application/json", status=201)

        except Exception as e:
            db.session.rollback()
            app.logger.error(f"Error occurred during registration {e}")
            return Response(json.dumps({"data": {"message": "Failed to create User","isSuccess":0}}), mimetype="application/json", status=400)


class UserAPI(Resource):
    def get(self, user_id=None):
        if user_id:
            # Get a specific user by ID
            user = User.query.get(user_id)
            if user:
                response_data = {
                    "data": {
                        "user": user.serialize(),
                        "isSuccess": 1
                    }
                }
                print(response_data)
                return Response(json.dumps(response_data), mimetype="application/json", status=200)
            response_data = {
                "data": {
                    "message": "User not found",
                    "isSuccess": 0
                }
            }
            return Response(json.dumps(response_data), mimetype="application/json", status=404)
        else:
            # Get all users
            users = User.query.all()
            serialized_users = [user.serialize() for user in users]
            response_data = {
                "data": {
                    "users": serialized_users,
                    "isSuccess": 1
                }
            }
            return Response(json.dumps(response_data), mimetype="application/json", status=200)

    def post(self):
        data = request.json
        try:
            new_user = User(
                username=data['username'],
                password_hash=data['password_hash'],
                user_email=data['user_email'],
                first_name=data['first_name'],
                last_name=data['last_name'],
                last_login=data.get('last_login'),
                date_joined=data['date_joined'],
                is_authenticated=data.get('is_authenticated', False),
                user_type=data['user_type'],
                gender=data.get('gender'),
                contact_number=data.get('contact_number'),
                address=data.get('address')
            )
            db.session.add(new_user)
            db.session.commit()
            response_data = {
                "data": {
                    "message": "User record created successfully",
                    "isSuccess": 1
                }
            }
            return Response(json.dumps(response_data), mimetype="application/json", status=201)
        except Exception as e:
            db.session.rollback()
            response_data = {
                "data": {
                    "message": str(e),
                    "isSuccess": 0
                }
            }
            return Response(json.dumps(response_data), mimetype="application/json", status=400)

    def put(self, user_id):
        user = User.query.get(user_id)
        if user:
            try:
                data = request.json
                user.first_name = data.get('first_name', user.first_name)
                user.last_name = data.get('last_name', user.last_name)
                user.gender = data.get('gender',user.gender)
                user.contact_number = data.get('contact_number',user.contact_number)
                user.address = data.get('address',user.address)
                user.age = data.get('age',user.age)
                user.img = data.get('img',user.img) 
                db.session.commit()
                response_data = {
                    "data": {
                        "message": "User record updated successfully",
                        "isSuccess": 1
                    }
                }
                return Response(json.dumps(response_data), mimetype="application/json", status=200)
            except Exception as e:
                db.session.rollback()
                response_data = {
                    "data": {
                        "message": str(e),
                        "isSuccess": 0
                    }
                }
                return Response(json.dumps(response_data), mimetype="application/json", status=400)
        response_data = {
            "data": {
                "message": "User not found",
                "isSuccess": 0
            }
        }
        return Response(json.dumps(response_data), mimetype="application/json", status=404)

    def delete(self, user_id):
        user = User.query.get(user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
            response_data = {
                "data": {
                    "message": "User record deleted successfully",
                    "isSuccess": 1
                }
            }
            return Response(json.dumps(response_data), mimetype="application/json", status=200)
        response_data = {
            "data": {
                "message": "User not found",
                "isSuccess": 0
            }
        }
        return Response(json.dumps(response_data), mimetype="application/json", status=404)