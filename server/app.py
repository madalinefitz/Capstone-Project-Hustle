from flask import make_response, request, session, jsonify
from flask_restful import Resource
from werkzeug.security import check_password_hash
from datetime import datetime, timedelta

from config import app, db, api, bcrypt
from models import User, Job_Category, Shift
import jwt



class Job_Categories(Resource):
    def get(self):
        job_categories = [j.to_dict() for j in Job_Category.query.all()]
        return make_response(job_categories, 201)
api.add_resource(Job_Categories, '/jobcategories')

class Users(Resource):
    def get(self):
        users = [u.to_dict() for u in User.query.all()]
        return make_response(users, 201)
    
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(email = data['email']).first()

        # if not data or not data.get('email') or not data.get('_password_hash'):
        #     return make_response('Could not verify email or password', 401)
        password = data['_password_hash']

        if user and user.authenticate(password):
            token = jwt.encode({
                'id': user.id,
                'exp' : datetime.utcnow() + timedelta(minutes = 30)
            }, app.config['SECRET_KEY'])

            return make_response({'token' : token.decode('UTF-8'), 'user': user.to_dict(rules = ('shifts',))}, 200)
        
        elif user == None:
            try:
                almost_user=User(first_name = data['first_name'], last_name = data['last_name'], email = data['email'], _password_hash = data['_password_hash'])
                almost_user.password_hash=almost_user._password_hash
                hashed_pass=almost_user._password_hash
                new_user=User(first_name = data['first_name'], last_name = data['last_name'], email = data['email'], _password_hash = hashed_pass)
                db.session.add(new_user)
                db.session.commit()
                
                token = jwt.encode({
                    'id': new_user.id,
                    'exp' : datetime.utcnow() + timedelta(minutes = 30)
                }, app.config['SECRET_KEY'])
                
                return make_response({'token' : token.decode('UTF-8'), 'user': new_user.to_dict(rules = ('shifts',))}, 200)
            
            except:
                return make_response({'error': 'unable to locate user'}, 400)
    
api.add_resource(Users, '/users')

# class UserById(Resource):
#     def get(self, id):
#         user = User.query.filter_by(id=id).first()
#         if user == None:
#             return make_response({'error': 'user not found'}, 400)
#         return make_response(user.to_dict(rules = ('shifts',)))

# api.add_resource(UserById, '/users/<int:id>')

class Shifts(Resource):
    def get(self):
        shifts = [s.to_dict() for s in Shift.query.all()]
        return make_response(shifts, 201)

    def post(self):
        data = request.get_json()
        try:
            new_shift = Shift(user_id=data['user_id'], job_id=data['job_id'], hourly_pay=data['hourly_pay'], location=data['location'], start_date_time=data['start_date_time'], end_date_time=data['end_date_time'])
        
        except: 
            return make_response({ 'error': 'unable to add new shift'})

        db.session.add(new_shift)
        db.session.commit()

        return make_response({}, 204)

    
api.add_resource(Shifts, '/shifts')

class ShiftById(Resource):
    def patch(self, id):
        data = request.get_json()
        shift = Shift.query.filter_by(id=id).first()

        for key in data.keys():
            setattr(shift, key, data[key])

        db.session.add(shift)
        db.session.commit()
        return make_response(shift.to_dict(), 200)
    
    def delete(self, id):
        shift = Shift.query.filter_by(id=id).first()
        
        if shift == None:
            return make_response({'error': 'shift not found'})

        db.session.delete(shift)
        db.session.commit()

        return make_response({}, 200)

api.add_resource(ShiftById, '/shifts/<int:id>')

# class Login(Resource):
#     def post(self):
#         auth = request.get_json()
  
#         if not auth or not auth.get('email') or not auth.get('_password_hash'):
#             return make_response('Could not verify email or password', 401)
  
#         user = User.query.filter_by(email = auth['email']).first()
        
#         if not user:
#             return make_response('Could not verify email', 401)
  
#         if user._password_hash == auth['_password_hash']:
#             token = jwt.encode({
#                 'id': user.id,
#                 'exp' : datetime.utcnow() + timedelta(minutes = 30)
#             }, app.config['SECRET_KEY'])

#             return make_response({'token' : token.decode('UTF-8'), 'user': user.to_dict()}, 200)
   
#         return make_response('Could not verify', 403)

# api.add_resource(Login, '/login')



if __name__ =='__main__':
    app.run(port = 5555, debug = True)