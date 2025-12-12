# Assets Folder

This folder contains static assets for the application.

## Structure

- `icons/` - Icon files (SVG, PNG, ICO, etc.)
- `media/` - Media files (images, videos, audio, etc.)

## Usage

In Next.js, files in the `public` folder are served from the root URL. For example:

- `public/assets/icons/logo.svg` → `/assets/icons/logo.svg`
- `public/assets/media/image.jpg` → `/assets/media/image.jpg`

### Example Usage in Components

```tsx
// Using an icon
<img src="/assets/icons/logo.svg" alt="Logo" />

// Using an image
<img src="/assets/media/property-image.jpg" alt="Property" />

// Using Next.js Image component
import Image from 'next/image';
<Image src="/assets/icons/logo.svg" alt="Logo" width={100} height={100} />
```

