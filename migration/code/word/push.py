import cloudinary.uploader
from bs4 import BeautifulSoup
import pandas as pd
from pymongo import MongoClient
from regex import P

cloudinary.config( 
  cloud_name = "drmalgasr", 
  api_key = "433738546922776", 
  api_secret = "Vr0mNS2tIuxBhlkPPz2UjwVWik0" 
)

myclient_need_close = MongoClient("mongodb+srv://tuannha:admin123tn@cluster0.dxt2u.mongodb.net/test")
db = myclient_need_close["learning-app-db"]
collection = db['word-collection']

df = pd.read_csv('4000_Essential_English_Words_1_-_Vietnamese.csv')
df = df.reset_index()  

for index, row in df.iterrows():
  # if(index >4):
  #   break
  print(index)
  kw = BeautifulSoup(row['Keyword']).text
  short_des = BeautifulSoup(row['Short Vietnamese']).text  

  '''line 157 null suggest'''
  try :
    suggest = BeautifulSoup(row['Suggestion']).text
  except:
    suggest =""
  
  
  image = BeautifulSoup(row['Image']).img['src']    # 4000B1_001.jpg
  image = image.replace(".jpg","")
  image_local = index*4+3
  cloudinary.uploader.upload("./4000_Essential_English_Words_1_-_Vietnamese/"+ str(image_local),
                            folder= "words/image",
                            public_id = image)

  sound = BeautifulSoup(row['Keyword_Sound']).text
  sound = (sound.replace("[sound:","").replace(".mp3]",""))
  sound_local = index*4+0
  cloudinary.uploader.upload("./4000_Essential_English_Words_1_-_Vietnamese/"+ str(sound_local),
                            folder= "words/sound",
                            public_id = sound,
                            resource_type ="video")

  transcription = BeautifulSoup(row['Transcription']).text
  explanation = BeautifulSoup(row['Explanation']).text

  meaning_sound = BeautifulSoup(row['Meaning_Sound']).text
  meaning_sound = (meaning_sound.replace("[sound:","").replace(".mp3]",""))
  meaning_sound_local = index*4+1
  cloudinary.uploader.upload("./4000_Essential_English_Words_1_-_Vietnamese/"+ str(meaning_sound_local),
                            folder= "words/sound",
                            public_id = meaning_sound,
                            resource_type ="video")

  example_sound = BeautifulSoup(row['Example_Sound']).text
  example_sound = (example_sound.replace("[sound:","").replace(".mp3]",""))
  example_sound_local = index*4+2
  cloudinary.uploader.upload("./4000_Essential_English_Words_1_-_Vietnamese/"+ str(example_sound_local),
                            folder= "words/sound",
                            public_id = example_sound,
                            resource_type ="video")

  full_vietnamese = BeautifulSoup(row['Full Vietnamese']).text 

  kw_json = {
        "kw" : kw, 
        "short_des" : short_des,   
        "suggest": suggest,
        "sound": "https://res.cloudinary.com/drmalgasr/video/upload/words/sound/"+sound,
        "image": "https://res.cloudinary.com/drmalgasr/image/upload/words/image/"+image,
        "transcription": transcription,
        "explanation": explanation,
        "meaning_sound": "https://res.cloudinary.com/drmalgasr/video/upload/words/sound/"+meaning_sound,
        "example_sound": "https://res.cloudinary.com/drmalgasr/video/upload/words/sound/"+example_sound,
        "full_vietnamese": full_vietnamese,
    }
  collection.insert_one(kw_json)


myclient_need_close.close()


