/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cafe } from '../types';
import { MaterialIcon } from './MaterialIcon';

interface HeroSectionProps {
  cafes: Cafe[];
  carouselIndex: number;
  setCarouselIndex: React.Dispatch<React.SetStateAction<number>>;
  onSelectCafe: (cafe: Cafe) => void;
}

export function HeroSection({ cafes, carouselIndex, setCarouselIndex, onSelectCafe }: HeroSectionProps) {
  const actualCarouselCafes = cafes.filter(c => c.isFeaturedBanner).length > 0 
    ? cafes.filter(c => c.isFeaturedBanner) 
    : cafes.slice(0, 4);

  const getCatchyLine = (cafe: Cafe) => {
    if (cafe.bannerCatchyLine) return cafe.bannerCatchyLine;
    if (cafe.id === 1) return "Heritage Chai";
    if (cafe.id === 2) return "Silent Focus";
    if (cafe.id === 3) return "Lush Yard";
    if (cafe.id === 4) return "Late Night";
    return cafe.tags[0] || "Specialty";
  };

  return (
    <header id="hero_section" className="pt-12 pb-16 px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-10">
      <div className="text-center animate-fade-in">
        <h1 id="hero_display_title" className="text-[38px] xs:text-[44px] sm:text-[72px] md:text-[96px] leading-[1.0] md:leading-[0.95] font-serif tracking-tight font-light mb-4 select-none text-charcoal-ink">
          Hyderabad <span className="italic font-light">Coffee</span> Corners
        </h1>
        <p id="hero_essay_subtitle" className="text-stone-gray text-xs tracking-widest max-w-xl mx-auto font-sans font-bold uppercase">
          A curated lookbook of standout aesthetic spaces and artisan brews
        </p>
      </div>

      {/* Cinematic Autoplay Carousel Banner */}
      {actualCarouselCafes.length > 0 && (
        <div id="cinematic_carousel" className="relative w-full aspect-[4/3] xs:aspect-[16/10] sm:aspect-[18/9] md:aspect-[21/9] bg-[#EBE7E0] border border-[#E6DFD3] rounded-lg md:rounded-[8px] overflow-hidden group/carousel shadow-md">
          <AnimatePresence mode="wait">
            {actualCarouselCafes.map((cafe, idx) => {
              if (idx !== carouselIndex) return null;
              return (
                <motion.div
                  key={cafe.id}
                  initial={{ opacity: 0, scale: 1.01 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 w-full h-full cursor-pointer"
                  onClick={() => onSelectCafe(cafe)}
                >
                  <img
                    src={cafe.image}
                    alt={cafe.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover saturate-[0.80] mix-blend-multiply opacity-85"
                  />
                  {/* Radial/Linear twilight shadow backing text blocks safely */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent"></div>
                  
                  {/* Visual metadata overlay info */}
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 md:p-12 flex flex-col justify-end text-white z-10 select-none">
                    <h2 className="font-serif text-4xl sm:text-6xl md:text-8xl tracking-tight text-[#FAF7F2] drop-shadow-md leading-none italic font-light">
                      {getCatchyLine(cafe)}
                    </h2>
                    
                    <p className="text-[#FAF7F2]/80 text-[10px] sm:text-xs md:text-sm tracking-[0.18em] font-sans font-extrabold uppercase mt-2.5 sm:mt-3.5 drop-shadow-xs">
                      {cafe.name} • {cafe.area}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Left/Right manual click triggers */}
          <button
            id="carousel_prev_button"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setCarouselIndex((prev) => (prev === 0 ? actualCarouselCafes.length - 1 : prev - 1));
            }}
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/30 hover:border-white text-white/70 hover:text-white bg-black/20 hover:bg-black/40 flex items-center justify-center smooth-transition opacity-100 sm:opacity-0 sm:group-hover/carousel:opacity-100 z-10 cursor-pointer"
            aria-label="Previous Slide"
          >
            <MaterialIcon name="chevron_left" className="text-[20px]" />
          </button>
          <button
            id="carousel_next_button"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setCarouselIndex((prev) => (prev + 1) % actualCarouselCafes.length);
            }}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/30 hover:border-white text-white/70 hover:text-white bg-black/20 hover:bg-black/40 flex items-center justify-center smooth-transition opacity-100 sm:opacity-0 sm:group-hover/carousel:opacity-100 z-10 cursor-pointer"
            aria-label="Next Slide"
          >
            <MaterialIcon name="chevron_right" className="text-[20px]" />
          </button>

          {/* Indicators bar dots */}
          <div className="absolute right-6 top-6 flex items-center gap-1.5 bg-black/30 backdrop-blur-xs px-3 py-1.5 rounded-full z-10 border border-white/10">
            {actualCarouselCafes.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCarouselIndex(idx);
                }}
                className={`w-1.5 h-1.5 rounded-full smooth-transition cursor-pointer ${idx === carouselIndex ? 'bg-[#FAF7F2] scale-125' : 'bg-[#FAF7F2]/45 hover:bg-[#FAF7F2]/80'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
