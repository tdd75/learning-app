import cloudinary.uploader
from bs4 import BeautifulSoup
import pandas as pd
from pymongo import MongoClient

cloudinary.config( 
  cloud_name = "drmalgasr", 
  api_key = "433738546922776", 
  api_secret = "Vr0mNS2tIuxBhlkPPz2UjwVWik0" 
)

myclient_need_close = MongoClient("mongodb+srv://tuannha:admin123tn@cluster0.dxt2u.mongodb.net/test")
db = myclient_need_close["learning-app-db"]
collection = db['grammar-task-collection']

df = pd.read_csv('1200_English_Grammar_Tasks_with_answer_and_explains.csv')
df = df.reset_index()  


for index, row in df.iterrows():

  print(index)

  ex_json = {
        "Task" : row['Task'], 
        "Answer" : row['Answer'],    

        "a" : row['a'],    
        "b" : row['b'],    
        "c" : row['c'],    
        "d" : row['d'],    

        "comment" : row['comment'],
        "topic" : row['topic'],

        "level" : row['level']
        
    }
  collection.insert_one(ex_json)


myclient_need_close.close()


