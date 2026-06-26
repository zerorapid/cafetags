const fs = require('fs');

async function getPhotos() {
    const url = `https://www.zomato.com/hyderabad/sobremesa-bakehouse-cafe-kitchen-jubilee-hills/photos`;
    const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await response.text();
    const match = html.match(/window\.__PRELOADED_STATE__ = JSON\.parse\("(.*?)"\);/);
    const jsonStr = match[1].replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    const state = JSON.parse(jsonStr);
    const resId = Object.keys(state.pages.restaurant)[0];
    const resPhotos = state.pages.restaurant[resId].sections.SECTION_RES_PHOTOS;
    
    console.log(Object.keys(resPhotos));
    if (resPhotos.tabData) {
        console.log("tabData:", JSON.stringify(resPhotos.tabData, null, 2).slice(0, 500));
    }
}
getPhotos();
