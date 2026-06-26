const url = "https://www.district.in/dining/hyderabad/altr-ego-banjara-hills";

async function run() {
  const apiUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
  const response = await fetch(apiUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  
  const data = await response.json();
  const htmlContent = data.contents;
  
  const cdnRegex = /https:\/\/b\.zmtcdn\.com\/[^\s"'\\]+/g;
  const rawUrls = htmlContent.match(cdnRegex) || [];
  
  let cleanUrls = [...new Set(rawUrls)].map(u => u.replace(/\\u0026/g, '&').replace(/\\/g, ''));
  cleanUrls = cleanUrls.filter(u => u.includes('data/pictures'));
  cleanUrls = cleanUrls.map(u => {
     const basePath = u.split('?')[0];
     return `${basePath}?fit=around|1000:1000`;
  });

  console.log(JSON.stringify(cleanUrls.slice(0, 10), null, 2));
}

run();
