'use client';

import { cn } from '@/lib/utils';

type MomentumLogoProps = {
  className?: string;
  variant?: 'full' | 'icon' | 'text';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBackground?: boolean;
  textColor?: string;
  backgroundColor?: string;
};

export function MomentumLogo({
  className,
  variant = 'full',
  size = 'md',
  showBackground = false,
  textColor,
  backgroundColor,
}: MomentumLogoProps) {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-3xl md:text-4xl',
    lg: 'text-4xl md:text-5xl',
    xl: 'text-5xl md:text-6xl',
  };

  const iconSizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const dotSizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
    xl: 'w-3 h-3',
  };

  const textColorClass = textColor || 'text-momentum-diamond-blue';
  const bgColorClass = backgroundColor || 'bg-momentum-ocean-blue';

  if (variant === 'icon') {
    return (
      <div
        className={cn(
          'relative flex items-center justify-center rounded-lg',
          showBackground && bgColorClass,
          showBackground && 'p-3',
          iconSizeClasses[size],
          className
        )}
      >
        <span
          className={cn(
            'momentum-brand font-bold',
            textColorClass,
            sizeClasses[size]
          )}
          style={{ fontFamily: 'var(--font-playfair), serif' }}
        >
          m
        </span>
        <span
          className={cn(
            'absolute -top-1 left-1/2 -translate-x-1/2 rounded-full',
            'bg-momentum-diamond-blue',
            dotSizeClasses[size]
          )}
        />
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div
        className={cn(
          'relative inline-flex items-center',
          showBackground && bgColorClass,
          showBackground && 'px-4 py-2 rounded-lg',
          className
        )}
      >
        <span
          className={cn(
            'momentum-brand font-normal tracking-tight',
            textColorClass,
            sizeClasses[size]
          )}
          style={{ fontFamily: 'var(--font-playfair), serif' }}
        >
          Momentum
        </span>
        <span
          className={cn(
            'absolute -top-2 left-[calc(50%-0.5em)] -translate-x-1/2 rounded-full',
            'bg-momentum-diamond-blue',
            dotSizeClasses[size]
          )}
          style={{ left: 'calc(50% - 0.1em)' }}
        />
      </div>
    );
  }

  // Full variant (default) - text with icon
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {/* Icon */}
      <div
        className={cn(
          'relative flex items-center justify-center rounded-lg bg-momentum-pale-violet',
          'p-2',
          iconSizeClasses[size]
        )}
      >
        <span
          className={cn(
            'momentum-brand font-bold',
            textColorClass,
            sizeClasses[size]
          )}
          style={{ fontFamily: 'var(--font-playfair), serif' }}
        >
          m
        </span>
        <span
          className={cn(
            'absolute -top-1 left-1/2 -translate-x-1/2 rounded-full',
            'bg-momentum-diamond-blue',
            dotSizeClasses[size]
          )}
        />
      </div>
      
      {/* Text */}
      <div
        className={cn(
          'relative inline-flex items-center',
          showBackground && bgColorClass,
          showBackground && 'px-4 py-2 rounded-lg',
        )}
      >
        <span
          className={cn(
            'momentum-brand font-normal tracking-tight',
            textColorClass,
            sizeClasses[size]
          )}
          style={{ fontFamily: 'var(--font-playfair), serif' }}
        >
          Momentum
        </span>
        <span
          className={cn(
            'absolute -top-2 left-[calc(50%-0.5em)] -translate-x-1/2 rounded-full',
            'bg-momentum-diamond-blue',
            dotSizeClasses[size]
          )}
          style={{ left: 'calc(50% - 0.1em)' }}
        />
      </div>
    </div>
  );
}
