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
    <div className="w-full relative bg-[#1C1412] flex items-center justify-center overflow-hidden h-[250px]" style={{ textAlign: 'center' }}>
      <OptimizedImage 
        src="https://images.unsplash.com/photo-1719716134533-ae84dee42751?q=80&w=2000&auto=format&fit=crop" 
        alt="Hyderabad Coffee Banner" 
        imageClassName="absolute inset-0 w-full h-full object-cover object-center opacity-50"
      />
      <div className="relative z-10 px-5 mx-auto max-w-[1440px] flex flex-col items-center justify-center">
        <h1 className="t-d1 !text-white">
          Hyderabad <em className="!text-[#F2E4D8]">Coffee</em> Corners
        </h1>
        <p className="hero-sub !text-white/80 mt-3">
          A curated lookbook of standout aesthetic spaces and artisan brews
        </p>
      </div>
    </div>
  );
}
