'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  variant?: 'primary' | 'secondary' | 'dark' | 'outline' | 'ghost';
  ariaLabel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  href,
  target,
  rel,
  variant = 'primary',
  ariaLabel,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (clientX - centerX) * 0.28;
    const deltaY = (clientY - centerY) * 0.28;

    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyle =
    'relative inline-flex items-center justify-center font-medium rounded-full transition-colors duration-200 select-none cursor-pointer text-sm md:text-base px-6 py-3 tracking-wide';

  const variants = {
    primary:
      'bg-[#171717] text-[#F8F8F5] hover:bg-[#2c2c2c] active:scale-[0.98] border border-transparent shadow-sm',
    secondary:
      'bg-transparent text-[#171717] border border-[#171717]/25 hover:border-[#171717] hover:bg-[#171717]/5 active:scale-[0.98]',
    dark:
      'bg-[#F8F8F5] text-[#171717] hover:bg-white active:scale-[0.98] border border-white/20 shadow-sm',
    outline:
      'border border-[#E5E5E0] bg-white/70 backdrop-blur-md text-[#171717] hover:border-[#171717]/40 active:scale-[0.98]',
    ghost:
      'bg-transparent text-[#171717] hover:text-[#171717] hover:bg-[#171717]/5 active:scale-[0.98]',
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 18, mass: 0.2 }}
      className="inline-block"
    >
      <span className={`${baseStyle} ${variants[variant]} ${className}`}>
        {children}
      </span>
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        aria-label={ariaLabel}
        className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#171717] focus-visible:ring-offset-2 rounded-full"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#171717] focus-visible:ring-offset-2 rounded-full"
    >
      {content}
    </button>
  );
};
