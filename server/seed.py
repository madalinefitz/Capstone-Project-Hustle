from random import randint, choice as rc

from faker import Faker

from app import app
from models import db

from models import db, User, Job_Category, Shift

with app.app_context():

    faker = Faker()

    print("Deleting data...")
    # User.query.delete()
    Job_Category.query.delete()
    # Shift.query.delete()


    print("Creating users...")


    # users_list = [User(first_name = faker.first_name(), last_name = faker.last_name(), email = faker.email(), _password_hash = faker.word()) for _ in range(1,5)]
    # u1 = User(first_name = 'admin', last_name = 'admin', email='admin@example.com', _password_hash = 'password')
    
    print("Creating jobs...")
    

    # jobs_list = [Job_Category(category_name = faker.sentence()) for _ in range(1,20)]
    j1 = Job_Category(category_name = 'Waitress')
    j2 = Job_Category(category_name = 'Nurse')
    j3 = Job_Category(category_name = 'Barista')
    j4 = Job_Category(category_name = 'Bartender')
    j5 = Job_Category(category_name = 'Amazon Delivery')
    j6 = Job_Category(category_name = 'Door Dash')
    j7 = Job_Category(category_name = 'Retail')
    j8 = Job_Category(category_name = 'Cook')
    j9 = Job_Category(category_name = 'Nanny')
    j10 = Job_Category(category_name = 'Lawn Care Service')
    j11 = Job_Category(category_name = 'House Sitting')
    j12 = Job_Category(category_name = 'Walk Dog')
    j13 = Job_Category(category_name = 'House Cleaning')
    j14 = Job_Category(category_name = 'Teacher')
    j15 = Job_Category(category_name = 'Software Developer')
    j16 = Job_Category(category_name = 'Other')


    
    print("Creating shifts...")


    shifts_list = [Shift(user_id = randint(1,5), job_id=randint(1,5), start_date_time = faker.date_time(),  end_date_time= faker.date_time(), hourly_pay = randint(20,70), location=faker.address()) for _ in range(1,10)]

    # db.session.add_all(shifts_list)
    # db.session.add_all(jobs_list)
    # db.session.add_all(users_list)

    db.session.add_all([j1,j2,j3,j4,j5,j6,j7,j8,j9,j10,j11,j12,j13,j14, j15, j16])
    
    
    db.session.commit()

    print("Seeding done!")