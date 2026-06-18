import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.migration' });

import { createClient } from '@supabase/supabase-js';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

// ---- Init Supabase (service role — bypasses RLS) ----
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// ---- Init Firebase Admin ----
const serviceAccount = JSON.parse(
  readFileSync('./firebase-service-account.json', 'utf-8')
);
initializeApp({
  credential: cert(serviceAccount)
});
const firestore = getFirestore();

// ---- Helpers ----
function generateSlug(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// ---- MAIN ----
async function seed() {
  console.log('\n🚀 Starting CafeTags migration to Supabase...\n');

  // Dynamically import INITIAL_CAFES and INITIAL_BLOG_ARTICLES from data.ts
  const { INITIAL_CAFES, INITIAL_BLOG_ARTICLES } = await import('../../src/data');

  // =============================================
  // STEP 1: INSERT CAFES
  // =============================================
  console.log(`📦 Inserting ${INITIAL_CAFES.length} cafes...`);
  for (const cafe of INITIAL_CAFES) {
    const slug = generateSlug(cafe.name);
    const { userReviews, featuredMenu, vibeScores, moreImages, menuImages, ...rest } = cafe as any;

    const { error } = await supabase.from('cafes').insert({
      id:                    cafe.id,
      slug,
      name:                  rest.name,
      area:                  rest.area,
      image:                 rest.image || null,
      icon:                  rest.icon || 'local_cafe',
      logo:                  rest.logo || null,
      video_url:             rest.videoUrl || null,
      vibe:                  rest.vibe || null,
      signature:             rest.signature || null,
      aesthetic_type:        rest.aestheticType || null,
      crowd:                 rest.crowd || null,
      curator_note:          rest.curatorNote || null,
      directions_tip:        rest.directionsTip || null,
      neighbourhood_guide:   rest.neighbourhoodGuide || null,
      address:               rest.address || null,
      phone:                 rest.phone || null,
      email:                 rest.email || null,
      website:               rest.website || null,
      social_link:           rest.socialLink || null,
      facebook_url:          rest.facebookUrl || null,
      twitter_url:           rest.twitterUrl || null,
      map_link:              rest.mapLink || null,
      booking_url:           rest.bookingUrl || null,
      founded:               rest.founded || null,
      timings:               rest.timings || null,
      discounts:             rest.discounts || null,
      dine_in:               rest.dineIn ?? true,
      takeaway:              rest.takeaway ?? true,
      online_order:          rest.onlineOrder ?? false,
      self_delivery:         rest.selfDelivery ?? false,
      status:                rest.status || 'open',
      tags:                  rest.tags || [],
      facilities:            rest.facilities || [],
      celebrities:           rest.celebrities || [],
      more_images:           moreImages || [],
      menu_images:           menuImages || [],
      vibe_scores:           vibeScores || [],
      featured_menu:         featuredMenu || [],
      is_featured_banner:    rest.isFeaturedBanner || false,
      banner_catchy_line:    rest.bannerCatchyLine || null,
      is_new_launch:         rest.isNewLaunch || false,
      new_launch_catchyline: rest.newLaunchCatchyline || null,
    });

    if (error) {
      console.error(`  ❌ Cafe failed: ${cafe.name} — ${error.message}`);
      continue;
    }

    console.log(`  ✅ Cafe: ${cafe.name}`);

    // Insert embedded userReviews for this cafe
    const reviews = userReviews || [];
    for (const r of reviews) {
      const { error: revErr } = await supabase.from('user_reviews').insert({
        cafe_id:     cafe.id,
        author:      r.author,
        rating:      r.rating,
        text:        r.text,
        role:        r.role || null,
        review_date: r.date || null,
      });
      if (revErr) console.error(`    ❌ Review failed for ${cafe.name}: ${revErr.message}`);
      else console.log(`    ✅ Review: ${r.author}`);
    }
  }

  // Reset BIGSERIAL sequence so next auto-insert doesn't conflict
  await supabase.rpc('reset_cafe_sequence');
  console.log('\n🔁 Cafe sequence reset\n');

  // =============================================
  // STEP 2: INSERT BLOG POSTS
  // =============================================
  console.log(`📝 Inserting ${INITIAL_BLOG_ARTICLES.length} blog posts...`);
  for (const article of INITIAL_BLOG_ARTICLES) {
    const { error } = await supabase.from('posts').insert({
      id:              article.id,
      title:           article.title,
      slug:            generateSlug(article.title),
      excerpt:         article.excerpt || null,
      content:         article.content,
      image:           article.image || null,
      author:          article.author || 'Rohan Shastry',
      read_time:       (article as any).readTime || null,
      status:          article.status || 'published',
      is_featured:     article.isFeatured || false,
      seo_title:       article.seoTitle || null,
      seo_description: article.seoDescription || null,
      tags:            article.tags || [],
      post_date:       article.date || null,
    });

    if (error) console.error(`  ❌ Post failed: ${article.title} — ${error.message}`);
    else console.log(`  ✅ Post: ${article.title}`);
  }

  // Reset posts sequence
  await supabase.rpc('reset_posts_sequence');
  console.log('\n🔁 Posts sequence reset\n');

  // =============================================
  // STEP 3: MIGRATE FEEDBACKS FROM FIRESTORE
  // =============================================
  console.log('💬 Migrating feedbacks from Firestore...');
  const feedbackSnap = await firestore.collection('feedbacks').get();

  if (feedbackSnap.empty) {
    console.log('  ℹ️  No feedbacks found in Firestore');
  } else {
    for (const doc of feedbackSnap.docs) {
      const f = doc.data();
      const { error } = await supabase.from('feedbacks').insert({
        cafe_id:       f.cafeId || null,
        cafe_name:     f.cafeName || null,
        author:        f.author,
        role:          f.role || null,
        rating:        f.rating,
        text:          f.text,
        email:         f.email,
        feedback_date: f.date || null,
        status:        f.status || 'pending',
      });
      if (error) console.error(`  ❌ Feedback failed: ${f.author} — ${error.message}`);
      else console.log(`  ✅ Feedback: ${f.author} for ${f.cafeName}`);
    }
  }

  // =============================================
  // STEP 4: MIGRATE SEO SETTINGS FROM FIRESTORE
  // =============================================
  console.log('\n⚙️  Migrating SEO settings from Firestore...');
  const seoDoc = await firestore.collection('settings').doc('seo').get();

  if (seoDoc.exists) {
    const s = seoDoc.data()!;
    const { error } = await supabase.from('settings').insert({
      key:                          'seo',
      website_title:                s.websiteTitle || null,
      website_description:          s.websiteDescription || null,
      favicon:                      s.favicon || null,
      social_image:                 s.socialImage || null,
      google_analytics_id:          s.googleAnalyticsId || null,
      google_search_console_token:  s.googleSearchConsoleToken || null,
    });
    if (error) console.error(`  ❌ SEO settings failed: ${error.message}`);
    else console.log('  ✅ SEO settings migrated');
  } else {
    console.log('  ℹ️  No SEO settings found in Firestore');
  }

  console.log('\n🎉 Migration complete!\n');
}

seed().catch((e) => {
  console.error('💥 Migration crashed:', e);
  process.exit(1);
});
