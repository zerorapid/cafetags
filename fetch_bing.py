import urllib.request
import re
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

req = urllib.request.Request(
    'https://www.bing.com/images/search?q=cafe+niloufer+hitech+city+interior',
    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
)
try:
    html = urllib.request.urlopen(req, context=ctx).read().decode('utf-8')
    images = re.findall(r'murl&quot;:&quot;(https://[^&"]+\.jpg)&quot;', html)
    print("Found images:")
    for img in list(set(images))[:5]:
        print(img)
except Exception as e:
    print("Error:", e)
