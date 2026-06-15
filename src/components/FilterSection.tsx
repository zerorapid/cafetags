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
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const isFiltered = selectedTag !== "All" || selectedLocation !== "All" || selectedBudget !== "All" || selectedAesthetic !== "All";

  return (
    <div style={{ maxWidth: '1440px', margin: '-40px auto 40px auto', padding: '0 20px', position: 'relative', zIndex: 10 }}>
      <div className="search-hero">
        
        {/* Main Search Bar Row */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
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
            <button className="search-btn">Search</button>
          </div>
          <button 
            className="adv-toggle-btn"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          >
            <i className="ti ti-adjustments-horizontal"></i>
            {isFiltered ? 'Filters Active' : 'Advanced'}
          </button>
        </div>

        {/* Expandable Advanced Settings Panel */}
        {isAdvancedOpen && (
          <div className="filter-panel">
            <div className="input-row" style={{ marginBottom: '20px' }}>
              <div className="field">
                <label className="field-label">Sort By</label>
                <select 
                  className="ct-input"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                >
                  <option value="founded-desc">Newest First</option>
                  <option value="founded-asc">Oldest First</option>
                  <option value="name-az">Name (A-Z)</option>
                  <option value="area-az">Location (A-Z)</option>
                </select>
              </div>

              <div className="field">
                <label className="field-label">Location</label>
                <select 
                  className="ct-input"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="All">All Geographies</option>
                  <option value="Banjara Hills">Banjara Hills</option>
                  <option value="Charminar">Charminar (Old City)</option>
                  <option value="Film Nagar">Film Nagar</option>
                  <option value="Financial District">Financial District</option>
                  <option value="Gachibowli">Gachibowli</option>
                  <option value="Jubilee Hills">Jubilee Hills</option>
                  <option value="Madhapur">Madhapur</option>
                </select>
              </div>
              
              <div className="field">
                <label className="field-label">Budget</label>
                <select 
                  className="ct-input"
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                >
                  <option value="All">All Budgets</option>
                  <option value="economical">Economical (Under ₹100)</option>
                  <option value="moderate">Moderate (₹100 - ₹250)</option>
                  <option value="premium">Premium (Above ₹250)</option>
                </select>
              </div>

              <div className="field">
                <label className="field-label">Layout</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => setLayout('grid')}
                    className={layout === 'grid' ? 'chip chip-active' : 'chip'}
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    <i className="ti ti-layout-grid" style={{ fontSize: '14px' }}></i> Grid
                  </button>
                  <button 
                    onClick={() => setLayout('list')}
                    className={layout === 'list' ? 'chip chip-active' : 'chip'}
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    <i className="ti ti-list" style={{ fontSize: '14px' }}></i> List
                  </button>
                </div>
              </div>

              <div className="field">
                <label className="field-label">Aesthetic</label>
                <select 
                  className="ct-input"
                  value={selectedAesthetic}
                  onChange={(e) => setSelectedAesthetic(e.target.value)}
                >
                  <option value="All">All Aesthetics</option>
                  <option value="minimalist">Minimalist / Scandi</option>
                  <option value="heritage">Heritage / Vintage</option>
                  <option value="garden">Garden / Courtyard</option>
                  <option value="modern">Modern / Industrial</option>
                  <option value="other">Other Unique Vibes</option>
                </select>
              </div>
              
              {isFiltered && (
                <div className="field" style={{ justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                  <button
                    onClick={() => {
                      setSelectedTag("All");
                      setSelectedLocation("All");
                      setSelectedBudget("All");
                      setSelectedAesthetic("All");
                    }}
                    style={{ 
                      background: 'transparent', 
                      border: 'none', 
                      color: 'var(--ct-voltage)', 
                      fontSize: '13px', 
                      fontWeight: 500, 
                      cursor: 'pointer',
                      padding: '11px 0'
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
