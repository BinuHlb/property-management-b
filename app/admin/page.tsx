'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Search, Home, Building2 } from 'lucide-react';
import { supabase, type Property } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/app/layout/Header';
import { Footer } from '@/app/layout/Footer';
import { PropertyList } from '@/components/property-list';
import { PropertyFormDrawer } from '@/components/property-form-drawer';

export default function AdminPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    property_type: 'apartment',
    status: 'available',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area_sqft: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    image_url: '',
    featured: false,
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    filterProperties();
  }, [properties, searchQuery]);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
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
    if (!searchQuery) {
      setFilteredProperties(properties);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = properties.filter(
      (prop) =>
        prop.title.toLowerCase().includes(query) ||
        prop.city.toLowerCase().includes(query) ||
        prop.address.toLowerCase().includes(query) ||
        prop.property_type.toLowerCase().includes(query)
    );
    setFilteredProperties(filtered);
  };

  const handleAddNew = () => {
    setEditingProperty(null);
    setFormData({
      title: '',
      description: '',
      property_type: 'apartment',
      status: 'available',
      price: '',
      bedrooms: '',
      bathrooms: '',
      area_sqft: '',
      address: '',
      city: '',
      state: '',
      zip_code: '',
      image_url: '',
      featured: false,
    });
    setIsDrawerOpen(true);
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setFormData({
      title: property.title,
      description: property.description,
      property_type: property.property_type,
      status: property.status,
      price: property.price.toString(),
      bedrooms: property.bedrooms.toString(),
      bathrooms: property.bathrooms.toString(),
      area_sqft: property.area_sqft.toString(),
      address: property.address,
      city: property.city,
      state: property.state,
      zip_code: property.zip_code,
      image_url: property.image_url,
      featured: property.featured,
    });
    setIsDrawerOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;

    try {
      const { error } = await supabase.from('properties').delete().eq('id', id);
      if (error) throw error;
      fetchProperties();
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Failed to delete property');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const propertyData = {
        title: formData.title,
        description: formData.description,
        property_type: formData.property_type,
        status: formData.status,
        price: parseFloat(formData.price),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        area_sqft: parseInt(formData.area_sqft),
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zip_code,
        image_url: formData.image_url,
        featured: formData.featured,
        updated_at: new Date().toISOString(),
      };

      if (editingProperty) {
        const { error } = await supabase
          .from('properties')
          .update(propertyData)
          .eq('id', editingProperty.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('properties').insert([propertyData]);
        if (error) throw error;
      }

      setIsDrawerOpen(false);
      fetchProperties();
    } catch (error) {
      console.error('Error saving property:', error);
      alert('Failed to save property');
    }
  };

  const getPropertyTypeIcon = (type: string) => {
    switch (type) {
      case 'house':
        return <Home className="w-4 h-4" />;
      case 'condo':
        return <Building2 className="w-4 h-4" />;
      default:
        return <Building2 className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-[var(--font-playfair)] font-bold text-foreground mb-2">
                  Property Management
                </h1>
                <p className="text-foreground/70">
                  Manage your property listings and inventory
                </p>
              </div>
              <Button
                onClick={handleAddNew}
                className="bg-momentum-ocean-blue text-white hover:bg-momentum-ocean-blue/90 shadow-md hover:shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Property
              </Button>
            </div>
          </div>

          {/* Search */}
          <Card className="mb-6 border border-momentum-pale-violet/30 shadow-lg bg-white rounded-momentum">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <Input
                  type="text"
                  placeholder="Search properties by title, city, address, or type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-momentum-pale-violet/30 focus:border-momentum-ocean-blue focus:ring-2 focus:ring-momentum-ocean-blue/20 rounded-momentum"
                />
              </div>
            </CardContent>
          </Card>

          {/* Properties Grid */}
          <PropertyList
            properties={filteredProperties}
            loading={loading}
            onEdit={handleEdit}
            onDelete={(property) => handleDelete(property.id)}
            showActions={true}
            emptyMessage="No properties found"
            emptyAction={{
              label: 'Add Your First Property',
              onClick: handleAddNew,
            }}
          />
        </div>
      </div>

      {/* Add/Edit Drawer */}
      <PropertyFormDrawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        editingProperty={editingProperty}
        formData={formData}
        onFormDataChange={setFormData}
        onSubmit={handleSubmit}
        side="right"
        width="w-full sm:max-w-2xl"
      />

      <Footer />
    </div>
  );
}

