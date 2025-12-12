'use client';

import { useState } from 'react';
import { Header } from '@/app/layout/Header';
import { Footer } from '@/app/layout/Footer';
import { ContactSection } from '@/components/contact-section';
import { AboutSection } from '@/components/about-section';
import { CTAFindAgent } from '@/components/cta-find-agent';
import { HeroSection, FeaturedPropertiesSection, CategoryCarouselSection } from '@/components/sections';
import { useProperties } from '@/components/features/property';
import { type Property } from '@/lib/supabase';

export default function HomePage() {
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const {
    filteredProperties,
    loading,
    filters,
    updateFilters,
    clearFilters,
  } = useProperties();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      const target = document.getElementById('properties');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleViewDetails = (property: Property) => {
    // Handle view details
    console.log('View details:', property);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isDarkMode={isHeroVisible} />

      <HeroSection
        searchQuery={filters.searchQuery}
        onSearchChange={(value) => updateFilters({ searchQuery: value })}
        onSearchSubmit={handleSearch}
        propertyType={filters.propertyType}
        onPropertyTypeChange={(value) => updateFilters({ propertyType: value })}
        priceRange={filters.priceRange}
        onPriceRangeChange={(value) => updateFilters({ priceRange: value })}
        onVisibilityChange={setIsHeroVisible}
      />

      <CTAFindAgent />

      <FeaturedPropertiesSection
        properties={filteredProperties}
        loading={loading}
        onViewDetails={handleViewDetails}
        onClearFilters={clearFilters}
      />

      <AboutSection />

      <CategoryCarouselSection />

      <ContactSection />
      <Footer />
    </div>
  );
}
