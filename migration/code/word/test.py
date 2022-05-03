import cloudinary.uploader
from bs4 import BeautifulSoup
import pandas as pd
from pymongo import MongoClient

cloudinary.config( 
  cloud_name = "drmalgasr", 
  api_key = "433738546922776", 
  api_secret = "Vr0mNS2tIuxBhlkPPz2UjwVWik0" 
)

cloudinary.uploader.upload("./4000_Essential_English_Words_1_-_Vietnamese/"+ str(1),
                            folder= "words/sound",
                            public_id = 1,
                            resource_type ="video")