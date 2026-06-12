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
    const cafeDir = path.join(distDir, 'cafe', slug);
    
    if (!fs.existsSync(cafeDir)) {
      fs.mkdirSync(cafeDir, { recursive: true });
    }

    const title = `${cafe.name} | Coffeetags`;
    const description = cafe.vibe;
    const imageUrl = cafe.image;

    const html = template
      .replace('<title>Coffeetags — Curated Coffee Spaces & Guides</title>', `<title>${title}</title>`)
      .replace('</head>', `  <meta name="description" content="${description}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${imageUrl}">
    <meta property="og:type" content="website">
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:title" content="${title}">
    <meta property="twitter:description" content="${description}">
    <meta property="twitter:image" content="${imageUrl}">
  </head>`);

    fs.writeFileSync(path.join(cafeDir, 'index.html'), html);
    console.log(`Pre-rendered /cafe/${slug}`);
  }

  // Create pre-rendered routes for journal articles
  for (const article of INITIAL_BLOG_ARTICLES) {
    const slug = generateSlug(article.title);
    const articleDir = path.join(distDir, 'journal', slug);
    
    if (!fs.existsSync(articleDir)) {
      fs.mkdirSync(articleDir, { recursive: true });
    }

    const title = `${article.title} | Journal | Coffeetags`;
    const description = article.excerpt;
    const imageUrl = article.image;

    const html = template
      .replace('<title>Coffeetags — Curated Coffee Spaces & Guides</title>', `<title>${title}</title>`)
      .replace('</head>', `  <meta name="description" content="${description}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${imageUrl}">
    <meta property="og:type" content="article">
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:title" content="${title}">
    <meta property="twitter:description" content="${description}">
    <meta property="twitter:image" content="${imageUrl}">
  </head>`);

    fs.writeFileSync(path.join(articleDir, 'index.html'), html);
    console.log(`Pre-rendered /journal/${slug}`);
  }

  console.log('✅ SSG Prerendering complete!');
}

prerender().catch(e => {
  console.error(e);
  process.exit(1);
});
