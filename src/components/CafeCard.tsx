/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Cafe } from '../types';
import { MaterialIcon } from './MaterialIcon';
import { getTagIcon } from '../data';
import { OptimizedImage } from './OptimizedImage';
import { Star, MapPin, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { TagPill } from './TagPill';

interface CafeCardProps {
  key?: React.Key;
  cafe: Cafe;
  index: number;
  layout: 'grid' | 'list';
  onSelect: () => void;
}

const formatTimings = (t?: string) => {
  if (!t) return 'Check timings';
  return t
    .replace(/ Everyday/ig, '')
    .replace(/:00/g, '')
    .replace(/ AM/g, 'AM')
    .replace(/ PM/g, 'PM')
    .replace(/Open 24 Hours, 365 Days/ig, '24/7 Open')
    .replace(/Open 24 Hours/ig, '24/7 Open');
};

export function CafeCard({ cafe, index, layout, onSelect }: CafeCardProps) {
  const handleCardClick = () => {
    onSelect();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderStatusBadge = (status?: string) => {
    switch (status) {
      case 'closed': return <span className="px-2 py-1 text-[11px] font-bold uppercase rounded-md bg-stone-200 text-stone-600 tracking-wider">Closed</span>;
      case 'renovating': return <span className="px-2 py-1 text-[11px] font-bold uppercase rounded-md bg-orange-100 text-orange-700 border border-orange-200 tracking-wider">Renovating</span>;
      case 'shutdown': return <span className="px-2 py-1 text-[11px] font-bold uppercase rounded-md bg-red-100 text-red-700 border border-red-200 tracking-wider">Shutdown</span>;
      case 'open':
      default: return <span className="px-2 py-1 text-[11px] font-bold uppercase rounded-md bg-green-100 text-green-700 border border-green-200 tracking-wider">Open</span>;
    }
  };

  if (layout === 'grid') {
    return (
      <article 
        id={`grid_item_${cafe.id}`}
        onClick={handleCardClick}
        className="w-full bg-white rounded-[20px] overflow-hidden border border-[#e2e8f0] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.05)] font-sans cursor-pointer transition-transform md:hover:-translate-y-1"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Image */}
        <div className="w-full h-[160px] overflow-hidden relative">
          <OptimizedImage 
            src={cafe.image} 
            alt={cafe.name}
            className="w-full h-full"
            imageClassName="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
          />
          
          <div className="absolute top-3 left-3 flex gap-2">
            {cafe.isNewLaunch && (
              <div className="flex items-center gap-1.5 bg-[#3C2F28] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm border border-white/20 backdrop-blur-sm">
                <Sparkles size={12} className="flex-shrink-0" />
                New Launch
              </div>
            )}
          </div>
        </div>

        <div className="p-4 text-left flex flex-col h-[calc(100%-160px)]">
          
          {/* Top Section: Title & Rating Badge */}
          <div className="flex justify-between items-start gap-2 mb-1">
            <h2 
              className="text-2xl font-bold text-[#1C1C1C] leading-snug line-clamp-2"
              style={{ letterSpacing: '-0.02em' }}
            >
              {cafe.name}
            </h2>
            <div className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm font-semibold bg-[#F6EFE6] text-[#1C1C1C] whitespace-nowrap">
              <Star size={14} className="text-[#b45309]" fill="currentColor" stroke="none" />
              {cafe.rating || '4.8'}
            </div>
          </div>

          {/* Short description */}
          <p className="text-xs text-[#6B7280] mb-3 truncate">
            {cafe.vibe ? cafe.vibe.split(' ').slice(0, 5).join(' ') + '...' : cafe.signature}
          </p>

          <div className="flex flex-col gap-2 mb-4">
            {/* Location */}
            <div className="flex items-center gap-1.5 text-[#6B7280] text-sm font-medium">
              <MapPin size={14} className="opacity-80 flex-shrink-0" />
              <span className="truncate">{cafe.area}</span>
            </div>

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-1.5">
              {cafe.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="inline-flex items-center px-2.5 py-1 bg-[#F4F4F4] text-[#4B5563] text-xs font-normal rounded-md whitespace-nowrap">
                  {tag}
                </span>
              ))}
              {cafe.tags.length > 3 && (
                <span className="inline-flex items-center px-2.5 py-1 bg-[#F4F4F4] text-[#4B5563] text-xs font-normal rounded-md">
                  +{cafe.tags.length - 3}
                </span>
              )}
            </div>
          </div>

          <div className="flex-grow"></div>

          {/* Full Width Button */}
          <button className="w-full px-4 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90 text-white" style={{ backgroundColor: '#b45309' }}>
            View Details
          </button>
          
        </div>
      </article>
    );
  }

  // List layout
  return (
    <article 
      id={`list_item_${cafe.id}`}
      onClick={handleCardClick}
      className="group cursor-pointer py-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 smooth-transition hover:bg-[#FAF7F2]/50 md:hover:px-4"
    >
      {/* Year & Status */}
      <div className="w-auto md:w-24 text-sm tracking-widest text-stone-gray flex-shrink-0 font-bold text-left space-y-2 flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0">
        <div className="text-xs">OPENED: {cafe.founded}</div>
        <div>{renderStatusBadge(cafe.status)}</div>
      </div>
      
      {/* Main Identity column */}
      <div className="flex-1 min-w-[240px] text-left">
        <h3 className="font-sans text-3xl md:text-4xl text-[#0f172a] font-bold group-hover:italic group-hover:translate-x-2 smooth-transition flex items-center flex-wrap gap-x-4 gap-y-2" style={{ letterSpacing: '-0.02em' }}>
          {cafe.name}
          <span className="text-xs tracking-wide font-bold uppercase text-stone-gray bg-transparent border border-tactile-divider px-3 py-1 rounded-full group-hover:bg-[#0f172a] group-hover:text-white group-hover:border-[#0f172a] smooth-transition shadow-xs flex items-center gap-1">
            <MapPin size={14} className="text-[#b45309] group-hover:text-white" />
            <span>{cafe.area}</span>
          </span>
          <span className="text-xs font-semibold tracking-wide uppercase text-stone-gray/90 flex items-center gap-1.5 mt-1 md:mt-0">
            <Clock size={14} /> {cafe.timings}
          </span>
        </h3>
        
        {/* Tags list */}
        <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-2">
          {cafe.tags.slice(0, 3).map(t => (
            <TagPill key={t} tag={t} />
          ))}
          {cafe.tags.length > 3 && (
            <span className="px-2.5 py-1 text-xs font-sans tracking-normal border border-tactile-divider bg-[#FAF7F2]/80 text-stone-gray rounded-full uppercase font-semibold flex items-center gap-1 pb-1">
              +{cafe.tags.length - 3}
            </span>
          )}
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

      <div className="text-xs tracking-wider text-[#b45309] group-hover:text-charcoal-ink group-hover:translate-x-1.5 smooth-transition uppercase flex items-center gap-1.5 font-bold self-center ml-auto">
        <span>VIEW {(index + 1).toString().padStart(2, '0')}</span>
        <ArrowRight size={16} />
      </div>
    </article>
  );
}
