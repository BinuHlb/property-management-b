'use client';

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Link href="/" className="cursor-pointer inline-block">
                <Logo className="text-xl" />
              </Link>
            </div>
            <p className="text-foreground/70 text-sm mb-6 max-w-md leading-relaxed">
              Your trusted partner in finding the perfect property. We offer modern living spaces designed for your lifestyle, with 24/7 support and expert guidance throughout your property journey.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-foreground/70">
                <Mail className="w-4 h-4 text-momentum-ocean-blue flex-shrink-0" />
                <a href="mailto:contact@ari.com" className="hover:text-momentum-ocean-blue transition-colors">
                  contact@ari.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground/70">
                <Phone className="w-4 h-4 text-momentum-ocean-blue flex-shrink-0" />
                <a href="tel:+15551234567" className="hover:text-momentum-ocean-blue transition-colors">
                  +1 (555) 123-4567
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground/70">
                <MapPin className="w-4 h-4 text-momentum-ocean-blue flex-shrink-0" />
                <span>123 Property Street, New York, NY 10001</span>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <p className="text-sm font-medium text-foreground mb-3">Follow Us</p>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-momentum-pale-violet/20 hover:bg-momentum-pale-violet/30 flex items-center justify-center text-momentum-ocean-blue transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-momentum-pale-violet/20 hover:bg-momentum-pale-violet/30 flex items-center justify-center text-momentum-ocean-blue transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-momentum-pale-violet/20 hover:bg-momentum-pale-violet/30 flex items-center justify-center text-momentum-ocean-blue transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-momentum-pale-violet/20 hover:bg-momentum-pale-violet/30 flex items-center justify-center text-momentum-ocean-blue transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-full bg-momentum-pale-violet/20 hover:bg-momentum-pale-violet/30 flex items-center justify-center text-momentum-ocean-blue transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-foreground/70 hover:text-momentum-ocean-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/rent" className="text-foreground/70 hover:text-momentum-ocean-blue transition-colors">
                  Rent Properties
                </Link>
              </li>
              <li>
                <Link href="/agents" className="text-foreground/70 hover:text-momentum-ocean-blue transition-colors">
                  Find Agent
                </Link>
              </li>
              <li>
                <a href="#properties" className="text-foreground/70 hover:text-momentum-ocean-blue transition-colors">
                  Browse Properties
                </a>
              </li>
              <li>
                <a href="#about" className="text-foreground/70 hover:text-momentum-ocean-blue transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-foreground/70 hover:text-momentum-ocean-blue transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#" className="text-foreground/70 hover:text-momentum-ocean-blue transition-colors">
                  Property Search
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-momentum-ocean-blue transition-colors">
                  Virtual Tours
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-momentum-ocean-blue transition-colors">
                  Property Valuation
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-momentum-ocean-blue transition-colors">
                  Market Analysis
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-momentum-ocean-blue transition-colors">
                  Investment Consulting
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-momentum-ocean-blue transition-colors">
                  Property Management
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#" className="text-foreground/70 hover:text-momentum-ocean-blue transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-momentum-ocean-blue transition-colors">
                  Property Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-momentum-ocean-blue transition-colors">
                  Market Reports
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-momentum-ocean-blue transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-momentum-ocean-blue transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-momentum-ocean-blue transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-foreground/60">
          <p>© 2026 Ari. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <a href="#" className="text-foreground/60 hover:text-momentum-ocean-blue transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-foreground/60 hover:text-momentum-ocean-blue transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-foreground/60 hover:text-momentum-ocean-blue transition-colors">
                Cookie Policy
              </a>
              <a href="#" className="text-foreground/60 hover:text-momentum-ocean-blue transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

