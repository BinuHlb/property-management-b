import { useState, useEffect } from 'react';
import { supabase, type Property } from '@/lib/supabase';
import { filterProperties, type PropertyFilterState } from './property-filters';

export function useProperties(initialFilters?: PropertyFilterState) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<PropertyFilterState>(
    initialFilters || {
      searchQuery: '',
      propertyType: 'all',
      priceRange: 'all',
    }
  );

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    const filtered = filterProperties(properties, filters);
    setFilteredProperties(filtered);
  }, [properties, filters]);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('status', 'available')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters: Partial<PropertyFilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      searchQuery: '',
      propertyType: 'all',
      priceRange: 'all',
    });
  };

  return {
    properties,
    filteredProperties,
    loading,
    filters,
    updateFilters,
    clearFilters,
  };
}
