'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Globe, Sprout, Terminal } from 'lucide-react';
import { profileData } from '@/data/portfolioData';
import { InteractiveEngineeringCanvas } from '@/components/ui/InteractiveEngineeringCanvas';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const portraitParallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Headline reveal
      if (headlineRef.current) {
        gsap.from(headlineRef.current.querySelectorAll('.reveal-line'), {
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
          y: 60,
          opacity: 0,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
        });
      }

      // Paragraphs progressive entrance
      if (paragraphsRef.current) {
        gsap.from(paragraphsRef.current.children, {
          scrollTrigger: {
            trigger: paragraphsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
        });
      }

      // Interactive pillar cards entrance
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
        });
      }

      // Portrait subtle parallax scrub
      if (portraitParallaxRef.current) {
        gsap.to(portraitParallaxRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
          y: -40,
          ease: 'none',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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

  return (
    <section
      id="about"
      ref={sectionRef}
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
          <div className="lg:col-span-8">
            <h2
              ref={headlineRef}
              className="clamp-headline-lg font-serif-editorial text-[#171717] tracking-tight space-y-2"
            >
              <span className="block reveal-line">Curious by nature.</span>
              <span className="block reveal-line text-[#777777] italic">
                An engineer in progress.
              </span>
              <span className="block reveal-line">A builder by choice.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end">
            <div className="p-6 rounded-2xl bg-white/70 border border-[#E5E5E0] shadow-sm space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#777777] block">
                Academic Anchor
              </span>
              <p className="text-sm font-medium text-[#171717]">
                Kalaignar Karunanidhi Institute of Technology
              </p>
              <p className="text-xs text-[#777777]">
                Department of Electronics & Communication Engineering
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#A7C7B5]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A7C7B5] animate-pulse" />
                Undergraduate Cycle 2025 – 2029
              </div>
            </div>
          </div>
        </div>

        {/* Middle Storytelling Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Interactive Engineering & Hardware Visual Matrix (Replaces duplicate portrait) */}
          <div className="lg:col-span-5 order-2 lg:order-1" ref={portraitParallaxRef}>
            <InteractiveEngineeringCanvas />
          </div>

          {/* Narrative Body Copy */}
          <div
            ref={paragraphsRef}
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
                <span className="text-sm font-semibold text-[#171717]">Hardware & Code</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#777777] uppercase block">Goal</span>
                <span className="text-sm font-semibold text-[#171717]">Applied Impact</span>
              </div>
            </div>
          </div>
        </div>

        {/* Engineering Pillars Grid */}
        <div className="space-y-6 pt-8">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-[#777777]">
              Disciplines of Exploration
            </span>
            <span className="text-xs font-mono text-[#777777]">04 Foundational Pillars</span>
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {engineeringPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="group p-6 rounded-2xl bg-white border border-[#E5E5E0] hover:border-[#171717]/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F8F8F5] border border-[#E5E5E0] flex items-center justify-center text-[#171717] group-hover:bg-[#171717] group-hover:text-[#F8F8F5] transition-colors duration-300">
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
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
