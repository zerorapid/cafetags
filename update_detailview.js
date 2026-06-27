const fs = require('fs');
let css = fs.readFileSync('src/components/DetailView.css', 'utf8');

// Replace hero-title
css = css.replace(
  /\.hero-title \{ font-size: 1.875rem; margin-bottom: var\(--space-2\); \}/,
  '.hero-title { font-size: 1.875rem; margin-bottom: var(--space-2); line-height: 1.15; letter-spacing: -0.02em; }'
);

// Replace section-title
css = css.replace(
  /\.section-title \{ font-size: 1.25rem; \}/,
  '.section-title { font-size: 1.375rem; line-height: 1.25; }'
);

// Replace safe-area bottom padding
css = css.replace(
  /calc\(160px \+ env\(safe-area-inset-bottom, 20px\)\)/g,
  'calc(120px + env(safe-area-inset-bottom, 20px))'
);

// We already made .info-card and .sidebar-card var(--space-5) in previous fix.

fs.writeFileSync('src/components/DetailView.css', css);
console.log('Updated DetailView.css mobile typography');
