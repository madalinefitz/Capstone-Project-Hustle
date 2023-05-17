# Hustle.
## Introduction
This is a full-stack app created for a user to login, view and manage their scheduled shifts, and view their estimated weekly income.
User is able to:
1. Create a shift
2. View, edit, and delete week's shifts and all shifts
3. View estimated weekly pay
4. View all job categories available, and add/remove job categories from personal list
4. View, edit, and delete account info

## Languages & Frameworks
Python with Flask
React Native

## Program Composition
=> The following section describes each program component and its functionality

This project was created using React Native CLI and Xcode for iOS.
To start the app in development mode using an iOS simulator:
 - cd into client 
 - run npx react-native start
 - open a new terminal window 
 - enter the pipenv shell
 - cd into server
 - run python app.py
After starting the app, you will be taken to the login page.

### Logging In/Signing Up:
Enter a username and password to access the home screen.
If new to Hustle the user will need to create an account.

### HomeScreen
The Home Screen displays the user's name with the current week's dates. All the buttons allow the user to navigate to each screen in the app. 

### Calendar
The user can view a calendar component and add a new shift to their account. When clicked, the 'add shift' button displays a modal for the user to choose a start date/time, end date/time, job category(populated with their person job category list), hourly pay, and location. 
Once added this shift can be viewed by the user in "My Shifts".

### My Shifts
The first screen displays only the user's shifts for that week in sorted order from earliest date to latest. 
When clicked the "View all shifts" button allows the user to view all of their scheduled shifts in sorted order. 
By clicking the "Edit" button the user can edit the shift information or delete the shift. 

### Estimated Pay
The Estimated Pay screen gives the user the weekly income of their shifts based on what they have inputed as their hourly pay and start and end times. 

### Job Categories
The Job Categories screen allows the user to view all the job category options, search for specific categories, and add that category to their personal list. 
The "View My Job Categories" button allows the user to view the categories that are on their personal list. The user can remove categories they no longer want on their list. 


### My Account
The button in the top right corner of each screen displays the user's first initial. When clicked a modal with their account info is displayed. 
From this modal the user can edit their account info, delete their account, or log out. 



### MODELS
The models file contains the following 3 models which constitute the framework for the project.db tables.
Each table in database contains a primary key represented by an id.
The individual properties of each table are listed below:

1. User
- first_name: string
- last_name: string
- email: string
- _password_hash: string(hashed)

2. Shift
- start_date_time: DateTime (UTC)
- end_date_time: DateTime (UTC)
- hourly_pay: integer
- location: string
- user_id: interger, foreign key
- job_id: interger, foreign key

3. Job Category
- category_name: string

User can have many Shifts and can have many Job Categories through Shift. Job Category can have many shifts and can have many Users through shift.
    User -----< Shift >----- Job Category

## Flask
The backend methods are built using Flask Restful. Various CRUD functionality for each class defined below. 

1. User:
- create
- read
- update
- delete

2. Shift
- create
- read
- update
- delete

3. JobCategories
- read

### DATABASE
The database is set up using SQLalchemy, Python with Flask, and seed.py for faker and custom data. SQLalchemy's relationship, backpopulates, and association_proxy were used to create relationships between models in the database. Flask-Alembic was used to manage the migration versions.
