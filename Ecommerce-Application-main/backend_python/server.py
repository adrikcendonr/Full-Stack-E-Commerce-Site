import os
from flask import Flask, send_from_directory
from userRoutes import userRoutes
from shoppingItems import shoppingRoutes
from orders import orderRoutes
from wishList import wishListRoutes

#. venv/bin/activate
app = Flask(__name__, static_folder='../build')
app.register_blueprint(userRoutes) 
app.register_blueprint(shoppingRoutes)
app.register_blueprint(orderRoutes)
app.register_blueprint(wishListRoutes)

# Serve React App
@app.route('/', defaults={'path': ''})          # cited from stack over-flow as react has inside route itself so cant route it using templates 
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

# APP RUNS ON PORT 5000 OR NEW PORT IS GIVEN  
if __name__ == '__main__':
    app.run(port = 8000, debug = True)