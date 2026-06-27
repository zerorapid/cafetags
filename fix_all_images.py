import json
import re

with open('src/data.ts', 'r', encoding='utf-8') as f:
    data = f.read()

# Replace all remaining unsplash images with placeholder Zomato images we just scraped, or just the same Zomato image from that cafe.
# Let's find each cafe block and ensure no unsplash images remain.
cafes = [
    "Sobremesa", "Guilt Trip", "Kaficko", "Karafa", "La Vie En Rose Cafe & Bistro", 
    "Switch Coffee", "Osaka", "Ukusa", "Kisscoff Cafe", "Roast CCX"
]

for cafe in cafes:
    search_str = f'"name": "{cafe}",'
    idx = data.find(search_str)
    if idx == -1:
        continue
    end_idx = data.find('},', idx)
    if end_idx == -1: end_idx = data.find('}', idx)
    
    block = data[idx:end_idx]
    
    # Extract the main zomato image for this cafe
    match = re.search(r'"image": "(https://b\.zmtcdn\.com[^"]+)"', block)
    if not match: continue
    z_img = match.group(1)
    
    # Replace all unsplash images in this block with that z_img
    block = re.sub(r'"image": "https://images\.unsplash\.com[^"]+"', f'"image": "{z_img}"', block)
    
    data = data[:idx] + block + data[end_idx:]

with open('src/data.ts', 'w', encoding='utf-8') as f:
    f.write(data)

print("Fixed remaining unsplash images.")
