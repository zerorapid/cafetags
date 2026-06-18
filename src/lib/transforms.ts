import { Cafe, BlogArticle, UserFeedback, SeoSettings } from '../types';

export function transformCafe(row: any): Cafe {
  return {
    id: row.id,
    name: row.name,
    area: row.area,
    tags: row.tags || [],
    image: row.image,
    vibe: row.vibe,
    mapLink: row.map_link,
    icon: row.icon,
    logo: row.logo,
    signature: row.signature,
    founded: row.founded,
    curatorNote: row.curator_note,
    address: row.address,
    phone: row.phone,
    email: row.email,
    website: row.website,
    socialLink: row.social_link,
    facebookUrl: row.facebook_url,
    twitterUrl: row.twitter_url,
    timings: row.timings,
    aestheticType: row.aesthetic_type,
    crowd: row.crowd,
    discounts: row.discounts,
    facilities: row.facilities || [],
    dineIn: row.dine_in,
    takeaway: row.takeaway,
    onlineOrder: row.online_order,
    selfDelivery: row.self_delivery,
    videoUrl: row.video_url,
    celebrities: row.celebrities || [],
    bookingUrl: row.booking_url,
    directionsTip: row.directions_tip,
    featuredMenu: row.featured_menu || [],
    userReviews: (row.user_reviews || []).map((r: any) => ({
      author: r.author,
      rating: r.rating,
      text: r.text,
      date: r.review_date,
      role: r.role,
    })),
    moreImages: row.more_images || [],
    menuImages: row.menu_images || [],
    vibeScores: row.vibe_scores || [],
    neighbourhoodGuide: row.neighbourhood_guide,
    isFeaturedBanner: row.is_featured_banner,
    bannerCatchyLine: row.banner_catchy_line,
    isNewLaunch: row.is_new_launch,
    newLaunchCatchyline: row.new_launch_catchyline,
    status: row.status,
  };
}

export function transformPost(row: any): BlogArticle {
  return {
    id: row.id,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    image: row.image,
    author: row.author,
    date: row.post_date,
    readTime: row.read_time,
    status: row.status,
    tags: row.tags || [],
    isFeatured: row.is_featured,
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
  };
}

export function transformFeedback(row: any): UserFeedback {
  return {
    id: row.id,
    cafeId: row.cafe_id,
    cafeName: row.cafe_name,
    author: row.author,
    role: row.role,
    rating: row.rating,
    text: row.text,
    email: row.email,
    date: row.feedback_date,
    status: row.status,
  };
}

export function transformSeoSettings(row: any): SeoSettings {
  return {
    websiteTitle: row.website_title,
    websiteDescription: row.website_description,
    favicon: row.favicon,
    socialImage: row.social_image,
    googleAnalyticsId: row.google_analytics_id,
    googleSearchConsoleToken: row.google_search_console_token,
  };
}
