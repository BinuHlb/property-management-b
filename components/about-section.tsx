'use client';

import { Building2, Users, Shield, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function AboutSection() {
  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-wide text-foreground/60">About us</p>
          <h2 className="text-3xl md:text-4xl font-[var(--font-playfair)] font-bold text-foreground leading-tight">
            A modern platform built to match people with the right properties
          </h2>
          <p className="text-foreground/70 text-lg leading-relaxed">
            We combine a curated inventory with responsive agents to make buying, renting, and investing simpler. From
            city apartments to family homes, we guide you at every step.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Building2, title: '3K+', subtitle: 'Active listings' },
            { icon: Users, title: '10K+', subtitle: 'Happy clients' },
            { icon: Shield, title: '24/7', subtitle: 'Support & guidance' },
            { icon: Award, title: '4.9/5', subtitle: 'Client satisfaction' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card key={idx} className="border border-border bg-card/70 backdrop-blur-sm">
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-secondary border border-border">
                    <Icon className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-foreground leading-tight">{item.title}</p>
                    <p className="text-sm text-foreground/70">{item.subtitle}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

