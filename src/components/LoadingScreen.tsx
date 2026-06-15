import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from 'motion/react';

export function LoadingScreen() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[99999] bg-warm-beige flex flex-col items-center justify-center"
    >
      <div className="w-64 h-64 md:w-80 md:h-80">
        <DotLottieReact
          src="/loading-house.lottie"
          loop
          autoplay
        />
      </div>
      <p className="mt-2 font-serif text-charcoal-ink text-lg tracking-[0.2em] uppercase animate-pulse">
        Brewing Spaces...
      </p>
    </motion.div>
  );
}
