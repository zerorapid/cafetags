import urllib.request
import re

url = "https://www.zomato.com/hyderabad/cafe-niloufer-hitech-city-madhapur/photos"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})

try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    images = re.findall(r'https://b\.zmtcdn\.com/data/pictures/[^"\']+\.jpg', html)
    print("Found images:", list(set(images))[:5])
except Exception as e:
    print("Error:", e)
