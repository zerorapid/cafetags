import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import './ImageLightbox.css';
import { OptimizedImage } from './OptimizedImage';

interface ImageLightboxProps {
  src: string | null;
  onClose: () => void;
}

export function ImageLightbox({ src, onClose }: ImageLightboxProps) {
  useEffect(() => {
    if (src) {
      // Prevent body scrolling when lightbox is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [src]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (src) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [src, onClose]);

  if (!src) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button 
        className="lightbox-close-btn" 
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close preview"
      >
        <X size={24} />
      </button>
      <div className="lightbox-image-container" onClick={(e) => e.stopPropagation()}>
        <img 
          src={src} 
          alt="Full screen preview" 
          className="lightbox-image" 
        />
      </div>
    </div>
  );
}
