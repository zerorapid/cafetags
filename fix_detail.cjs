const fs = require('fs');
let css = fs.readFileSync('src/components/DetailView.css', 'utf8');

// Replace custom decimal rem sizes with standard ones
css = css.replace(/font-size:\s*0\.85rem;/g, 'font-size: 0.875rem;'); // text-sm
css = css.replace(/font-size:\s*0\.95rem;/g, 'font-size: 0.875rem;'); // text-sm
css = css.replace(/font-size:\s*1\.15rem;/g, 'font-size: 1.125rem;'); // text-lg
css = css.replace(/font-size:\s*1\.1rem;/g, 'font-size: 1rem;'); // text-base
css = css.replace(/font-size:\s*1\.05rem;/g, 'font-size: 1rem;'); // text-base
css = css.replace(/font-size:\s*0\.8rem;/g, 'font-size: 0.75rem;'); // text-xs
css = css.replace(/font-size:\s*0\.9rem;/g, 'font-size: 0.875rem;'); // text-sm
css = css.replace(/font-size:\s*1\.3rem;/g, 'font-size: 1.25rem;'); // text-xl
css = css.replace(/font-size:\s*1\.25rem;/g, 'font-size: 1.25rem;'); // text-xl

// Standardize hero title in DetailView.css (desktop)
css = css.replace(/font-size:\s*clamp\(2\.5rem, 7vw, 4\.5rem\);/g, 'font-size: 3rem;'); // text-5xl on desktop

// Standardize hero title in DetailView.css (mobile)
css = css.replace(/font-size:\s*clamp\(1\.75rem, 6vw, 2\.25rem\);/g, 'font-size: 1.875rem;'); // text-3xl on mobile

fs.writeFileSync('src/components/DetailView.css', css);
console.log('Fixed DetailView.css');
