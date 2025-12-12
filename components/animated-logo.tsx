'use client';

import { motion, useAnimation } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type AnimatedLogoProps = {
  className?: string;
  iconClassName?: string;
  iconSrc?: string;
  alt?: string;
  animateFromHeader?: boolean;
};

export function AnimatedLogo({
  className,
  iconClassName,
  iconSrc = '/assets/icons/ari-icon.svg',
  alt = 'Ari icon',
  animateFromHeader = false,
}: AnimatedLogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const iconControls = useAnimation();

  const handleHoverStart = () => {
    setIsHovered(true);
    // Repeat the animation: fly from header position
    iconControls.start({
      x: -1000,
      y: -200,
      opacity: 0,
      scale: 0.5,
      transition: { duration: 0 },
    }).then(() => {
      iconControls.start({
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
          duration: 1,
          ease: [0.34, 1.56, 0.64, 1], // Bounce effect
        },
      });
    });
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
  };

  return (
    <motion.span
      className={cn('relative inline-flex items-center font-medium text-foreground cursor-pointer', className)}
      initial={animateFromHeader ? { opacity: 0 } : { opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 0.8, 1],
        }}
        transition={{
          duration: 1.2,
          times: [0, 0.5, 0.7, 1],
          ease: 'easeInOut',
        }}
      >
        Ari
      </motion.span>

      <motion.div
        initial={
          animateFromHeader
            ? {
                x: -1000,
                y: -200,
                opacity: 0,
                scale: 0.5,
              }
            : { opacity: 0, scale: 0 }
        }
        animate={
          isHovered
            ? iconControls
            : {
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
              }
        }
        transition={
          !isHovered
            ? {
                duration: 1,
                delay: animateFromHeader ? 0.3 : 0.5,
                ease: [0.34, 1.56, 0.64, 1],
              }
            : undefined
        }
        className={cn('absolute -right-4 -top-2', iconClassName)}
      >
        <Image
          src={iconSrc}
          alt={alt}
          width={16}
          height={16}
          className="h-4 w-4"
          priority
        />
      </motion.div>
    </motion.span>
  );
}

