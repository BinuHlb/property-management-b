# Components Structure

This directory contains all reusable components organized by purpose and feature.

## Directory Structure

```
components/
├── sections/              # Page sections (Hero, Featured Properties, etc.)
│   ├── hero-section.tsx
│   ├── featured-properties-section.tsx
│   ├── category-carousel-section.tsx
│   └── index.ts
│
├── features/              # Feature-specific components
│   ├── property/          # Property-related components
│   │   ├── property-card.tsx
│   │   ├── property-list.tsx
│   │   ├── property-search-filter.tsx
│   │   ├── property-filter-sidebar.tsx
│   │   ├── property-filters.ts      # Filter logic
│   │   ├── use-properties.ts       # Custom hook
│   │   └── index.ts
│   │
│   └── agent/            # Agent-related components
│       ├── agent-search-filter.tsx
│       └── index.ts
│
├── ui/                   # Shadcn UI components (base components)
│   ├── button.tsx
│   ├── card.tsx
│   └── ...
│
└── [shared]/             # Shared components used across features
    ├── about-section.tsx
    ├── contact-section.tsx
    ├── cta-find-agent.tsx
    ├── app-download-section.tsx
    ├── animated-logo.tsx
    └── ...
```

## Usage

### Sections
```tsx
import { HeroSection, FeaturedPropertiesSection } from '@/components/sections';
```

### Features
```tsx
import { PropertyCard, PropertyList, useProperties } from '@/components/features/property';
import { AgentSearchFilter } from '@/components/features/agent';
```

### UI Components
```tsx
import { Button, Card } from '@/components/ui/button';
```

## Best Practices

1. **Sections**: Use for full page sections that can be reused across pages
2. **Features**: Group feature-specific components together
3. **UI**: Base components from shadcn/ui - don't modify unless necessary
4. **Shared**: Components used by multiple features but not feature-specific
