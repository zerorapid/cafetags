/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Cafe } from '../types';
import { MaterialIcon } from './MaterialIcon';
import { getTagIcon } from '../data';
import { OptimizedImage } from './OptimizedImage';

interface CafeCardProps {
  key?: React.Key;
  cafe: Cafe;
  index: number;
  layout: 'grid' | 'list';
  onSelect: () => void;
}

export function CafeCard({ cafe, index, layout, onSelect }: CafeCardProps) {
  const handleCardClick = () => {
    onSelect();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (layout === 'grid') {
    return (
      <article 
        id={`grid_item_${cafe.id}`}
        onClick={handleCardClick}
        className="group cursor-pointer flex flex-col"
      >
        {/* Image holder with desaturation layers & scale easing custom style */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#EBE7E0] border border-[#E6DFD3] rounded-xl flex items-center justify-center mb-4 transition-all duration-500 hover:shadow-xs">
          <OptimizedImage 
            src={cafe.image} 
            alt={cafe.name}
            className="absolute inset-0 w-full h-full"
            imageClassName="saturate-[0.85] group-hover:saturate-[1] group-hover:scale-[1.04] smooth-transition"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-stone-400/25 to-transparent pointer-events-none"></div>
          
          <div className="absolute top-4 left-4 bg-[#FAF7F2]/95 backdrop-blur-xs border border-tactile-divider px-3 py-1.5 rounded-full flex items-center gap-1 opacity-95 group-hover:opacity-100 smooth-transition">
            <MaterialIcon name="location_on" className="text-sm text-amber-700" />
            <span className="text-xs tracking-wider text-charcoal-ink font-bold">{cafe.area.toUpperCase()}</span>
          </div>
          
          {/* Subtle hover lookbook badge */}
          <div className="absolute inset-0 bg-charcoal-ink/10 opacity-0 group-hover:opacity-100 smooth-transition flex items-center justify-center">
            <span className="text-xs tracking-widest text-[#FAF7F2] bg-[#24211E]/95 backdrop-blur-md px-5 py-2.5 border border-[#E6DFD3] rounded-lg font-sans font-bold uppercase shadow-md">
              VIEW DETAILS
            </span>
          </div>
        </div>

        <div className="mt-2 space-y-2 text-left">
          <h3 className="font-serif text-3xl group-hover:italic text-charcoal-ink leading-tight smooth-transition">
            {cafe.name}
          </h3>
          
          <div className="flex justify-between items-center border-t border-tactile-divider/50 pt-2 text-xs tracking-wider uppercase text-stone-gray">
            <span className="flex items-center gap-1">
              <MaterialIcon name="location_on" className="text-xs text-amber-700" />
              <span>{cafe.area} — OPENED: {cafe.founded}</span>
            </span>
            <span className="text-xs text-stone-gray/80 italic font-serif">{(index + 1).toString().padStart(2, '0')}.</span>
          </div>

          {/* Explicit Tags Pill Row under card */}
          <div className="flex flex-wrap gap-1.5 pt-1.5">
            {cafe.tags.map(t => (
              <span 
                key={t}
                className="px-2.5 py-1 text-xs font-sans tracking-normal border border-tactile-divider bg-[#FAF7F2]/80 text-stone-gray rounded-full uppercase font-semibold flex items-center gap-1 pb-1"
              >
                <MaterialIcon name={getTagIcon(t)} className="text-xs text-stone-gray" />
                <span>{t}</span>
              </span>
            ))}
          </div>
          
          <p className="text-stone-gray text-xs leading-relaxed italic font-serif line-clamp-2 pt-1 opacity-90 group-hover:opacity-100 smooth-transition">
            "{cafe.vibe}"
          </p>
        </div>
      </article>
    );
  }

  // List layout
  return (
    <article 
      id={`list_item_${cafe.id}`}
      onClick={handleCardClick}
      className="group cursor-pointer py-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 smooth-transition hover:bg-[#FAF7F2]/50 hover:px-4"
    >
      {/* Year tag */}
      <div className="w-18 text-xs tracking-widest text-stone-gray flex-shrink-0 font-bold text-left">
        OPENED: {cafe.founded}
      </div>
      
      {/* Main Identity column */}
      <div className="flex-1 min-w-[240px] text-left">
        <h3 className="font-serif text-3xl md:text-4xl text-charcoal-ink group-hover:italic group-hover:translate-x-2 smooth-transition flex items-center flex-wrap gap-x-4 gap-y-2">
          {cafe.name}
          <span className="text-xs tracking-wide font-bold uppercase text-stone-gray bg-transparent border border-tactile-divider px-3 py-1 rounded-full group-hover:bg-charcoal-ink group-hover:text-[#FAF7F2] group-hover:border-charcoal-ink smooth-transition shadow-xs flex items-center gap-1">
            <MaterialIcon name="location_on" className="text-xs text-amber-700" />
            <span>{cafe.area}</span>
          </span>
        </h3>
        
        {/* Tags list */}
        <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-2">
          {cafe.tags.map(t => (
            <span 
              key={t} 
              className="text-xs font-sans text-stone-gray uppercase tracking-wider flex items-center gap-1.5 border border-tactile-divider/60 px-3 py-1 rounded-full bg-[#FAF7F2]/40"
            >
              <MaterialIcon name={getTagIcon(t)} className="text-xs" />
              <span>{t}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Micro preview cover picture */}
      <div className="w-24 h-16 overflow-hidden bg-tactile-divider invisible md:visible flex-shrink-0 border border-tactile-divider rounded-md">
        <OptimizedImage 
            src={cafe.image} 
            alt={cafe.name} 
            className="w-full h-full"
            imageClassName="saturate-[0.80] group-hover:saturate-[1] group-hover:scale-110 smooth-transition"
          />
      </div>

      {/* Spliced vibe essay strip */}
      <div className="max-w-md flex-1 text-xs text-stone-gray italic font-serif leading-relaxed line-clamp-2 md:line-clamp-1 group-hover:text-charcoal-ink smooth-transition text-left">
        "{cafe.vibe}"
      </div>

      {/* Custom CTA study prompt */}
      <div className="text-xs tracking-wider text-stone-gray group-hover:text-charcoal-ink group-hover:translate-x-1.5 smooth-transition uppercase flex items-center gap-1.5 font-bold self-center ml-auto">
        <span>VIEW {(index + 1).toString().padStart(2, '0')}</span>
        <MaterialIcon name="arrow_right_alt" className="text-sm" />
      </div>
    </article>
  );
}
