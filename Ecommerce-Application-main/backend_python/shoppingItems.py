import os
import bson.json_util as json_util
from flask import jsonify, request, Blueprint
from dotenv import load_dotenv
from mongoDB import connectDB
from middleware import jwt_required
from bson import ObjectId

shoppingRoutes = Blueprint('shopping', __name__)

load_dotenv()

secret_key = os.environ.get('SECRET_KEY')

#CONNECT TO MONGODB 
client = connectDB()
db = client['Project']

#Shopping Collections
shopping_collection = db['shoppingItems']

@shoppingRoutes.route('/api/v1/admin/createShoppingItem', methods=['POST'])
@jwt_required
def createShoppingItem(data):
    if data['access_level'] == 'admin':
        item = request.get_json()

        res =  db.shopping_collection.insert_one(item)

        if res:
           return jsonify({'message': 'Shopping item successfully added!'}), 200 
        else:
           return jsonify({'message': 'Something went wrong...'}), 400 
    else:
        return jsonify({'message': 'Not Authorized!'}), 401

@shoppingRoutes.route('/api/v1/admin/getShoppingItems', methods=['GET'])
def getallShoppingItem():
    category = request.args.get('categoryId')

    if category != 'undefined':
        items = db.shopping_collection.find({'category': category})
    else:
        items = db.shopping_collection.find({})   

    if items:
        return jsonify(json_util.dumps(items)), 200
    else:
        return jsonify({'message': 'Something went wrong...'}), 400

@shoppingRoutes.route('/api/v1/admin/getShoppingItemsDetails', methods=['GET'])
def getShoppingItemDetails():
    productId = request.args.get('productId')

    if productId:
        items = db.shopping_collection.find_one({'_id': ObjectId(f'{productId}')})  

    if items:
        return jsonify(json_util.dumps(items)), 200
    else:
        return jsonify({'message': 'Something went wrong...'}), 400
    

@shoppingRoutes.route('/api/v1/admin/product/addReview', methods=['POST'])
@jwt_required
def addProductReview(data):
    res = request.get_json()

    productId = res['productId']
    name = res['name']
    rating = res['rating']
    text = res['text']
    userId = res['userId']

    if productId:
        product = db.shopping_collection.find_one({'_id': ObjectId(f'{productId}')})  

    if product:
        review = {
           'name': name,
           'rating': int(rating),
           'text': text,
           'userId': userId
        }

        db.shopping_collection.update_one(
           {'_id': ObjectId(f'{productId}')},
           {'$push': {'reviews': review}},
        )

        return jsonify({'success': 'Review added'}), 200
    else:
        return jsonify({'message': 'Something went wrong...'}), 400

@shoppingRoutes.route('/api/v1/products', methods=['GET'])
@jwt_required
def getAllProducts(data):
    if data['access_level'] == 'admin':
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 10))

        skip = (page - 1) * limit
        products = list(db.shopping_collection.find({}).skip(skip).limit(limit))

        total_products = db.shopping_collection.count_documents({})
        total_pages = (total_products + limit - 1) // limit

        res = {'products': products, 'totalPages': total_pages}

        return jsonify(json_util.dumps(res)), 200
    else:
        return jsonify({'message': 'Not Authorized!'}), 401
    
@shoppingRoutes.route('/api/v1/admin/getProduct', methods=['GET'])
@jwt_required
def getProduct(data):
    if data['access_level'] == 'admin':
        product_id = request.args.get('productId')
        
        product_exists = db.shopping_collection.find_one({'_id': ObjectId(f'{product_id}')})

        if product_exists:
            return jsonify(json_util.dumps(product_exists)), 200
        else:
            return jsonify({'message': 'Something went wrong!'}), 401
    else:
        return jsonify({'message': 'Not Authorized!'}), 401
    
@shoppingRoutes.route('/api/v1/admin/editProduct', methods=['PUT'])
@jwt_required
def editProduct(data):
    if data['access_level'] == 'admin':
        res = request.get_json()
        product_id = res['productId']
        product_exists = db.shopping_collection.find_one({'_id': ObjectId(f'{product_id}')})

        if product_exists:
            db.shopping_collection.update_one(
                {'_id': ObjectId(f'{product_id}')},
                {'$set': {
                    'title': res['title'],
                    'description': res['description'],
                    'price': res['price'],
                    'discountPercentage': res['discountPercentage'],
                    'stock': res['stock'],
                    'brand': res['brand'],
                    'category': res['category']
                }}
            )
            return jsonify({'message': 'Success!'}), 200
        else:
            return jsonify({'message': 'Something went wrong!'}), 401
    else:
        return jsonify({'message': 'Not Authorized!'}), 401