'use client';

import { useState, useEffect, useRef } from 'react';
import { Building2, TrendingUp, Key, DollarSign, Shield, Users, Briefcase, Home, Star, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';

const categories = [
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
];

export function CategoryCarouselSection() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
    }, 1800);
    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [carouselApi]);

  return (
    <section id="carausel" className="py-10 bg-background">
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
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <CarouselItem 
                  key={index} 
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-[12.5%] min-w-[12.5%]"
                >
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
  );
}
