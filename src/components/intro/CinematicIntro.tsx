'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Sparkles, FastForward } from 'lucide-react';
import { eyeConfig, profileData } from '@/data/portfolioData';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { MagneticButton } from '@/components/ui/MagneticButton';

// Register GSAP plugins safely on client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const CinematicIntro: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const eyeApertureRef = useRef<HTMLDivElement>(null);
  const portraitImgRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const introOverlayRef = useRef<HTMLDivElement>(null);
  const eyeApertureBorderRef = useRef<HTMLDivElement>(null);

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
      .catch(() => setImageLoaded(true)); // Graceful fallback if decode rejected
  }, []);

  // Main GSAP Cinematic Eye Animation Sequence
  useEffect(() => {
    if (!imageLoaded || !containerRef.current) return;

    // If user prefers reduced motion, show hero directly
    if (reducedMotion) {
      if (introOverlayRef.current) introOverlayRef.current.style.display = 'none';
      if (heroContentRef.current) gsap.set(heroContentRef.current, { opacity: 1, y: 0 });
      if (portraitImgRef.current) {
        gsap.set(portraitImgRef.current, {
          scale: 1,
          x: 0,
          y: 0,
          clipPath: 'circle(100% at 50% 50%)',
        });
      }
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.inOut' },
        onComplete: () => {
          if (introOverlayRef.current) {
            introOverlayRef.current.style.pointerEvents = 'none';
          }
        },
      });

      // Initial Setup:
      // Focus strongly on Preethika's eye coordinate:
      // eyeFocusX = 47%, eyeFocusY = 44%, eyeZoom = 4.8
      gsap.set(portraitImgRef.current, {
        scale: eyeConfig.eyeZoom,
        transformOrigin: `${eyeConfig.eyeFocusX}% ${eyeConfig.eyeFocusY}%`,
        filter: 'contrast(1.08) brightness(1.02)',
      });

      gsap.set(eyeApertureRef.current, {
        clipPath: 'circle(12% at 50% 50%)',
      });

      gsap.set(eyeApertureBorderRef.current, {
        opacity: 0,
        scale: 0.8,
      });

      gsap.set('.hero-stagger', {
        opacity: 0,
        y: 40,
      });

      // Phase 1 -> Phase 2: Fade in initial eye aperture in dark cinematic frame
      tl.to(introOverlayRef.current, {
        opacity: 1,
        duration: 0.4,
      })
        .to(
          eyeApertureBorderRef.current,
          {
            opacity: 0.9,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
          },
          '+=0.1'
        )
        // Subtle focus pulse on the eye iris
        .to(portraitImgRef.current, {
          scale: eyeConfig.eyeZoom * 1.05,
          duration: 1.2,
          ease: 'power1.out',
        })
        // Phase 3: The Grand Reveal: Aperture expands and camera pulls out from eye to full portrait
        .to(
          eyeApertureRef.current,
          {
            clipPath: 'circle(75% at 50% 50%)',
            duration: 1.8,
            ease: 'expo.inOut',
          },
          '-=0.4'
        )
        .to(
          portraitImgRef.current,
          {
            scale: 1,
            transformOrigin: '50% 50%',
            duration: 1.9,
            ease: 'expo.inOut',
          },
          '<'
        )
        .to(
          eyeApertureBorderRef.current,
          {
            opacity: 0,
            scale: 1.4,
            duration: 0.9,
            ease: 'power2.out',
          },
          '<'
        )
        // Overlay background fades to editorial canvas (#F8F8F5)
        .to(
          introOverlayRef.current,
          {
            backgroundColor: 'rgba(248, 248, 245, 0)',
            duration: 1.2,
            ease: 'power2.out',
          },
          '-=1.0'
        )
        // Phase 4: Hero Typography & Content Stagger Entrance
        .to(
          '.hero-stagger',
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.9,
            ease: 'power3.out',
          },
          '-=0.8'
        );

      // Phase 5: Handoff to Continuous Scroll Storytelling via ScrollTrigger
      // Once the opening sequence settles, gently scale down the portrait as user begins scrolling down
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        animation: gsap.to(portraitImgRef.current, {
          scale: 0.94,
          y: 40,
          opacity: 0.85,
          ease: 'none',
        }),
      });
    }, containerRef);

    return () => ctx.revert();
  }, [imageLoaded, reducedMotion]);

  // Skip Intro Handler
  const handleSkipIntro = () => {
    if (introOverlayRef.current) {
      introOverlayRef.current.style.opacity = '0';
      introOverlayRef.current.style.pointerEvents = 'none';
    }
    if (portraitImgRef.current) {
      gsap.to(portraitImgRef.current, {
        scale: 1,
        transformOrigin: '50% 50%',
        duration: 0.5,
        ease: 'power2.out',
      });
    }
    if (eyeApertureRef.current) {
      gsap.to(eyeApertureRef.current, {
        clipPath: 'circle(100% at 50% 50%)',
        duration: 0.5,
        ease: 'power2.out',
      });
    }
    gsap.to('.hero-stagger', {
      opacity: 1,
      y: 0,
      stagger: 0.04,
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
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#F8F8F5] pt-24 pb-12 px-6 md:px-16"
    >
      {/* Cinematic Black Screen / Initial Loading Overlay */}
      <div
        ref={introOverlayRef}
        className="fixed inset-0 z-50 flex flex-col items-center justify-between p-8 bg-[#151515] transition-opacity duration-700 pointer-events-auto"
        style={{ opacity: 1 }}
      >
        {/* Top bar during intro */}
        <div className="w-full max-w-7xl flex items-center justify-between text-xs font-mono tracking-widest text-[#F8F8F5]/60 uppercase">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A7C7B5] animate-ping" />
            Initializing Identity
          </span>
          <span>Coimbatore, IN</span>
        </div>

        {/* Center eye focal aperture frame */}
        <div className="relative flex flex-col items-center justify-center my-auto">
          {/* Subtle Aperture Target Reticle */}
          <div
            ref={eyeApertureBorderRef}
            className="absolute w-56 h-56 md:w-80 md:h-80 rounded-full border border-[#A7C7B5]/40 pointer-events-none transition-all duration-300"
          >
            <div className="absolute inset-2 rounded-full border border-dashed border-[#D8B8A5]/30 animate-[spin_24s_linear_infinite]" />
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#151515] px-2 text-[9px] font-mono tracking-widest text-[#A7C7B5] uppercase">
              Focal Aperture • 47.0% X / 44.0% Y
            </div>
          </div>

          {/* Aperture Mask Container */}
          <div
            ref={eyeApertureRef}
            className="relative w-56 h-56 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl bg-[#1c1c1c] will-change-transform"
          >
            <div ref={portraitImgRef} className="relative w-full h-full will-change-transform">
              <Image
                src={eyeConfig.portraitPath}
                alt={profileData.name}
                fill
                priority
                sizes="(max-width: 768px) 320px, 480px"
                className="object-cover"
                style={{ objectPosition: eyeConfig.heroObjectPosition }}
              />
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs uppercase font-mono tracking-[0.3em] text-[#F8F8F5]/50">
              The Creative Perspective
            </p>
          </div>
        </div>

        {/* Skip Intro Control */}
        <div className="w-full max-w-7xl flex items-center justify-between text-xs font-mono text-[#F8F8F5]/50">
          <span>{imageLoaded ? 'Image Calibrated' : 'Calibrating Portrait...'}</span>
          <button
            type="button"
            onClick={handleSkipIntro}
            className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-all text-xs uppercase tracking-wider focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A7C7B5]"
          >
            <span>Skip Intro</span>
            <FastForward className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Main Hero Viewport Composition (revealed after aperture zoom-out) */}
      <div
        ref={heroContentRef}
        className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto"
      >
        {/* Left Column: Editorial Headline & Stagger Typography */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 lg:space-y-8 z-10">
          {/* Status badge */}
          <div className="hero-stagger inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#E5E5E0] bg-white/80 backdrop-blur-sm self-start text-xs font-mono text-[#171717] tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#A7C7B5]" />
            <span>Electronics & Communication Engineering &apos;29</span>
          </div>

          {/* Oversized Signature Name */}
          <div className="space-y-1">
            <h1 className="hero-stagger clamp-headline-xl font-serif-editorial tracking-tight text-[#171717]">
              Preethika Suresh
            </h1>
            <p className="hero-stagger text-base md:text-xl font-sans-editorial text-[#777777] font-normal tracking-tight max-w-xl">
              Building at the intersection of software, electronics, and intelligent systems.
            </p>
          </div>

          {/* Micro Value Proposition */}
          <p className="hero-stagger text-sm md:text-base text-[#171717]/80 leading-relaxed max-w-lg font-sans">
            Undergraduate engineer at Kalaignar Karunanidhi Institute of Technology. Crafting
            resilient code, spatial agriculture solutions, and hardware-aware digital architectures.
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

          {/* Quick Stats / Signals */}
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

        {/* Right Column: Editorial Portrait Showcase */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          {/* Subtle Decorative Geometry */}
          <div className="absolute -inset-4 rounded-3xl border border-[#E5E5E0]/70 pointer-events-none -rotate-2 -z-10" />
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-[#A7C7B5]/20 via-transparent to-[#D8B8A5]/20 pointer-events-none -z-10" />

          {/* Hero Portrait Frame */}
          <div className="hero-stagger relative w-full max-w-[380px] aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-[#E5E5E0] bg-[#ebebe6] group">
            <Image
              src={eyeConfig.portraitPath}
              alt="Preethika Suresh — Portrait"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ objectPosition: eyeConfig.heroObjectPosition }}
            />
            {/* Elegant overlay caption */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#171717]/80 via-[#171717]/30 to-transparent text-white flex items-center justify-between text-xs font-mono">
              <span>PREETHIKA SURESH</span>
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
