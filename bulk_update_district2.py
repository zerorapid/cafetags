import urllib.request
import re
import json
import time

cafes = [
    {"name": "La Vie En Rose Cafe & Bistro", "url": "https://www.district.in/dining/hyderabad/la-vie-en-rose-cafe-bistro-gachibowli"},
    {"name": "Ukusa", "url": "https://www.district.in/dining/hyderabad/ukusa-jubilee-hills"},
    {"name": "Kisscoff Cafe", "url": "https://www.district.in/dining/hyderabad/kisscoff-cafe-film-nagar"}
]

def fetch_images(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8')
        pictures = list(set(re.findall(r'https://b\.zmtcdn\.com/data/pictures/[^"\'\s]+\.(?:jpg|jpeg|png)', html)))
        food = list(set(re.findall(r'https://b\.zmtcdn\.com/data/reviews_photos/[^"\'\s]+\.(?:jpg|jpeg|png)', html)))
        return pictures, food
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return [], []

with open('src/data.ts', 'r', encoding='utf-8') as f:
    data = f.read()

for cafe in cafes:
    print(f"Fetching images for {cafe['name']}...")
    pics, food = fetch_images(cafe['url'])
    if not pics and not food:
        print(f"No images found for {cafe['name']}")
        continue
    
    if len(pics) == 0: pics = food
    if len(food) == 0: food = pics
    
    main_img = pics[0] if pics else ''
    more_img = [pics[i % len(pics)] for i in range(1, 3)]
    
    search_str = f'"name": "{cafe["name"]}",'
    idx = data.find(search_str)
    if idx == -1:
        print(f"Could not find cafe {cafe['name']} in data.ts")
        continue
    
    end_idx = data.find('},', idx)
    if end_idx == -1:
        end_idx = data.find('}', idx)
        
    block = data[idx:end_idx]
    
    # Replace main image
    block = re.sub(r'"image": "https://images\.unsplash\.com[^"]+"', f'"image": "{main_img}"', block)
    
    # Replace moreImages
    more_str = '",\n      "'.join(more_img)
    block = re.sub(r'"moreImages": \[.*?\]', f'"moreImages": [\n      "{more_str}"\n    ]', block, flags=re.DOTALL)
    
    def repl_food(match):
        repl_food.count += 1
        img = food[repl_food.count % len(food)]
        return f'"image": "{img}"'
    repl_food.count = -1
    
    block = re.sub(r'"image": "https://images\.unsplash\.com[^"]+"', repl_food, block)
    
    data = data[:idx] + block + data[end_idx:]
    print(f"Updated {cafe['name']}")
    time.sleep(1)

with open('src/data.ts', 'w', encoding='utf-8') as f:
    f.write(data)

print("Done updating all remaining cafes!")
