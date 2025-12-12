'use client';

import Link from 'next/link';
import { Users, Briefcase, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTAFindAgent() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-secondary/50 border-b border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-[var(--font-playfair)] font-bold text-foreground mb-4">
              Find your Agent
            </h2>
            <p className="text-foreground/70 text-base mb-6 max-w-2xl">
              Connect with experienced real estate professionals who can help you find your perfect property. Our agents are knowledgeable, responsive, and committed to your success.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-momentum-ocean-blue" />
                <span className="text-sm text-foreground/70">Expert Agents</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-momentum-crayola-yellow fill-momentum-crayola-yellow" />
                <span className="text-sm text-foreground/70">Top Rated</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-momentum-powder-pink" />
                <span className="text-sm text-foreground/70">10,000+ Clients</span>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 flex flex-col items-center md:items-end gap-2">
            <p className="hidden md:block text-sm text-foreground/60 text-center md:text-right max-w-[200px]">
              Get matched with the perfect agent for your needs
            </p>
            <Button 
              asChild
              className="bg-foreground text-background hover:bg-foreground/90"
            >
              <Link href="/agents">
                Find Agent
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
