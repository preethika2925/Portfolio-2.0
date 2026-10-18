'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface KineticTickerProps {
  items?: string[];
  theme?: 'light' | 'dark';
  speed?: number; // duration in seconds
  reverse?: boolean;
}

const DEFAULT_ITEMS = [
  'KIT COIMBATORE',
  'ELECTRONICS & COMMUNICATION ENGINEERING',
  'EMBEDDED SYSTEMS & SENSORY NETWORKS',
  'NEXT.JS & REACT WEB PLATFORMS',
  'SPATIAL AGTECH TELEMETRY',
  'C / C++ & PYTHON DATA STRUCTURES',
  'FIRST-PRINCIPLES HARDWARE EXPLORATION',
  'CLASS OF 2029',
];

export const KineticTicker: React.FC<KineticTickerProps> = ({
  items = DEFAULT_ITEMS,
  theme = 'light',
  speed = 32,
  reverse = false,
}) => {
  const isDark = theme === 'dark';

  return (
    <div
      className={`relative w-full overflow-hidden select-none py-4 border-y ${
        isDark
          ? 'bg-[#121212] border-white/10 text-white/80'
          : 'bg-[#F2F2ED] border-[#E5E5E0] text-[#171717]/80'
      }`}
    >
      {/* Edge gradient masks for smooth fade */}
      <div
        className={`pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r ${
          isDark ? 'from-[#121212] to-transparent' : 'from-[#F2F2ED] to-transparent'
        }`}
      />
      <div
        className={`pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l ${
          isDark ? 'from-[#121212] to-transparent' : 'from-[#F2F2ED] to-transparent'
        }`}
      />

      <div className="flex w-max items-center">
        <motion.div
          animate={{
            x: reverse ? ['0%', '-50%'] : ['-50%', '0%'],
          }}
          transition={{
            ease: 'linear',
            duration: speed,
            repeat: Infinity,
          }}
          className="flex shrink-0 items-center gap-8 pr-8 hover:[animation-play-state:paused]"
        >
          {/* Double list concatenation for seamless loop */}
          {[...items, ...items, ...items, ...items].map((item, idx) => (
            <div key={idx} className="flex items-center gap-6 whitespace-nowrap">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A7C7B5] animate-pulse" />
                <span className="text-xs font-mono tracking-[0.2em] uppercase font-semibold">
                  {item}
                </span>
              </span>
              <span
                className={`text-xs select-none ${
                  isDark ? 'text-white/20' : 'text-[#777777]/40'
                }`}
              >
                /
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
