import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BlogArticle } from '../types';
import { MaterialIcon } from './MaterialIcon';

interface BlogSectionProps {
  articles: BlogArticle[];
}

export function BlogSection({ articles }: BlogSectionProps) {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract up to 7 unique tags for filtering (addressing the '07' request)
  const allTags = Array.from(new Set(articles.flatMap(a => a.tags || []))).filter(Boolean).slice(0, 7);

  const filteredArticles = articles.filter(article => {
    // Hide drafts
    if (article.status === 'draft') return false;

    // Filter by search
    if (searchQuery && !article.title.toLowerCase().includes(searchQuery.toLowerCase()) && !article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Filter by tag
    if (selectedTag && (!article.tags || !article.tags.includes(selectedTag))) {
      return false;
    }

    return true;
  });

  if (selectedArticle) {
    return (
      <motion.div
        key="blog-detail"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        className="max-w-4xl mx-auto px-6 md:px-12 py-12"
      >
        {/* Back Link */}
        <button
          onClick={() => setSelectedArticle(null)}
          className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-stone-500 hover:text-stone-900 mb-8 smooth-transition group cursor-pointer"
        >
          <MaterialIcon name="arrow_back" className="text-sm group-hover:-translate-x-1 transition-transform" />
          <span>BACK TO JOURNAL FEED</span>
        </button>

        {/* Article Cover Image */}
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-10 shadow-sm border border-stone-200">
          <img
            src={selectedArticle.image}
            alt={selectedArticle.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <span className="absolute bottom-6 left-6 md:left-10 bg-amber-500 text-stone-900 text-[10px] font-extrabold uppercase px-3 py-1.5 rounded tracking-wider font-mono">
            Verified Editorial
          </span>
        </div>

        {/* Content Panel */}
        <article id={`article-body-${selectedArticle.id}`} className="space-y-6">
          <div className="space-y-3.5">
            <h1 className="font-serif text-3xl md:text-5xl font-light text-stone-900 tracking-tight leading-tight">
              {selectedArticle.title}
            </h1>
            
            {/* Author bar info */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 font-semibold border-b border-stone-200/60 pb-6">
              <span className="flex items-center gap-1.5 text-stone-900">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-[10px] uppercase font-bold">
                  {selectedArticle.author[0]}
                </span>
                <span>By {selectedArticle.author}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MaterialIcon name="calendar_today" className="text-xs" />
                <span>{selectedArticle.date}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MaterialIcon name="schedule" className="text-xs" />
                <span>{selectedArticle.readTime}</span>
              </span>
            </div>
          </div>

          {/* Body Content */}
          <div className="font-serif text-[17px] md:text-[19px] leading-relaxed text-stone-800 space-y-6 whitespace-pre-line antialiased">
            {selectedArticle.content}
          </div>

          {/* Author Bio Footer */}
          <div className="mt-16 bg-[#FAF9F6] border border-stone-200 p-6 rounded-lg flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              {selectedArticle.author[0]}
            </div>
            <div>
              <span className="block text-xs font-extrabold text-stone-400 uppercase tracking-widest leading-none">ABOUT THE OWNER</span>
              <span className="block text-sm font-bold text-stone-900 mt-1">{selectedArticle.author}</span>
              <p className="text-xs text-stone-500 mt-1.5 leading-relaxed font-sans">
                Documenting the delicate intersection of specialty espresso brewing, architectural layout studies, and physical aesthetic sanctuaries inside Hyderabad's technology zones.
              </p>
            </div>
          </div>
        </article>
      </motion.div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      {/* Blog Header Title */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
        <span className="text-[10px] font-extrabold text-amber-600 uppercase tracking-widest block font-mono">ESTABLISHED JUN 2026</span>
        <h2 className="font-serif text-4xl md:text-5xl font-light italic text-stone-900 tracking-wide">The Coffee Journal</h2>
        <p className="text-stone-500 text-xs font-sans max-w-md mx-auto leading-relaxed">
          Critical study logs, design breakdowns, and historical chronologies about Hyderabad's unique cafe architectural movement.
        </p>
      </div>

      {/* Search and Tags Filtering */}
      <div className="mb-12 space-y-6 max-w-3xl mx-auto">
        {/* Search Bar */}
        <div className="relative">
          <MaterialIcon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
          <input 
            type="text" 
            placeholder="Search journal columns, guides, and studies..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-stone-200 pl-12 pr-4 py-3.5 rounded-full text-sm font-medium focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-sm text-stone-900"
          />
        </div>

        {/* Tags Row */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <button 
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${!selectedTag ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}
            >
              All Columns
            </button>
            {allTags.map(tag => (
              <button 
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${selectedTag === tag ? 'bg-amber-600 text-white shadow-sm' : 'bg-stone-100 text-stone-500 hover:bg-stone-200'}`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {filteredArticles.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-stone-200 rounded-xl max-w-xl mx-auto">
          <MaterialIcon name="menu_book" className="text-5xl text-stone-300 mb-2" />
          <p className="font-serif text-xl text-stone-900 italic">No matching columns found</p>
          <p className="text-stone-400 text-xs mt-1">Try clearing your search filters or selecting another tag.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredArticles.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedArticle(article)}
              className="group bg-white border border-stone-200/80 rounded-lg overflow-hidden shadow-xs hover:shadow-md hover:border-stone-400 cursor-pointer smooth-transition flex flex-col justify-between"
            >
              <div>
                {/* Article Cover Thumbnail */}
                <div className="relative h-48 overflow-hidden bg-stone-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 duration-500 transition-all"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-stone-900 text-[10px] font-bold px-2.5 py-1 rounded-sm shadow-3xs border border-stone-100 uppercase tracking-widest font-mono">
                    {article.readTime}
                  </div>
                </div>

                {/* Article texts info */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[10px] text-stone-400 font-semibold uppercase tracking-wider">
                    <span>{article.author}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>
                  
                  <h3 className="font-serif text-xl font-bold text-stone-900 leading-tight group-hover:text-amber-800 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-stone-500 text-xs leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Action Reading footer button */}
              <div className="px-6 pb-6 pt-2 border-t border-stone-100/60 flex justify-between items-center text-[11px] font-bold tracking-wider text-stone-900">
                <span>READ ARTICLE</span>
                <MaterialIcon name="arrow_forward" className="text-amber-600 text-sm group-hover:translate-x-1.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
