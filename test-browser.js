import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

  await page.goto('http://localhost:3000/admin', { waitUntil: 'networkidle0' });
  
  // Try to find an "Edit" button and click it to trigger the CafeForm
  try {
    console.log("Looking for Edit buttons...");
    const buttons = await page.$$('button');
    for (const btn of buttons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text && text.toLowerCase().includes('edit')) {
        console.log("Clicking Edit button!");
        await btn.click();
        await new Promise(r => setTimeout(r, 2000));
        break;
      }
    }
  } catch (e) {
    console.error("Puppeteer Script Error:", e.message);
  }

  await browser.close();
  console.log("Done");
})();
