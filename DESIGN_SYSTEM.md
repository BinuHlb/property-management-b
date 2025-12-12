# Momentum Design System

This document outlines the Momentum design system based on the brand moodboard.

## Brand Colors

The Momentum brand uses a vibrant, playful, and sophisticated color palette:

### Primary Colors

- **Ocean Blue** (`#366DF1`) - Primary brand color
  - Usage: Primary buttons, headings, key UI elements
  - Tailwind: `bg-momentum-ocean-blue`, `text-momentum-ocean-blue`

- **Pale Violet** (`#BB90FF`) - Secondary accent
  - Usage: Secondary elements, backgrounds, accents
  - Tailwind: `bg-momentum-pale-violet`, `text-momentum-pale-violet`

- **Powder Pink** (`#FF97E8`) - Accent color
  - Usage: Highlights, badges, decorative elements
  - Tailwind: `bg-momentum-powder-pink`, `text-momentum-powder-pink`

- **Crayola Yellow** (`#FFEA7D`) - Accent color
  - Usage: Highlights, featured badges, call-to-action accents
  - Tailwind: `bg-momentum-crayola-yellow`, `text-momentum-crayola-yellow`

- **Diamond Blue** (`#B4F6FF`) - Light accent
  - Usage: Logo text, light backgrounds, decorative elements
  - Tailwind: `bg-momentum-diamond-blue`, `text-momentum-diamond-blue`

## Typography

### Brand Font (Serif)
- **Font Family**: Playfair Display
- **Usage**: Brand name, headings, hero text
- **CSS Variable**: `var(--font-playfair)`
- **Tailwind Classes**: `font-brand`, `momentum-brand`, `momentum-heading`

### Body Font (Sans-serif)
- **Font Family**: Inter
- **Usage**: Body text, UI elements, descriptions
- **CSS Variable**: `var(--font-inter)`
- **Tailwind Class**: `font-sans` (default)

## Logo

The Momentum logo consists of:
- The word "Momentum" in Playfair Display serif font
- A distinctive dot above the 'o' in Diamond Blue
- An icon variant with lowercase 'm' and dot

### Usage

```tsx
import { MomentumLogo } from '@/components/momentum-logo';

// Full logo (icon + text)
<MomentumLogo variant="full" size="lg" />

// Text only
<MomentumLogo variant="text" size="md" showBackground={true} />

// Icon only
<MomentumLogo variant="icon" size="sm" />
```

### Props
- `variant`: `'full' | 'icon' | 'text'` - Logo variant
- `size`: `'sm' | 'md' | 'lg' | 'xl'` - Logo size
- `showBackground`: `boolean` - Show background color
- `textColor`: `string` - Custom text color class
- `backgroundColor`: `string` - Custom background color class

## Design Principles

### Rounded Corners
- Standard border radius: `0.75rem` (12px)
- Tailwind: `rounded-momentum`

### Spacing
- Use consistent spacing scale (Tailwind defaults)
- Prefer generous whitespace for elegant feel

### Shadows
- Subtle shadows for depth: `shadow-md`, `shadow-lg`
- Hover states: `hover:shadow-lg`

### Decorative Elements
- Use geometric shapes (circles, squares, rectangles) as accents
- Colors: Mix of Powder Pink, Crayola Yellow, and Diamond Blue
- Component: `MomentumDecorativeShapes`

## Component Examples

### Buttons

```tsx
// Primary button
<Button className="bg-momentum-ocean-blue text-white hover:bg-momentum-ocean-blue/90">
  Primary Action
</Button>

// Accent button
<Button className="bg-momentum-powder-pink text-white hover:bg-momentum-powder-pink/90">
  Secondary Action
</Button>
```

### Cards

```tsx
<Card className="border border-momentum-pale-violet/30 rounded-momentum shadow-lg">
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

### Badges

```tsx
// Featured badge
<div className="bg-momentum-crayola-yellow text-momentum-ocean-blue px-3 py-1 rounded-full">
  Featured
</div>

// Type badge
<div className="bg-momentum-powder-pink text-white px-3 py-1 rounded-full">
  Apartment
</div>
```

## Color Accessibility

All Momentum colors meet WCAG AA contrast requirements when used appropriately:
- Ocean Blue on white: ✅
- Diamond Blue on Ocean Blue: ✅
- White text on Ocean Blue: ✅
- Dark text on Crayola Yellow: ✅

## Implementation Notes

- All colors are available as Tailwind utilities
- CSS variables are defined in `globals.css`
- Font variables are set in `layout.tsx`
- Logo component handles all brand logo variations
- Decorative shapes component available for playful accents
