import urllib.request
import re
import json

cafes = [
    {"name": "Sobremesa", "url": "https://www.district.in/dining/hyderabad/sobremesa-bakehouse-cafe-kitchen-jubilee-hills"},
    {"name": "Guilt Trip", "url": "https://www.district.in/dining/hyderabad/guilt-trip-jubilee-hills"},
    {"name": "Kaficko", "url": "https://www.district.in/dining/hyderabad/nove-the-italian-kitchen-banjara-hills"},
    {"name": "Karafa", "url": "https://www.district.in/dining/hyderabad/karafa-1-jubilee-hills"},
    {"name": "La Vie En Rose Cafe & Bistro", "url": "https://www.district.in/dining/hyderabad/la-vie-en-rose-cafe-bistro-gachibowli"},
    {"name": "Switch Coffee", "url": "https://www.district.in/dining/hyderabad/switch-coffee-madhapur"},
    {"name": "Osaka", "url": "https://www.district.in/dining/hyderabad/osaka-jubilee-hills"},
    {"name": "Ukusa", "url": "https://www.district.in/dining/hyderabad/ukusa-jubilee-hills"},
    {"name": "Kisscoff Cafe", "url": "https://www.district.in/dining/hyderabad/kisscoff-cafe-film-nagar"},
    {"name": "Roast CCX", "url": "https://www.district.in/dining/hyderabad/roast-ccx-banjara-hills"}
]

def fetch_images(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8')
        pictures = list(set(re.findall(r'https://b\.zmtcdn\.com/data/pictures/[^"\'\s]+\.(?:jpg|jpeg|png)', html)))
        food = list(set(re.findall(r'https://b\.zmtcdn\.com/data/reviews_photos/[^"\'\s]+\.(?:jpg|jpeg|png)', html)))
        if not food:
            food = list(set(re.findall(r'https://b\.zmtcdn\.com/data/pictures/chains/[^"\'\s]+\.(?:jpg|jpeg|png)', html)))
        return pictures, food
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return [], []

with open('src/data.ts', 'r', encoding='utf-8') as f:
    data = f.read()

parts = data.split('  {\n    "id": ')
new_parts = [parts[0]]

for i in range(1, len(parts)):
    block = '  {\n    "id": ' + parts[i]
    
    target_cafe = None
    for c in cafes:
        if f'"name": "{c["name"]}"' in block:
            target_cafe = c
            break
            
    if target_cafe:
        pics, food = fetch_images(target_cafe["url"])
        if not pics and not food:
            new_parts.append(block)
            continue
            
        if len(pics) == 0: pics = food
        if len(food) == 0: food = pics
        
        main_img = pics[0]
        more_imgs = [pics[x % len(pics)] for x in range(1, 3)]
        food_imgs = [food[x % len(food)] for x in range(0, 3)]
        
        # We need to replace `image` and `moreImages`
        # 1. Main image:
        # Match `"image": "https://b.zmtcdn..."` that is NOT inside `featuredMenu`
        # We can just replace all `"image": "..."` but that ruins featuredMenu.
        
        # Let's use a sequential replacer for ALL `"image": "..."` in the block.
        # Typically: 
        # 1st "image" -> main_img
        # 2nd "image" -> featuredMenu[0]
        # 3rd "image" -> featuredMenu[1]
        # 4th "image" -> featuredMenu[2]
        
        images_to_inject = [main_img, food_imgs[0], food_imgs[1], food_imgs[2]]
        
        def image_replacer(match):
            image_replacer.counter += 1
            idx = image_replacer.counter
            if idx < len(images_to_inject):
                return f'"image": "{images_to_inject[idx]}"'
            else:
                return match.group(0) # In case there are more, leave them alone
                
        image_replacer.counter = -1
        
        block = re.sub(r'"image":\s*"https?://[^"]+"', image_replacer, block)
        
        # Now fix `moreImages`
        more_imgs_str = f'"{more_imgs[0]}",\n      "{more_imgs[1]}"'
        block = re.sub(r'"moreImages":\s*\[.*?\]', f'"moreImages": [\n      {more_imgs_str}\n    ]', block, flags=re.DOTALL)
        
        print(f"Updated {target_cafe['name']} correctly with food images for featured menu.")
        
    new_parts.append(block)
    # the split consumed the separator, but we added it back inside block.
    # So we just join with empty string because we added the separator to each block.

with open('src/data.ts', 'w', encoding='utf-8') as f:
    f.write(''.join(new_parts))
