from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_restful import Api

app = Flask(__name__)
app.config['SECRET_KEY'] = 'QGT12HGF320LT4098INCM320W10VHTZXP12'

app.config[ 'SQLALCHEMY_DATABASE_URI' ] = 'sqlite:///app.db'
app.config[ 'SQLALCHEMY_TRACK_MODIFICATIONS' ] = False


db = SQLAlchemy()

migrate = Migrate(app,db)

db.init_app(app)
api = Api(app)

bcrypt=Bcrypt(app)

CORS(app)