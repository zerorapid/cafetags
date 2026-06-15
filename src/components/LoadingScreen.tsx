import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import animationData from '../assets/loading-house.json';
import { motion } from 'motion/react';

export function LoadingScreen() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    const anim = lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationData,
    });
    return () => anim.destroy();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[99999] bg-white flex flex-col items-center justify-center"
    >
      <div className="w-64 h-64 md:w-80 md:h-80 flex items-center justify-center" ref={container}>
      </div>
      <p className="mt-2 font-serif text-charcoal-ink text-lg tracking-[0.2em] uppercase animate-pulse">
        Brewing Spaces...
      </p>
    </motion.div>
  );
}
