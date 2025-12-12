'use client';

import { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

type PropertyFilterSidebarProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  propertyType: string;
  onPropertyTypeChange: (value: string) => void;
  priceRange: string;
  onPriceRangeChange: (value: string) => void;
  bedrooms: string;
  onBedroomsChange: (value: string) => void;
  bathrooms: string;
  onBathroomsChange: (value: string) => void;
  onClearFilters: () => void;
  onSearch: () => void;
  sticky?: boolean;
};

const propertyTypes = [
  { value: 'all', label: 'All' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'house', label: 'House' },
  { value: 'condo', label: 'Condo' },
  { value: 'villa', label: 'Villa' },
  { value: 'townhouse', label: 'Townhouse' },
];

const bedroomOptions = [
  { value: 'all', label: 'Any' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
  { value: '5', label: '5+' },
];

const bathroomOptions = [
  { value: 'all', label: 'Any' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
];

export function PropertyFilterSidebar({
  searchQuery,
  onSearchChange,
  propertyType,
  onPropertyTypeChange,
  priceRange,
  onPriceRangeChange,
  bedrooms,
  onBedroomsChange,
  bathrooms,
  onBathroomsChange,
  onClearFilters,
  onSearch,
  sticky = true,
}: PropertyFilterSidebarProps) {
  // Parse price range to slider values
  const getPriceFromRange = () => {
    if (priceRange === 'all') return [0, 10000];
    if (priceRange.includes('-')) {
      const [min, max] = priceRange.split('-').map(Number);
      return [min, max];
    }
    return [Number(priceRange), 10000];
  };
  
  const [priceSliderValue, setPriceSliderValue] = useState<number[]>(getPriceFromRange());
  
  // Update slider when priceRange prop changes
  useEffect(() => {
    const newValue = priceRange === 'all' 
      ? [0, 10000]
      : priceRange.includes('-')
      ? priceRange.split('-').map(Number)
      : [Number(priceRange), 10000];
    setPriceSliderValue(newValue);
  }, [priceRange]);

  const handlePriceSliderChange = (value: number[]) => {
    setPriceSliderValue(value);
    if (value[0] === 0 && value[1] === 10000) {
      onPriceRangeChange('all');
    } else if (value[1] === 10000) {
      onPriceRangeChange(value[0].toString());
    } else {
      onPriceRangeChange(`${value[0]}-${value[1]}`);
    }
  };

  const hasActiveFilters = 
    searchQuery !== '' ||
    propertyType !== 'all' ||
    priceRange !== 'all' ||
    bedrooms !== 'all' ||
    bathrooms !== 'all';

  return (
    <aside className={sticky ? "sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto" : ""}>
      <div className="bg-white rounded-lg border border-border/50 shadow-sm">
        {/* Header */}
        <div className="px-4 pt-4 pb-3 border-b border-border/50">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Filters</h2>
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        <div className="px-4 py-4 space-y-6">
          {/* Property Type - Chip Style */}
          <div>
            <h3 className="text-xs font-medium text-foreground/50 uppercase tracking-wider mb-4">
              Property Type
            </h3>
            <div className="flex flex-wrap gap-2">
              {propertyTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => onPropertyTypeChange(type.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    propertyType === type.value
                      ? 'bg-momentum-ocean-blue text-white shadow-sm'
                      : 'bg-white border border-border/50 text-foreground/70 hover:border-momentum-pale-violet/50'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <Separator className="bg-border/50" />

          {/* Price Range - Slider */}
          <div>
            <h3 className="text-xs font-medium text-foreground/50 uppercase tracking-wider mb-4">
              Price Range
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm font-medium text-foreground">
                <span>${priceSliderValue[0].toLocaleString()}</span>
                <span>${priceSliderValue[1] === 10000 ? '10,000+' : priceSliderValue[1].toLocaleString()}</span>
              </div>
              <Slider
                value={priceSliderValue}
                onValueChange={handlePriceSliderChange}
                min={0}
                max={10000}
                step={100}
                className="w-full"
              />
            </div>
          </div>

          <Separator className="bg-border/50" />

          {/* Options - Checkbox Style */}
          <div>
            <h3 className="text-xs font-medium text-foreground/50 uppercase tracking-wider mb-4">
              Options
            </h3>
            <div className="space-y-0">
              {/* Bedrooms */}
              <div className="flex items-center justify-between py-3 border-b border-border/30">
                <label className="flex items-center gap-3 cursor-pointer flex-1">
                  <Checkbox
                    checked={bedrooms !== 'all'}
                    onCheckedChange={(checked) => {
                      if (checked && bedrooms === 'all') {
                        onBedroomsChange('1');
                      } else if (!checked) {
                        onBedroomsChange('all');
                      }
                    }}
                    className="border-momentum-ocean-blue data-[state=checked]:bg-momentum-ocean-blue data-[state=checked]:border-momentum-ocean-blue"
                  />
                  <span className={`text-sm font-medium ${
                    bedrooms !== 'all' ? 'text-momentum-ocean-blue' : 'text-foreground/60'
                  }`}>
                    Bedrooms
                  </span>
                </label>
                {bedrooms !== 'all' && (
                  <select
                    value={bedrooms}
                    onChange={(e) => onBedroomsChange(e.target.value)}
                    className="text-sm text-momentum-ocean-blue font-medium bg-transparent border-none outline-none cursor-pointer"
                  >
                    {bedroomOptions.slice(1).map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Bathrooms */}
              <div className="flex items-center justify-between py-3 border-b border-border/30">
                <label className="flex items-center gap-3 cursor-pointer flex-1">
                  <Checkbox
                    checked={bathrooms !== 'all'}
                    onCheckedChange={(checked) => {
                      if (checked && bathrooms === 'all') {
                        onBathroomsChange('1');
                      } else if (!checked) {
                        onBathroomsChange('all');
                      }
                    }}
                    className="border-momentum-ocean-blue data-[state=checked]:bg-momentum-ocean-blue data-[state=checked]:border-momentum-ocean-blue"
                  />
                  <span className={`text-sm font-medium ${
                    bathrooms !== 'all' ? 'text-momentum-ocean-blue' : 'text-foreground/60'
                  }`}>
                    Bathrooms
                  </span>
                </label>
                {bathrooms !== 'all' && (
                  <select
                    value={bathrooms}
                    onChange={(e) => onBathroomsChange(e.target.value)}
                    className="text-sm text-momentum-ocean-blue font-medium bg-transparent border-none outline-none cursor-pointer"
                  >
                    {bathroomOptions.slice(1).map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="px-4 pb-4 pt-3 border-t border-border/50">
          <Button
            onClick={onSearch}
            className="w-full h-10 bg-momentum-ocean-blue text-white hover:bg-momentum-ocean-blue/90 rounded-lg font-medium shadow-sm transition-all text-sm"
          >
            Search
          </Button>
        </div>
      </div>
    </aside>
  );
}
