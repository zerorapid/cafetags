import React, { useState } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  blurDataURL?: string; // Optional low-res or tiny placeholder
}

export function OptimizedImage({ src, alt, className = '', imageClassName = '', blurDataURL, ...props }: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // A generic aesthetic cafe placeholder SVG (Data URI)
  const fallbackSrc = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 24 24' fill='%23f5f0eb' stroke='%23c47a3a' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'><rect width='24' height='24' fill='%23f5f0eb' stroke='none'/><rect x='3' y='3' width='18' height='18' rx='2' ry='2' fill='none'/><circle cx='8.5' cy='8.5' r='1.5' fill='none'/><polyline points='21 15 16 10 5 21' fill='none'/></svg>";

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Optional blur placeholder or skeleton background */}
      {!isLoaded && !hasError && (
        <div 
          className="absolute inset-0 bg-stone-200 animate-pulse" 
          style={blurDataURL ? { backgroundImage: `url(${blurDataURL})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(10px)' } : {}}
        />
      )}
      <img
        src={hasError ? fallbackSrc : src}
        alt={hasError ? 'Image unavailable' : alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true); // Treat as loaded so we show the fallback instead of skeleton
        }}
        className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${imageClassName}`}
        {...props}
      />
    </div>
  );
}
