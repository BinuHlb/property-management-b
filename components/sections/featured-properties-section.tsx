'use client';

import { type Property } from '@/lib/supabase';
import { PropertyList } from '@/components/features/property/property-list';
import Link from 'next/link';

type FeaturedPropertiesSectionProps = {
  properties: Property[];
  loading: boolean;
  onViewDetails?: (property: Property) => void;
  onClearFilters?: () => void;
};

export function FeaturedPropertiesSection({
  properties,
  loading,
  onViewDetails,
  onClearFilters,
}: FeaturedPropertiesSectionProps) {
  return (
    <section id="properties" className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl momentum-heading mb-3 text-momentum-ocean-blue">
            Featured Properties
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-base">
            Handpicked properties that match your lifestyle and preferences
          </p>
        </div>

        <PropertyList
          properties={properties}
          loading={loading}
          onViewDetails={onViewDetails}
          emptyMessage="No properties found matching your criteria"
          emptyAction={
            onClearFilters
              ? {
                  label: 'Clear Filters',
                  onClick: onClearFilters,
                }
              : undefined
          }
          gridCols="3"
        />
        
        {!loading && properties.length > 0 && (
          <div className="flex justify-center mt-10">
            <Link 
              href="/login" 
              className="text-momentum-ocean-blue hover:text-momentum-ocean-blue/80 font-medium transition-colors underline-offset-4 hover:underline"
            >
              View more
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
