
Overview
========
Welcome to the code repository for my E-Commerce Site, an e-commerce platform built purely out of my love for technology and desire to implement something fun and challenging. This project is an open-source e-commerce platform utilizing Python as the back-end, MongoDB for database management, and React.js for the front-end.

This e-commerce site is intended to be a learning resource for students, developers, and anyone interested in understanding how to integrate these technologies together to create a fully functional application. It provides functionalities such as product listing, user authentication, shopping cart, and order processing.

Tech Stack
==========
Backend: The backend server is developed using Python. It takes advantage of the Flask framework to set up the server and routes, and PyMongo driver is used for interacting with the MongoDB database.

Database: MongoDB, a popular NoSQL database, is used due to its scalability and flexibility. It efficiently manages a large amount of data which can come in various forms.

Frontend: The user interface of the application is built using React.js, a powerful JavaScript library for building interactive user interfaces. React allows efficient updates and rendering, making the user experience smooth and responsive.
* Prerequisites: Python3, pip, npm

1) Download the code under the project directory and unzip the .zip file to a folder
2) Open terminal and navigate to the project directory (inside should be /backend_python and /frontend_react)
3) Navigate to the backend folder and create a new virtual Python environment:
```
cd backend_python
```
```
python3 -m venv venv
```
4) Activate the virtual environment:
```
source venv/bin/activate
```
5) Install the backend dependencies:
```
pip install -r requirements.txt
```
6) Navigate back to the frontend directory (You don't need to be in the virtual environment for the next step)
```
cd ../frontend_react
```
7) Install frontend dependencies:
```
npm install
```
* To exit the virtual python environment run the command
```
deactivate
```

## Running the project for development on Mac OS

1) Open terminal and navigate to the project directory (inside should be /backend_python and /frontend_react)
2) Navigate to the backend folder:
```
cd backend_python
```
3) Activate the virtual python environment
```
source venv/bin/activate
// For Windows, there is a different command:
venv\Scripts\activate
```
2) Run the backend
```
python3 server.py
```
3) Keeping the server open, open a new seperate terminal window, and navigate to the project directory. Then navigate to the frontend folder:
```
cd frontend_react
```
4) Run the frontend
```
npm start
```

# Tips
If you get a problem running the server because conflict between bson and pymongo's bson after pip install try this link:
[stackoverflow](https://stackoverflow.com/questions/12983472/import-pymongo-causes-importerror-cannot-import-name-bson-how-do-you-fix-the)
