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

  const springConfig = { damping: 28, stiffness: 400, mass: 0.3 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const customCursorEl = target.closest('[data-cursor-text]') as HTMLElement | null;
      const interactive = target.closest('a, button, [role="button"], [data-cursor-interactive="true"]');

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
  }, [mouseX, mouseY, isVisible, isTouch, reducedMotion]);

  if (isTouch || reducedMotion || !isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 will-change-transform"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    >
      {isHovered ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: cursorText ? 1.6 : 1.2, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="relative flex items-center justify-center rounded-full bg-[#171717]/90 border border-[#A7C7B5] px-2.5 py-1 backdrop-blur-sm shadow-md"
        >
          {cursorText ? (
            <span className="text-[8px] font-mono tracking-widest uppercase text-white font-semibold whitespace-nowrap">
              {cursorText}
            </span>
          ) : (
            <div className="w-2 h-2 rounded-full bg-[#A7C7B5]" />
          )}
        </motion.div>
      ) : (
        <div className="w-2 h-2 rounded-full bg-[#171717]/60 pointer-events-none" />
      )}
    </motion.div>
  );
};
