'use client';

import { useState, useEffect } from 'react';
import { Search, Bed, Bath, Square, MapPin, ChevronRight, Building2, Home, Star } from 'lucide-react';
import { supabase, type Property } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    filterProperties();
  }, [properties, searchQuery, propertyType, priceRange]);

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
      setFilteredProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
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

    setFilteredProperties(filtered);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterProperties();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <nav className="border-b border-cyan-200/50 bg-white/80 backdrop-blur-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                PropSpace
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#properties" className="text-slate-600 hover:text-cyan-600 transition-colors">
                Properties
              </a>
              <a href="#about" className="text-slate-600 hover:text-cyan-600 transition-colors">
                About
              </a>
              <a href="#contact" className="text-slate-600 hover:text-cyan-600 transition-colors">
                Contact
              </a>
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-cyan-500/30">
                List Property
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-cyan-100/50 text-cyan-700 px-4 py-2 rounded-full mb-6 border border-cyan-200/50">
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">Find Your Perfect Space</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-cyan-800 to-blue-800 bg-clip-text text-transparent leading-tight">
              Discover Your
              <br />
              Dream Property
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Explore premium properties in prime locations. Modern living spaces designed for your lifestyle.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-cyan-200/50 shadow-2xl shadow-cyan-500/10 bg-white/90 backdrop-blur">
              <CardContent className="p-6">
                <form onSubmit={handleSearch}>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        type="text"
                        placeholder="Search by city, address, or title..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-12 border-slate-200 focus:border-cyan-400 focus:ring-cyan-400"
                      />
                    </div>

                    <Select value={propertyType} onValueChange={setPropertyType}>
                      <SelectTrigger className="h-12 border-slate-200 focus:border-cyan-400 focus:ring-cyan-400">
                        <SelectValue placeholder="Property Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={priceRange} onValueChange={setPriceRange}>
                      <SelectTrigger className="h-12 border-slate-200 focus:border-cyan-400 focus:ring-cyan-400">
                        <SelectValue placeholder="Price Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Prices</SelectItem>
                        <SelectItem value="0-2000">Under $2,000</SelectItem>
                        <SelectItem value="2000-4000">$2,000 - $4,000</SelectItem>
                        <SelectItem value="4000-6000">$4,000 - $6,000</SelectItem>
                        <SelectItem value="6000">Over $6,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    className="w-full mt-4 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-cyan-500/30"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search Properties
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur px-6 py-3 rounded-full border border-cyan-200/50 shadow-lg shadow-cyan-500/10">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-slate-700 font-medium">{properties.length}+ Properties Available</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur px-6 py-3 rounded-full border border-blue-200/50 shadow-lg shadow-blue-500/10">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-slate-700 font-medium">Verified Listings</span>
            </div>
          </div>
        </div>
      </section>

      <section id="properties" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-cyan-800 bg-clip-text text-transparent">
              Featured Properties
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Handpicked properties that match your lifestyle and preferences
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="h-64 bg-slate-200"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-slate-200 rounded mb-4"></div>
                    <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-10 h-10 text-slate-400" />
              </div>
              <p className="text-slate-600 text-lg">No properties found matching your criteria</p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setPropertyType('all');
                  setPriceRange('all');
                }}
                variant="outline"
                className="mt-4 border-cyan-300 text-cyan-700 hover:bg-cyan-50"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <Card
                  key={property.id}
                  className="group overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 border-2 border-transparent hover:border-cyan-200 bg-white"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={property.image_url}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {property.featured && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                        <Star className="w-3 h-3" />
                        <span>Featured</span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-medium text-slate-700 capitalize">
                      {property.property_type}
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-cyan-700 transition-colors">
                        {property.title}
                      </h3>
                      <div className="flex items-center text-slate-600 text-sm mb-3">
                        <MapPin className="w-4 h-4 mr-1 text-cyan-500" />
                        {property.city}, {property.state}
                      </div>
                      <p className="text-slate-600 text-sm line-clamp-2">
                        {property.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mb-4 py-3 border-t border-b border-slate-100">
                      <div className="flex items-center space-x-1 text-slate-600">
                        <Bed className="w-4 h-4 text-cyan-500" />
                        <span className="text-sm font-medium">{property.bedrooms}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-slate-600">
                        <Bath className="w-4 h-4 text-cyan-500" />
                        <span className="text-sm font-medium">{property.bathrooms}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-slate-600">
                        <Square className="w-4 h-4 text-cyan-500" />
                        <span className="text-sm font-medium">{property.area_sqft} sqft</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                          ${property.price.toLocaleString()}
                        </p>
                        <p className="text-xs text-slate-500">per month</p>
                      </div>
                      <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-cyan-500/30">
                        View Details
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="bg-gradient-to-br from-slate-900 via-cyan-900 to-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">PropSpace</span>
              </div>
              <p className="text-cyan-100 max-w-md">
                Your trusted partner in finding the perfect property. Modern living spaces designed for your lifestyle.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-cyan-100">
                <li><a href="#properties" className="hover:text-cyan-300 transition-colors">Properties</a></li>
                <li><a href="#about" className="hover:text-cyan-300 transition-colors">About Us</a></li>
                <li><a href="#contact" className="hover:text-cyan-300 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-cyan-100">
                <li>contact@propspace.com</li>
                <li>+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-cyan-800 pt-8 text-center text-cyan-200">
            <p>© 2024 PropSpace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
