'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Globe, Sprout, Terminal } from 'lucide-react';
import { profileData } from '@/data/portfolioData';
import { InteractiveEngineeringCanvas } from '@/components/ui/InteractiveEngineeringCanvas';
import { TiltSpotlightCard } from '@/components/ui/TiltSpotlightCard';
import { TextScramble } from '@/components/ui/TextScramble';

const engineeringPillars = [
  {
    icon: Terminal,
    title: 'Software Systems',
    description:
      'Translating algorithmic logic, robust data structures, and object-oriented paradigms into performant code in C, C++, and Python.',
  },
  {
    icon: Globe,
    title: 'Web Engineering',
    description:
      'Crafting responsive, dynamic interfaces and server-rendered web applications using Next.js, React, and modern CSS systems.',
  },
  {
    icon: Cpu,
    title: 'Embedded & Circuits',
    description:
      'Interfacing microcontrollers, MOSFET drivers, and sensory feedback loops to control physical hardware and automation pipelines.',
  },
  {
    icon: Sprout,
    title: 'AgTech & Spatial',
    description:
      'Building location-aware advisory concepts and market data bridges designed to empower agricultural communities.',
  },
];

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-28 md:py-36 px-6 md:px-16 bg-[#F8F8F5] border-t border-[#E5E5E0] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header Metadata */}
        <div className="flex items-center justify-between border-b border-[#E5E5E0] pb-6">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#777777] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A7C7B5]" />
            02 / Editorial Biography
          </span>
          <span className="text-xs font-mono text-[#777777] uppercase tracking-wider">
            Preethika Suresh
          </span>
        </div>

        {/* Editorial Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8"
          >
            <h2 className="clamp-headline-lg font-serif-editorial text-[#171717] tracking-tight space-y-2">
              <span className="block">Curious by nature.</span>
              <span className="block text-[#777777] italic">
                An engineer in progress.
              </span>
              <span className="block">A builder by choice.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col justify-end"
          >
            <div className="p-6 rounded-2xl bg-white/70 border border-[#E5E5E0] shadow-sm space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#777777] block">
                Academic Anchor
              </span>
              <p className="text-sm font-medium text-[#171717]">
                Kalaignar Karunanidhi Institute of Technology
              </p>
              <p className="text-xs text-[#777777]">
                Department of Electronics &amp; Communication Engineering
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#A7C7B5]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A7C7B5] animate-pulse" />
                Undergraduate Cycle 2025 – 2029
              </div>
            </div>
          </motion.div>
        </div>

        {/* Middle Storytelling Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Interactive Engineering & Hardware Visual Matrix */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <InteractiveEngineeringCanvas />
          </div>

          {/* Narrative Body Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 order-1 lg:order-2 space-y-6 text-[#171717]/85 text-base md:text-lg leading-relaxed font-sans"
          >
            <p className="font-serif-editorial text-2xl md:text-3xl text-[#171717] leading-snug">
              &ldquo;Engineering for me is the discipline of making ideas tangible — turning abstract
              equations and logic into systems that work reliably in the real world.&rdquo;
            </p>

            <p>{profileData.bioParagraph1}</p>

            <p className="text-[#777777]">{profileData.bioParagraph2}</p>

            {/* Core Values Strip */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-[#E5E5E0]">
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#777777] uppercase block">Mindset</span>
                <span className="text-sm font-semibold text-[#171717]">First-Principles</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#777777] uppercase block">Focus</span>
                <span className="text-sm font-semibold text-[#171717]">Hardware &amp; Code</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#777777] uppercase block">Goal</span>
                <span className="text-sm font-semibold text-[#171717]">Applied Impact</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Engineering Pillars Grid: Guaranteed 100% Reliable Rendering with 3D Spotlight */}
        <div className="space-y-6 pt-8">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-[#777777] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A7C7B5]" />
              <TextScramble text="DISCIPLINES OF EXPLORATION" />
            </span>
            <span className="text-xs font-mono text-[#777777]">04 Foundational Pillars</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {engineeringPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
                  className="h-full"
                >
                  <TiltSpotlightCard
                    spotlightColor="rgba(167, 199, 181, 0.22)"
                    maxTilt={7}
                    cursorText="INSPECT"
                    className="h-full rounded-2xl"
                  >
                    <div className="group p-6 rounded-2xl bg-white border border-[#E5E5E0] hover:border-[#171717]/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full space-y-4">
                      <div className="w-10 h-10 rounded-xl bg-[#F8F8F5] border border-[#E5E5E0] flex items-center justify-center text-[#171717] group-hover:bg-[#171717] group-hover:text-[#F8F8F5] transition-colors duration-300 shadow-sm">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-[#171717] mb-2 font-sans tracking-tight">
                          {pillar.title}
                        </h3>
                        <p className="text-xs leading-relaxed text-[#777777]">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </TiltSpotlightCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
