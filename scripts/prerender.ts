import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_CAFES, INITIAL_BLOG_ARTICLES } from '../src/data';
import { generateSlug } from '../src/utils';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resolve = (p: string) => path.resolve(__dirname, '..', p);

const SITE_URL = process.env.VITE_SITE_URL || 'https://cafetags.com';

async function prerender() {
  const distDir = resolve('dist');
  const templatePath = path.join(distDir, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.error('dist/index.html not found. Please run vite build first.');
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, 'utf-8');
  const sitemapUrls: string[] = [];

  // Add Homepage to sitemap
  sitemapUrls.push(`${SITE_URL}/`);

  // Create pre-rendered routes for cafes
  for (const cafe of INITIAL_CAFES) {
    const slug = generateSlug(cafe.name);
    const cafeDir = path.join(distDir, 'cafe');
    const url = `${SITE_URL}/cafe/${slug}`;
    
    sitemapUrls.push(url);

    if (!fs.existsSync(cafeDir)) {
      fs.mkdirSync(cafeDir, { recursive: true });
    }

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
      .replace('<title>CafeTags — Curated Coffee Spaces & Guides</title>', `<title>${title}</title>`)
      .replace('<meta name="description" content="Discover the most aesthetic, architecture-forward, and work-friendly curated coffee spaces in Hyderabad.">', `<meta name="description" content="${description}">`)
      .replace('<meta property="og:title" content="CafeTags — Curated Coffee Spaces & Guides">', `<meta property="og:title" content="${title}">`)
      .replace('<meta property="og:description" content="Discover the most aesthetic, architecture-forward, and work-friendly curated coffee spaces in Hyderabad.">', `<meta property="og:description" content="${description}">`)
      .replace('<meta property="twitter:title" content="CafeTags — Curated Coffee Spaces & Guides">', `<meta property="twitter:title" content="${title}">`)
      .replace('<meta property="twitter:description" content="Discover the most aesthetic, architecture-forward, and work-friendly curated coffee spaces in Hyderabad.">', `<meta property="twitter:description" content="${description}">`)
      .replace('<meta property="og:image" content="https://i.pinimg.com/736x/e2/43/88/e24388c075816fb20b13b109ae807b92.jpg">', `<meta property="og:image" content="${imageUrl}">`)
      .replace('<meta property="twitter:image" content="https://i.pinimg.com/736x/e2/43/88/e24388c075816fb20b13b109ae807b92.jpg">', `<meta property="twitter:image" content="${imageUrl}">`)
      .replace('</head>', `  <link rel="canonical" href="${url}" />
    <meta property="og:type" content="website">
    <meta property="og:url" content="${url}">
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
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
    const url = `${SITE_URL}/journal/${slug}`;

    sitemapUrls.push(url);
    
    if (!fs.existsSync(articleDir)) {
      fs.mkdirSync(articleDir, { recursive: true });
    }

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
      .replace('<title>CafeTags — Curated Coffee Spaces & Guides</title>', `<title>${title}</title>`)
      .replace('<meta name="description" content="Discover the most aesthetic, architecture-forward, and work-friendly curated coffee spaces in Hyderabad.">', `<meta name="description" content="${description}">`)
      .replace('<meta property="og:title" content="CafeTags — Curated Coffee Spaces & Guides">', `<meta property="og:title" content="${title}">`)
      .replace('<meta property="og:description" content="Discover the most aesthetic, architecture-forward, and work-friendly curated coffee spaces in Hyderabad.">', `<meta property="og:description" content="${description}">`)
      .replace('<meta property="twitter:title" content="CafeTags — Curated Coffee Spaces & Guides">', `<meta property="twitter:title" content="${title}">`)
      .replace('<meta property="twitter:description" content="Discover the most aesthetic, architecture-forward, and work-friendly curated coffee spaces in Hyderabad.">', `<meta property="twitter:description" content="${description}">`)
      .replace('<meta property="og:image" content="https://i.pinimg.com/736x/e2/43/88/e24388c075816fb20b13b109ae807b92.jpg">', `<meta property="og:image" content="${imageUrl}">`)
      .replace('<meta property="twitter:image" content="https://i.pinimg.com/736x/e2/43/88/e24388c075816fb20b13b109ae807b92.jpg">', `<meta property="twitter:image" content="${imageUrl}">`)
      .replace('</head>', `  <link rel="canonical" href="${url}" />
    <meta property="og:type" content="article">
    <meta property="og:url" content="${url}">
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
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
  const jsonLdHome = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CafeTags",
    "url": SITE_URL,
    "description": "Curated Coffee Spaces & Guides in Hyderabad"
  };

  const homepageHtml = template
    .replace('<title>CafeTags — Curated Coffee Spaces & Guides</title>', `<title>CafeTags — Curated Coffee Spaces & Guides</title>
    <link rel="canonical" href="${SITE_URL}/" />
    <script type="application/ld+json">${JSON.stringify(jsonLdHome)}</script>`)
    .replace('<div id="root"></div>', `<div id="root">
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

  // --- GENERATE SITEMAP.XML ---
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(url => `  <url>\n    <loc>${url}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${url === SITE_URL + '/' ? '1.0' : '0.8'}</priority>\n  </url>`).join('\n')}
</urlset>`;
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml);
  console.log('✅ Generated sitemap.xml');

  // --- GENERATE ROBOTS.TXT ---
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt);
  console.log('✅ Generated robots.txt');

  console.log('✅ SSG Prerendering complete!');
}

prerender().catch(e => {
  console.error(e);
  process.exit(1);
});
