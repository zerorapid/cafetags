import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './ImageLightbox.css';

interface ImageLightboxProps {
  images: string[];
  initialIndex: number | null;
  onClose: () => void;
}

export function ImageLightbox({ images, initialIndex, onClose }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (currentIndex !== null) {
      // Prevent body scrolling when lightbox is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [currentIndex]);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex !== null && images.length > 0) {
      setCurrentIndex((currentIndex + 1) % images.length);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex !== null && images.length > 0) {
      setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    }
  };

  // Close and navigate on key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images.length, onClose]);

  if (currentIndex === null || !images[currentIndex]) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button 
        className="lightbox-close-btn" 
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close preview"
      >
        <X size={24} />
      </button>

      {images.length > 1 && (
        <button 
          className="lightbox-nav-btn prev" 
          onClick={handlePrev}
          aria-label="Previous image"
        >
          <ChevronLeft size={32} />
        </button>
      )}

      <div className="lightbox-image-container" onClick={(e) => e.stopPropagation()}>
        <img 
          src={images[currentIndex]} 
          alt={`Full screen preview ${currentIndex + 1}`} 
          className="lightbox-image" 
        />
      </div>

      {images.length > 1 && (
        <button 
          className="lightbox-nav-btn next" 
          onClick={handleNext}
          aria-label="Next image"
        >
          <ChevronRight size={32} />
        </button>
      )}
    </div>
  );
}
