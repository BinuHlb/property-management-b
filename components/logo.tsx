'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  iconClassName?: string;
  iconSrc?: string;
  alt?: string;
};

export function Logo({
  className,
  iconClassName,
  iconSrc = '/assets/icons/ari-icon.svg',
  alt = 'Ari icon',
}: LogoProps) {
  return (
    <span className={cn('relative inline-flex items-center font-medium text-foreground group cursor-pointer', className)}>
      Ari
      <Image
        src={iconSrc}
        alt={alt}
        width={16}
        height={16}
        className={cn('absolute -right-4 -top-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300', iconClassName)}
        priority
      />
    </span>
  );
}

