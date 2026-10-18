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
  scrambleOnHover = true,
  triggerInView = true,
}) => {
  const [prevText, setPrevText] = useState(text);
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();

  // Adjust state upon prop change without effect cascading render
  if (prevText !== text) {
    setPrevText(text);
    setDisplayText(text);
  }

  const startScramble = useCallback(() => {
    if (reducedMotion || isScrambling) return;

    setIsScrambling(true);
    let iteration = 0;
    const totalIterations = text.length * 3;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const animate = () => {
      iteration++;

      const scrambled = text
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iteration / 3) {
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
  }, [text, isScrambling, reducedMotion]);

  // Trigger scramble once when element enters viewport
  useEffect(() => {
    if (!triggerInView || reducedMotion || !elementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startScramble();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [triggerInView, startScramble, reducedMotion]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (scrambleOnHover) {
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
