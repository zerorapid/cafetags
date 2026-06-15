/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Cafe } from '../types';
import { OptimizedImage } from './OptimizedImage';

interface HeroSectionProps {
  cafes: Cafe[];
  onSelectCafe: (cafe: Cafe) => void;
}

export function HeroSection({ cafes, onSelectCafe }: HeroSectionProps) {
  const featured = cafes.filter(c => c.isFeaturedBanner);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (featured.length <= 1) return;
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % featured.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featured.length]);

  return (
    <div style={{ textAlign: 'center', width: '100%' }}>
      <div className="px-5 mx-auto max-w-[1440px] pt-10 pb-0 md:pt-[60px] md:pb-[10px]">
        <h1 className="t-d1">
          Hyderabad <em>Coffee</em> Corners
        </h1>
        <p className="hero-sub">
          A curated lookbook of standout aesthetic spaces and artisan brews
        </p>
      </div>

      <div className="w-full relative">
        <img 
          src="/cafetags-homepage-banner.png" 
          alt="Hyderabad Coffee Banner" 
          className="w-full h-auto max-h-[380px] object-cover object-top"
        />
      </div>
    </div>
  );
}
