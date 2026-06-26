import urllib.request
import re
import json

def get_images(query):
    url = 'https://html.duckduckgo.com/html/?q=' + urllib.parse.quote(query + ' images')
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        # Extract images from vqd if possible, or just search duckduckgo standard
        # duckduckgo html doesn't show images easily. Let's try bing or yahoo
        return []
    except:
        return []

# Better approach: just use an open image search API or scrape Bing
def get_bing_images(query):
    url = 'https://www.bing.com/images/search?q=' + urllib.parse.quote(query)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    matches = re.findall(r'murl&quot;:&quot;(.*?)&quot;', html)
    return list(dict.fromkeys(matches)) # unique

images = get_bing_images("Roast CCX Banjara Hills cafe interior")
print("Gallery Images:")
for img in images[:5]:
    print(img)

menu_images = get_bing_images("Roast CCX Banjara Hills menu zomato")
print("Menu Images:")
for img in menu_images[:5]:
    print(img)
