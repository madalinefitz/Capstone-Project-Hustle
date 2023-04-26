from flask import make_response, request, session, jsonify
from flask_restful import Resource

from config import app, db, api
from models import User, Job_Category, Shift


class Job_Categories(Resource):
    def get(self):
        job_categories = [j.to_dict() for j in Job_Category.query.all()]
        return make_response(job_categories, 201)
api.add_resource(Job_Categories, '/jobcategories')



if __name__ =='__main__':
    app.run(port = 5555, debug = True)