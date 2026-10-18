'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Sparkles } from 'lucide-react';
import { eyeConfig, profileData } from '@/data/portfolioData';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { MagneticButton } from '@/components/ui/MagneticButton';

// Register GSAP plugins safely on client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const CinematicIntro: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const introOverlayRef = useRef<HTMLDivElement>(null);
  const lensFrameRef = useRef<HTMLDivElement>(null);
  const macroImageRef = useRef<HTMLDivElement>(null);
  const glowRingRef = useRef<HTMLDivElement>(null);
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
      // 1. Initial State:
      // The lens starts in the center as an elegant circular aperture framing Preethika's face and eyes.
      // Perfectly centered horizontally (startXPercent = 0).
      const startScale = 2.0;
      const startXPercent = 0; // Perfectly centered horizontally!
      const startYPercent = 4; // Natural vertical eye level

      gsap.set(macroImageRef.current, {
        scale: startScale,
        xPercent: startXPercent,
        yPercent: startYPercent,
        transformOrigin: '50% 40%',
      });

      gsap.set(lensFrameRef.current, {
        width: 250,
        height: 250,
        borderRadius: '9999px',
        boxShadow: '0 0 60px rgba(167, 199, 181, 0.25)',
      });

      gsap.set(glowRingRef.current, {
        scale: 0.95,
        opacity: 0.6,
      });

      gsap.set('.intro-card-caption', {
        opacity: 0,
      });

      gsap.set('.intro-text-reveal', {
        opacity: 0,
        y: 20,
      });

      gsap.set('.hero-stagger', {
        opacity: 0,
        y: 25,
      });

      const tl = gsap.timeline({
        defaults: { ease: 'power3.inOut' },
      });

      // Step 1: Smoothly fade in top and bottom portfolio identity text
      tl.to('.intro-text-reveal', {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power2.out',
      })
        // Step 2: Gentle eye focus pulse
        .to(
          macroImageRef.current,
          {
            scale: startScale * 1.05,
            duration: 0.8,
            ease: 'sine.inOut',
          },
          '+=0.1'
        )
        // Step 3: THE ENHANCED SMOOTH EXPANSION & CAMERA PULL-BACK
        // The lens smoothly expands from circle into a luxury rounded editorial portrait
        // while the image gracefully glides from the eye to the full, sharp portrait!
        .to(
          lensFrameRef.current,
          {
            width: 340,
            height: 425,
            borderRadius: '28px',
            boxShadow: '0 25px 80px rgba(0, 0, 0, 0.7)',
            borderColor: 'rgba(255, 255, 255, 0.2)',
            duration: 1.5,
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
            duration: 1.5,
            ease: 'expo.inOut',
          },
          '<'
        )
        .to(
          glowRingRef.current,
          {
            scale: 1.4,
            opacity: 0,
            duration: 1.0,
            ease: 'power2.out',
          },
          '<'
        )
        .to(
          '.intro-card-caption',
          {
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.6'
        )
        // Step 4: Seamless Crossfade into the Hero section
        // Dissolves the dark intro screen while the light hero and single hero portrait smoothly take over!
        .to(
          introOverlayRef.current,
          {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
              if (introOverlayRef.current) {
                introOverlayRef.current.style.display = 'none';
              }
            },
          },
          '+=0.2'
        )
        // Step 5: Stagger in the interactive hero typography and actions
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

  // Click anywhere to expedite directly into hero
  const handleExpediteIntro = () => {
    if (introOverlayRef.current) {
      introOverlayRef.current.style.opacity = '0';
      introOverlayRef.current.style.display = 'none';
    }
    gsap.to('.hero-stagger', {
      opacity: 1,
      y: 0,
      stagger: 0.03,
      duration: 0.35,
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
        CENTRAL CINEMATIC ENTRY ANIMATION (Enhanced & Smoothed)
        100% Focused on Preethika Suresh's portfolio content!
        Click anywhere to smoothly expedite into hero.
        =======================================================
      */}
      <div
        ref={introOverlayRef}
        onClick={handleExpediteIntro}
        className="fixed inset-0 z-50 flex flex-col justify-between p-8 md:p-12 bg-[#101010] text-[#F8F8F5] transition-opacity duration-700 select-none cursor-pointer"
      >
        {/* Top Header: Pure Portfolio Identity */}
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between text-xs font-mono uppercase tracking-[0.25em] text-[#A7C7B5]">
          <span className="intro-text-reveal flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A7C7B5] animate-pulse" />
            {profileData.name}
          </span>
          <span className="intro-text-reveal text-white/50 hidden sm:inline">
            B.E. Electronics &amp; Communication &apos;29
          </span>
          <span className="intro-text-reveal text-white/40">KKIT Coimbatore</span>
        </div>

        {/* Center: Eye Lens & Editorial Narrative */}
        <div className="relative flex flex-col items-center justify-center my-auto space-y-8">
          {/* Central Animated Aperture Lens */}
          <div className="relative flex items-center justify-center">
            {/* Luminous Ambient Glow Ring */}
            <div
              ref={glowRingRef}
              className="absolute w-72 h-72 md:w-84 md:h-84 rounded-full border border-[#A7C7B5]/30 animate-[spin_35s_linear_infinite] pointer-events-none"
            />

            {/* The Lens Container that smoothly morphs from circle to rounded portrait */}
            <div
              ref={lensFrameRef}
              className="relative overflow-hidden border-2 border-[#A7C7B5]/60 bg-[#161616] will-change-transform flex items-center justify-center shadow-2xl transition-colors duration-500"
            >
              <div
                ref={macroImageRef}
                className="relative w-full h-full will-change-transform"
              >
                <Image
                  src={eyeConfig.portraitPath}
                  alt={profileData.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 340px, 420px"
                  className="object-cover"
                  style={{ objectPosition: '50% 36%' }}
                />
              </div>

              {/* Elegant interior caption that appears when card forms */}
              <div className="intro-card-caption absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#101010]/90 via-[#101010]/40 to-transparent text-white flex items-center justify-between text-xs font-mono pointer-events-none">
                <span className="tracking-wide">PREETHIKA SURESH</span>
                <span className="text-[#A7C7B5]">KKIT • ECE</span>
              </div>
            </div>
          </div>

          {/* Central Editorial Narrative */}
          <div className="text-center space-y-2 max-w-lg">
            <h2 className="intro-text-reveal text-2xl sm:text-3xl md:text-4xl font-serif-editorial text-white tracking-tight">
              Curious by nature. <span className="italic text-[#A7C7B5]">An engineer in progress.</span>
            </h2>
            <p className="intro-text-reveal text-xs md:text-sm font-sans text-white/60 font-light tracking-wide">
              Building at the intersection of software, electronics, and intelligent systems.
            </p>
          </div>
        </div>

        {/* Bottom Bar: Institutional Detail */}
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between text-[11px] font-mono text-white/40 uppercase tracking-widest border-t border-white/10 pt-4">
          <span className="intro-text-reveal">Kalaignar Karunanidhi Institute of Technology</span>
          <span className="intro-text-reveal hidden sm:inline text-[#A7C7B5]">Engineering Portfolio</span>
          <span className="intro-text-reveal">2025 — 2029</span>
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
