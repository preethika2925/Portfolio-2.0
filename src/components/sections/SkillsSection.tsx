'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Globe2, Database, Cpu, CheckCircle2, Info } from 'lucide-react';
import { skillsData } from '@/data/portfolioData';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const categoryIcons: Record<string, React.ElementType> = {
  Programming: Code2,
  'Web Development': Globe2,
  'Database & Backend': Database,
  'Electronics & Engineering': Cpu,
};

export const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  // Active category filter (defaults to all or specific)
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  // Selected skill for contextual inspection card
  const [activeSkill, setActiveSkill] = useState<{
    name: string;
    description: string;
    category: string;
  }>(skillsData[0].skills[0]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (categoriesRef.current) {
        gsap.from(categoriesRef.current.children, {
          scrollTrigger: {
            trigger: categoriesRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [selectedCategory]);

  const allCategories = ['All', ...skillsData.map((c) => c.title)];

  const displayedCategories =
    selectedCategory === 'All'
      ? skillsData
      : skillsData.filter((c) => c.title === selectedCategory);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-28 md:py-36 px-6 md:px-16 bg-[#F8F8F5] border-t border-[#E5E5E0] relative"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E5E5E0] pb-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#777777] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A7C7B5]" />
              03 / Technical Matrix
            </span>
            <h2 className="clamp-headline-lg font-serif-editorial text-[#171717] tracking-tight">
              Tools, Protocols &amp; Foundations
            </h2>
          </div>

          <p className="text-sm font-sans text-[#777777] max-w-md">
            Practiced across software development, digital hardware, spatial data, and embedded systems.
            Select any technology to inspect its applied context.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {allCategories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#171717] ${
                  isSelected
                    ? 'bg-[#171717] text-[#F8F8F5] shadow-sm'
                    : 'bg-white border border-[#E5E5E0] text-[#777777] hover:border-[#171717] hover:text-[#171717]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Two-Column Grid: Left Categories, Right Live Inspector Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Categories Grid */}
          <div ref={categoriesRef} className="lg:col-span-8 space-y-8">
            {displayedCategories.map((category) => {
              const IconComponent = categoryIcons[category.title] || Code2;
              return (
                <div
                  key={category.title}
                  className="p-6 md:p-8 rounded-2xl bg-white border border-[#E5E5E0] shadow-sm space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-[#E5E5E0]/60 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#F8F8F5] border border-[#E5E5E0] flex items-center justify-center text-[#171717]">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[#171717] font-sans">
                          {category.title}
                        </h3>
                        <p className="text-xs text-[#777777] font-sans">{category.description}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[#777777]">
                      {category.skills.length} Technologies
                    </span>
                  </div>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-2.5">
                    {category.skills.map((skill) => {
                      const isActive = activeSkill.name === skill.name;
                      return (
                        <button
                          key={skill.name}
                          type="button"
                          onClick={() => setActiveSkill(skill)}
                          onMouseEnter={() => setActiveSkill(skill)}
                          className={`group relative px-4 py-2 rounded-xl text-xs font-medium font-sans transition-all duration-200 flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#171717] ${
                            isActive
                              ? 'bg-[#171717] text-white shadow-md'
                              : 'bg-[#F8F8F5] text-[#171717] border border-[#E5E5E0] hover:border-[#171717]/40 hover:bg-white'
                          }`}
                        >
                          <span>{skill.name}</span>
                          {skill.highlight && (
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isActive ? 'bg-[#A7C7B5]' : 'bg-[#A7C7B5]'
                              }`}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Sticky Inspector Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="p-6 md:p-8 rounded-2xl bg-white border border-[#E5E5E0] shadow-md space-y-6">
              <div className="flex items-center justify-between border-b border-[#E5E5E0] pb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#777777] flex items-center gap-2">
                  <Info className="w-3.5 h-3.5 text-[#A7C7B5]" />
                  Technology Inspector
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#A7C7B5]/20 text-[#171717] font-semibold">
                  {activeSkill.category}
                </span>
              </div>

              <div className="space-y-3">
                <h4 className="text-2xl font-serif-editorial text-[#171717]">
                  {activeSkill.name}
                </h4>
                <p className="text-sm font-sans text-[#171717]/80 leading-relaxed">
                  {activeSkill.description}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8F8F5] border border-[#E5E5E0] space-y-2">
                <span className="text-xs font-mono text-[#777777] uppercase block">
                  Application Scope
                </span>
                <div className="flex items-center gap-2 text-xs font-medium text-[#171717]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#A7C7B5]" />
                  <span>Applied in academic engineering and project explorations</span>
                </div>
              </div>

              <div className="text-[11px] font-mono text-[#777777] leading-relaxed pt-2">
                * Skills are represented transparently based on actual academic and project engagement
                without arbitrary percentage metrics.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
