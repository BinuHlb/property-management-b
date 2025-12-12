# Ari - Property Management System

A modern, elegant property management system with a beautiful landing page featuring pastel cyberpunk aesthetics. Built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Beautiful Landing Page**: Minimalist design with pastel colors and cyberpunk-inspired neon accents
- **Property Search**: Real-time search and filtering by location, property type, and price range
- **Property Listings**: Responsive grid layout showcasing featured properties
- **Database Integration**: Full Supabase integration for property management
- **Responsive Design**: Mobile-first approach with smooth animations and transitions

## Tech Stack

- **Framework**: Next.js 13 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account and project

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up your Supabase project:
   - Create a new project at [supabase.com](https://supabase.com)
   - The database schema will be created automatically when you run the migrations

3. Configure environment variables:
   - Update `.env.local` with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Setup

The application uses Supabase with the following schema:

### Properties Table
- `id`: Unique identifier
- `title`: Property name
- `description`: Detailed description
- `property_type`: apartment, house, or condo
- `status`: available, rented, or sold
- `price`: Monthly rent or sale price
- `bedrooms`: Number of bedrooms
- `bathrooms`: Number of bathrooms
- `area_sqft`: Property area in square feet
- `address`, `city`, `state`, `zip_code`: Location details
- `image_url`: Property image
- `featured`: Whether the property is featured on the homepage

The database includes sample properties with images from Pexels for demonstration purposes.

## Design Philosophy

The design combines multiple aesthetic principles:

- **Pastel Colors**: Soft cyan and blue tones create a calm, modern atmosphere
- **Minimalist**: Clean layouts with ample whitespace
- **Flat Design**: Modern, two-dimensional aesthetic without excessive depth
- **Cyberpunk Elements**: Neon cyan accents and glowing effects
- **Elegant & Abstract**: Sophisticated gradients and smooth transitions

## Key Features

### Hero Section
- Large, impactful headline with gradient text
- Integrated property search form
- Real-time property count display
- Smooth animations and backdrop blur effects

### Property Search
- Search by location, title, or address
- Filter by property type (apartment, house, condo)
- Price range filtering
- Instant results with smooth transitions

### Property Cards
- High-quality images with hover effects
- Featured property badges
- Property details (beds, baths, square footage)
- Location and pricing information
- Responsive grid layout

## Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── page.tsx         # Main landing page
│   ├── layout.tsx       # Root layout
│   └── globals.css      # Global styles
├── lib/
│   └── supabase.ts      # Supabase client configuration
├── components/
│   └── ui/              # shadcn/ui components
└── public/              # Static assets
```

## Customization

### Colors
The color scheme uses cyan and blue gradients. To customize:
- Primary: `from-cyan-500 to-blue-500`
- Accents: `text-cyan-600`, `border-cyan-200`
- Background: `from-slate-50 via-blue-50 to-cyan-50`

### Adding Properties
Properties can be added directly to the Supabase database. Future versions will include an admin panel for property management.

## License

MIT License - feel free to use this project for your own purposes.
