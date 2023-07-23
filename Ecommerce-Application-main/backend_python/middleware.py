import os
from functools import wraps
from flask import request
from dotenv import load_dotenv
import jwt

load_dotenv()

secret_key = os.environ.get('SECRET_KEY')

#MIDDLEWARE FUNCTION TO AUTHORIZE IF USER IS ALLOWED TO MAKE A REQUEST 
def jwt_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers["Authorization"].split(" ")[1]
        if not token:
            return {'message': 'Token is missing'}, 401
        try:
            data = jwt.decode(token, secret_key, algorithms=['HS256'])
        except:
            return {'message': 'Token is invalid'}, 401
        return f(data, *args, **kwargs)
    return decorated