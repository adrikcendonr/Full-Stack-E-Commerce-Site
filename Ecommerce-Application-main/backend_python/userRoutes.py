import os
import bcrypt
import bson.json_util as json_util
from bson import ObjectId
from flask import jsonify, request, make_response, Blueprint
import jwt
from dotenv import load_dotenv
from datetime import datetime, timedelta
from mongoDB import connectDB
from middleware import jwt_required

userRoutes = Blueprint('user', __name__)

load_dotenv();

secret_key = os.environ.get('SECRET_KEY')

#CONNECT TO MONGODB 
client = connectDB()
db = client['Project']

#User/admin Collections
users_collection = db['users']
orders_collection = db['orders']

#admin(user-routes)

@userRoutes.route('/api/v1/admin/getUser', methods=['GET'])
@jwt_required
def getUser(data):
    if data['access_level'] == 'admin':
        user_id = str(request.args.get('userId'))
        
        user_exists = users_collection.find_one({'_id': ObjectId(f'{user_id}')})

        if user_exists:
            return jsonify(json_util.dumps(user_exists)), 200
        else:
            return jsonify({'message': 'Something went wrong!'}), 401
    else:
        return jsonify({'message': 'Not Authorized!'}), 401
    
@userRoutes.route('/api/v1/admin/getActiveUsers', methods=['GET'])
@jwt_required
def getNumberofActiveUsers(data):
    if data['access_level'] == 'admin':
        users = users_collection.find({})

        if users:
            active_users_count = 0
            for user in users:
                if user.get('isActive') == 'true' and user.get('accessLevel') == 'user':
                   active_users_count += 1
            return jsonify(active_users_count), 200
        else:
            return jsonify({'message': 'Something went wrong!'}), 401
    else:
        return jsonify({'message': 'Not Authorized!'}), 401
    
@userRoutes.route('/api/v1/admin/editUser', methods=['PUT'])
@jwt_required
def editUser(data):
    if data['access_level'] == 'admin':
        res = request.get_json()
        user_id = res['userId']
        user_exists = users_collection.find_one({'_id': ObjectId(f'{user_id}')})

        if user_exists:
            users_collection.update_one(
                {'email': user_exists['email']},
                {'$set': {
                    'name': res['name'],
                    'email': res['email'],
                    'isActive': res['active'],
                    'accessLevel': res['role']
                }}
            )
            return jsonify({'message': 'Success!'}), 200
        else:
            return jsonify({'message': 'Something went wrong!'}), 401
    else:
        return jsonify({'message': 'Not Authorized!'}), 401

@userRoutes.route('/api/v1/admin/users', methods=['GET'])
@jwt_required
def getAllUsers(data):
    if data['access_level'] == 'admin':
        userType = str(request.args.get('userType'))
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 10))

        skip = (page - 1) * limit
        users = list(users_collection.find({ 'accessLevel': userType }).skip(skip).limit(limit))

        total_users = users_collection.count_documents({})
        total_pages = (total_users + limit - 1) // limit

        res = {'users': users, 'totalPages': total_pages}

        return jsonify(json_util.dumps(res)), 200
    else:
        return jsonify({'message': 'Not Authorized!'}), 401

@userRoutes.route('/api/v1/admin/signup', methods=['POST'])
@jwt_required
def adminUserSignUp(data):
    if data['access_level'] == 'admin':
        res = request.get_json();
        user_exists = users_collection.find_one({'email': res['email']})
        if user_exists:
           return jsonify({'message': 'User already exists.'}), 400
        else:
           password = res['password'].encode('utf-8');
           hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())
           res['password'] = hashed_password
           res['isActive'] = 'true'
           db.users.insert_one(res)
           return jsonify({'message': 'User successfully created!'})
    else:
        return jsonify({'message': 'Not Authorized!'}), 401

# user-routes    
@userRoutes.route('/api/v1/deleteUser', methods=['DELETE'])
@jwt_required
def deleteUser(data):
    res = request.args.get('userId')
    user = users_collection.delete_one({'_id': ObjectId(f'{res}')})

    if user:
        return jsonify({'message': 'User deleted successfully'}), 200
    else:
        return jsonify({'message': 'Something went wrong...'}), 401 

@userRoutes.route('/api/v1/user', methods=['GET'])
@jwt_required
def userDetails(data):
    user_exists = users_collection.find_one({'email': data['email']})

    if user_exists:
        return jsonify(json_util.dumps(user_exists)), 200
    else:
        return jsonify({'message': 'Email does not exists!'}), 401 

@userRoutes.route('/api/v1/updateUser', methods=['PUT'])
@jwt_required
def updateUserDetails(data):
    res = request.get_json()
    user_exists = users_collection.find_one({'email': data['email']})

    update_fields = {
        'name': res['name'],
        'email': res['email'],
    }

    if 'password' in res and res['password']:
        password = res['password'].encode('utf-8')
        hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())
        update_fields['password'] = hashed_password

    if user_exists:
        users_collection.update_one(
            {'email': user_exists['email']},
            {'$set': update_fields}
        )
        return jsonify({'message': 'Success!'}), 200
    else:
        return jsonify({'message': 'Something went wrong!'}), 401
    
@userRoutes.route('/api/v1/user/validation', methods=['POST'])
def emailvalidation():
    data = request.get_json()
    user_exists = users_collection.find_one({'email': data['email']})

    if user_exists:
        return jsonify({'message': 'Success!'}), 200
    else:
        return jsonify({'message': 'Email does not exists!'}), 401   

@userRoutes.route('/api/v1/user/signup', methods=['POST'])
def signup():
    data = request.get_json();
    user_exists = users_collection.find_one({'email': data['email']})
    if user_exists:
        return jsonify({'message': 'User already exists.'}), 400
    else:
        if(data['repeatpassword'] != data['password']):
            return jsonify({'message': 'Password does not match!'}), 401
        else: 
            password = data['password'].encode('utf-8');
            hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())
            data['password'] = hashed_password
            data['isActive'] = 'true'
            data['accessLevel'] = 'user'
            del data['repeatpassword']
            db.users.insert_one(data)
            return jsonify({'message': 'User successfully created!'})

@userRoutes.route('/api/v1/user/signin', methods=['POST'])
def signin():
    data = request.get_json()
    user = db.users.find_one({'email': data['email']})

    if user:
        if (user['isActive'] == 'false'):
            return jsonify({'message': 'Account is not active. Please contact us for more details!'}), 401

        if bcrypt.checkpw(data['password'].encode('utf-8'), user['password']):
            expires = datetime.utcnow() + timedelta(hours = 1)
            token = jwt.encode({'email': data['email'], 'exp': expires, 'access_level': user['accessLevel']}, secret_key, algorithm='HS256')
            res = make_response(jsonify({"access_token" : token, "user" : json_util.dumps(user)}))
            return res
        else:
            return jsonify({'message': 'Invalid credentials!'}), 401
    else:
        return jsonify({'message': 'Invalid credentials!'}), 401