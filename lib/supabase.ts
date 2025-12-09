import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Property = {
  id: string;
  title: string;
  description: string;
  property_type: string;
  status: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area_sqft: number;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  image_url: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
};
