/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Cafe, BlogArticle, UserFeedback, SeoSettings } from './types';
import { INITIAL_CAFES, INITIAL_BLOG_ARTICLES } from './data';
import { generateSlug } from './utils';

// --- CURATED COMPONENTS ---
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { NewlyLaunchedSection } from './components/NewlyLaunchedSection';
import { FilterSection } from './components/FilterSection';
import { CafeCard } from './components/CafeCard';
import { DetailView } from './components/DetailView';
import { Footer } from './components/Footer';
import { MaterialIcon } from './components/MaterialIcon';
import { BlogSection } from './components/BlogSection';
import { AdminSection } from './components/AdminSection';
import { LoginScreen } from './components/LoginScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { Routes, Route, Navigate, useNavigate, useParams, useLocation } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { transformCafe, transformPost, transformFeedback, transformSeoSettings } from './lib/transforms';

import { db, auth } from './firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';
function CafeDetailWrapper({ cafes, onSubmitFeedback, isAdmin }: any) {
  const { id } = useParams();
  const navigate = useNavigate();
  const cafe = cafes.find((c: Cafe) => generateSlug(c.name) === id || c.id.toString() === id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (cafes.length === 0) {
    return <div className="min-h-[80vh] flex items-center justify-center text-stone-500 font-medium">Loading space details...</div>;
  }

  if (!cafe) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <p className="text-2xl font-serif text-stone-900 mb-4">Space not found.</p>
        <button onClick={() => navigate('/')} className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 transition-colors text-white rounded-md text-xs font-bold uppercase tracking-widest shadow-sm cursor-pointer">Return Home</button>
      </div>
    );
  }

  return (
    <DetailView
      cafe={cafe}
      onBack={() => navigate('/')}
      allCafes={cafes}
      onSelectCafe={(c: Cafe) => navigate(`/cafe/${generateSlug(c.name)}`)}
      onSubmitFeedback={onSubmitFeedback}
      isAdmin={isAdmin}
    />
  );
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsAppLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // --- Track Real Auth State ---
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  // --- STATE LAYER ---
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [blogs, setBlogs] = useState<BlogArticle[]>([]);
  const [feedbacks, setFeedbacks] = useState<UserFeedback[]>([]);
  const [seoSettings, setSeoSettings] = useState<SeoSettings>({
    websiteTitle: "CafeTags Hyderabad — Curated Specialty Coffee & Heritage Chai Lookbook",
    websiteDescription: "Candidly curated architecture & study benchmarks for Hyderabad's aesthetic coffee houses, slow dripping filter bars, and vintage work niches.",
    favicon: "/favicon.svg",
    socialImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop",
    googleAnalyticsId: "",
    googleSearchConsoleToken: ""
  });

  // Fetch real-time data from Supabase
  useEffect(() => {
    // If Supabase isn't configured, fallback to INITIAL_CAFES
    if (!import.meta.env.VITE_SUPABASE_URL) {
      setCafes(INITIAL_CAFES);
      setBlogs(INITIAL_BLOG_ARTICLES);
      return;
    }

    async function fetchAll() {
      const { data: cafesData } = await supabase
        .from('cafes').select('*, user_reviews(*)');
      setCafes(cafesData?.length ? cafesData.map(transformCafe) : INITIAL_CAFES);

      const { data: postsData } = await supabase.from('posts').select('*');
      setBlogs(postsData?.length ? postsData.map(transformPost) : INITIAL_BLOG_ARTICLES);

      const { data: feedbacksData } = await supabase.from('feedbacks').select('*');
      setFeedbacks((feedbacksData || []).map(transformFeedback));

      const { data: seoData } = await supabase
        .from('settings').select('*').eq('key', 'seo').single();
      if (seoData) setSeoSettings(prev => ({ ...prev, ...transformSeoSettings(seoData) }));
    }
    fetchAll();
  }, []);

  // Apply SEO, Favicon and Tracker elements dynamically
  useEffect(() => {
    localStorage.setItem('hyd_cafe_seo_settings', JSON.stringify(seoSettings));
    
    // 1. Dynamic Title
    if (seoSettings.websiteTitle) {
      document.title = seoSettings.websiteTitle;
    }

    // 2. Dynamic Description Meta tag
    let descMeta = document.querySelector("meta[name='description']");
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.setAttribute('name', 'description');
      document.head.appendChild(descMeta);
    }
    descMeta.setAttribute('content', seoSettings.websiteDescription || '');

    // 3. Dynamic Favicon Link tag
    let faviconLink = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!faviconLink) {
      faviconLink = document.createElement('link');
      faviconLink.rel = 'icon';
      document.head.appendChild(faviconLink);
    }
    faviconLink.href = seoSettings.favicon || '/favicon.svg';

    // 4. Dynamic Social Graph / Open Graph Meta Tags
    const ogTags = [
      { property: 'og:title', content: seoSettings.websiteTitle },
      { property: 'og:description', content: seoSettings.websiteDescription },
      { property: 'og:image', content: seoSettings.socialImage },
      { name: 'twitter:title', content: seoSettings.websiteTitle },
      { name: 'twitter:description', content: seoSettings.websiteDescription },
      { name: 'twitter:image', content: seoSettings.socialImage }
    ];
    ogTags.forEach(tag => {
      let el = tag.property 
        ? document.querySelector(`meta[property='${tag.property}']`)
        : document.querySelector(`meta[name='${tag.name}']`);
      if (!el) {
        el = document.createElement('meta');
        if (tag.property) el.setAttribute('property', tag.property);
        if (tag.name) el.setAttribute('name', tag.name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', tag.content || '');
    });

    // 5. Google Search Console verify token
    if (seoSettings.googleSearchConsoleToken) {
      let scMeta = document.querySelector("meta[name='google-site-verification']");
      if (!scMeta) {
        scMeta = document.createElement('meta');
        scMeta.setAttribute('name', 'google-site-verification');
        document.head.appendChild(scMeta);
      }
      scMeta.setAttribute('content', seoSettings.googleSearchConsoleToken);
    }

    // 6. Dynamic Google Analytics Injection
    if (seoSettings.googleAnalyticsId) {
      const gaScript = document.getElementById('google-analytics-script') as HTMLScriptElement | null;
      if (!gaScript) {
        const newScript = document.createElement('script');
        newScript.id = 'google-analytics-script';
        newScript.async = true;
        newScript.src = `https://www.googletagmanager.com/gtag/js?id=${seoSettings.googleAnalyticsId}`;
        document.head.appendChild(newScript);

        const inlineScript = document.createElement('script');
        inlineScript.id = 'google-analytics-inline-script';
        inlineScript.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${seoSettings.googleAnalyticsId}');
        `;
        document.head.appendChild(inlineScript);
      } else {
        const inlineEl = document.getElementById('google-analytics-inline-script');
        if (inlineEl) {
          inlineEl.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${seoSettings.googleAnalyticsId}');
          `;
        }
      }
    }
  }, [seoSettings]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedBudget, setSelectedBudget] = useState("All");
  const [selectedAesthetic, setSelectedAesthetic] = useState("All");
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<"founded-asc" | "founded-desc" | "name-az" | "area-az">("founded-asc");
  const [carouselIndex, setCarouselIndex] = useState(0);



  // --- AUTO-ROTATING BANNERS EFFECT ---
  useEffect(() => {
    if (location.pathname !== '/') return;
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % Math.min(cafes.length, 4));
    }, 7000);
    return () => clearInterval(interval);
  }, [cafes.length, location.pathname]);

  // --- DYNAMIC FILTERS & CHIPS EXTRACTION ---
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    cafes.forEach(c => c.tags.forEach(t => tags.add(t)));
    return ["All", ...Array.from(tags).sort()];
  }, [cafes]);

  const filteredCafes = useMemo(() => {
    const rawFiltered = cafes.filter(cafe => {
      // 1. Tag matching
      const matchesTag = selectedTag === "All" || cafe.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase());

      // 2. Location (District) matching
      const matchesLocation = selectedLocation === "All" || cafe.area.toLowerCase() === selectedLocation.toLowerCase();

      // 3. Budget Tier matching
      const getBudgetCategory = (c: Cafe) => {
        if (!c.featuredMenu || c.featuredMenu.length === 0) return "moderate";
        const total = c.featuredMenu.reduce((sum, item) => {
          const num = parseInt(item.price.replace(/[^\d]/g, '')) || 0;
          return sum + num;
        }, 0);
        const avg = total / c.featuredMenu.length;
        if (avg < 100) return "economical";
        if (avg <= 260) return "moderate";
        return "premium";
      };
      
      const category = getBudgetCategory(cafe);
      const matchesBudget = selectedBudget === "All" || category === selectedBudget.toLowerCase();

      // 4. Aesthetic style grouping matching
      const getAestheticGroup = (c: Cafe) => {
        const type = ((c.aestheticType || "") + " " + (c.vibe || "")).toLowerCase();
        if (type.includes("heritage") || type.includes("colonial") || type.includes("retro") || type.includes("deccani") || type.includes("historic")) return "heritage";
        if (type.includes("minimalis") || type.includes("brutalist") || type.includes("concrete") || type.includes("wabi-sabi") || type.includes("nordic") || type.includes("scandi") || type.includes("timber")) return "minimalist";
        if (type.includes("courtyard") || type.includes("garden") || type.includes("leafy") || type.includes("ivy") || type.includes("yard") || type.includes("lake") || type.includes("foliage") || type.includes("shrub")) return "garden";
        if (type.includes("brasserie") || type.includes("brass") || type.includes("steel") || type.includes("modern") || type.includes("glass") || type.includes("high-ceiling") || type.includes("mullioned")) return "modern";
        return "other";
      };

      const aestGroup = getAestheticGroup(cafe);
      const matchesAesthetic = selectedAesthetic === "All" || aestGroup === selectedAesthetic.toLowerCase();

      // 5. Raw search text matching
      const keyword = searchQuery.toLowerCase().trim();
      const matchesSearch = !keyword || 
        cafe.name.toLowerCase().includes(keyword) ||
        cafe.area.toLowerCase().includes(keyword) ||
        cafe.vibe.toLowerCase().includes(keyword) ||
        cafe.tags.some(t => t.toLowerCase().includes(keyword));

      return matchesTag && matchesLocation && matchesBudget && matchesAesthetic && matchesSearch;
    });

    return [...rawFiltered].sort((a, b) => {
      if (sortBy === "founded-asc") {
        return (parseInt(a.founded) || 0) - (parseInt(b.founded) || 0);
      } else if (sortBy === "founded-desc") {
        return (parseInt(b.founded) || 0) - (parseInt(a.founded) || 0);
      } else if (sortBy === "name-az") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "area-az") {
        return a.area.localeCompare(b.area);
      }
      return 0;
    });
  }, [cafes, selectedTag, selectedLocation, selectedBudget, selectedAesthetic, searchQuery, sortBy]);

  // --- CONTROLLER CLICKS ---
  const handleAddNewCafe = async (newFieldData: Omit<Cafe, 'id'>) => {
    const id = Date.now();
    const createdSpot: Cafe = { id, ...newFieldData };
    if (!import.meta.env.VITE_SUPABASE_URL) {
      setCafes(prev => [createdSpot, ...prev]);
      return;
    }
    // handleAddNewCafe is mostly unused in App.tsx (AdminSection handles its own writes), 
    // but if used, it needs snake_case mapping. We just log for now to avoid crash.
    console.warn("handleAddNewCafe called directly from App.tsx instead of AdminSection.");
  };



  const handleAddUserFeedback = async (cafeId: number, author: string, rating: number, text: string, email: string) => {
    const targetCafe = cafes.find(c => c.id === cafeId);
    const id = Date.now();
    const newFeedback: UserFeedback = {
      id,
      cafeId,
      cafeName: targetCafe ? targetCafe.name : "Hyderabad Spot",
      author,
      rating,
      text,
      email,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'pending'
    };
    if (!import.meta.env.VITE_SUPABASE_URL) {
      setFeedbacks(prev => [newFeedback, ...prev]);
      return;
    }
    await supabase.from('feedbacks').insert({
      cafe_id: newFeedback.cafeId,
      cafe_name: newFeedback.cafeName,
      author: newFeedback.author,
      rating: newFeedback.rating,
      text: newFeedback.text,
      email: newFeedback.email,
      feedback_date: newFeedback.date,
      status: 'pending',
    });
    // Optimistic UI update
    setFeedbacks(prev => [newFeedback, ...prev]);
  };

  return (
    <>
      <AnimatePresence>
        {isAppLoading && <LoadingScreen />}
      </AnimatePresence>
      <div id="main_layout" className="min-h-screen bg-warm-beige text-charcoal-ink font-sans selection:bg-charcoal-ink selection:text-warm-beige animate-fade-in flex flex-col">
      
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* REFRACTION NAVIGATION BAR */}
          <Navbar 
            isAuthenticated={isAuthenticated} 
            onLogout={() => {
              supabase.auth.signOut();
              setIsAuthenticated(false);
            }} 
          />

          <AnimatePresence mode="wait">
              {/* @ts-ignore React Router v6 types miss the implicit key prop but AnimatePresence requires it */}
              <Routes location={location} key={location.pathname}>
                <Route path="/cafe/:id" element={
                  <motion.div
                    key="cafe_detail"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <CafeDetailWrapper 
                      cafes={cafes}
                      onSubmitFeedback={handleAddUserFeedback}
                      isAdmin={isAuthenticated}
                    />
                  </motion.div>
                } />

                <Route path="/journal" element={
                  <motion.div
                    key="blog_panel"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <BlogSection articles={blogs} />
                  </motion.div>
                } />

                <Route path="/journal/:slug" element={
                  <motion.div
                    key="blog_panel_detail"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <BlogSection articles={blogs} />
                  </motion.div>
                } />

                <Route path="/admin" element={
                  !isAuthenticated ? (
                    <motion.div
                      key="login_panel"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <LoginScreen onLogin={async (user, pwd) => {
                        try {
                          const { error } = await supabase.auth.signInWithPassword({ email: user, password: pwd });
                          if (error) {
                            console.error("Supabase Auth Error:", error.message);
                            return false;
                          }
                          return true;
                        } catch (error) {
                          console.error("Auth Error:", error);
                          return false;
                        }
                      }} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="admin_panel"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <AdminSection
                        cafes={cafes}
                        setCafes={setCafes}
                        blogs={blogs}
                        setBlogs={setBlogs}
                        feedbacks={feedbacks}
                        setFeedbacks={setFeedbacks}
                        seoSettings={seoSettings}
                        setSeoSettings={setSeoSettings}
                      />
                    </motion.div>
                  )
                } />

                <Route path="/" element={
              /* LOOKBOOK LANDING ARCHIVE */
              <motion.div
                key="lookbook_stream"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <HeroSection 
                  cafes={cafes} 
                  onSelectCafe={(c) => navigate(`/cafe/${generateSlug(c.name)}`)} 
                />

                {/* NEWLY LAUNCHED AUTOMATIC SLIDER - Removed for custom banner layout */}
                {/* 
                <NewlyLaunchedSection
                  cafes={cafes}
                  onSelectCafe={(c) => navigate(`/cafe/${generateSlug(c.name)}`)}
                />
                */}

                {/* SEARCH FILTERS MATRIX */}
                <FilterSection
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  layout={layout}
                  setLayout={setLayout}
                  allTags={allTags}
                  selectedTag={selectedTag}
                  setSelectedTag={setSelectedTag}
                  selectedLocation={selectedLocation}
                  setSelectedLocation={setSelectedLocation}
                  selectedBudget={selectedBudget}
                  setSelectedBudget={setSelectedBudget}
                  selectedAesthetic={selectedAesthetic}
                  setSelectedAesthetic={setSelectedAesthetic}
                />

                {/* PRIMARY ARCHIVE LISTING VIEWPORT */}
                <main id="curated_cafe_viewport" className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
                  {filteredCafes.length === 0 ? (
                    <div id="empty_search_cabinet" className="text-center py-20 px-6 border border-dashed border-tactile-divider rounded-xl max-w-xl mx-auto shadow-xs">
                      <MaterialIcon name="coffee_maker" className="text-5xl text-stone-gray mb-4" />
                      <p className="font-serif text-2xl text-charcoal-ink italic mb-2">No quiet spaces matched your criteria</p>
                      <p className="text-stone-gray text-xs font-sans max-w-sm mx-auto leading-relaxed">
                        We couldn't locate any Hyderabad spot matching inside our looking glass. Try widening your filters.
                      </p>
                      <button 
                        id="btn_reset_filters"
                        onClick={() => { 
                          setSelectedTag("All"); 
                          setSearchQuery(""); 
                          setSelectedLocation("All");
                          setSelectedBudget("All");
                          setSelectedAesthetic("All");
                        }}
                        className="mt-6 inline-flex items-center gap-2 border border-charcoal-ink hover:bg-charcoal-ink hover:text-warm-beige text-xs tracking-widest font-bold px-6 py-3.5 rounded-full smooth-transition shadow-xs cursor-pointer"
                      >
                        <span>RESET CABINET VIEW</span>
                      </button>
                    </div>
                  ) : layout === 'grid' ? (
                    <div id="layout_editorial_grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-10">
                      {filteredCafes.map((cafe, index) => (
                        <CafeCard
                          key={cafe.id}
                          cafe={cafe}
                          index={index}
                          layout="grid"
                          onSelect={() => navigate(`/cafe/${generateSlug(cafe.name)}`)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div id="layout_journal_list" className="divide-y divide-[#E6DFD3] border-t border-b border-[#E6DFD3]">
                      {filteredCafes.map((cafe, index) => (
                        <CafeCard
                          key={cafe.id}
                          cafe={cafe}
                          index={index}
                          layout="list"
                          onSelect={() => navigate(`/cafe/${generateSlug(cafe.name)}`)}
                        />
                      ))}
                    </div>
                  )}
                </main>
              </motion.div>
                } />
              </Routes>
          </AnimatePresence>
        </div>

        {/* COMPACT STYLISH FOOTER */}
        <Footer />
      </div>
    </div>
    </>
  );
}
