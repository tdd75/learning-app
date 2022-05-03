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
collection = db['grammar-collection']

df = pd.read_csv('Grammar_Speaks_Understanding_and_Using_English_Grammar.csv')
df = df.reset_index()  

for index, row in df.iterrows():
  # if(index >4):
  #   break
  print(index)
  Chapter = BeautifulSoup(row['Chapter']).text
  Title = BeautifulSoup(row['Title']).text  
  
  image = BeautifulSoup(row['Picture']).img['src']    # 4000B1_001.jpg
  image = image.replace(".jpg","")
  image_local = index*2+1
  cloudinary.uploader.upload("./Grammar_Speaks_Understanding_and_Using_English_Grammar/"+ str(image_local),
                            folder= "grammar/image",
                            public_id = image)

  sound = BeautifulSoup(row['Audio']).text
  sound = (sound.replace("[sound:","").replace(".mp3]",""))
  sound_local = index*2+0
  cloudinary.uploader.upload("./Grammar_Speaks_Understanding_and_Using_English_Grammar/"+ str(sound_local),
                            folder= "grammar/sound",
                            public_id = sound,
                            resource_type ="video")

  gm_json = {
        "Chapter" : Chapter, 
        "Title" : Title,    
        "sound": "https://res.cloudinary.com/drmalgasr/video/upload/grammar/sound/"+sound,
        "image": "https://res.cloudinary.com/drmalgasr/image/upload/grammar/image/"+image
        
    }
  collection.insert_one(gm_json)


myclient_need_close.close()


