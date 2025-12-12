'use client';

import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function ContactSection() {
  return (
   
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <p className="text-sm uppercase tracking-wide text-foreground/60">Contact</p>
            <h2 className="text-3xl md:text-4xl font-[var(--font-playfair)] font-bold text-foreground mt-2">
              Let's talk about your next property move
            </h2>
            <p className="text-foreground/70 mt-3">
              Reach out to our team for property tours, valuations, or any questions. We're here to help.
            </p>
          </div>
        </div>

        <Card className="lg:col-span-3 border border-border bg-card/80 backdrop-blur">
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Full name" className="h-11 border-border focus:border-foreground focus:ring-foreground/20" />
              <Input type="email" placeholder="Email address" className="h-11 border-border focus:border-foreground focus:ring-foreground/20" />
            </div>
            <Input placeholder="Phone number" className="h-11 border-border focus:border-foreground focus:ring-foreground/20" />
            <Textarea
              placeholder="Tell us what you're looking for..."
              rows={4}
              className="border-border focus:border-foreground focus:ring-foreground/20 resize-none"
            />
            <div className="flex justify-end">
              <Button className="bg-foreground text-background hover:bg-foreground/90">
                <Send className="w-4 h-4 mr-2" />
                Send message
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

