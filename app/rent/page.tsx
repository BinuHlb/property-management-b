'use client';

import { useState, useEffect } from 'react';
import { Bed, Bath, Square, MapPin, ChevronRight, Home, Star, Filter } from 'lucide-react';
import { supabase, type Property } from '@/lib/supabase';
import { mockProperties } from '@/lib/mock-properties';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/app/layout/Header';
import { Footer } from '@/app/layout/Footer';
import { PropertyFilterSidebar } from '@/components/features/property/property-filter-sidebar';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function RentPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [bedrooms, setBedrooms] = useState('all');
  const [bathrooms, setBathrooms] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    filterProperties();
  }, [properties, searchQuery, propertyType, priceRange, bedrooms, bathrooms]);

  const fetchProperties = async () => {
    try {
      // Check if Supabase is configured
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
        
        if (data && data.length > 0) {
          setProperties(data);
          setFilteredProperties(data);
        } else {
          console.warn('No properties found in Supabase, using mock data');
          const mockRentProperties = mockProperties.filter(p => p.status === 'available');
          setProperties(mockRentProperties);
          setFilteredProperties(mockRentProperties);
        }
      } else {
        console.warn('Supabase not configured, using mock data');
        const mockRentProperties = mockProperties.filter(p => p.status === 'available');
        setProperties(mockRentProperties);
        setFilteredProperties(mockRentProperties);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
      console.warn('Falling back to mock data due to error');
      const mockRentProperties = mockProperties.filter(p => p.status === 'available');
      setProperties(mockRentProperties);
      setFilteredProperties(mockRentProperties);
    } finally {
      setLoading(false);
    }
  };

  const filterProperties = () => {
    let filtered = [...properties];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (prop) =>
          prop.title.toLowerCase().includes(query) ||
          prop.city.toLowerCase().includes(query) ||
          prop.address.toLowerCase().includes(query)
      );
    }

    if (propertyType !== 'all') {
      filtered = filtered.filter((prop) => prop.property_type === propertyType);
    }

    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      if (max) {
        filtered = filtered.filter((prop) => prop.price >= min && prop.price <= max);
      } else {
        filtered = filtered.filter((prop) => prop.price >= min);
      }
    }

    if (bedrooms !== 'all') {
      filtered = filtered.filter((prop) => prop.bedrooms >= Number(bedrooms));
    }

    if (bathrooms !== 'all') {
      filtered = filtered.filter((prop) => prop.bathrooms >= Number(bathrooms));
    }

    setFilteredProperties(filtered);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setPropertyType('all');
    setPriceRange('all');
    setBedrooms('all');
    setBathrooms('all');
  };

  const handleSearch = () => {
    filterProperties();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isDarkMode={false} />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl momentum-heading mb-3 text-momentum-ocean-blue">
                Rent Properties
              </h1>
              <p className="text-foreground/70 text-base max-w-2xl">
                Find your perfect rental property. Browse through our curated selection of available properties.
              </p>
            </div>
            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="lg:hidden border-momentum-ocean-blue text-momentum-ocean-blue hover:bg-momentum-ocean-blue hover:text-white"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <PropertyFilterSidebar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    propertyType={propertyType}
                    onPropertyTypeChange={setPropertyType}
                    priceRange={priceRange}
                    onPriceRangeChange={setPriceRange}
                    bedrooms={bedrooms}
                    onBedroomsChange={setBedrooms}
                    bathrooms={bathrooms}
                    onBathroomsChange={setBathrooms}
                    onClearFilters={handleClearFilters}
                    onSearch={handleSearch}
                    sticky={false}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex gap-8">
            {/* Sticky Sidebar */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <PropertyFilterSidebar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                propertyType={propertyType}
                onPropertyTypeChange={setPropertyType}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                bedrooms={bedrooms}
                onBedroomsChange={setBedrooms}
                bathrooms={bathrooms}
                onBathroomsChange={setBathrooms}
                onClearFilters={handleClearFilters}
                onSearch={handleSearch}
              />
            </div>

            {/* Properties Grid */}
            <div className="flex-1 min-w-0">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-foreground/70">
                  {loading ? 'Loading...' : `${filteredProperties.length} ${filteredProperties.length === 1 ? 'property' : 'properties'} found`}
                </p>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="overflow-hidden animate-pulse border-border">
                      <div className="h-64 bg-muted"></div>
                      <CardContent className="p-6">
                        <div className="h-4 bg-muted rounded mb-4"></div>
                        <div className="h-4 bg-muted rounded w-2/3"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filteredProperties.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Home className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <p className="text-foreground/70 text-lg mb-2">No properties found matching your criteria</p>
                  <p className="text-foreground/50 text-sm mb-4">Try adjusting your filters</p>
                  <Button
                    onClick={handleClearFilters}
                    variant="outline"
                    className="border-momentum-ocean-blue text-momentum-ocean-blue hover:bg-momentum-ocean-blue hover:text-white"
                  >
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProperties.map((property) => (
                      <Card
                        key={property.id}
                        className="group overflow-hidden hover:shadow-lg transition-all duration-300 border border-border bg-card"
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
                            <Button className="bg-momentum-ocean-blue text-white hover:bg-momentum-ocean-blue/90 shadow-md hover:shadow-lg transition-all">
                              View Details
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
