'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Sparkles, FastForward, Scan, Target } from 'lucide-react';
import { eyeConfig } from '@/data/portfolioData';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { MagneticButton } from '@/components/ui/MagneticButton';

// Register GSAP plugins safely on client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const CinematicIntro: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const introOverlayRef = useRef<HTMLDivElement>(null);
  const lensContainerRef = useRef<HTMLDivElement>(null);
  const macroImageRef = useRef<HTMLDivElement>(null);
  const viewfinderRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroPortraitRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useReducedMotion();
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload and decode hero portrait
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const img = new window.Image();
    img.src = eyeConfig.portraitPath;

    img
      .decode()
      .then(() => setImageLoaded(true))
      .catch(() => setImageLoaded(true));
  }, []);

  // Main GSAP Cinematic Eye Animation Sequence
  useEffect(() => {
    if (!imageLoaded || !containerRef.current) return;

    // If user prefers reduced motion, skip intro directly
    if (reducedMotion) {
      if (introOverlayRef.current) {
        introOverlayRef.current.style.display = 'none';
      }
      if (heroContentRef.current) {
        gsap.set(heroContentRef.current, { opacity: 1 });
      }
      return;
    }

    const ctx = gsap.context(() => {
      // Precise eye coordinates calculation:
      // In 800x800 portrait, left eye center is at x=45.5%, y=44.1%.
      // At scale S=5.6, to bring eye to exact center:
      // offsetX = (50% - 45.5%) * S = +4.5% * 5.6 = +25.2%
      // offsetY = (50% - 44.1%) * S = +5.9% * 5.6 = +33.0%
      const startScale = 5.6;
      const startXPercent = 25.2;
      const startYPercent = 33.0;

      // Initial state:
      // Macro image is zoomed into eye pupil
      gsap.set(macroImageRef.current, {
        scale: startScale,
        xPercent: startXPercent,
        yPercent: startYPercent,
        transformOrigin: '50% 50%',
      });

      gsap.set(viewfinderRef.current, {
        opacity: 0,
        scale: 0.9,
      });

      gsap.set('.hero-stagger', {
        opacity: 0,
        y: 30,
      });

      const tl = gsap.timeline({
        defaults: { ease: 'power3.inOut' },
      });

      // 1. Fade in Viewfinder HUD and Lens Reticle
      tl.to(viewfinderRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
      })
        // 2. Subtle autofocus pulse on the eye pupil
        .to(macroImageRef.current, {
          scale: startScale * 1.04,
          duration: 0.9,
          ease: 'sine.inOut',
        })
        // 3. The Grand Pull-Out: Lens expands and camera pulls out from eye to full portrait
        .to(
          lensContainerRef.current,
          {
            borderRadius: '24px',
            width: '320px',
            height: '400px',
            duration: 1.6,
            ease: 'expo.inOut',
          },
          '+=0.1'
        )
        .to(
          macroImageRef.current,
          {
            scale: 1,
            xPercent: 0,
            yPercent: 0,
            duration: 1.6,
            ease: 'expo.inOut',
          },
          '<'
        )
        .to(
          viewfinderRef.current,
          {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.8'
        )
        // 4. Smooth Crossfade: Fade out the entire intro overlay so NO DUPLICATE image remains!
        .to(
          introOverlayRef.current,
          {
            opacity: 0,
            duration: 0.7,
            ease: 'power2.inOut',
            onComplete: () => {
              // Completely remove overlay from rendering and layout
              if (introOverlayRef.current) {
                introOverlayRef.current.style.display = 'none';
              }
            },
          },
          '+=0.1'
        )
        // 5. Stagger in hero typography and the single hero portrait on the right
        .to(
          '.hero-stagger',
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.4'
        );

      // ScrollTrigger: subtle parallax on the single hero portrait when scrolling down
      if (heroPortraitRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
          animation: gsap.to(heroPortraitRef.current, {
            y: 35,
            scale: 0.96,
            ease: 'none',
          }),
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [imageLoaded, reducedMotion]);

  // Instant Skip Intro Handler
  const handleSkipIntro = () => {
    if (introOverlayRef.current) {
      introOverlayRef.current.style.opacity = '0';
      introOverlayRef.current.style.display = 'none';
    }
    gsap.to('.hero-stagger', {
      opacity: 1,
      y: 0,
      stagger: 0.03,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#F8F8F5] pt-28 pb-12 px-6 md:px-16"
    >
      {/* 
        =======================================================
        CINEMATIC INTRO OVERLAY (Full-screen, vanishes completely on completion)
        Guarantees ZERO double-image after completion!
        =======================================================
      */}
      <div
        ref={introOverlayRef}
        className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 md:p-12 bg-[#0e0e0e] text-[#F8F8F5] transition-opacity duration-500"
      >
        {/* Top HUD status */}
        <div className="w-full max-w-6xl flex items-center justify-between text-[11px] font-mono tracking-widest uppercase text-white/50">
          <div className="flex items-center gap-2">
            <Scan className="w-4 h-4 text-[#A7C7B5] animate-pulse" />
            <span>OPTICAL SENSOR // PREETHIKA SURESH</span>
          </div>
          <span className="hidden sm:inline text-[#A7C7B5]">STATUS: FOCAL LOCK</span>
        </div>

        {/* Center Viewfinder & Macro Lens */}
        <div className="relative flex flex-col items-center justify-center my-auto">
          {/* Viewfinder crosshairs & reticle */}
          <div
            ref={viewfinderRef}
            className="absolute -inset-10 md:-inset-16 pointer-events-none flex flex-col justify-between"
          >
            {/* Top brackets */}
            <div className="flex justify-between items-center text-[#A7C7B5]/60 text-xs font-mono">
              <span>┌ FOCUS: 85MM f/1.4</span>
              <span>EYE-TRACK ┐</span>
            </div>

            {/* Center target indicator */}
            <div className="flex justify-center items-center">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border border-dashed border-[#A7C7B5]/30 animate-[spin_30s_linear_infinite]" />
            </div>

            {/* Bottom brackets */}
            <div className="flex justify-between items-center text-[#A7C7B5]/60 text-xs font-mono">
              <span>└ LAT 11.0168° N</span>
              <span>76.9558° E ┘</span>
            </div>
          </div>

          {/* Lens Container (morphs from circular lens to framed portrait) */}
          <div
            ref={lensContainerRef}
            className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden shadow-[0_0_80px_rgba(167,199,181,0.2)] border-2 border-[#A7C7B5]/50 bg-[#161616] will-change-transform"
          >
            <div
              ref={macroImageRef}
              className="relative w-full h-full will-change-transform"
            >
              <Image
                src={eyeConfig.portraitPath}
                alt="Preethika Suresh — Macro Focus"
                fill
                priority
                sizes="(max-width: 768px) 300px, 400px"
                className="object-cover"
                style={{ objectPosition: '50% 50%' }}
              />
            </div>
          </div>

          {/* Cinematic caption */}
          <div className="mt-8 text-center space-y-1">
            <p className="text-xs uppercase font-mono tracking-[0.25em] text-[#A7C7B5] flex items-center justify-center gap-2">
              <Target className="w-3.5 h-3.5" />
              <span>Calibrating Eye Alignment</span>
            </p>
            <p className="text-[11px] font-mono text-white/40">
              Kalaignar Karunanidhi Institute of Technology • ECE &apos;29
            </p>
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="w-full max-w-6xl flex items-center justify-between text-xs font-mono text-white/50">
          <span>{imageLoaded ? 'Sensor Ready' : 'Loading Asset...'}</span>
          <button
            type="button"
            onClick={handleSkipIntro}
            className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-all text-xs uppercase tracking-wider focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A7C7B5]"
          >
            <span>Skip Intro</span>
            <FastForward className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-[#A7C7B5]" />
          </button>
        </div>
      </div>

      {/* 
        =======================================================
        MAIN HERO VIEWPORT (Single, pristine portrait on the right!)
        Clean editorial design with unobstructed typography
        =======================================================
      */}
      <div
        ref={heroContentRef}
        className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center my-auto"
      >
        {/* Left Column: Editorial Headline & Actions */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 lg:space-y-8">
          {/* Engineering Degree Pill */}
          <div className="hero-stagger inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#E5E5E0] bg-white/90 backdrop-blur-sm self-start text-xs font-mono text-[#171717] tracking-wider uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#A7C7B5]" />
            <span>Electronics &amp; Communication Engineering &apos;29</span>
          </div>

          {/* Big Signature Headline */}
          <div className="space-y-2">
            <h1 className="hero-stagger clamp-headline-xl font-serif-editorial tracking-tight text-[#171717] leading-none">
              Preethika Suresh
            </h1>
            <p className="hero-stagger text-base md:text-xl font-sans-editorial text-[#777777] font-normal tracking-tight max-w-xl">
              Building at the intersection of software, electronics, and intelligent systems.
            </p>
          </div>

          {/* Micro Value Proposition */}
          <p className="hero-stagger text-sm md:text-base text-[#171717]/85 leading-relaxed max-w-xl font-sans">
            Undergraduate engineer at Kalaignar Karunanidhi Institute of Technology. Exploring
            resilient algorithms, spatial agricultural telemetry, and hardware-aware software
            systems.
          </p>

          {/* Primary Action Buttons */}
          <div className="hero-stagger flex flex-wrap items-center gap-4 pt-2">
            <MagneticButton
              variant="primary"
              onClick={() => scrollToSection('projects')}
              ariaLabel="Explore Featured Projects"
            >
              <span className="flex items-center gap-2">
                Explore My Work
                <Sparkles className="w-4 h-4 text-[#A7C7B5]" />
              </span>
            </MagneticButton>

            <MagneticButton
              variant="secondary"
              onClick={() => scrollToSection('contact')}
              ariaLabel="Navigate to Contact Information"
            >
              Get In Touch
            </MagneticButton>
          </div>

          {/* Key Engineering Signals */}
          <div className="hero-stagger pt-4 border-t border-[#E5E5E0] grid grid-cols-3 gap-4 text-xs font-mono uppercase tracking-wider text-[#777777]">
            <div>
              <span className="block text-[#171717] font-semibold text-sm">ECE</span>
              <span>Degree Track</span>
            </div>
            <div>
              <span className="block text-[#171717] font-semibold text-sm">2029</span>
              <span>Graduation</span>
            </div>
            <div>
              <span className="block text-[#171717] font-semibold text-sm">Coimbatore</span>
              <span>Base, India</span>
            </div>
          </div>
        </div>

        {/* Right Column: THE ONLY HERO PORTRAIT (Clean, elegant, beautiful) */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          {/* Subtle Ambient Frame */}
          <div className="absolute -inset-3 rounded-3xl border border-[#E5E5E0]/60 pointer-events-none -rotate-1 -z-10" />
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[#A7C7B5]/15 via-transparent to-[#D8B8A5]/15 pointer-events-none -z-10" />

          {/* Hero Portrait Card */}
          <div
            ref={heroPortraitRef}
            className="hero-stagger relative w-full max-w-[380px] aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-[#E5E5E0] bg-[#ebebe6] group transition-transform duration-500 hover:shadow-2xl"
          >
            <Image
              src={eyeConfig.portraitPath}
              alt="Preethika Suresh — Portrait"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ objectPosition: '50% 36%' }}
            />
            {/* Elegant overlay caption */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#171717]/85 via-[#171717]/40 to-transparent text-white flex items-center justify-between text-xs font-mono">
              <span className="tracking-wide">PREETHIKA SURESH</span>
              <span className="text-[#A7C7B5]">KKIT • ECE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="w-full flex items-center justify-between pt-8 text-xs font-mono text-[#777777] uppercase tracking-widest border-t border-[#E5E5E0]/60">
        <span className="hidden sm:inline">Scroll to uncover the narrative</span>
        <button
          type="button"
          onClick={() => scrollToSection('about')}
          className="flex items-center gap-2 hover:text-[#171717] transition-colors mx-auto sm:mx-0 group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#171717] rounded px-2 py-1"
          aria-label="Scroll to About Section"
        >
          <span>Begin Journey</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform text-[#A7C7B5]" />
        </button>
        <span className="hidden sm:inline">01 / 06</span>
      </div>
    </section>
  );
};
