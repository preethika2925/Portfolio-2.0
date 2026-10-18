'use client';

import React, { useEffect, useState, useSyncExternalStore } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

function subscribeTouch(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const mediaTouch = window.matchMedia('(pointer: coarse)');
  mediaTouch.addEventListener('change', callback);
  return () => mediaTouch.removeEventListener('change', callback);
}

function getTouchSnapshot() {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(pointer: coarse)').matches;
}

export const CustomCursor: React.FC = () => {
  const isTouch = useSyncExternalStore(subscribeTouch, getTouchSnapshot, () => true);
  const reducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 26, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], [data-cursor-interactive="true"]');
      const customCursorEl = target.closest('[data-cursor-text]') as HTMLElement | null;

      if (customCursorEl) {
        setCursorText(customCursorEl.getAttribute('data-cursor-text') || '');
        setIsHovered(true);
      } else if (interactive) {
        setCursorText('');
        setIsHovered(true);
      } else {
        setCursorText('');
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isTouch, reducedMotion]);

  if (isTouch || reducedMotion || !isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 will-change-transform"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    >
      <motion.div
        animate={{
          scale: isHovered ? (cursorText ? 2.4 : 1.7) : 1,
          backgroundColor: isHovered ? 'rgba(23, 23, 23, 0.9)' : 'rgba(23, 23, 23, 0.25)',
          borderColor: isHovered ? 'rgba(167, 199, 181, 0.9)' : 'rgba(23, 23, 23, 0.5)',
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="relative flex items-center justify-center rounded-full border border-[#171717]/40 w-8 h-8 backdrop-blur-[2px]"
      >
        {cursorText ? (
          <span className="text-[7px] font-mono tracking-widest uppercase text-white font-semibold">
            {cursorText}
          </span>
        ) : (
          <div className="w-1.5 h-1.5 rounded-full bg-[#171717]" />
        )}
      </motion.div>
    </motion.div>
  );
};
