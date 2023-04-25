from config import app, db, api
from models import User, Job_Category, Shift


@app.route('/')
def root_route():
    return 'how you doin\n'



if __name__ =='__main__':
    app.run(port = 5555, debug = True)