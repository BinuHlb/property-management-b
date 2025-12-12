'use client';

import { cn } from '@/lib/utils';

type MomentumDecorativeShapesProps = {
  className?: string;
  count?: number;
  colors?: ('ocean-blue' | 'pale-violet' | 'powder-pink' | 'crayola-yellow' | 'diamond-blue')[];
};

export function MomentumDecorativeShapes({
  className,
  count = 8,
  colors = ['powder-pink', 'crayola-yellow', 'diamond-blue'],
}: MomentumDecorativeShapesProps) {
  const colorMap = {
    'ocean-blue': 'bg-momentum-ocean-blue',
    'pale-violet': 'bg-momentum-pale-violet',
    'powder-pink': 'bg-momentum-powder-pink',
    'crayola-yellow': 'bg-momentum-crayola-yellow',
    'diamond-blue': 'bg-momentum-diamond-blue',
  };

  const shapes = ['circle', 'square', 'rectangle'] as const;

  return (
    <div className={cn('absolute inset-0 pointer-events-none overflow-hidden', className)}>
      {Array.from({ length: count }).map((_, i) => {
        const shape = shapes[i % shapes.length];
        const color = colors[i % colors.length];
        const size = Math.random() * 20 + 10;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const rotation = Math.random() * 360;

        return (
          <div
            key={i}
            className={cn(
              'absolute opacity-60',
              colorMap[color],
              shape === 'circle' && 'rounded-full',
              shape === 'square' && 'rounded-md',
              shape === 'rectangle' && 'rounded-sm'
            )}
            style={{
              width: shape === 'rectangle' ? size * 1.5 : size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              transform: `rotate(${rotation}deg)`,
            }}
          />
        );
      })}
    </div>
  );
}
