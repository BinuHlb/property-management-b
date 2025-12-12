import { type Property } from '@/lib/supabase';

export type PropertyFilterState = {
  searchQuery: string;
  propertyType: string;
  priceRange: string;
};

export function filterProperties(
  properties: Property[],
  filters: PropertyFilterState
): Property[] {
  let filtered = [...properties];

  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (prop) =>
        prop.title.toLowerCase().includes(query) ||
        prop.city.toLowerCase().includes(query) ||
        prop.address.toLowerCase().includes(query)
    );
  }

  if (filters.propertyType !== 'all') {
    filtered = filtered.filter((prop) => prop.property_type === filters.propertyType);
  }

  if (filters.priceRange !== 'all') {
    const [min, max] = filters.priceRange.split('-').map(Number);
    if (max) {
      filtered = filtered.filter((prop) => prop.price >= min && prop.price <= max);
    } else {
      filtered = filtered.filter((prop) => prop.price >= min);
    }
  }

  return filtered;
}
