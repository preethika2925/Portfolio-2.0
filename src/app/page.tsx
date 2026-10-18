import React from 'react';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { Navigation } from '@/components/layout/Navigation';
import { CinematicIntro } from '@/components/intro/CinematicIntro';
import { KineticTicker } from '@/components/ui/KineticTicker';
import { AboutSection } from '@/components/sections/AboutSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { JourneySection } from '@/components/sections/JourneySection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#F8F8F5] text-[#171717] grain-overlay">
      {/* Desktop Magnetic Dual-Layer Custom Cursor */}
      <CustomCursor />

      {/* Top Scroll Indicator */}
      <ScrollProgress />

      {/* Persistent Floating Navigation */}
      <Navigation />

      {/* Signature Cinematic Opening & Hero Section */}
      <CinematicIntro />

      {/* Infinite Kinetic Ticker: Disciplines & Institution */}
      <KineticTicker
        items={[
          'KIT COIMBATORE',
          'ELECTRONICS & COMMUNICATION ENGINEERING',
          'EMBEDDED SYSTEMS',
          'NEXT.JS WEB ARCHITECTURES',
          'SPATIAL AGTECH TELEMETRY',
          'C/C++ & PYTHON',
          'FIRST-PRINCIPLES MINDSET',
          'CYCLE 2025 – 2029',
        ]}
        theme="light"
        speed={35}
      />

      {/* Editorial Biography & Foundational Pillars */}
      <AboutSection />

      {/* Interactive Technical Skills Matrix & Live Inspector */}
      <SkillsSection />

      {/* Dark Cinematic Projects Showcase & Technical Schematics */}
      <ProjectsSection />

      {/* Reverse Dark Kinetic Stream */}
      <KineticTicker
        items={[
          'CIRCUIT SCHEMATICS',
          'CLOSED-LOOP IOT SENSORS',
          'DATA STRUCTURES & ALGORITHMS',
          'HARDWARE & CODE SYNERGY',
          'OPEN SOURCE SYSTEMS',
          'KIT COIMBATORE',
        ]}
        theme="dark"
        speed={28}
        reverse
      />

      {/* Animated Chronology & Certified Tracks */}
      <JourneySection />

      {/* Communication Coordinates & Validated Inquiry Pipeline */}
      <ContactSection />
    </main>
  );
}
