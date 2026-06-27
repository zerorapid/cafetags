import urllib.request
import re

req = urllib.request.Request(
    'https://district.in/hyderabad/cafe-niloufer-hitech-city',
    headers={'User-Agent': 'Mozilla/5.0'}
)
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    images = re.findall(r'https://[^"\'>\s]+(?:jpg|jpeg|png|webp)', html)
    print("Found images:", list(set(images))[:10])
except Exception as e:
    print("Error:", e)
