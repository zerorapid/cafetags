/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';

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
  return (
    <div className="relative z-10 mx-auto px-4 sm:px-5 mb-10 -mt-6 sm:-mt-8 md:-mt-[30px] flex justify-center" style={{ maxWidth: '1440px' }}>
      <div className="w-full max-w-3xl">
          <div className="search-bar" style={{ flex: 1 }}>
            <i className="ti ti-search" style={{ color: 'var(--ct-muted)', fontSize: '18px' }}></i>
            <input 
              type="text"
              placeholder="Search spaces by name, vibe or location..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{ background: 'transparent', border: 'none', color: 'var(--ct-muted)', cursor: 'pointer', padding: '4px' }}
              >
                <i className="ti ti-x"></i>
              </button>
            )}
          </div>
        </div>
      </div>
  );
}
