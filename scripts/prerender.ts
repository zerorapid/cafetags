import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { generateSlug } from '../src/utils';
import { transformCafe, transformPost } from '../src/lib/transforms';
import { Cafe, BlogArticle } from '../src/types';
import { INITIAL_CAFES, INITIAL_BLOG_ARTICLES } from '../src/data';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const resolve = (p: string) => path.resolve(__dirname, '..', p);

const SITE_URL = process.env.VITE_SITE_URL || 'https://cafetags.com';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.VITE_SUPABASE_ANON_KEY || 'placeholder'
);

async function prerender() {
  const distDir = resolve('dist');
  const templatePath = path.join(distDir, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.error('dist/index.html not found. Please run vite build first.');
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, 'utf-8');
  const sitemapUrls: string[] = [];
  
  // Try fetching live data, fallback to static if Supabase URL is missing during local build testing
  let cafes: Cafe[] = INITIAL_CAFES;
  let blogs: BlogArticle[] = INITIAL_BLOG_ARTICLES;

  if (process.env.VITE_SUPABASE_URL) {
    const { data: cafesData } = await supabase.from('cafes').select('*');
    if (cafesData) cafes = cafesData.map(transformCafe);

    const { data: postsData } = await supabase.from('posts').select('*').eq('status', 'published');
    if (postsData) blogs = postsData.map(transformPost);
  }

  sitemapUrls.push(`${SITE_URL}/`);

  for (const cafe of cafes) {
    const slug = generateSlug(cafe.name);
    const cafeDir = path.join(distDir, 'cafe');
    const url = `${SITE_URL}/cafe/${slug}`;
    
    sitemapUrls.push(url);

    if (!fs.existsSync(cafeDir)) fs.mkdirSync(cafeDir, { recursive: true });

    const title = `${cafe.name} | CafeTags`;
    const description = cafe.vibe;
    const imageUrl = cafe.image;

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "CafeOrCoffeeShop",
      "name": cafe.name,
      "image": cafe.image,
      "description": cafe.vibe,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": cafe.area,
        "addressRegion": "Telangana",
        "addressCountry": "IN"
      }
    };

    const html = template
      .replace('<title>CafeTags | Discover Hyderabad’s Best Cafes & Exclusive Deals</title>', `<title>${title}</title>`)
      .replace('<meta name="description" content="The ultimate insider guide to Hyderabad\'s cafe culture. Discover hidden aesthetic spaces, specialty coffee spots, latest openings, and exclusive discounts.">', `<meta name="description" content="${description}">`)
      .replace('<meta property="og:title" content="CafeTags | Discover Hyderabad’s Best Cafes & Exclusive Deals">', `<meta property="og:title" content="${title}">`)
      .replace('<meta property="og:description" content="The ultimate insider guide to Hyderabad\'s cafe culture. Discover hidden aesthetic spaces, specialty coffee spots, latest openings, and exclusive discounts.">', `<meta property="og:description" content="${description}">`)
      .replace('<meta property="twitter:title" content="CafeTags | Discover Hyderabad’s Best Cafes & Exclusive Deals">', `<meta property="twitter:title" content="${title}">`)
      .replace('<meta property="twitter:description" content="The ultimate insider guide to Hyderabad\'s cafe culture. Discover hidden aesthetic spaces, specialty coffee spots, latest openings, and exclusive discounts.">', `<meta property="twitter:description" content="${description}">`)
      .replace('<meta property="og:image" content="https://i.pinimg.com/736x/e2/43/88/e24388c075816fb20b13b109ae807b92.jpg">', `<meta property="og:image" content="${imageUrl}">`)
      .replace('<meta property="twitter:image" content="https://i.pinimg.com/736x/e2/43/88/e24388c075816fb20b13b109ae807b92.jpg">', `<meta property="twitter:image" content="${imageUrl}">`)
      .replace('</head>', `  <link rel="canonical" href="${url}" />
    <meta property="og:type" content="website">
    <meta property="og:url" content="${url}">
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  </head>`)
      .replace('<div id="root"></div>', `<div id="root">
        <main style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;">
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

  for (const article of blogs) {
    const slug = generateSlug(article.title);
    const articleDir = path.join(distDir, 'journal');
    const url = `${SITE_URL}/journal/${slug}`;

    sitemapUrls.push(url);
    
    if (!fs.existsSync(articleDir)) fs.mkdirSync(articleDir, { recursive: true });

    const title = `${article.title} | Journal | CafeTags`;
    const description = article.excerpt;
    const imageUrl = article.image;

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": article.title,
      "image": article.image,
      "author": {
        "@type": "Person",
        "name": article.author
      },
      "datePublished": new Date(article.date).toISOString(),
      "description": article.excerpt
    };

    const html = template
      .replace('<title>CafeTags | Discover Hyderabad’s Best Cafes & Exclusive Deals</title>', `<title>${title}</title>`)
      .replace('<meta name="description" content="The ultimate insider guide to Hyderabad\'s cafe culture. Discover hidden aesthetic spaces, specialty coffee spots, latest openings, and exclusive discounts.">', `<meta name="description" content="${description}">`)
      .replace('<meta property="og:title" content="CafeTags | Discover Hyderabad’s Best Cafes & Exclusive Deals">', `<meta property="og:title" content="${title}">`)
      .replace('<meta property="og:description" content="The ultimate insider guide to Hyderabad\'s cafe culture. Discover hidden aesthetic spaces, specialty coffee spots, latest openings, and exclusive discounts.">', `<meta property="og:description" content="${description}">`)
      .replace('<meta property="twitter:title" content="CafeTags | Discover Hyderabad’s Best Cafes & Exclusive Deals">', `<meta property="twitter:title" content="${title}">`)
      .replace('<meta property="twitter:description" content="The ultimate insider guide to Hyderabad\'s cafe culture. Discover hidden aesthetic spaces, specialty coffee spots, latest openings, and exclusive discounts.">', `<meta property="twitter:description" content="${description}">`)
      .replace('<meta property="og:image" content="https://i.pinimg.com/736x/e2/43/88/e24388c075816fb20b13b109ae807b92.jpg">', `<meta property="og:image" content="${imageUrl}">`)
      .replace('<meta property="twitter:image" content="https://i.pinimg.com/736x/e2/43/88/e24388c075816fb20b13b109ae807b92.jpg">', `<meta property="twitter:image" content="${imageUrl}">`)
      .replace('</head>', `  <link rel="canonical" href="${url}" />
    <meta property="og:type" content="article">
    <meta property="og:url" content="${url}">
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  </head>`)
      .replace('<div id="root"></div>', `<div id="root">
        <article style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;">
          <h1>${article.title}</h1>
          <p><strong>By ${article.author}</strong> &bull; ${article.date}</p>
          <img src="${article.image}" alt="${article.title}" style="max-width: 100%; border-radius: 8px;" />
          <p><em>${article.excerpt}</em></p>
          <div>${article.content}</div>
        </article>
      </div>`);

    fs.writeFileSync(path.join(articleDir, `${slug}.html`), html);
    console.log(`Pre-rendered /journal/${slug}.html`);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(url => `  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${url === `${SITE_URL}/` ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
  console.log('✅ Generated sitemap.xml');

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml`;

  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt);
  console.log('✅ Generated robots.txt');

  const homepageHtml = template
    .replace('</head>', `  <link rel="canonical" href="${SITE_URL}/" />
  </head>`);
  fs.writeFileSync(path.join(distDir, 'index.html'), homepageHtml);
  console.log('Pre-rendered Homepage index.html');

  ['journal', 'admin', 'cafe'].forEach(dir => {
    const dirPath = path.join(distDir, dir);
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
    fs.copyFileSync(path.join(distDir, 'index.html'), path.join(dirPath, 'index.html'));
    console.log(`Pre-rendered base SPA route /${dir}`);
  });

  console.log('✅ SSG Prerendering complete!');
}

prerender().catch(console.error);
