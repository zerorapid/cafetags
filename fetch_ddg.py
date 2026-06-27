import urllib.request
import re
import urllib.parse

query = urllib.parse.quote('cafe niloufer hitech city interior')
req = urllib.request.Request(
    f'https://html.duckduckgo.com/html/?q={query}',
    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
)
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    images = re.findall(r'//external-content\.duckduckgo\.com/iu/\?u=([^"&]+)', html)
    images = [urllib.parse.unquote(img) for img in images]
    print("Found images:", images[:5])
except Exception as e:
    print("Error:", e)
