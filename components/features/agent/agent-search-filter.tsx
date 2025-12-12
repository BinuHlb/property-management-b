'use client';

import { Search, CornerDownLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type AgentSearchFilterProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  filterType: 'all' | 'agents' | 'companies';
  onFilterTypeChange: (value: 'all' | 'agents' | 'companies') => void;
  selectedNationality: string;
  onNationalityChange: (value: string) => void;
  selectedLanguage: string;
  onLanguageChange: (value: string) => void;
  sortBy: string;
  onSortByChange: (value: string) => void;
  nationalities: string[];
  languages: string[];
  placeholder?: string;
};

export function AgentSearchFilter({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  filterType,
  onFilterTypeChange,
  selectedNationality,
  onNationalityChange,
  selectedLanguage,
  onLanguageChange,
  sortBy,
  onSortByChange,
  nationalities,
  languages,
  placeholder = 'Search by agent name, title, or company...',
}: AgentSearchFilterProps) {
  return (
    <div className="max-w-3xl mx-auto mb-12">
      <Card className="border border-momentum-pale-violet/30 shadow-lg bg-white/95 backdrop-blur rounded-momentum">
        <CardContent className="p-6">
          <form onSubmit={onSearchSubmit} className="space-y-3">
            {/* Filter Type Chips */}
            <div className="flex items-center gap-2">
              <span className="text-foreground/60 text-sm">Type:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onFilterTypeChange('agents')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    filterType === 'agents'
                      ? 'bg-momentum-ocean-blue text-white shadow-sm'
                      : 'bg-momentum-pale-violet/20 text-foreground/70 hover:bg-momentum-pale-violet/30'
                  }`}
                >
                  Agents
                </button>
                <button
                  type="button"
                  onClick={() => onFilterTypeChange('companies')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    filterType === 'companies'
                      ? 'bg-momentum-powder-pink text-white shadow-sm'
                      : 'bg-momentum-pale-violet/20 text-foreground/70 hover:bg-momentum-pale-violet/30'
                  }`}
                >
                  Companies
                </button>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <Input
                type="text"
                placeholder={placeholder}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onSearchSubmit(e);
                  }
                }}
                className="w-full pl-12 pr-12 h-12 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-foreground focus:ring-0"
              />
              <Button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 w-9 p-0 bg-momentum-ocean-blue text-white hover:bg-momentum-ocean-blue/90 rounded-md shadow-md"
              >
                <CornerDownLeft className="w-4 h-4" />
                <span className="sr-only">Apply filters</span>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/70">
              <div className="flex items-center gap-2">
                <span className="text-foreground/60">Nationality:</span>
                <Select value={selectedNationality} onValueChange={onNationalityChange}>
                  <SelectTrigger className="h-auto px-0 py-1 border-0 bg-transparent text-foreground underline-offset-4 hover:underline focus:ring-0 focus:border-0 focus-visible:outline-none">
                    <SelectValue placeholder="All Nationalities" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="all" className="text-foreground">All Nationalities</SelectItem>
                    {nationalities.map((nat) => (
                      <SelectItem key={nat} value={nat} className="text-foreground">{nat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-foreground/60">Language:</span>
                <Select value={selectedLanguage} onValueChange={onLanguageChange}>
                  <SelectTrigger className="h-auto px-0 py-1 border-0 bg-transparent text-foreground underline-offset-4 hover:underline focus:ring-0 focus:border-0 focus-visible:outline-none">
                    <SelectValue placeholder="All Languages" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="all" className="text-foreground">All Languages</SelectItem>
                    {languages.map((lang) => (
                      <SelectItem key={lang} value={lang} className="text-foreground">{lang}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-foreground/60">Sort:</span>
                <Select value={sortBy} onValueChange={onSortByChange}>
                  <SelectTrigger className="h-auto px-0 py-1 border-0 bg-transparent text-foreground underline-offset-4 hover:underline focus:ring-0 focus:border-0 focus-visible:outline-none">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="rating" className="text-foreground">Highest Rating</SelectItem>
                    <SelectItem value="listings" className="text-foreground">Most Listings</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
