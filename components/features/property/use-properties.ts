import { useState, useEffect } from 'react';
import { supabase, type Property } from '@/lib/supabase';
import { mockProperties } from '@/lib/mock-properties';
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
      // Check if Supabase is configured (not using default example values)
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
      
      const isSupabaseConfigured = 
        supabaseUrl && 
        supabaseUrl !== 'https://example.supabase.co' &&
        supabaseKey &&
        supabaseKey !== 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example';

      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('status', 'available')
          .order('featured', { ascending: false })
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        // Use Supabase data if available, otherwise fallback to mock data
        if (data && data.length > 0) {
          setProperties(data);
        } else {
          // No data in Supabase, use mock data
          console.warn('No properties found in Supabase, using mock data');
          setProperties(mockProperties);
        }
      } else {
        // Supabase not configured, use mock data
        console.warn('Supabase not configured, using mock data');
        setProperties(mockProperties);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
      // On error, fallback to mock data
      console.warn('Falling back to mock data due to error');
      setProperties(mockProperties);
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
