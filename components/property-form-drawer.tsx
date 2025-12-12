'use client';

import { useCallback } from 'react';
import { Home, Edit, Plus, Star, MapPin, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { type Property } from '@/lib/supabase';
import { ScrollArea } from '@/components/ui/scroll-area';

export type PropertyFormData = {
  title: string;
  description: string;
  property_type: string;
  status: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  area_sqft: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  image_url: string;
  featured: boolean;
};

export type PropertyFormDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingProperty: Property | null;
  formData: PropertyFormData;
  onFormDataChange: (data: PropertyFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading?: boolean;
  side?: 'left' | 'right' | 'top' | 'bottom';
  width?: string;
};

export function PropertyFormDrawer({
  open,
  onOpenChange,
  editingProperty,
  formData,
  onFormDataChange,
  onSubmit,
  loading = false,
  side = 'right',
  width = 'w-full sm:max-w-2xl',
}: PropertyFormDrawerProps) {
  const updateField = (field: keyof PropertyFormData, value: string | boolean) => {
    const newFormData = { ...formData, [field]: value };
    // Only update if the value actually changed
    if (formData[field] !== value) {
      onFormDataChange(newFormData);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side={side} 
        className={`${width} overflow-y-auto border-l border-momentum-pale-violet/30 bg-white p-0`}
      >
        {/* Decorative geometric shapes */}
        <div className="absolute top-4 right-4 w-16 h-16 bg-momentum-powder-pink/10 rounded-full blur-xl pointer-events-none"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 bg-momentum-crayola-yellow/10 rounded-full blur-xl pointer-events-none"></div>
        
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="px-6 pt-6 pb-4 border-b border-momentum-pale-violet/30 bg-gradient-to-r from-white to-momentum-pale-violet/5">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-full ${
                editingProperty 
                  ? 'bg-momentum-powder-pink/20' 
                  : 'bg-momentum-ocean-blue/20'
              }`}>
                {editingProperty ? (
                  <Edit className="w-5 h-5 text-momentum-ocean-blue" />
                ) : (
                  <Plus className="w-5 h-5 text-momentum-ocean-blue" />
                )}
              </div>
              <div className="flex-1">
                <SheetTitle className="text-2xl font-bold text-momentum-ocean-blue text-left">
                  {editingProperty ? 'Edit Property' : 'Add New Property'}
                </SheetTitle>
                <SheetDescription className="text-sm text-foreground/60 mt-1 text-left">
                  {editingProperty ? 'Update property details' : 'Fill in the details to create a new property listing'}
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          {/* Scrollable Form Content */}
          <ScrollArea className="flex-1">
            <form 
              id="property-form" 
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onSubmit(e);
              }} 
              className="p-6 space-y-6"
            >
              {/* Basic Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-momentum-ocean-blue" />
                  <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-sm font-medium text-foreground mb-2 block">
                      Property Title
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => updateField('title', e.target.value)}
                      required
                      placeholder="e.g., Modern 2BR Apartment in Downtown"
                      className="border-momentum-pale-violet/30 focus:border-momentum-ocean-blue focus:ring-2 focus:ring-momentum-ocean-blue/20 rounded-momentum"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-sm font-medium text-foreground mb-2 block">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => updateField('description', e.target.value)}
                      required
                      placeholder="Describe the property features, amenities, and location..."
                      rows={4}
                      className="border-momentum-pale-violet/30 focus:border-momentum-ocean-blue focus:ring-2 focus:ring-momentum-ocean-blue/20 rounded-momentum resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="property_type" className="text-sm font-medium text-foreground mb-2 block">
                        Property Type
                      </Label>
                      <Select
                        value={formData.property_type}
                        onValueChange={(value) => updateField('property_type', value)}
                      >
                        <SelectTrigger className="border-momentum-pale-violet/30 focus:border-momentum-ocean-blue focus:ring-2 focus:ring-momentum-ocean-blue/20 rounded-momentum">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-momentum-pale-violet/30">
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="condo">Condo</SelectItem>
                          <SelectItem value="villa">Villa</SelectItem>
                          <SelectItem value="townhouse">Townhouse</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="status" className="text-sm font-medium text-foreground mb-2 block">
                        Status
                      </Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) => updateField('status', value)}
                      >
                        <SelectTrigger className="border-momentum-pale-violet/30 focus:border-momentum-ocean-blue focus:ring-2 focus:ring-momentum-ocean-blue/20 rounded-momentum">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-momentum-pale-violet/30">
                          <SelectItem value="available">Available</SelectItem>
                          <SelectItem value="rented">Rented</SelectItem>
                          <SelectItem value="sold">Sold</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="bg-momentum-pale-violet/30" />

              {/* Pricing & Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-momentum-ocean-blue" />
                  <h3 className="text-lg font-semibold text-foreground">Pricing & Details</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price" className="text-sm font-medium text-foreground mb-2 block">
                      Price (per month)
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => updateField('price', e.target.value)}
                      required
                      placeholder="0.00"
                      className="border-momentum-pale-violet/30 focus:border-momentum-ocean-blue focus:ring-2 focus:ring-momentum-ocean-blue/20 rounded-momentum"
                    />
                  </div>

                  <div>
                    <Label htmlFor="area_sqft" className="text-sm font-medium text-foreground mb-2 block">
                      Area (sqft)
                    </Label>
                    <Input
                      id="area_sqft"
                      type="number"
                      value={formData.area_sqft}
                      onChange={(e) => updateField('area_sqft', e.target.value)}
                      required
                      min="0"
                      className="border-momentum-pale-violet/30 focus:border-momentum-ocean-blue focus:ring-2 focus:ring-momentum-ocean-blue/20 rounded-momentum"
                    />
                  </div>

                  <div>
                    <Label htmlFor="bedrooms" className="text-sm font-medium text-foreground mb-2 block">
                      Bedrooms
                    </Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) => updateField('bedrooms', e.target.value)}
                      required
                      min="0"
                      className="border-momentum-pale-violet/30 focus:border-momentum-ocean-blue focus:ring-2 focus:ring-momentum-ocean-blue/20 rounded-momentum"
                    />
                  </div>

                  <div>
                    <Label htmlFor="bathrooms" className="text-sm font-medium text-foreground mb-2 block">
                      Bathrooms
                    </Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      value={formData.bathrooms}
                      onChange={(e) => updateField('bathrooms', e.target.value)}
                      required
                      min="0"
                      className="border-momentum-pale-violet/30 focus:border-momentum-ocean-blue focus:ring-2 focus:ring-momentum-ocean-blue/20 rounded-momentum"
                    />
                  </div>
                </div>
              </div>

              <Separator className="bg-momentum-pale-violet/30" />

              {/* Location */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-momentum-ocean-blue" />
                  <h3 className="text-lg font-semibold text-foreground">Location</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address" className="text-sm font-medium text-foreground mb-2 block">
                      Address
                    </Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => updateField('address', e.target.value)}
                      required
                      placeholder="Street address"
                      className="border-momentum-pale-violet/30 focus:border-momentum-ocean-blue focus:ring-2 focus:ring-momentum-ocean-blue/20 rounded-momentum"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-sm font-medium text-foreground mb-2 block">
                        City
                      </Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => updateField('city', e.target.value)}
                        required
                        placeholder="City"
                        className="border-momentum-pale-violet/30 focus:border-momentum-ocean-blue focus:ring-2 focus:ring-momentum-ocean-blue/20 rounded-momentum"
                      />
                    </div>

                    <div>
                      <Label htmlFor="state" className="text-sm font-medium text-foreground mb-2 block">
                        State
                      </Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => updateField('state', e.target.value)}
                        required
                        placeholder="State"
                        className="border-momentum-pale-violet/30 focus:border-momentum-ocean-blue focus:ring-2 focus:ring-momentum-ocean-blue/20 rounded-momentum"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="zip_code" className="text-sm font-medium text-foreground mb-2 block">
                      ZIP Code
                    </Label>
                    <Input
                      id="zip_code"
                      value={formData.zip_code}
                      onChange={(e) => updateField('zip_code', e.target.value)}
                      required
                      placeholder="ZIP Code"
                      className="border-momentum-pale-violet/30 focus:border-momentum-ocean-blue focus:ring-2 focus:ring-momentum-ocean-blue/20 rounded-momentum"
                    />
                  </div>
                </div>
              </div>

              <Separator className="bg-momentum-pale-violet/30" />

              {/* Media & Options */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-momentum-ocean-blue" />
                  <h3 className="text-lg font-semibold text-foreground">Media & Options</h3>
                </div>
                
                <div>
                  <Label htmlFor="image_url" className="text-sm font-medium text-foreground mb-2 block">
                    Image URL
                  </Label>
                  <Input
                    id="image_url"
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => updateField('image_url', e.target.value)}
                    required
                    placeholder="https://example.com/image.jpg"
                    className="border-momentum-pale-violet/30 focus:border-momentum-ocean-blue focus:ring-2 focus:ring-momentum-ocean-blue/20 rounded-momentum"
                  />
                  {formData.image_url && (
                    <div className="mt-3 rounded-momentum overflow-hidden border-2 border-momentum-pale-violet/30 shadow-sm">
                      <img
                        src={formData.image_url}
                        alt="Preview"
                        className="w-full h-40 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                <div 
                  className="flex items-center gap-3 p-4 rounded-momentum border-2 border-momentum-pale-violet/30 bg-momentum-pale-violet/5 hover:bg-momentum-pale-violet/10 transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateField('featured', !formData.featured);
                  }}
                >
                  <Checkbox
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => {
                      updateField('featured', checked === true);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="border-momentum-ocean-blue data-[state=checked]:bg-momentum-ocean-blue data-[state=checked]:border-momentum-ocean-blue"
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor="featured"
                      className="text-sm font-medium text-foreground cursor-pointer block"
                    >
                      Featured Property
                    </Label>
                    <p className="text-xs text-foreground/60 mt-1">
                      Show this property prominently in listings
                    </p>
                  </div>
                  <Star className={`w-5 h-5 ${formData.featured ? 'text-momentum-crayola-yellow fill-momentum-crayola-yellow' : 'text-foreground/30'}`} />
                </div>
              </div>
            </form>
          </ScrollArea>

          {/* Fixed Footer */}
          <div className="px-6 py-4 border-t border-momentum-pale-violet/30 bg-white flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-momentum-pale-violet/30 text-foreground hover:bg-momentum-pale-violet/10 rounded-momentum"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                const form = document.getElementById('property-form') as HTMLFormElement;
                if (form) {
                  form.requestSubmit();
                }
              }}
              disabled={loading}
              className="bg-momentum-ocean-blue text-white hover:bg-momentum-ocean-blue/90 shadow-md hover:shadow-lg rounded-momentum"
            >
              {loading ? 'Saving...' : editingProperty ? 'Update Property' : 'Create Property'}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
