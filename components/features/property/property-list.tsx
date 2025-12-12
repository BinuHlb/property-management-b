'use client';

import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PropertyCard } from './property-card';
import { type Property } from '@/lib/supabase';
import { cn } from '@/lib/utils';

type PropertyListProps = {
  properties: Property[];
  loading?: boolean;
  onViewDetails?: (property: Property) => void;
  onEdit?: (property: Property) => void;
  onDelete?: (property: Property) => void;
  showActions?: boolean;
  emptyMessage?: string;
  emptyAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  gridCols?: '1' | '2' | '3' | '4';
};

export function PropertyList({
  properties,
  loading = false,
  onViewDetails,
  onEdit,
  onDelete,
  showActions = false,
  emptyMessage = 'No properties found',
  emptyAction,
  className,
  gridCols = '3',
}: PropertyListProps) {
  const gridClasses = {
    '1': 'grid-cols-1',
    '2': 'grid-cols-1 md:grid-cols-2',
    '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  if (loading) {
    return (
      <div className={cn('grid gap-6', gridClasses[gridCols], className)}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden animate-pulse border-border">
            <div className="h-64 bg-muted"></div>
            <CardContent className="p-4">
              <div className="h-4 bg-muted rounded mb-4"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Home className="w-10 h-10 text-muted-foreground" />
        </div>
        <p className="text-foreground/70 text-lg mb-2">{emptyMessage}</p>
        {emptyAction && (
          <Button
            onClick={emptyAction.onClick}
            variant="outline"
            className="mt-4 border-momentum-ocean-blue text-momentum-ocean-blue hover:bg-momentum-ocean-blue hover:text-white"
          >
            {emptyAction.label}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={cn('grid gap-6', gridClasses[gridCols], className)}>
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onViewDetails={onViewDetails}
          onEdit={onEdit}
          onDelete={onDelete}
          showActions={showActions}
        />
      ))}
    </div>
  );
}
