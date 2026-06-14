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
      <div style={{ padding: '60px 20px', maxWidth: '1440px', margin: '0 auto' }}>
        <h1 className="t-d1">
          Hyderabad <em>Coffee</em> Corners
        </h1>
        <p className="hero-sub">
          A curated lookbook of standout aesthetic spaces and artisan brews
        </p>
      </div>

      {featured.length > 0 && (
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px 40px 24px' }}>
          <div 
            onClick={() => onSelectCafe(featured[index])}
            style={{ 
              position: 'relative', 
              width: '100%', 
              height: '400px', 
              borderRadius: '24px', 
              overflow: 'hidden', 
              cursor: 'pointer',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }}
          >
            <OptimizedImage 
              src={featured[index].image} 
              alt={featured[index].name} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000"
              style={{ transform: 'scale(1.05)' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)' }} />
            
            <div style={{ position: 'absolute', bottom: '40px', left: '40px', right: '40px', textAlign: 'left', color: 'white' }}>
              <span style={{ display: 'inline-block', padding: '6px 12px', backgroundColor: '#e4a853', color: '#111', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', borderRadius: '4px', marginBottom: '16px' }}>
                Featured Curated Space
              </span>
              <h2 style={{ fontFamily: '"Instrument Serif", serif', fontSize: '48px', margin: '0 0 8px 0', lineHeight: 1.1 }}>
                {featured[index].name}
              </h2>
              {featured[index].bannerCatchyLine && (
                <p style={{ fontSize: '18px', margin: 0, opacity: 0.9, maxWidth: '600px' }}>
                  {featured[index].bannerCatchyLine}
                </p>
              )}
            </div>

            {featured.length > 1 && (
              <div style={{ position: 'absolute', bottom: '20px', right: '40px', display: 'flex', gap: '8px' }}>
                {featured.map((_, i) => (
                  <div key={i} style={{ width: i === index ? '24px' : '8px', height: '8px', borderRadius: '4px', backgroundColor: i === index ? '#e4a853' : 'rgba(255,255,255,0.5)', transition: 'all 0.3s ease' }} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
