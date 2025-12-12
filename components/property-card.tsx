'use client';

import { Bed, Bath, Square, MapPin, ChevronRight, Star, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { type Property } from '@/lib/supabase';
import { cn } from '@/lib/utils';

type PropertyCardProps = {
  property: Property;
  onViewDetails?: (property: Property) => void;
  onEdit?: (property: Property) => void;
  onDelete?: (property: Property) => void;
  showActions?: boolean;
  className?: string;
};

export function PropertyCard({
  property,
  onViewDetails,
  onEdit,
  onDelete,
  showActions = false,
  className,
}: PropertyCardProps) {
  return (
    <Card
      className={cn(
        'group overflow-hidden hover:shadow-lg transition-all duration-300 border border-border bg-card',
        className
      )}
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.image_url}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {property.featured && (
          <div className="absolute top-4 left-4 bg-momentum-crayola-yellow text-momentum-ocean-blue px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 shadow-md">
            <Star className="w-3 h-3 fill-momentum-ocean-blue" />
            <span>Featured</span>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-momentum-pale-violet/90 backdrop-blur px-3 py-1 rounded-full text-sm font-medium text-white capitalize shadow-md">
          {property.property_type}
        </div>
      </div>

      <CardContent className="p-4">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-foreground/80 transition-colors">
            {property.title}
          </h3>
          <div className="flex items-center text-foreground/70 text-sm mb-3">
            <MapPin className="w-4 h-4 mr-1 text-foreground/60" />
            {property.city}, {property.state}
          </div>
          <p className="text-foreground/70 text-sm line-clamp-2">
            {property.description}
          </p>
        </div>

        <div className="flex items-center justify-between mb-4 py-3 border-t border-b border-border">
          <div className="flex items-center space-x-1 text-foreground/70">
            <Bed className="w-4 h-4 text-foreground/60" />
            <span className="text-sm font-medium">{property.bedrooms}</span>
          </div>
          <div className="flex items-center space-x-1 text-foreground/70">
            <Bath className="w-4 h-4 text-foreground/60" />
            <span className="text-sm font-medium">{property.bathrooms}</span>
          </div>
          <div className="flex items-center space-x-1 text-foreground/70">
            <Square className="w-4 h-4 text-foreground/60" />
            <span className="text-sm font-medium">{property.area_sqft} sqft</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-foreground">
              ${property.price.toLocaleString()}
            </p>
            <p className="text-xs text-foreground/60">per month</p>
          </div>
          {showActions ? (
            <div className="flex gap-2">
              {onEdit && (
                <Button
                  onClick={() => onEdit(property)}
                  variant="outline"
                  size="sm"
                  className="border-momentum-ocean-blue text-momentum-ocean-blue hover:bg-momentum-ocean-blue hover:text-white rounded-momentum"
                >
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button
                  onClick={() => onDelete(property)}
                  variant="outline"
                  size="sm"
                  className="border-momentum-pale-violet/50 text-momentum-pale-violet hover:bg-momentum-pale-violet hover:text-white rounded-momentum"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
              {onViewDetails && (
                <Button
                  onClick={() => onViewDetails(property)}
                  className="bg-momentum-ocean-blue text-white hover:bg-momentum-ocean-blue/90 shadow-md hover:shadow-lg transition-all rounded-momentum"
                  size="sm"
                >
                  View
                </Button>
              )}
            </div>
          ) : (
            onViewDetails && (
              <Button
                onClick={() => onViewDetails(property)}
                className="bg-momentum-ocean-blue text-white hover:bg-momentum-ocean-blue/90 shadow-md hover:shadow-lg transition-all"
              >
                View Details
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}
