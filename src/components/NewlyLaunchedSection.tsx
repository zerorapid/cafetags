/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Cafe } from '../types';
import { MaterialIcon } from './MaterialIcon';

interface NewlyLaunchedSectionProps {
  cafes: Cafe[];
  onSelectCafe: (cafe: Cafe) => void;
}

export function NewlyLaunchedSection({ cafes, onSelectCafe }: NewlyLaunchedSectionProps) {
  const newSpots = cafes.filter(c => c.isNewLaunch);
  
  // Only use actual new spots. If none remain, section is hidden completely.
  const listToUse = newSpots;
  
  const [index, setIndex] = useState(0);

  if (listToUse.length === 0) return null;

  return (
    <section 
      id="newly_launched_strip" 
      className="max-w-7xl mx-auto px-6 md:px-12 pb-12 select-none"
    >
      <div 
        onClick={() => onSelectCafe(listToUse[index])}
        className="cafe-ux-card cursor-pointer hover:border-amber-700 transition-colors"
      >
        <div className="card-main-layout">
          
          {/* Top Bar Details */}
          <div className="card-header-bar">
            {/* Custom Golden Black premium gradient chip filled label box */}
            <div className="premium-tag">
              <MaterialIcon name="star" className="text-[#D4AF37] text-xs mr-1" />
              <span>New Cafe</span>
            </div>

            {/* Slider Dots indicator bar */}
            {listToUse.length > 1 && (
              <div 
                className="flex items-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                {listToUse.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${i === index ? 'bg-amber-600 scale-125' : 'bg-stone-300 hover:bg-stone-400'}`}
                    aria-label={`Slide to newly launched index ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Central Split Area */}
          <div className="card-body-row">
            
            {/* Left Node: Core Visual Brand identity */}
            <div className="brand-profile">
              <div className="avatar-frame">
                <img 
                  className="avatar-img" 
                  src={listToUse[index].image} 
                  alt={listToUse[index].name}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="brand-text">
                <h2>{listToUse[index].name}</h2>
                <div className="location-label">
                  <MaterialIcon name="place" className="text-amber-600 text-sm" />
                  <span>{listToUse[index].area} District</span>
                </div>
              </div>
            </div>

            {/* Right Node: Informational snippet + Clear Action targets */}
            <div className="editorial-content-block">
              <p className="quote-snippet">
                "{listToUse[index].newLaunchCatchyline || listToUse[index].vibe.slice(0, 60) + '...'}"
              </p>
              
              <div className="action-cta-button">
                Explore Lookbook 
                <MaterialIcon name="chevron_right" className="text-xs ml-1" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
