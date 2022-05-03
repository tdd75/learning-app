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

print(df)

for index, row in df.iterrows():
  # if(index >4):
  #   break
  print(index)
  Task = BeautifulSoup(row['Task']).text
  Title = BeautifulSoup(row['Title']).text  


  gm_json = {
        "Chapter" : Chapter, 
        "Title" : Title,    
        
    }
  collection.insert_one(gm_json)


myclient_need_close.close()


