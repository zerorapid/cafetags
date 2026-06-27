const fs = require('fs');
let css = fs.readFileSync('src/components/DetailView.css', 'utf8');

// Ensure info-card and sidebar-card have identical padding on mobile
// First, find the mobile media query
css = css.replace(/\.sidebar-card \{ padding: var\(--space-5\); \}/g, '.sidebar-card, .info-card { padding: var(--space-5); }');

fs.writeFileSync('src/components/DetailView.css', css);
console.log('Fixed DetailView padding');
