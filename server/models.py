from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from config import db, bcrypt
import jwt
from datetime import datetime, timedelta

class User(db.Model, SerializerMixin):
    __tablename__='users'

    serialize_rules = ['-created_at', '-updated_at', '-shifts']

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    email = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String, nullable=False)

    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    shifts = db.relationship('Shift', back_populates = 'user', cascade="all, delete-orphan")
    job_categories = association_proxy('shifts', 'job_category')

    # def encode_auth_token(self, user_id):
    #     try:
    #         payload = {
    #             'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, seconds=5),
    #             'iat': datetime.datetime.utcnow(),
    #             'sub': user_id
    #         }
    #         return jwt.encode(
    #             payload,
    #             app.config.get('SECRET_KEY'),
    #             algorithm='HS256'
    #         )
    #     except Exception as e:
    #         return e

    # @staticmethod
    # def decode_auth_token(auth_token):
    #     try:
    #         payload = jwt.decode(auth_token, app.config.get('SECRET_KEY'))
    #         return payload['sub']
    #     except jwt.ExpiredSignatureError:
    #         return 'Signature expired. Please log in again.'
    #     except jwt.InvalidTokenError:
    #         return 'Invalid token. Please log in again.'

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        password_hash=bcrypt.generate_password_hash(
            password.encode('utf-8')
        )
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf.8')
        )

    @validates('_password_hash')
    def pass_hashing(self, key, attr):
        password_hash = bcrypt.generate_password_hash(attr.encode('utf-8'))
        return password_hash.decode('utf-8')
       

class Shift(db.Model, SerializerMixin):
    __tablename__='shifts'

    serialize_rules = ['-created_at', '-updated_at', '-user', '-job']

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    job_id = db.Column(db.Integer, db.ForeignKey('job_categories.id'))
    start_date_time = db.Column(db.DateTime)
    end_date_time = db.Column(db.DateTime)
    hourly_pay = db.Column(db.Float)
    location = db.Column(db.String)
    
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    user = db.relationship('User', back_populates = 'shifts')
    job_category = db.relationship('Job_Category', back_populates = 'shifts')



class Job_Category(db.Model, SerializerMixin):
    __tablename__='job_categories'

    serialize_rules = ['-created_at', '-updated_at', '-shifts']

    id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String)

    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    shifts = db.relationship('Shift', back_populates = 'job_category', cascade='all, delete-orphan')
    users = association_proxy('shifts', 'user')