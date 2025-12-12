'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

type BrandLogoProps = {
  name: string;
  logoPath: string;
  className?: string;
  alt?: string;
};

export function BrandLogo({ 
  name, 
  logoPath,
  className,
  alt
}: BrandLogoProps) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <Image
        src={logoPath}
        alt={alt || `${name} logo`}
        width={64}
        height={64}
        className="w-16 h-16 object-contain"
      />
    </div>
  );
}

