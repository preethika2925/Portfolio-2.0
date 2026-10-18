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

  // Exact mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Precision core spring (fast, responsive)
  const coreConfig = { damping: 30, stiffness: 600, mass: 0.1 };
  const coreX = useSpring(mouseX, coreConfig);
  const coreY = useSpring(mouseY, coreConfig);

  // Outer elastic ring spring (organic, trailing momentum)
  const ringConfig = { damping: 24, stiffness: 260, mass: 0.25 };
  const ringX = useSpring(mouseX, ringConfig);
  const ringY = useSpring(mouseY, ringConfig);

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
    <>
      {/* Outer Spring Elastic Ring / Interactive Action Capsule */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          x: ringX,
          y: ringY,
        }}
      >
        {isHovered ? (
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="relative flex items-center justify-center rounded-full bg-[#171717]/95 border border-[#A7C7B5] px-3 py-1.5 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
          >
            {cursorText ? (
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#A7C7B5] font-semibold whitespace-nowrap">
                {cursorText}
              </span>
            ) : (
              <span className="w-2.5 h-2.5 rounded-full bg-[#A7C7B5] animate-ping" />
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            className="w-8 h-8 rounded-full border border-[#171717]/40 dark:border-white/40 pointer-events-none"
          />
        )}
      </motion.div>

      {/* Inner Precision Center Point */}
      {!cursorText && (
        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-[10000] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 will-change-transform"
          style={{
            x: coreX,
            y: coreY,
          }}
        >
          <div
            className={`rounded-full transition-all duration-200 ${
              isHovered
                ? 'w-1 h-1 bg-[#A7C7B5]'
                : 'w-2 h-2 bg-[#171717] dark:bg-white shadow-sm'
            }`}
          />
        </motion.div>
      )}
    </>
  );
};
