'use client';

import { useState, useEffect, useRef } from 'react';
import { Building2, TrendingUp, Key, DollarSign, Shield, Users, Briefcase, Home, Star, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase, type Property } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PropertyList } from '@/components/property-list';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Header } from '@/app/layout/Header';
import { Footer } from '@/app/layout/Footer';
import { ContactSection } from '@/components/contact-section';
import { AboutSection } from '@/components/about-section';
import { CTAFindAgent } from '@/components/cta-find-agent';
import { AnimatedLogo } from '@/components/animated-logo';
import { PropertySearchFilter } from '@/components/property-search-filter';
import { AppDownloadSection } from '@/components/app-download-section';

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [loading, setLoading] = useState(true);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const parallaxBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (heroSectionRef.current) {
        const rect = heroSectionRef.current.getBoundingClientRect();
        const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;
        setIsHeroVisible(isVisible);
        
        // Parallax effect: move background slower than scroll
        const scrollPosition = window.scrollY;
        // Parallax speed factor (0.5 means background moves at half the scroll speed)
        setScrollY(scrollPosition * 0.5);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    filterProperties();
  }, [properties, searchQuery, propertyType, priceRange]);

  useEffect(() => {
    if (!carouselApi) return;
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
    autoScrollRef.current = setInterval(() => {
      if (!carouselApi) return;
      const snaps = carouselApi.scrollSnapList();
      if (!snaps.length) return;
      const current = carouselApi.selectedScrollSnap();
      const next = (current + 1) % snaps.length;
      carouselApi.scrollTo(next);
    }, 1800); // continuous forward auto-scroll
    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [carouselApi]);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('status', 'available')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
      setFilteredProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProperties = () => {
    let filtered = [...properties];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (prop) =>
          prop.title.toLowerCase().includes(query) ||
          prop.city.toLowerCase().includes(query) ||
          prop.address.toLowerCase().includes(query)
      );
    }

    if (propertyType !== 'all') {
      filtered = filtered.filter((prop) => prop.property_type === propertyType);
    }

    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      if (max) {
        filtered = filtered.filter((prop) => prop.price >= min && prop.price <= max);
      } else {
        filtered = filtered.filter((prop) => prop.price >= min);
      }
    }

    setFilteredProperties(filtered);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterProperties();
    if (typeof window !== 'undefined') {
      const target = document.getElementById('properties');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isDarkMode={isHeroVisible} />

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
            transform: `translateY(${scrollY * 0.5}px)`,
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
          {/* Search + Filters Row (minimal) */}
          <PropertySearchFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearchSubmit={handleSearch}
            propertyType={propertyType}
            onPropertyTypeChange={setPropertyType}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
          />

          {/* App Download Section */}
          <AppDownloadSection />
        </div>
      </section>

      <CTAFindAgent />

      <section id="properties" className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl momentum-heading mb-3 text-momentum-ocean-blue">
              Featured Properties
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto text-base">
              Handpicked properties that match your lifestyle and preferences
            </p>
          </div>

          <PropertyList
            properties={filteredProperties}
            loading={loading}
            onViewDetails={(property) => {
              // Handle view details
              console.log('View details:', property);
            }}
            emptyMessage="No properties found matching your criteria"
            emptyAction={{
              label: 'Clear Filters',
              onClick: () => {
                  setSearchQuery('');
                  setPropertyType('all');
                  setPriceRange('all');
              },
            }}
            gridCols="3"
          />
          
          {!loading && filteredProperties.length > 0 && (
            <div className="flex justify-center mt-10">
              <a 
                href="/login" 
                className="text-momentum-ocean-blue hover:text-momentum-ocean-blue/80 font-medium transition-colors underline-offset-4 hover:underline"
              >
                View more
              </a>
            </div>
          )}
        </div>
      </section>
      <AboutSection />

<section id="carausel" className='py-10 bg-background'>
   {/* Category Carousel */}
   <div className="w-full relative">
            {/* Left fade gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
            {/* Right fade gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>
            
            <Carousel
              opts={{
                align: 'start',
                loop: true,
                dragFree: true,
                slidesToScroll: 8,
              }}
              className="w-full"
              setApi={setCarouselApi}
            >
              <CarouselContent className="-ml-2 md:-ml-4 px-4 md:px-6">
                {[
                  {
                    title: 'Apartments',
                    icon: Building2,
                    description: 'Modern living spaces',
                    color: 'text-blue-400',
                  },
                  {
                    title: 'Houses',
                    icon: Home,
                    description: 'Family homes',
                    color: 'text-green-400',
                  },
                  {
                    title: 'Luxury',
                    icon: Star,
                    description: 'Premium properties',
                    color: 'text-yellow-400',
                  },
                  {
                    title: 'Investment',
                    icon: TrendingUp,
                    description: 'High returns',
                    color: 'text-purple-400',
                  },
                  {
                    title: 'Location',
                    icon: MapPin,
                    description: 'Prime areas',
                    color: 'text-red-400',
                  },
                  {
                    title: 'Affordable',
                    icon: DollarSign,
                    description: 'Budget friendly',
                    color: 'text-cyan-400',
                  },
                  {
                    title: 'Secure',
                    icon: Shield,
                    description: 'Safe & protected',
                    color: 'text-indigo-400',
                  },
                  {
                    title: 'Commercial',
                    icon: Briefcase,
                    description: 'Business spaces',
                    color: 'text-orange-400',
                  },
                  {
                    title: 'Community',
                    icon: Users,
                    description: 'Great neighborhoods',
                    color: 'text-pink-400',
                  },
                  {
                    title: 'New Listings',
                    icon: Key,
                    description: 'Fresh properties',
                    color: 'text-teal-400',
                  },
                ].map((category, index) => {
                  const IconComponent = category.icon;
                  return (
                     <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-[12.5%] min-w-[12.5%]">
                       <Card className="border border-momentum-pale-violet/20 bg-white/80 backdrop-blur-sm hover:shadow-lg hover:bg-white transition-all duration-200 h-full rounded-momentum">
                         <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${
                            index % 5 === 0 ? 'bg-momentum-ocean-blue' :
                            index % 5 === 1 ? 'bg-momentum-pale-violet' :
                            index % 5 === 2 ? 'bg-momentum-powder-pink' :
                            index % 5 === 3 ? 'bg-momentum-crayola-yellow' :
                            'bg-momentum-diamond-blue'
                          }`}>
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <div className="space-y-1">
                            <h3 className="font-semibold text-momentum-ocean-blue text-sm leading-tight">
                              {category.title}
                            </h3>
                            <p className="text-xs text-foreground/70 leading-relaxed">
                              {category.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
          </div>
</section>
      

      <ContactSection />
      <Footer />
    </div>
  );
}
