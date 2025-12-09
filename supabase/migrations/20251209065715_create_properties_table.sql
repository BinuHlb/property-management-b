/*
  # Create Properties Management System Database

  1. New Tables
    - `properties`
      - `id` (uuid, primary key) - Unique identifier for each property
      - `title` (text) - Property title/name
      - `description` (text) - Detailed property description
      - `property_type` (text) - Type: apartment, house, condo, etc.
      - `status` (text) - Status: available, rented, sold
      - `price` (numeric) - Property price or rent amount
      - `bedrooms` (integer) - Number of bedrooms
      - `bathrooms` (integer) - Number of bathrooms
      - `area_sqft` (integer) - Property area in square feet
      - `address` (text) - Street address
      - `city` (text) - City
      - `state` (text) - State/province
      - `zip_code` (text) - Postal/ZIP code
      - `image_url` (text) - Primary property image URL
      - `featured` (boolean) - Whether property is featured
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `properties` table
    - Add policy for public read access (for viewing listings)
    - Add policy for authenticated users to manage properties

  3. Indexes
    - Add index on status for filtering
    - Add index on city for location-based searches
    - Add index on featured for homepage queries
*/

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  property_type text DEFAULT 'apartment',
  status text DEFAULT 'available',
  price numeric NOT NULL,
  bedrooms integer DEFAULT 1,
  bathrooms integer DEFAULT 1,
  area_sqft integer DEFAULT 0,
  address text DEFAULT '',
  city text DEFAULT '',
  state text DEFAULT '',
  zip_code text DEFAULT '',
  image_url text DEFAULT '',
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to all properties
CREATE POLICY "Public can view all properties"
  ON properties
  FOR SELECT
  TO public
  USING (true);

-- Policy: Authenticated users can insert properties
CREATE POLICY "Authenticated users can create properties"
  ON properties
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can update properties
CREATE POLICY "Authenticated users can update properties"
  ON properties
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Authenticated users can delete properties
CREATE POLICY "Authenticated users can delete properties"
  ON properties
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured);
CREATE INDEX IF NOT EXISTS idx_properties_property_type ON properties(property_type);

-- Insert sample properties for demonstration
INSERT INTO properties (title, description, property_type, status, price, bedrooms, bathrooms, area_sqft, address, city, state, zip_code, image_url, featured) VALUES
  ('Modern Downtown Loft', 'Stunning loft in the heart of downtown with floor-to-ceiling windows and panoramic city views. Features an open-concept design with exposed brick walls and premium finishes throughout.', 'apartment', 'available', 2800, 2, 2, 1200, '123 Urban Ave', 'New York', 'NY', '10001', 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg', true),
  ('Luxury Beachfront Villa', 'Exclusive oceanfront property with private beach access. This contemporary villa features 4 spacious bedrooms, infinity pool, and breathtaking sunset views.', 'house', 'available', 8500, 4, 3, 3500, '456 Ocean Dr', 'Miami', 'FL', '33139', 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg', true),
  ('Cozy Studio Apartment', 'Perfect starter home in a quiet neighborhood. Newly renovated studio with modern amenities, hardwood floors, and plenty of natural light.', 'apartment', 'available', 1200, 1, 1, 550, '789 Maple St', 'Portland', 'OR', '97201', 'https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg', false),
  ('Suburban Family Home', 'Spacious 3-bedroom home in family-friendly neighborhood. Large backyard, updated kitchen, and close to top-rated schools.', 'house', 'available', 3200, 3, 2, 2100, '321 Pine Rd', 'Austin', 'TX', '78701', 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg', true),
  ('Urban Penthouse Suite', 'Luxurious top-floor penthouse with private rooftop terrace. Features high-end appliances, smart home technology, and concierge services.', 'condo', 'available', 5500, 3, 3, 2400, '555 Sky Tower', 'Seattle', 'WA', '98101', 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg', true),
  ('Charming Garden Cottage', 'Quaint 2-bedroom cottage surrounded by lush gardens. Perfect for nature lovers seeking a peaceful retreat close to the city.', 'house', 'available', 1800, 2, 1, 900, '888 Garden Ln', 'San Francisco', 'CA', '94102', 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg', false);
