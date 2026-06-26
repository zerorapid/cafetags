import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('https://www.district.in/dining/hyderabad/la-vie-en-rose-cafe-and-bistro-sainikpuri', { waitUntil: 'networkidle2' });
  
  const html = await page.content();
  
  const pictureRegex = /https:\/\/b\.zmtcdn\.com\/data\/pictures\/[^"'\s]+/g;
  const menuRegex = /https:\/\/b\.zmtcdn\.com\/data\/menus\/[^"'\s]+/g;
  
  const pictures = html.match(pictureRegex) || [];
  const menus = html.match(menuRegex) || [];
  
  const decodedPictures = [...new Set(pictures.map(url => url.replace(/\\u002F/g, '/')))];
  const decodedMenus = [...new Set(menus.map(url => url.replace(/\\u002F/g, '/')))];

  console.log("Found Pictures:", decodedPictures);
  console.log("Found Menus:", decodedMenus);
  
  await browser.close();
})();
