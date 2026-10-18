'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface TiltSpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  maxTilt?: number;
  onClick?: () => void;
  cursorText?: string;
}

export const TiltSpotlightCard: React.FC<TiltSpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(167, 199, 181, 0.16)',
  maxTilt = 7,
  onClick,
  cursorText,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = useReducedMotion();

  // Mouse coordinate motion values (-0.5 to 0.5 relative to card center)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Pixel coordinates for the spotlight gradient
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for fluid tilt transitions
  const springConfig = { damping: 20, stiffness: 260, mass: 0.15 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  // Unconditional top-level hook call for spotlight gradient
  const spotlightBackground = useTransform(
    [mouseX, mouseY],
    ([latestX, latestY]) =>
      `radial-gradient(350px circle at ${latestX}px ${latestY}px, ${spotlightColor}, transparent 80%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    mouseX.set(currentX);
    mouseY.set(currentY);

    const normalizedX = currentX / width - 0.5;
    const normalizedY = currentY / height - 0.5;

    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-cursor-text={cursorText}
      style={
        reducedMotion
          ? {}
          : {
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }
      }
      className={`relative will-change-transform ${className}`}
    >
      {/* 21st.dev Dynamic Cursor-Tracking Radial Spotlight */}
      {isHovered && !reducedMotion && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300 z-10"
          style={{ background: spotlightBackground }}
        />
      )}

      {/* Surface Content with slight depth lift */}
      <div
        className="h-full w-full rounded-[inherit]"
        style={reducedMotion ? {} : { transform: 'translateZ(12px)' }}
      >
        {children}
      </div>
    </motion.div>
  );
};
