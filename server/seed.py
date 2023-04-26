from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db

from models import db, User, Job_Category, Shift

with app.app_context():

    faker = Faker()

    print("Deleting data...")
    User.query.delete()
    Job_Category.query.delete()
    Shift.query.delete()


    print("Creating users...")


    users_list = [User(first_name = faker.first_name(), last_name = faker.last_name(), email = faker.email(), _password_hash = faker.word()) for _ in range(1,5)]
    
    print("Creating jobs...")
    

    jobs_list = [Job_Category(category_name = faker.sentence()) for _ in range(1,20)]
    
    print("Creating shifts...")


    shifts_list = [Shift(user_id = randint(1,5), job_id=randint(1,5), start_date_time = faker.date_time(),  end_date_time= faker.date_time(), hourly_pay = randint(20,70), location=faker.address()) for _ in range(1,10)]

    db.session.add_all(shifts_list)
    db.session.add_all(jobs_list)
    db.session.add_all(users_list)
    
    
    db.session.commit()

    print("Seeding done!")