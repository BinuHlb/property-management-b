'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  iconClassName?: string;
  iconSrc?: string;
  alt?: string;
  isDarkMode?: boolean;
};

export function Logo({
  className,
  iconClassName,
  iconSrc,
  alt = 'Ari icon',
  isDarkMode = false,
}: LogoProps) {
  // Use logo-dark.svg for light headers, logo.svg for dark headers
  const defaultIconSrc = iconSrc || (isDarkMode ? '/assets/icons/logo.svg' : '/assets/icons/logo-dark.svg');
  return (
    <div className={cn('inline-flex items-center cursor-pointer', className)}>
      <Image
        src={defaultIconSrc}
        alt={alt}
        width={120}
        height={120}
        className={cn('h-8 w-auto', iconClassName)}
        priority
      />
    </div>
  );
}

