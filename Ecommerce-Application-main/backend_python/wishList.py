import os
import bson.json_util as json_util
from flask import jsonify, request, Blueprint
from dotenv import load_dotenv
from mongoDB import connectDB
from middleware import jwt_required
from bson import ObjectId

wishListRoutes = Blueprint('wishList', __name__)

load_dotenv()

secret_key = os.environ.get('SECRET_KEY')

#CONNECT TO MONGODB 
client = connectDB()
db = client['Project']

# Shopping Collection
shopping_collection = db['shoppingItems']

# User Collection
users_collection = db['users']

# WishList Collection
wishlist_collection = db['wishList']

@wishListRoutes.route('/api/v1/saveToWishList', methods=['POST'])
@jwt_required
def saveToWishList(data):
    wishListItem = request.get_json()
    userId = wishListItem['userId']
    productId = wishListItem['productId']

    product = db.shopping_collection.find_one({'_id': ObjectId(f'{productId}')})

    if product and userId:
        newWishListItem = {
            'userId': ObjectId(f'{userId}'),
            'productId': ObjectId(f'{productId}'),
        }

        itemExists = db.wishlist_collection.find_one(newWishListItem)

        if itemExists:
            return jsonify({'message': 'Already in wishlist'}), 400

        wishListItem_id = db.wishlist_collection.insert_one(newWishListItem).inserted_id

        if wishListItem_id:
            return jsonify({"wishListItemId": str(wishListItem_id)}), 200
        else:
            return jsonify({'message': 'unable to insert wishlist item'}), 400
    else:
        return jsonify({'message': 'product or user not found'}), 400

@wishListRoutes.route('/api/v1/getWishList', methods=['GET'])
@jwt_required
def getWishList(data):
    userId = request.args.get('userId')

    wishListItems = db.wishlist_collection.find({'userId': ObjectId(userId)})

    items = []

    if wishListItems:
        for item in wishListItems:
            product = db.shopping_collection.find_one({'_id': ObjectId(item['productId'])})
            items.append(product)
        
        return jsonify(json_util.dumps(items)), 200
    else:
        return jsonify({'message': 'Something went wrong...'}), 400

@wishListRoutes.route('/api/v1/removeFromWishList', methods=['PUT'])
@jwt_required
def removeFromWishList(data):
    wishListItem = request.get_json()
    userId = wishListItem['userId']
    productId = wishListItem['productId']

    product = db.shopping_collection.find_one({'_id': ObjectId(wishListItem['productId'])})

    if product and userId:
        newWishListItem = {
            'userId': ObjectId(f'{userId}'),
            'productId': ObjectId(f'{productId}'),
        }

        deleted = db.wishlist_collection.delete_one(newWishListItem)

        if deleted:
            return jsonify({'message': 'Item removed from wishlist'}), 200
        else:
            return jsonify({'message': 'unable to delete wishlist item'}), 400
    else:
        return jsonify({'message': 'product or user not found'}), 400