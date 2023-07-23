import os
import bson.json_util as json_util
from flask import jsonify, request, Blueprint
from dotenv import load_dotenv
from mongoDB import connectDB
from middleware import jwt_required
from bson import ObjectId
from bson.json_util import dumps
from datetime import datetime

orderRoutes = Blueprint('order', __name__)

load_dotenv()

secret_key = os.environ.get('SECRET_KEY')

#CONNECT TO MONGODB 
client = connectDB()
db = client['Project']

#Orders Collections
orders_collection = db['orders']

#Sales Collections
sales_collection = db['sales']

#Shopping Collections
shopping_collection = db['shoppingItems']

@orderRoutes.route('/api/v1/placeOrder', methods=['POST'])
@jwt_required
def placeOrder(data):
    order = request.get_json()
    user_id = order['userId']
    total = order['total']
    status = order['status']
    items = order['items']

    for item in items:
        product_id = item['_id']
        quantity_ordered = item['quantity']

        product = db.shopping_collection.find_one({'_id': ObjectId(product_id['$oid'])})
        if product:
            new_quantity = int(product['stock']) - (quantity_ordered)

            db.shopping_collection.update_one(
                {'_id': ObjectId(product_id['$oid'])},
                {'$set': {'stock': new_quantity}}
            )

    order = {
        'userId': ObjectId(user_id['$oid']),
        'items': items,
        'total': total,
        'status': status,
    }

    current_month = datetime.now().strftime('%Y-%m')
    sales_collection.update_one(
        {'month': current_month},
        {'$inc': {'order_count': 1}},
        upsert=True
    )

    order_id = db.orders_collection.insert_one(order).inserted_id

    if order_id:
        return jsonify({"orderId": str(order_id)}), 200 
    else: 
        return jsonify({'message': 'Something went wrong...'}), 400

@orderRoutes.route('/api/v1/getOrders', methods=['GET'])
@jwt_required
def getOrderConfirmation(data):
   orderId = request.args.get('orderId')

   order_details = db.orders_collection.find_one({'_id': ObjectId(orderId)})

   if order_details:
        return dumps(order_details), 200 
   else: 
        return jsonify({'message': 'Something went wrong...'}), 400

@orderRoutes.route('/api/v1/getAllOrders', methods=['GET'])
@jwt_required
def getAllUsersOrders(data):
   userId = request.args.get('userId')

   orders = db.orders_collection.find({'userId': ObjectId(userId)})

   if orders:
        return dumps(orders), 200 
   else: 
        return jsonify({'message': 'Something went wrong...'}), 400
   
@orderRoutes.route('/api/v1/admin/getOrders', methods=['GET'])
@jwt_required
def getOrders(data):
    if data['access_level'] == 'admin':
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 10))

        skip = (page - 1) * limit

        print(skip)

        orders = list(db.orders_collection.find({}).skip(skip).limit(limit))

        total_orders = db.orders_collection.count_documents({})
        total_pages = (total_orders + limit - 1) // limit

        res = {'orders': orders, 'totalPages': total_pages}

        return jsonify(json_util.dumps(res)), 200
    else: 
        return jsonify({'message': 'Not authorized!'}), 403
    
@orderRoutes.route('/api/v1/cancelOrder', methods=['DELETE'])
@jwt_required
def cancelOrder(data):
   orderId = request.args.get('orderId')

   orders = db.orders_collection.find({'_id': ObjectId(orderId)})

   if orders:
        db.orders_collection.update_one(
            {'_id': ObjectId(orderId)},
            {'$set': {'status': 'Cancelled'}}
        )

        current_month = datetime.now().strftime('%Y-%m')
        sales_collection.update_one(
            {'month': current_month, 'order_count': {'$gt': 0}},
            {'$inc': {'order_count': -1}}
        )

        return jsonify({'message': 'Success!'}), 200 
   else: 
        return jsonify({'message': 'Something went wrong...'}), 400

@orderRoutes.route('/api/v1/updateOrderStatus', methods=['DELETE'])
@jwt_required
def updateOrderStatus(data):
    if data['access_level'] == 'admin':
        orderId = request.args.get('orderId')
        newStatus = request.args.get('newStatus')

        order = db.orders_collection.find_one({'_id': ObjectId(orderId)})

        if order and newStatus == 'Cancelled':
            db.orders_collection.update_one(
                {'_id': ObjectId(orderId)},
                {'$set': {'status': 'Cancelled'}}
            )

            current_month = datetime.now().strftime('%Y-%m')
            sales_collection.update_one(
                {'month': current_month, 'order_count': {'$gt': 0}},
                {'$inc': {'order_count': -1}}
            )

            return jsonify({'message': 'Success!'}), 200
        else:
            db.orders_collection.update_one(
                {'_id': ObjectId(orderId)},
                {'$set': {'status': newStatus}}
            )
            return jsonify({'message': 'Status updated successfully!'}), 200
    else: 
        return jsonify({'message': 'Not authorized!'}), 403
   
@orderRoutes.route('/api/v1/admin/cancelOrder', methods=['GET'])
@jwt_required
def numberOfcancelledOrders(data):
    if data['access_level'] == 'admin':
      orders = db.orders_collection.find({})

      if orders:
            cancelledOrder = 0
            for order in orders:
                if order.get('status') == 'Cancelled':
                   cancelledOrder += 1
            return jsonify(cancelledOrder), 200
      else:
            return jsonify({'message': 'Something went wrong!'}), 401
    else: 
        return jsonify({'message': 'Not authorized!'}), 403

@orderRoutes.route('/api/v1/admin/orders', methods=['GET'])
@jwt_required
def numberOfOrders(data):
   if data['access_level'] == 'admin':
      orders = db.orders_collection.find({})

      if orders:
            activeOrder = 0
            for order in orders:
                if order.get('status') == 'Confirmed' and 'Delivered':
                   activeOrder += 1
            return jsonify(activeOrder), 200
      else:
            return jsonify({'message': 'Something went wrong!'}), 401
   else: 
        return jsonify({'message': 'Not authorized!'}), 403
   
@orderRoutes.route('/api/v1/admin/totalRevenue', methods=['GET'])
@jwt_required
def totalRevenue(data):
   if data['access_level'] == 'admin':
      orders = db.orders_collection.find({})

      if orders:
            revenue = 0
            for order in orders:
                total = order.get('total')
                if total and order.get('status') != 'Cancelled':
                   revenue += total
            return jsonify(revenue), 200
      else:
            return jsonify({'message': 'Something went wrong!'}), 401
   else: 
        return jsonify({'message': 'Not authorized!'}), 403
   
@orderRoutes.route('/api/v1/admin/sales', methods=['GET'])
@jwt_required
def salesData(data):
   if data['access_level'] == 'admin':
      sales_data = sales_collection.find({})

      if sales_data:
           return dumps(sales_data), 200
      else:
           return jsonify({'message': 'No sales data available'}), 404
   else:
       return jsonify({'message': 'Not authorized!'}), 403