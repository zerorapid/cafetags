/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CafeMenuItem {
  name: string;
  price: string;
  category: string;
  isSpecial?: boolean;
  image?: string;
}

export interface CafeReview {
  author: string;
  rating: number;
  text: string;
  date: string;
  role?: string;
}

export interface Cafe {
  id: number;
  name: string;
  area: string;
  tags: string[];
  image: string;
  vibe: string;
  mapLink: string;
  icon: string;
  logo?: string;
  signature: string;
  founded: string;
  curatorNote?: string;
  
  // New detailed lookbook characteristics
  address: string;
  phone: string;
  email: string;
  website: string;
  socialLink?: string;
  timings: string;
  aestheticType: string;
  crowd: string;
  discounts: string;
  facilities: string[];
  dineIn: boolean;
  takeaway: boolean;
  onlineOrder: boolean;
  selfDelivery: boolean;
  videoUrl?: string;
  celebrities: string[];
  bookingUrl: string;
  directionsTip?: string;
  featuredMenu: CafeMenuItem[];
  userReviews: CafeReview[];
  moreImages?: string[];
  menuImages?: string[];
  isFeaturedBanner?: boolean;
  bannerCatchyLine?: string;
  isNewLaunch?: boolean;
  newLaunchCatchyline?: string;
}

export interface PresetCover {
  url: string;
  label: string;
}

export interface BlogArticle {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
}

export interface UserFeedback {
  id: number;
  cafeId: number;
  cafeName: string;
  author: string;
  role?: string;
  rating: number;
  text: string;
  email: string;
  date: string;
  status: 'pending' | 'approved' | 'spam';
}

export interface SeoSettings {
  websiteTitle: string;
  websiteDescription: string;
  favicon: string;
  socialImage: string;
  googleAnalyticsId: string;
  googleSearchConsoleToken: string;
}


