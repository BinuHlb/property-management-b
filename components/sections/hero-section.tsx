'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedLogo } from '@/components/animated-logo';
import { PropertySearchFilter } from '@/components/features/property/property-search-filter';
import { AppDownloadSection } from '@/components/app-download-section';

type HeroSectionProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  propertyType: string;
  onPropertyTypeChange: (value: string) => void;
  priceRange: string;
  onPriceRangeChange: (value: string) => void;
  onVisibilityChange?: (isVisible: boolean) => void;
};

export function HeroSection({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  propertyType,
  onPropertyTypeChange,
  priceRange,
  onPriceRangeChange,
  onVisibilityChange,
}: HeroSectionProps) {
  const [scrollY, setScrollY] = useState(0);
  const heroSectionRef = useRef<HTMLElement>(null);
  const parallaxBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroSectionRef.current) {
        const rect = heroSectionRef.current.getBoundingClientRect();
        const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;
        onVisibilityChange?.(isVisible);
        
        // Parallax effect: move background slower than scroll
        const scrollPosition = window.scrollY;
        setScrollY(scrollPosition * 0.5);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [onVisibilityChange]);

  return (
    <section
      ref={heroSectionRef}
      className="relative overflow-hidden pt-20 pb-16 px-4 sm:px-6 lg:px-8 text-white"
    >
      {/* Background image and overlays */}
      <div
        ref={parallaxBgRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("/assets/media/banner-bg.png")',
          willChange: 'transform',
          transform: `translateY(${scrollY}px)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-slate-900/80" />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Title with Logo Animation */}
        <div className="text-center my-8">
          <div className="mb-6">
            <AnimatedLogo 
              className="text-4xl md:text-5xl font-[var(--font-playfair)] font-bold text-white" 
              animateFromHeader={true}
            />
          </div>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.05, delayChildren: 0.5 },
              },
            }}
            className="text-sm font-[var(--font-playfair)] font-light mb-6 text-white leading-tight max-w-3xl mx-auto"
          >
            {[
              'Find',
              'your',
              'perfect',
              'property',
              'at',
              'any',
              'stage',
              'of',
              'the',
              'process',
            ].map((word, idx) => (
              <motion.span
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 12, scale: 0.98 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ type: 'spring', stiffness: 220, damping: 22, duration: 0.5 }}
                className="inline-block mr-1.5 md:mr-2 text-white"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
        </div>
        
        {/* Search + Filters Row */}
        <PropertySearchFilter
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          onSearchSubmit={onSearchSubmit}
          propertyType={propertyType}
          onPropertyTypeChange={onPropertyTypeChange}
          priceRange={priceRange}
          onPriceRangeChange={onPriceRangeChange}
        />

        {/* App Download Section */}
        <AppDownloadSection />
      </div>
    </section>
  );
}
