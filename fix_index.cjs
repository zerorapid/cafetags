const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');

// 1. Remove the 19.2px upscaling on desktop to standardize rems
css = css.replace(/html \{\s*\/\* Scale overall font sizes.*?\*\/\s*font-size: 19\.2px;\s*\}/g, '');

// 2. Remove the mobile 16px reset (it's redundant now)
css = css.replace(/@media \(max-width: 768px\) \{\s*html \{\s*font-size: 16px;.*?\s*\}\s*\}/g, '');

// 3. Convert pixel font-sizes to standard rem values (assuming 16px base)
css = css.replace(/font-size:\s*11px;/g, 'font-size: 0.75rem;'); // text-xs is 12px, close enough
css = css.replace(/font-size:\s*30px;/g, 'font-size: 1.875rem;'); // text-3xl
css = css.replace(/font-size:\s*12px;/g, 'font-size: 0.75rem;'); // text-xs
css = css.replace(/font-size:\s*23px;/g, 'font-size: 1.5rem;'); // text-2xl is 24px
css = css.replace(/font-size:\s*48px;/g, 'font-size: 3rem;'); // text-5xl
css = css.replace(/font-size:\s*17px;/g, 'font-size: 1.125rem;'); // text-lg is 18px
css = css.replace(/font-size:\s*14px;/g, 'font-size: 0.875rem;'); // text-sm
css = css.replace(/font-size:\s*13px;/g, 'font-size: 0.875rem;'); // Use standard text-sm
css = css.replace(/font-size:\s*16px;/g, 'font-size: 1rem;'); // text-base
css = css.replace(/font-size:\s*10px;/g, 'font-size: 0.75rem;'); // Don't go below text-xs
css = css.replace(/font-size:\s*24px;/g, 'font-size: 1.5rem;'); // text-2xl
css = css.replace(/font-size:\s*18px;/g, 'font-size: 1.125rem;'); // text-lg
css = css.replace(/font-size:\s*32px\s*!important;/g, 'font-size: 2rem !important;'); // text-4xl

fs.writeFileSync('src/index.css', css);
console.log('Fixed index.css');
