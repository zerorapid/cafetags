import urllib.request
import re

url = "https://www.district.in/dining/hyderabad/cafe-niloufer-hitech-city?srsltid=AfmBOoqz8A522ohksW0-a6fhp-Ju6kSb_YEHzu4rkT_6Yxyvjl2Sk1L2"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})

try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    images = re.findall(r'https://b\.zmtcdn\.com/data/pictures/[^"\'\s]+\.(?:jpg|jpeg|png)', html)
    food_images = re.findall(r'https://b\.zmtcdn\.com/data/reviews_photos/[^"\'\s]+\.(?:jpg|jpeg|png)', html)
    
    print("Pictures:")
    for img in list(set(images))[:5]:
        print(img)
        
    print("Food:")
    for img in list(set(food_images))[:5]:
        print(img)
except Exception as e:
    print("Error:", e)
