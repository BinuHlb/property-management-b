'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

type HeaderProps = {
  isDarkMode?: boolean;
};

export function Header({ isDarkMode = false }: HeaderProps) {
  return (
    <nav className={`backdrop-blur-md fixed w-full z-50 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-slate-900/80' 
        : 'bg-secondary/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center space-x-6">
            <Link href="/" className="cursor-pointer">
              <Logo className={`text-xl ${isDarkMode ? 'text-white' : ''}`} />
            </Link>
            <div className="hidden md:flex items-center space-x-4">
              <Link 
                href="/rent" 
                className={`transition-colors ${
                  isDarkMode 
                    ? 'text-slate-300 hover:text-white' 
                    : 'text-foreground/80 hover:text-foreground'
                }`}
              >
                Rent
              </Link>
              <Link 
                href="/buy" 
                className={`transition-colors ${
                  isDarkMode 
                    ? 'text-slate-300 hover:text-white' 
                    : 'text-foreground/80 hover:text-foreground'
                }`}
              >
                Buy
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/#properties" 
              className={`transition-colors ${
                isDarkMode 
                  ? 'text-slate-300 hover:text-white' 
                  : 'text-foreground/80 hover:text-foreground'
              }`}
            >
              Properties
            </Link>
            <Link 
              href="/agents" 
              className={`transition-colors ${
                isDarkMode 
                  ? 'text-slate-300 hover:text-white' 
                  : 'text-foreground/80 hover:text-foreground'
              }`}
            >
              Agents
            </Link>
            <Link 
              href="/login" 
              className={`transition-colors ${
                isDarkMode 
                  ? 'text-slate-300 hover:text-white' 
                  : 'text-foreground/80 hover:text-foreground'
              }`}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

