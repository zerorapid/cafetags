/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { MaterialIcon } from './MaterialIcon';
import { getTagIcon } from '../data';

interface FilterSectionProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  sortBy: "founded-asc" | "founded-desc" | "name-az" | "area-az";
  setSortBy: (val: "founded-asc" | "founded-desc" | "name-az" | "area-az") => void;
  layout: 'grid' | 'list';
  setLayout: (val: 'grid' | 'list') => void;
  allTags: string[];
  selectedTag: string;
  setSelectedTag: (val: string) => void;
  selectedLocation: string;
  setSelectedLocation: (val: string) => void;
  selectedBudget: string;
  setSelectedBudget: (val: string) => void;
  selectedAesthetic: string;
  setSelectedAesthetic: (val: string) => void;
}

export function FilterSection({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  layout,
  setLayout,
  allTags,
  selectedTag,
  setSelectedTag,
  selectedLocation,
  setSelectedLocation,
  selectedBudget,
  setSelectedBudget,
  selectedAesthetic,
  setSelectedAesthetic,
}: FilterSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Smart tag slice: show first 7 tags by default.
  // If a tag beyond 7 is currently selected, make sure to keep it visible so the active state is evident.
  const visibleTags = useMemo(() => {
    if (isExpanded || allTags.length <= 8) {
      return allTags;
    }
    const defaultSlice = allTags.slice(0, 7);
    if (selectedTag && selectedTag !== "All" && !defaultSlice.includes(selectedTag)) {
      return [...defaultSlice, selectedTag];
    }
    return defaultSlice;
  }, [allTags, isExpanded, selectedTag]);

  const hasAdditionalTags = allTags.length > 7;
  const isFiltered = searchQuery !== "" || selectedTag !== "All" || selectedLocation !== "All" || selectedBudget !== "All" || selectedAesthetic !== "All";

  return (
    <section id="filter_matrix" className="max-w-7xl mx-auto px-6 md:px-12 mb-16 space-y-6 animate-fade-in">
      {/* Search & Sort & Layout Dashboard Container */}
      <div className="border-t border-b border-tactile-divider py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* SEARCH FIELD */}
          <div className="col-span-1 md:col-span-4">
            <label className="block text-[10px] tracking-widest text-[#8A7A6B] font-sans font-extrabold uppercase mb-2">
              SEARCH CURATED spots
            </label>
            <div id="search_box_wrapper" className="relative flex items-center border border-tactile-divider bg-[#FAF7F2]/40 rounded-lg px-4 min-h-[44px] hover:border-stone-400 group smooth-transition">
              <span className="text-stone-gray group-hover:text-charcoal-ink mr-2.5 flex items-center">
                <MaterialIcon name="search" className="text-base" />
              </span>
              <input 
                id="coffee_search_input"
                type="text" 
                placeholder="SEARCH BY NAME OR LOCATION..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-xs tracking-wider focus:outline-none placeholder:text-stone-400 uppercase font-sans text-charcoal-ink font-bold"
              />
              {searchQuery && (
                <button 
                  id="btn_clear_search"
                  onClick={() => setSearchQuery('')}
                  className="text-stone-gray hover:text-charcoal-ink text-sm p-1 flex items-center cursor-pointer"
                  aria-label="Clear Search"
                >
                  <MaterialIcon name="close" />
                </button>
              )}
            </div>
          </div>

          {/* SORT SELECTOR */}
          <div className="col-span-1 md:col-span-4 col-start-1 md:col-start-6">
            <label className="block text-[10px] tracking-widest text-[#8A7A6B] font-sans font-extrabold uppercase mb-2">
              SORT COFFEE SPACES
            </label>
            <div id="sort_by_wrapper" className="relative flex items-center border border-tactile-divider bg-[#FAF7F2]/40 rounded-lg px-4 min-h-[44px] hover:border-stone-400 smooth-transition">
              <span className="text-stone-gray mr-2.5 flex items-center pointer-events-none">
                <MaterialIcon name="sort" className="text-base" />
              </span>
              <select
                id="coffee_sort_select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-transparent border-none text-xs tracking-wider focus:outline-none uppercase font-sans text-charcoal-ink font-bold cursor-pointer"
              >
                <option value="founded-asc">OLDEST FIRST</option>
                <option value="founded-desc">NEWEST FIRST</option>
                <option value="name-az">NAME (A-Z)</option>
                <option value="area-az">LOCATION (A-Z)</option>
              </select>
            </div>
          </div>

          {/* VIEWPORT CONTROLLER LAYOUT */}
          <div className="col-span-1 md:col-span-2 col-start-1 md:col-start-11 flex flex-col justify-end">
            <label className="block text-[10px] tracking-widest text-[#8A7A6B] font-sans font-extrabold uppercase mb-2 md:text-right">
              VIEWPORT
            </label>
            <div id="layout_toggle_wrapper" className="flex items-center justify-between p-1 border border-tactile-divider rounded-lg bg-[#FAF7F2]/30 text-xs font-sans tracking-wider font-bold min-h-[44px] w-full">
              <button 
                id="layout_toggle_grid"
                onClick={() => setLayout('grid')} 
                className={`flex-1 py-2 px-3 rounded-md smooth-transition flex items-center justify-center gap-2 cursor-pointer ${layout === 'grid' ? 'bg-charcoal-ink text-warm-beige shadow-xs' : 'text-stone-400 hover:text-charcoal-ink'}`}
                title="Editorial Grid"
              >
                <MaterialIcon name="grid_view" className="text-sm" />
                <span className="text-[10px] tracking-wider uppercase font-sans">GRID</span>
              </button>
              <button 
                id="layout_toggle_list"
                onClick={() => setLayout('list')} 
                className={`flex-1 py-2 px-3 rounded-md smooth-transition flex items-center justify-center gap-2 cursor-pointer ${layout === 'list' ? 'bg-charcoal-ink text-warm-beige shadow-xs' : 'text-stone-400 hover:text-charcoal-ink'}`}
                title="Journal List"
              >
                <MaterialIcon name="notes" className="text-sm" />
                <span className="text-[10px] tracking-wider uppercase font-sans">LIST</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* REFINED CHROME GEOGRAPHIC, BUDGET & AESTHETIC GRIDS (More features) */}
      <div id="refined_dropdown_matrix" className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 pb-6 border-b border-tactile-divider">
        {/* District Selector (Location wise) */}
        <div>
          <label className="block text-[10px] tracking-widest text-[#8A7A6B] font-sans font-extrabold uppercase mb-2 flex items-center gap-1">
            <MaterialIcon name="place" className="text-[13px]" />
            <span>LOCATION (DISTRICT)</span>
          </label>
          <div className="relative flex items-center border border-tactile-divider bg-[#FAF7F2]/40 rounded-lg px-4 min-h-[44px] hover:border-stone-400 smooth-transition">
            <select
              id="location_filter_select"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full bg-transparent border-none text-xs tracking-wider focus:outline-none uppercase font-sans text-charcoal-ink font-bold cursor-pointer"
            >
              <option value="All">ALL GEOGRAPHIES (ALL AREAS)</option>
              <option value="Banjara Hills">BANJARA HILLS</option>
              <option value="Charminar">CHARMINAR (OLD CITY)</option>
              <option value="Film Nagar">FILM NAGAR</option>
              <option value="Financial District">FINANCIAL DISTRICT</option>
              <option value="Gachibowli">GACHIBOWLI</option>
              <option value="Jubilee Hills">JUBILEE HILLS</option>
              <option value="Madhapur">MADHAPUR</option>
            </select>
          </div>
        </div>

        {/* Budget Selector (Budget wise) */}
        <div>
          <label className="block text-[10px] tracking-widest text-[#8A7A6B] font-sans font-extrabold uppercase mb-2 flex items-center gap-1">
            <MaterialIcon name="payments" className="text-[13px]" />
            <span>BUDGET WISE RANGE</span>
          </label>
          <div className="relative flex items-center border border-tactile-divider bg-[#FAF7F2]/40 rounded-lg px-4 min-h-[44px] hover:border-stone-400 smooth-transition">
            <select
              id="budget_filter_select"
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="w-full bg-transparent border-none text-xs tracking-wider focus:outline-none uppercase font-sans text-charcoal-ink font-bold cursor-pointer"
            >
              <option value="All">ALL BUDGETS</option>
              <option value="economical">ECONOMICAL (UNDER ₹100 PER PERSON)</option>
              <option value="moderate">MODERATE (₹100 - ₹250 PER PERSON)</option>
              <option value="premium">PREMIUM (ABOVE ₹250 PER PERSON)</option>
            </select>
          </div>
        </div>

        {/* Aesthetic Selector (Aesthetics wise) */}
        <div>
          <label className="block text-[10px] tracking-widest text-[#8A7A6B] font-sans font-extrabold uppercase mb-2 flex items-center gap-1">
            <MaterialIcon name="palette" className="text-[13px]" />
            <span>DESIGN AESTHETIC STYLE</span>
          </label>
          <div className="relative flex items-center border border-tactile-divider bg-[#FAF7F2]/40 rounded-lg px-4 min-h-[44px] hover:border-stone-400 smooth-transition">
            <select
              id="aesthetic_filter_select"
              value={selectedAesthetic}
              onChange={(e) => setSelectedAesthetic(e.target.value)}
              className="w-full bg-transparent border-none text-xs tracking-wider focus:outline-none uppercase font-sans text-charcoal-ink font-bold cursor-pointer"
            >
              <option value="All">ALL DESIGN ARCHITECTURES</option>
              <option value="heritage">COLONIAL & HISTORIC DECCANI</option>
              <option value="minimalist">BRUTALIST & WABI-SABI MINIMALISM</option>
              <option value="garden">LUSH GARDEN & STONE COURTYARD</option>
              <option value="modern">MID-CENTURY MODERN BRASS & GLASS</option>
            </select>
          </div>
        </div>
      </div>

      {/* COLLAPSIBLE TAG FILTERS BLOCK */}
      <div id="filter_tag_block" className="space-y-4 pt-1">
        <div className="flex justify-between items-center text-xs text-stone-gray tracking-wider font-sans uppercase font-bold select-none">
          <div className="flex items-center gap-2">
            <span>FILTER BY</span>
            {isFiltered && (
              <span className="inline-block w-2 h-2 rounded-full bg-charcoal-ink animate-pulse" />
            )}
          </div>
          {isFiltered && (
            <button
              onClick={() => {
                setSelectedTag("All");
                setSearchQuery("");
              }}
              className="text-[10px] tracking-widest text-charcoal-ink hover:underline cursor-pointer flex items-center gap-1.5"
            >
              <span>RESET ALL</span>
              <MaterialIcon name="clear_all" className="text-[14px]" />
            </button>
          )}
        </div>

        {/* Dynamic tagging strip */}
        <div className="flex flex-wrap items-center gap-2.5 transition-all duration-300">
          {visibleTags.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                id={`tag_btn_${tag.replace(/\s+/g,'_')}`}
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`tag smooth-transition text-xs font-sans tracking-wide uppercase px-4 py-2 cursor-pointer select-none rounded-[3.5px] border flex items-center gap-2 min-h-[40px] shadow-xs ${
                  isSelected
                    ? 'bg-charcoal-ink border-charcoal-ink text-[#FAF7F2] font-bold'
                    : 'bg-[#FAF7F2]/40 text-stone-gray border-tactile-divider hover:border-stone-gray hover:text-charcoal-ink font-semibold'
                }`}
              >
                <MaterialIcon name={getTagIcon(tag)} className="text-sm" />
                <span>{tag}</span>
              </button>
            );
          })}

          {/* Expander Controller */}
          {hasAdditionalTags && (
            <button
              id="tag_expander_trigger"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-sans tracking-widest uppercase px-4 py-2 cursor-pointer select-none rounded-[3.5px] border border-dashed border-tactile-divider hover:border-stone-gray text-stone-gray hover:text-charcoal-ink font-bold flex items-center gap-1.5 min-h-[40px] bg-transparent transition-colors duration-300"
            >
              <MaterialIcon 
                name={isExpanded ? "keyboard_arrow_up" : "keyboard_arrow_down"} 
                className="text-sm" 
              />
              <span>{isExpanded ? "SHOW LESS" : "SHOW MORE"}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

