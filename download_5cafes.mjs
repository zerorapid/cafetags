import https from 'https';
import fs from 'fs';
import path from 'path';

const IMAGES_DIR = './public/images';

// We strip crop parameters for menus (so we get full resolution)
// For galleries and food, we keep the crop if present.

const toDownload = {
  // KISSCOFF
  'kisscoff_1.webp': 'https://b.zmtcdn.com/data/pictures/1/21873341/8214d047b620baa32d290394fd3d0338.png?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp',
  'kisscoff_2.webp': 'https://b.zmtcdn.com/data/pictures/1/21873341/3644c33c213281a7f9d1665885287149.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp',
  'kisscoff_3.webp': 'https://b.zmtcdn.com/data/pictures/1/21873341/b7bcac69701c4a840cea24cba982b56c.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp',
  'kisscoff_4.webp': 'https://b.zmtcdn.com/data/pictures/1/21873341/5be44c1ee57c89540e424b158ec6fddb.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp',
  'kisscoff_food1.webp': 'https://b.zmtcdn.com/data/pictures/1/21873341/d3bd205a05546067e9489ade7c222375.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp',
  'kisscoff_food2.webp': 'https://b.zmtcdn.com/data/reviews_photos/b3a/e69138fd61f4b1a17f62f4a359538b3a_1780825154.jpeg?crop=100%3A100%3B%2A%2C%2A&fit=around%7C100%3A100&output-format=webp',
  'kisscoff_food3.webp': 'https://b.zmtcdn.com/data/reviews_photos/e82/6301b3d6d245e0a70b03beb5914e4e82_1780825155.jpeg?crop=100%3A100%3B%2A%2C%2A&fit=around%7C100%3A100&output-format=webp',

  // MANAM
  'manam_1.webp': 'https://b.zmtcdn.com/data/pictures/5/21243905/cdfc402ba0bd3b3e75bd38a0d77e68d7.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp',
  'manam_2.webp': 'https://b.zmtcdn.com/data/pictures/5/21243905/fd70f8aef85207b3a1f00d3ee4f644b6.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp',
  'manam_3.webp': 'https://b.zmtcdn.com/data/pictures/5/21243905/6e1448e3249b702326f2ed4a2a003d85.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp',
  'manam_4.webp': 'https://b.zmtcdn.com/data/pictures/5/21243905/4fde0e6130e1563480bba0c2b814fd5f.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp',
  'manam_food1.webp': 'https://b.zmtcdn.com/data/pictures/5/21243905/6e7a0c1cb41a88baacc98f464c0505c7_featured_v3.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp',
  'manam_food2.webp': 'https://b.zmtcdn.com/data/reviews_photos/452/b37d2d9afc73115f11bd2098459a6452_1780986612.jpeg?crop=100%3A100%3B%2A%2C%2A&fit=around%7C100%3A100&output-format=webp',
  'manam_food3.webp': 'https://b.zmtcdn.com/data/reviews_photos/b3c/1baed352c25f62229fd6dd396f006b3c_1780986611.jpeg?crop=100%3A100%3B%2A%2C%2A&fit=around%7C100%3A100&output-format=webp',

  // CHURROLTO
  'churrolto_1.webp': 'https://b.zmtcdn.com/data/pictures/6/20564526/352e698fb9ee6ea199f532bc0068fefb.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp',
  'churrolto_2.webp': 'https://b.zmtcdn.com/data/pictures/6/20564526/735fce0bbed489cafb7d829c55b4058a.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp',
  'churrolto_3.webp': 'https://b.zmtcdn.com/data/pictures/6/20564526/5f30c3cb5e45787cc906dfa046f755f7.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp',
  'churrolto_4.webp': 'https://b.zmtcdn.com/data/pictures/chains/1/18307251/08f9f0cc0624b821a74cd7ff23609909.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp',
  'churrolto_food1.webp': 'https://b.zmtcdn.com/data/pictures/6/20564526/55883635e6db9d5485055688928d187f_featured_v3.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp',
  'churrolto_menu1.jpg': 'https://b.zmtcdn.com/data/menus/251/18307251/2a0d3ed6a25b779584cf791021874b2a.jpg',
  'churrolto_menu2.png': 'https://b.zmtcdn.com/data/menus/251/18307251/d60e2a36365c49d22928505bacbaf710.png',
  'churrolto_menu3.jpg': 'https://b.zmtcdn.com/data/menus/251/18307251/2e266cbcbbe41bec329fb5ef6c7a2cf4.jpg',

  // LASTHOUSE
  'lasthouse_1.webp': 'https://b.zmtcdn.com/data/pictures/chains/1/20926961/39999eb8702c1f3f226defa2ab3ef6c5.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp',
  'lasthouse_2.webp': 'https://b.zmtcdn.com/data/pictures/chains/1/20926961/083bd49be75a520db83555a3c10b49ff.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp',
  'lasthouse_3.webp': 'https://b.zmtcdn.com/data/pictures/chains/1/20926961/da13bae86fb86f79d22f8a144fa7d1c1.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp',
  'lasthouse_4.webp': 'https://b.zmtcdn.com/data/pictures/1/20926961/91a2ef3e6e684a96b31010f37fc11183.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp',
  'lasthouse_food1.webp': 'https://b.zmtcdn.com/data/pictures/1/20926961/185a011207962d80e2dd857328570e25_featured_v3.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp',
  'lasthouse_food2.webp': 'https://b.zmtcdn.com/data/reviews_photos/84f/d15791ef2956152a8d4a0f277c01284f_1780245715.jpeg?crop=100%3A100%3B%2A%2C%2A&fit=around%7C100%3A100&output-format=webp',
  'lasthouse_menu1.jpg': 'https://b.zmtcdn.com/data/menus/961/20926961/747c127b834104d91a2df4de29a25a78.jpg',

  // HEARTCUP
  'heartcup_1.webp': 'https://b.zmtcdn.com/data/pictures/chains/7/92577/2a68cf0e362ed85f20408802aac0a41f.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp',
  'heartcup_2.webp': 'https://b.zmtcdn.com/data/pictures/6/19533956/9cd305bf59ea3d9ef7db10a6923279dd.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp',
  'heartcup_3.webp': 'https://b.zmtcdn.com/data/pictures/chains/7/92577/213294d56b02a09e4230c90d1dfce285.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp',
  'heartcup_4.webp': 'https://b.zmtcdn.com/data/pictures/6/19533956/e_7dd10f5c216463f266c188362b86175d.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp',
  'heartcup_food1.webp': 'https://b.zmtcdn.com/data/pictures/6/19533956/e261b397a5a79a844cad9a6c90fb07b3_featured_v3.jpg?crop=700%3A400%3B%2A%2C%2A&fit=around%7C700%3A400&output-format=webp',
  'heartcup_menu1.jpg': 'https://b.zmtcdn.com/data/menus/956/19533956/53f632ea984f188abe1953ac4b9e8312.jpg',
  'heartcup_menu2.jpg': 'https://b.zmtcdn.com/data/menus/956/19533956/3743ed5381dc5d5c83a22f5ef2b265c9.jpg',
  'heartcup_menu3.jpg': 'https://b.zmtcdn.com/data/menus/956/19533956/3406a8a9ac2372009ba17743604a7099.jpg',
};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const options = { headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://www.zomato.com/' } };
    https.get(url, options, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close(); try { fs.unlinkSync(dest); } catch(e) {}
        download(res.headers.location, dest).then(resolve).catch(reject); return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(dest); });
    }).on('error', err => { try { fs.unlinkSync(dest); } catch(e) {} reject(err); });
  });
}

for (const [filename, url] of Object.entries(toDownload)) {
  const dest = path.join(IMAGES_DIR, filename);
  try {
    await download(url, dest);
    const size = fs.statSync(dest).size;
    console.log(`OK ${filename} (${Math.round(size/1024)}KB)`);
  } catch(e) { console.log(`FAIL ${filename}: ${e.message}`); }
}
console.log('Done!');
