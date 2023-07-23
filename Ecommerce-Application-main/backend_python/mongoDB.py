import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv();

Password = os.environ.get('Password')
Username = os.environ.get('Username')

def connectDB():
  #CONNECT TO MONGODB 
  try:
    client = MongoClient(f'mongodb+srv://{Username}:{Password}@cluster0.4ooavq3.mongodb.net/?retryWrites=true&w=majority')
    print('connected')
    return client
  except:
    print("Could not connect to the database!")