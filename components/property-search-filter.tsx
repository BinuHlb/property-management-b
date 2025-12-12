'use client';

import { Search, X, ChevronDown, Building2, Home, DollarSign, Key, RotateCcw, Users, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type PropertySearchFilterProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  propertyType: string;
  onPropertyTypeChange: (value: string) => void;
  priceRange: string;
  onPriceRangeChange: (value: string) => void;
  placeholder?: string;
  // Optional customization for different use cases
  variant?: 'property' | 'agent';
  quickFilters?: Array<{ label: string; value: string; type: 'property' | 'price'; icon: any }>;
  propertyTypeOptions?: Array<{ label: string; value: string }>;
  priceRangeOptions?: Array<{ label: string; value: string }>;
};

const defaultQuickFilters = [
  { label: 'Apartments', value: 'apartment', type: 'property' as const, icon: Building2 },
  { label: 'Houses', value: 'house', type: 'property' as const, icon: Home },
  { label: 'Condos', value: 'condo', type: 'property' as const, icon: Building2 },
  { label: 'Under $2K', value: '0-2000', type: 'price' as const, icon: DollarSign },
  { label: '$2K - $4K', value: '2000-4000', type: 'price' as const, icon: DollarSign },
  { label: 'Over $6K', value: '6000', type: 'price' as const, icon: DollarSign },
];

const defaultPropertyTypeOptions = [
  { label: 'All Types', value: 'all' },
  { label: 'Apartment', value: 'apartment' },
  { label: 'House', value: 'house' },
  { label: 'Condo', value: 'condo' },
  { label: 'Villa', value: 'villa' },
  { label: 'Townhouse', value: 'townhouse' },
];

const defaultPriceRangeOptions = [
  { label: 'All Prices', value: 'all' },
  { label: 'Under $2,000', value: '0-2000' },
  { label: '$2,000 - $4,000', value: '2000-4000' },
  { label: '$4,000 - $6,000', value: '4000-6000' },
  { label: 'Over $6,000', value: '6000' },
];

// Color rotation for icons (matching carousel style)
const iconColors = [
  'bg-momentum-ocean-blue',
  'bg-momentum-pale-violet',
  'bg-momentum-powder-pink',
  'bg-momentum-crayola-yellow',
  'bg-momentum-diamond-blue',
];

export function PropertySearchFilter({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  propertyType,
  onPropertyTypeChange,
  priceRange,
  onPriceRangeChange,
  placeholder = 'Search by city, address, or title...',
  variant = 'property',
  quickFilters = defaultQuickFilters,
  propertyTypeOptions = defaultPropertyTypeOptions,
  priceRangeOptions = defaultPriceRangeOptions,
}: PropertySearchFilterProps) {
  const hasActiveFilters = propertyType !== 'all' || priceRange !== 'all' || searchQuery.length > 0;

  const clearAllFilters = () => {
    onPropertyTypeChange('all');
    onPriceRangeChange('all');
    onSearchChange('');
    setTimeout(() => {
      const form = document.querySelector('form');
      if (form) {
        const event = new Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(event);
      }
    }, 0);
  };

  const handleQuickFilter = (filter: { label: string; value: string; type: string; icon: any }) => {
    if (filter.type === 'property') {
      onPropertyTypeChange(filter.value);
    } else if (filter.type === 'price') {
      onPriceRangeChange(filter.value);
    }
    setTimeout(() => {
      const form = document.querySelector('form');
      if (form) {
        const event = new Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(event);
      }
    }, 0);
  };

  const handleSelectChange = (type: 'property' | 'price', value: string) => {
    if (type === 'property') {
      onPropertyTypeChange(value);
    } else {
      onPriceRangeChange(value);
    }
    setTimeout(() => {
      const form = document.querySelector('form');
      if (form) {
        const event = new Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(event);
      }
    }, 0);
  };

  // Get labels based on variant
  const propertyTypeLabel = variant === 'agent' ? 'Type' : 'Type';
  const priceRangeLabel = variant === 'agent' ? 'Filter' : 'Price';

  return (
    <div className="max-w-5xl mx-auto mb-8">
      {/* Main Search Input - Pill-shaped with integrated controls */}
      <form onSubmit={onSearchSubmit} className="mb-6">
        <div className="relative">
          {/* Large pill-shaped input - Light mode solid */}
          <div className="relative flex items-center bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
            {/* Left side - Search icon */}
            <div className="pl-6">
              <Search className="w-5 h-5 text-foreground/60" />
            </div>

            {/* Main input field */}
            <Input
              type="text"
              placeholder={placeholder}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="flex-1 h-14 bg-transparent border-0 text-foreground placeholder:text-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0 px-4 text-base font-medium"
            />

            {/* Integrated controls on the right */}
            <div className="flex items-center gap-2 pr-2">
              {/* Property Type Selector - Integrated */}
              <Select 
                value={propertyType} 
                onValueChange={(value) => handleSelectChange('property', value)}
              >
                <SelectTrigger className="h-10 px-4 py-2 border-0 bg-muted hover:bg-muted/80 text-foreground focus:ring-0 focus:border-0 rounded-full text-sm font-semibold min-w-[110px] [&>svg]:text-foreground/60">
                  <SelectValue placeholder={propertyTypeLabel} />
                </SelectTrigger>
                <SelectContent className="bg-white rounded-xl shadow-lg">
                  {propertyTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-foreground font-medium">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Price Range Selector - Integrated */}
              <Select 
                value={priceRange} 
                onValueChange={(value) => handleSelectChange('price', value)}
              >
                <SelectTrigger className="h-10 px-4 py-2 border-0 bg-muted hover:bg-muted/80 text-foreground focus:ring-0 focus:border-0 rounded-full text-sm font-semibold min-w-[120px] [&>svg]:text-foreground/60">
                  <SelectValue placeholder={priceRangeLabel} />
                </SelectTrigger>
                <SelectContent className="bg-white rounded-xl shadow-lg">
                  {priceRangeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-foreground font-medium">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

            </div>
          </div>
        </div>
      </form>

      {/* Quick Filter Chips - Glass effect pills with icons */}
      {quickFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {quickFilters.map((filter, index) => {
            const isActive = 
              (filter.type === 'property' && filter.value === propertyType) || 
              (filter.type === 'price' && filter.value === priceRange);
            
            const IconComponent = filter.icon;
            const iconColorIndex = index % iconColors.length;
            
            return (
              <button
                key={`${filter.type}-${filter.value}`}
                type="button"
                onClick={() => handleQuickFilter(filter)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'bg-momentum-pale-violet text-white shadow-sm'
                    : 'bg-muted text-foreground/80 hover:bg-muted/80'
                }`}
              >
                {/* Icon with circular background - matching carousel style */}
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white flex-shrink-0 ${
                  isActive 
                    ? iconColors[iconColorIndex]
                    : 'bg-foreground/20'
                }`}>
                  <IconComponent className="w-3 h-3" />
                </div>
                <span>{filter.label}</span>
              </button>
            );
          })}
          
          {/* Clear All Filters Button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 bg-muted text-foreground/80 hover:bg-muted/80 flex items-center gap-2"
            >
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-white flex-shrink-0 bg-foreground/40">
                <RotateCcw className="w-3 h-3" />
              </div>
              <span>Clear all</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
