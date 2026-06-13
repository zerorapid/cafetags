import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_CAFES, INITIAL_BLOG_ARTICLES } from '../src/data';
import { generateSlug } from '../src/utils';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resolve = (p: string) => path.resolve(__dirname, '..', p);

async function prerender() {
  const distDir = resolve('dist');
  const templatePath = path.join(distDir, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.error('dist/index.html not found. Please run vite build first.');
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, 'utf-8');

  // Create pre-rendered routes for cafes
  for (const cafe of INITIAL_CAFES) {
    const slug = generateSlug(cafe.name);
    const cafeDir = path.join(distDir, 'cafe');
    
    if (!fs.existsSync(cafeDir)) {
      fs.mkdirSync(cafeDir, { recursive: true });
    }

    const title = `${cafe.name} | CafeTags`;
    const description = cafe.vibe;
    const imageUrl = cafe.image;

    const html = template
      .replace('<title>CafeTags — Curated Coffee Spaces & Guides</title>', `<title>${title}</title>`)
      .replace('</head>', `  <meta name="description" content="${description}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${imageUrl}">
    <meta property="og:type" content="website">
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:title" content="${title}">
    <meta property="twitter:description" content="${description}">
    <meta property="twitter:image" content="${imageUrl}">
  </head>`)
      .replace('<div id="root"></div>', `<div id="root">
        <main style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: system-ui, sans-serif;">
          <h1>${cafe.name}</h1>
          <p><strong>Location:</strong> ${cafe.address || cafe.area}</p>
          <img src="${cafe.image}" alt="${cafe.name}" style="max-width: 100%; border-radius: 8px;" />
          <h2>Curator's Take</h2>
          <p>${cafe.curatorNote || cafe.vibe}</p>
          <h2>Tags</h2>
          <ul>${cafe.tags.map(t => `<li>${t}</li>`).join('')}</ul>
          ${cafe.neighbourhoodGuide ? `<h2>Neighbourhood Guide</h2><p>${cafe.neighbourhoodGuide}</p>` : ''}
        </main>
      </div>`);

    fs.writeFileSync(path.join(cafeDir, `${slug}.html`), html);
    console.log(`Pre-rendered /cafe/${slug}.html`);
  }

  // Create pre-rendered routes for journal articles
  for (const article of INITIAL_BLOG_ARTICLES) {
    const slug = generateSlug(article.title);
    const articleDir = path.join(distDir, 'journal');
    
    if (!fs.existsSync(articleDir)) {
      fs.mkdirSync(articleDir, { recursive: true });
    }

    const title = `${article.title} | Journal | CafeTags`;
    const description = article.excerpt;
    const imageUrl = article.image;

    const html = template
      .replace('<title>CafeTags — Curated Coffee Spaces & Guides</title>', `<title>${title}</title>`)
      .replace('</head>', `  <meta name="description" content="${description}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${imageUrl}">
    <meta property="og:type" content="article">
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:title" content="${title}">
    <meta property="twitter:description" content="${description}">
    <meta property="twitter:image" content="${imageUrl}">
  </head>`)
      .replace('<div id="root"></div>', `<div id="root">
        <article style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: system-ui, sans-serif;">
          <h1>${article.title}</h1>
          <p><strong>By ${article.author}</strong> &bull; ${article.date}</p>
          <img src="${article.image}" alt="${article.title}" style="max-width: 100%; border-radius: 8px;" />
          <p><em>${article.excerpt}</em></p>
          <div>
            ${article.content}
          </div>
        </article>
      </div>`);

    fs.writeFileSync(path.join(articleDir, `${slug}.html`), html);
    console.log(`Pre-rendered /journal/${slug}.html`);
  }

  // Pre-render base SPA routes to prevent Vercel 404 directory listing errors
  const baseRoutes = ['journal', 'admin', 'cafe'];
  for (const route of baseRoutes) {
    const routeDir = path.join(distDir, route);
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }
    // Only write if we haven't already written an index.html here manually
    if (!fs.existsSync(path.join(routeDir, 'index.html'))) {
      fs.writeFileSync(path.join(routeDir, 'index.html'), template);
      console.log(`Pre-rendered base SPA route /${route}`);
    }
  }

  // Pre-render Homepage with a crawler-friendly skeleton
  const homepageHtml = template.replace('<div id="root"></div>', `<div id="root">
    <main style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: system-ui, sans-serif;">
      <h1>CafeTags — Curated Coffee Spaces & Guides</h1>
      <p>Candidly curated architecture & study benchmarks for Hyderabad's aesthetic coffee houses, slow dripping filter bars, and vintage work niches.</p>
      <h2>Curated Cafes</h2>
      <ul>
        ${INITIAL_CAFES.map(c => `<li><a href="/cafe/${generateSlug(c.name)}">${c.name} - ${c.area}</a></li>`).join('\n')}
      </ul>
      <h2>Journal & Guides</h2>
      <ul>
        ${INITIAL_BLOG_ARTICLES.map(a => `<li><a href="/journal/${generateSlug(a.title)}">${a.title}</a></li>`).join('\n')}
      </ul>
    </main>
  </div>`);
  fs.writeFileSync(templatePath, homepageHtml);
  console.log('Pre-rendered Homepage index.html');

  console.log('✅ SSG Prerendering complete!');
}

prerender().catch(e => {
  console.error(e);
  process.exit(1);
});
