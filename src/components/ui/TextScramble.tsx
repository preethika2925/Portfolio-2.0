'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface TextScrambleProps {
  text: string;
  className?: string;
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'p';
  scrambleOnHover?: boolean;
  triggerInView?: boolean;
}

const GLYPHS = '01#*_-/[]<>+~=!&^%XYZABC';

export const TextScramble: React.FC<TextScrambleProps> = ({
  text,
  className = '',
  as: Component = 'span',
  scrambleOnHover = false,
  triggerInView = true,
}) => {
  const [prevText, setPrevText] = useState(text);
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();

  // Adjust state upon prop change without effect cascading render
  if (prevText !== text) {
    setPrevText(text);
    setDisplayText(text);
    setHasAnimated(false);
  }

  const startScramble = useCallback(() => {
    if (reducedMotion || isScrambling || hasAnimated) return;

    setHasAnimated(true);
    setIsScrambling(true);
    let iteration = 0;
    const totalIterations = Math.min(text.length * 2.2, 35);

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const animate = () => {
      iteration++;

      const scrambled = text
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iteration / 2.2) {
            return text[index];
          }
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join('');

      setDisplayText(scrambled);

      if (iteration < totalIterations) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
        setIsScrambling(false);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [text, isScrambling, hasAnimated, reducedMotion]);

  // Trigger scramble strictly once upon entering the viewport
  useEffect(() => {
    if (!triggerInView || reducedMotion || !elementRef.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            startScramble();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [triggerInView, startScramble, reducedMotion, hasAnimated]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (scrambleOnHover && !hasAnimated) {
      startScramble();
    }
  };

  return (
    <Component
      ref={elementRef as unknown as React.RefObject<HTMLHeadingElement>}
      onMouseEnter={handleMouseEnter}
      className={`inline-block select-none ${className}`}
      aria-label={text}
    >
      {displayText}
    </Component>
  );
};
