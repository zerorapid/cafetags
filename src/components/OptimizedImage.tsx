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

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Optional blur placeholder or skeleton background */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-stone-200 animate-pulse" 
          style={blurDataURL ? { backgroundImage: `url(${blurDataURL})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(10px)' } : {}}
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${imageClassName}`}
        {...props}
      />
    </div>
  );
}
