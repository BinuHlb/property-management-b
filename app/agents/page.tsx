'use client';

import { useState, useEffect, useRef } from 'react';
import { Star, Globe, Phone, Mail, Building2, Home, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/app/layout/Header';
import { Footer } from '@/app/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { PropertySearchFilter } from '@/components/features/property/property-search-filter';

// Mock agent data - replace with real data from your database
const mockAgents = [
  {
    id: '1',
    name: 'Kianoush Darban',
    title: 'Associate Partner',
    rating: 4.9,
    isSuperAgent: true,
    nationality: 'United Kingdom',
    languages: ['English', 'Persian/Farsi'],
    forSale: 32,
    forRent: 16,
    avatar: 'https://ui-avatars.com/api/?name=Kianoush+Darban&background=3B82F6&color=fff',
  },
  {
    id: '2',
    name: 'Artur Ahmedov',
    title: 'Senior Client Manager',
    rating: 4.0,
    isSuperAgent: true,
    nationality: 'Uzbekistan',
    languages: ['English', 'Russian', 'Uzbek'],
    forSale: 30,
    forRent: 0,
    avatar: 'https://ui-avatars.com/api/?name=Artur+Ahmedov&background=10B981&color=fff',
  },
  {
    id: '3',
    name: 'Darren Murphy',
    title: 'Partner - Allsopp and Allsopp Real Estate Broker',
    rating: 4.7,
    isSuperAgent: true,
    nationality: 'United Kingdom',
    languages: ['English'],
    forSale: 17,
    forRent: 0,
    avatar: 'https://ui-avatars.com/api/?name=Darren+Murphy&background=8B5CF6&color=fff',
  },
  {
    id: '4',
    name: 'Jordan Smith',
    title: 'Associate Director',
    rating: 5.0,
    isSuperAgent: true,
    nationality: 'United Kingdom',
    languages: ['English'],
    forSale: 17,
    forRent: 0,
    avatar: 'https://ui-avatars.com/api/?name=Jordan+Smith&background=F59E0B&color=fff',
  },
  {
    id: '5',
    name: 'Zeina Khoury',
    title: 'CEO',
    rating: 4.8,
    isSuperAgent: true,
    nationality: 'Lebanon',
    languages: ['English', 'Arabic'],
    forSale: 9,
    forRent: 6,
    avatar: 'https://ui-avatars.com/api/?name=Zeina+Khoury&background=EC4899&color=fff',
  },
  {
    id: '6',
    name: 'Ahmed Elsayed',
    title: 'Private Office Advisor',
    rating: 4.8,
    isSuperAgent: true,
    nationality: 'Egypt',
    languages: ['English', 'Arabic'],
    forSale: 37,
    forRent: 3,
    avatar: 'https://ui-avatars.com/api/?name=Ahmed+Elsayed&background=14B8A6&color=fff',
  },
];

export default function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'agents' | 'companies'>('agents');
  const [sortBy, setSortBy] = useState<'rating' | 'listings'>('rating');
  const [selectedNationality, setSelectedNationality] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const heroSectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const parallaxBgRef = useRef<HTMLDivElement>(null);

  const filteredAgents = mockAgents.filter((agent) => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesNationality = selectedNationality === 'all' || agent.nationality === selectedNationality;
    const matchesLanguage = selectedLanguage === 'all' || agent.languages.includes(selectedLanguage);
    return matchesSearch && matchesNationality && matchesLanguage;
  });

  const sortedAgents = [...filteredAgents].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return (b.forSale + b.forRent) - (a.forSale + a.forRent);
  });

  const allNationalities = Array.from(new Set(mockAgents.map(a => a.nationality)));
  const allLanguages = Array.from(new Set(mockAgents.flatMap(a => a.languages)));

  useEffect(() => {
    const handleScroll = () => {
      if (heroSectionRef.current) {
        const rect = heroSectionRef.current.getBoundingClientRect();
        const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;
        setIsHeroVisible(isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header isDarkMode={isHeroVisible} />

      {/* Hero Section */}
      <section ref={heroSectionRef} className="relative overflow-hidden pt-24 pb-20 px-4 sm:px-6 lg:px-8 text-white">
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
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[var(--font-playfair)] font-bold text-white mb-4">
              Find your agent to find a home
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Connect with experienced real estate professionals who can help you find your perfect property
            </p>
          </div>

          {/* Search and Filters */}
          <PropertySearchFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearchSubmit={(e) => e.preventDefault()}
            propertyType={filterType}
            onPropertyTypeChange={(value) => setFilterType(value as 'all' | 'agents' | 'companies')}
            priceRange={selectedNationality}
            onPriceRangeChange={(value) => setSelectedNationality(value)}
            placeholder="Search by agent name, title, or company..."
            variant="agent"
            quickFilters={[
              { label: 'Agents', value: 'agents', type: 'property', icon: Users },
              { label: 'Companies', value: 'companies', type: 'property', icon: Building2 },
            ]}
            propertyTypeOptions={[
              { label: 'All Types', value: 'all' },
              { label: 'Agents', value: 'agents' },
              { label: 'Companies', value: 'companies' },
            ]}
            priceRangeOptions={[
              { label: 'All Nationalities', value: 'all' },
              ...allNationalities.map(nat => ({ label: nat, value: nat })),
            ]}
          />
        </div>
      </section>

      {/* SuperAgent Banner */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-momentum-pale-violet/10 via-momentum-ocean-blue/5 to-momentum-powder-pink/10 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-[var(--font-playfair)] font-bold text-foreground mb-2">
                Find your SuperAgent
              </h2>
              <p className="text-foreground/70">
                The most responsive agents with up-to-date and improved accuracy on the properties you are searching for.
              </p>
            </div>
            <Button className="bg-momentum-ocean-blue text-white hover:bg-momentum-ocean-blue/90 shadow-md hover:shadow-lg rounded-momentum transition-all">
              Learn more
            </Button>
          </div>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-foreground/70">
              {sortedAgents.length} {sortedAgents.length === 1 ? 'agent' : 'agents'} found
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedAgents.map((agent) => (
              <Card
                key={agent.id}
                className="border border-border bg-card hover:shadow-lg transition-all duration-300 group rounded-momentum overflow-hidden"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-momentum-pale-violet/30 shadow-sm">
                        <img
                          src={agent.avatar}
                          alt={agent.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {agent.isSuperAgent && (
                        <div className="absolute -bottom-1 -right-1 bg-momentum-crayola-yellow rounded-full p-1.5 shadow-md border-2 border-white">
                          <Star className="w-3 h-3 text-momentum-ocean-blue fill-momentum-ocean-blue" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-foreground text-lg leading-tight">
                          {agent.name}
                        </h3>
                        {agent.isSuperAgent && (
                          <Badge className="bg-momentum-crayola-yellow/20 text-momentum-ocean-blue border-momentum-crayola-yellow/40 rounded-full px-2.5 py-0.5 text-xs font-semibold">
                            SuperAgent
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-foreground/60 mb-2">{agent.title}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-momentum-crayola-yellow fill-momentum-crayola-yellow" />
                        <span className="text-sm font-semibold text-foreground">{agent.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5 mb-5">
                    <div className="flex items-center gap-2 text-sm text-foreground/70 bg-muted/50 px-3 py-2 rounded-momentum">
                      <Globe className="w-4 h-4 text-momentum-ocean-blue" />
                      <span><span className="text-foreground font-medium">{agent.nationality}</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground/70 bg-muted/50 px-3 py-2 rounded-momentum">
                      <span className="w-4 h-4 flex items-center justify-center text-momentum-pale-violet">🌐</span>
                      <span><span className="text-foreground font-medium">{agent.languages.join(', ')}</span></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-border mb-4">
                    <div className="flex-1 flex items-center gap-3">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-momentum-ocean-blue/10 rounded-momentum">
                        <Home className="w-4 h-4 text-momentum-ocean-blue" />
                        <span className="text-sm font-semibold text-foreground">{agent.forSale}</span>
                        <span className="text-xs text-foreground/60">sale</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-momentum-pale-violet/10 rounded-momentum">
                        <Building2 className="w-4 h-4 text-momentum-pale-violet" />
                        <span className="text-sm font-semibold text-foreground">{agent.forRent}</span>
                        <span className="text-xs text-foreground/60">rent</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 border-momentum-ocean-blue/30 text-momentum-ocean-blue hover:bg-momentum-ocean-blue hover:text-white rounded-momentum transition-all"
                      size="sm"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-momentum-pale-violet/30 text-momentum-pale-violet hover:bg-momentum-pale-violet hover:text-white rounded-momentum transition-all"
                      size="sm"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

