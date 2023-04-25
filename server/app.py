from config import app, db
from Models import User


@app.route('/')
def root_route():
    return 'how you doin\n'



if __name__ =='__main__':
    app.run(port = 5555, debug = True)