import https from 'https';

const cafes = ['La Sabroso Hyderabad', 'Ukusa Hyderabad', 'Kisscoff Cafe Hyderabad', 'Manam Chocolate Atelier Hyderabad', 'Churrolto Hyderabad'];

function search(query) {
  return new Promise((resolve, reject) => {
    https.get(`https://html.duckduckgo.com/html/?q=site:zomato.com/hyderabad+${encodeURIComponent(query)}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const match = data.match(/uddg=([^&]+)/);
        if (match) {
            resolve(decodeURIComponent(match[1]));
        } else {
            resolve('Not found');
        }
      });
    }).on('error', reject);
  });
}

(async () => {
  for (const cafe of cafes) {
    console.log(`${cafe}: ${await search(cafe)}`);
  }
})();
