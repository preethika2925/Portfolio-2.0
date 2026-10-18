'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { profileData } from '@/data/portfolioData';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

export const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // ScrollSpy active section detection
      const sections = ['home', 'about', 'skills', 'projects', 'journey', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 md:py-6 px-4 md:px-12 flex justify-between items-center ${
          scrolled ? 'bg-[#F8F8F5]/80 backdrop-blur-md border-b border-[#E5E5E0]/80 py-3 md:py-4' : 'bg-transparent'
        }`}
      >
        {/* Brand / Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('#home');
          }}
          className="group flex items-center gap-2 text-[#171717] font-medium tracking-tight text-sm md:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-[#171717] rounded px-1"
        >
          <span className="w-2 h-2 rounded-full bg-[#171717] group-hover:bg-[#A7C7B5] transition-colors duration-300" />
          <span className="font-semibold tracking-wide uppercase text-xs md:text-sm">
            {profileData.preferredName}
          </span>
          <span className="text-[#777777] text-xs hidden sm:inline">
            / ECE &apos;29
          </span>
        </a>

        {/* Desktop Navigation Pill */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-1 bg-white/70 backdrop-blur-xl border border-[#E5E5E0] rounded-full p-1.5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#171717] ${
                  isActive ? 'text-[#171717]' : 'text-[#777777] hover:text-[#171717]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill-active"
                    className="absolute inset-0 bg-[#E5E5E0]/70 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#contact');
            }}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#171717] border border-[#171717]/20 hover:border-[#171717] px-4 py-2 rounded-full transition-all duration-200 hover:bg-[#171717] hover:text-[#F8F8F5]"
          >
            <span>Get in touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-[#E5E5E0] bg-white/80 backdrop-blur-md text-[#171717] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#171717]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#F8F8F5]/95 backdrop-blur-2xl flex flex-col justify-between p-8 pt-24 md:hidden"
          >
            <nav className="flex flex-col gap-6">
              <span className="text-xs uppercase tracking-widest text-[#777777] font-mono">
                Index Navigation
              </span>
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.3 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollTo(link.href);
                      }}
                      className={`text-3xl font-serif-editorial tracking-tight flex items-center justify-between py-2 border-b border-[#E5E5E0]/60 ${
                        isActive ? 'text-[#171717] font-medium' : 'text-[#777777]'
                      }`}
                    >
                      <span>{link.label}</span>
                      <span className="text-xs font-sans font-mono tracking-widest">
                        0{index + 1}
                      </span>
                    </a>
                  </motion.div>
                );
              })}
            </nav>

            {/* Mobile Footer Info */}
            <div className="pt-8 border-t border-[#E5E5E0] flex flex-col gap-2">
              <span className="text-xs text-[#777777] font-mono">Direct Communication</span>
              <a
                href={`mailto:${profileData.email}`}
                className="text-sm font-medium text-[#171717] hover:underline"
              >
                {profileData.email}
              </a>
              <p className="text-xs text-[#777777] mt-1">
                Kalaignar Karunanidhi Institute of Technology • ECE &apos;29
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
