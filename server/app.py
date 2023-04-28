from flask import make_response, request, session, jsonify
from flask_restful import Resource
from werkzeug.security import check_password_hash
from datetime import datetime, timedelta

from config import app, db, api
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
        try:
            new_user=User(first_name = data['first_name'], last_name = data['last_name'], email = data['email'], _password_hash = data['password'])
        except:
            return make_response({'error': 'unable to create new user'})
        
        db.session.add(new_user)
        db.session.commit()
    
        return make_response({'message': 'new user created'}, 204)
api.add_resource(Users, '/users')

class Login(Resource):
    def post(self):
        auth = request.get_json()
  
        if not auth or not auth.get('email') or not auth.get('_password_hash'):
            return make_response('Could not verify email or password', 401)
  
        user = User.query.filter(User.email == auth['email']).first()
        
        if not user:
            return make_response('Could not verify email', 401)
  
        if user._password_hash == auth['_password_hash']:
            token = jwt.encode({
                'id': user.id,
                'exp' : datetime.utcnow() + timedelta(minutes = 30)
            }, app.config['SECRET_KEY'])

            return make_response(jsonify({'token' : token.decode('UTF-8')}), 201)
   
        return make_response('Could not verify', 403)

api.add_resource(Login, '/login')





if __name__ =='__main__':
    app.run(port = 5555, debug = True)