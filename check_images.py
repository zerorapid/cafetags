import json

with open('src/data.ts', 'r') as f:
    data = f.read()

# basic parsing logic to just get a glimpse of images
lines = data.split('\n')
for line in lines:
    if '"name": "' in line or '"image": "' in line or '"moreImages"' in line:
        pass
        
