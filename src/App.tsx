/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Cafe, BlogArticle, UserFeedback, SeoSettings } from './types';
import { INITIAL_CAFES, INITIAL_BLOG_ARTICLES } from './data';

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

export default function App() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<'directory' | 'blog' | 'admin'>('directory');

  // --- STATE LAYER ---
  const [cafes, setCafes] = useState<Cafe[]>(() => {
    const saved = localStorage.getItem('hyd_cafes_lookbook');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Cafe[];
        const tagMap: { [key: string]: string } = {
          "Historic Irani": "Irani Chai",
          "Heritage Venue": "Heritage",
          "Minimalist Design": "Minimalist",
          "Specialty Coffee": "Specialty Coffee",
          "Courtyard": "Courtyard",
          "Quiet Workspace": "Quiet Workspace",
          "Late Night Brews": "Late Night",
          "High Ceilings": "Spacious",
          "Heritage Bungalow": "Vintage Cafe",
          "Cascading Gardens": "Garden",
          "Artisan Patisserie": "Bakery",
          "Architectural Vaults": "Aesthetic"
        };
        return parsed.map(c => {
          const initial = INITIAL_CAFES.find(init => init.id === c.id);
          const mappedTags = (c.tags || []).map(t => tagMap[t] || t);
          return {
            address: "123 Cafe Street, Gachibowli, Hyderabad",
            phone: "+91 99999 88888",
            email: "hello@coffeetags.in",
            website: "https://buymeacoffee.com",
            timings: "8:00 AM - 10:00 PM Everyday",
            aestheticType: "Aesthetic Space, Cozy Nooks",
            crowd: "Friendly Locals & Remote Creators",
            discounts: "10% off for active students",
            facilities: ["Free High-speed Wi-Fi", "Comfortable Couch Seating", "Power Outlets Available"],
            dineIn: true,
            takeaway: true,
            onlineOrder: true,
            selfDelivery: false,
            celebrities: [],
            bookingUrl: "https://www.swiggy.com/dineout/hyderabad",
            featuredMenu: [
              { name: "Classic Pour Over", price: "₹180", category: "Brews", isSpecial: true },
              { name: "House Cold Malted Brew", price: "₹210", category: "Brews" },
              { name: "Crusty Butter Croissant", price: "₹150", category: "Patisserie", isSpecial: true }
            ],
            userReviews: [
              { author: "Aaditya", rating: 5, text: "Truly charming space with exceptionally helpful baristas.", date: "Jun 10, 2026", role: "Coffee Enthusiast" }
            ],
            ...initial,
            ...c,
            tags: mappedTags
          };
        });
      } catch (e) {
        console.error("Error restoring initial state from localStorage:", e);
      }
    }
    return INITIAL_CAFES;
  });

  // Editorial Blogs State
  const [blogs, setBlogs] = useState<BlogArticle[]>(() => {
    const saved = localStorage.getItem('hyd_cafe_blogs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error restoring blogs:", e);
      }
    }
    return INITIAL_BLOG_ARTICLES;
  });

  // Community Feedbacks State
  const [feedbacks, setFeedbacks] = useState<UserFeedback[]>(() => {
    const saved = localStorage.getItem('hyd_cafe_feedbacks');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error restoring feedbacks:", e);
      }
    }
    return [];
  });

  // SEO & Analytics Settings State
  const [seoSettings, setSeoSettings] = useState<SeoSettings>(() => {
    const saved = localStorage.getItem('hyd_cafe_seo_settings');
    if (saved) {
      try {
        return {
          websiteTitle: "CafeTags Hyderabad — Curated Specialty Coffee & Heritage Chai Lookbook",
          websiteDescription: "Candidly curated architecture & study benchmarks for Hyderabad's aesthetic coffee houses, slow dripping filter bars, and vintage work niches.",
          favicon: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=128&auto=format&fit=crop&q=80",
          socialImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop",
          googleAnalyticsId: "",
          googleSearchConsoleToken: "",
          ...JSON.parse(saved)
        };
      } catch (e) {
        console.error("Error restoring SEO settings:", e);
      }
    }
    return {
      websiteTitle: "CafeTags Hyderabad — Curated Specialty Coffee & Heritage Chai Lookbook",
      websiteDescription: "Candidly curated architecture & study benchmarks for Hyderabad's aesthetic coffee houses, slow dripping filter bars, and vintage work niches.",
      favicon: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=128&auto=format&fit=crop&q=80",
      socialImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop",
      googleAnalyticsId: "",
      googleSearchConsoleToken: ""
    };
  });

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
    faviconLink.href = seoSettings.favicon || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=128&auto=format&fit=crop&q=80';

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
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);
  const [sortBy, setSortBy] = useState<"founded-asc" | "founded-desc" | "name-az" | "area-az">("founded-asc");
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Journal notes memo cabinet
  const [journalLogs, setJournalLogs] = useState<{ [id: number]: string }>(() => {
    const saved = localStorage.getItem('hyd_cafe_journal_logs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error restoring journal logs:", e);
      }
    }
    return {};
  });

  const [noteSavingState, setNoteSavingState] = useState<"idle" | "saved">("idle");

  // --- PERSISTENCE SYNCS ---
  useEffect(() => {
    localStorage.setItem('hyd_cafes_lookbook', JSON.stringify(cafes));
  }, [cafes]);

  useEffect(() => {
    localStorage.setItem('hyd_cafe_journal_logs', JSON.stringify(journalLogs));
  }, [journalLogs]);

  useEffect(() => {
    localStorage.setItem('hyd_cafe_blogs', JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem('hyd_cafe_feedbacks', JSON.stringify(feedbacks));
  }, [feedbacks]);

  // --- AUTO-ROTATING BANNERS EFFECT ---
  useEffect(() => {
    if (selectedCafe) return;
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % Math.min(cafes.length, 4));
    }, 7000);
    return () => clearInterval(interval);
  }, [cafes.length, selectedCafe]);

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
  const handleAddNewCafe = (newFieldData: Omit<Cafe, 'id'>) => {
    const createdSpot: Cafe = {
      id: Date.now(),
      ...newFieldData
    };
    setCafes(prev => [createdSpot, ...prev]);
  };

  const handleSaveNotesOnCafe = (id: number, text: string) => {
    setJournalLogs(prev => ({ ...prev, [id]: text }));
    setNoteSavingState("saved");
    setTimeout(() => {
      setNoteSavingState("idle");
    }, 1200);
  };

  const handleDeleteCafe = (id: number) => {
    if (confirm("Are you sure you would like to remove this curated spot from your personal lookup cabinet?")) {
      setCafes(prev => prev.filter(c => c.id !== id));
      setSelectedCafe(null);
    }
  };

  const handleAddUserFeedback = (cafeId: number, author: string, rating: number, text: string, email: string) => {
    const targetCafe = cafes.find(c => c.id === cafeId);
    const newFeedback: UserFeedback = {
      id: Date.now(),
      cafeId,
      cafeName: targetCafe ? targetCafe.name : "Hyderabad Spot",
      author,
      rating,
      text,
      email,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'pending'
    };
    setFeedbacks(prev => [newFeedback, ...prev]);
  };

  return (
    <div id="main_layout" className="min-h-screen bg-warm-beige text-charcoal-ink font-sans selection:bg-charcoal-ink selection:text-warm-beige animate-fade-in flex flex-col">
      
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* REFRACTION NAVIGATION BAR */}
          <Navbar
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onResetCafeSelection={() => setSelectedCafe(null)}
          />

          <AnimatePresence mode="wait">
            {selectedCafe ? (
              /* DETAILED STUDY VIEW */
              <DetailView
                cafe={selectedCafe}
                onBack={() => setSelectedCafe(null)}
                journalLogs={journalLogs}
                onSaveNote={handleSaveNotesOnCafe}
                onDeleteCafe={handleDeleteCafe}
                noteSavingState={noteSavingState}
                allCafes={cafes}
                onSelectCafe={setSelectedCafe}
                onSubmitFeedback={handleAddUserFeedback}
                isAdmin={currentPage === 'admin'}
              />
            ) : currentPage === 'blog' ? (
              /* BLOG JOURNAL STREAM */
              <motion.div
                key="blog_panel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <BlogSection articles={blogs} />
              </motion.div>
            ) : currentPage === 'admin' ? (
              /* ADMIN PRIVILEGED CONTROL WORKSPACE */
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
            ) : (
              /* LOOKBOOK LANDING ARCHIVE */
              <motion.div
                key="lookbook_stream"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* HERO & CINEMATIC RUNNER */}
                <HeroSection
                  cafes={cafes}
                  carouselIndex={carouselIndex}
                  setCarouselIndex={setCarouselIndex}
                  onSelectCafe={setSelectedCafe}
                />

                {/* NEWLY LAUNCHED AUTOMATIC SLIDER */}
                <NewlyLaunchedSection
                  cafes={cafes}
                  onSelectCafe={setSelectedCafe}
                />

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
                          onSelect={() => setSelectedCafe(cafe)}
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
                          onSelect={() => setSelectedCafe(cafe)}
                        />
                      ))}
                    </div>
                  )}
                </main>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* COMPACT STYLISH FOOTER */}
        <Footer />
      </div>
    </div>
  );
}
