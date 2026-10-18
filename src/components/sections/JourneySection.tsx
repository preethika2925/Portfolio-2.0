'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Award, BookOpen, Wrench, Calendar, CheckCircle2, Clock } from 'lucide-react';
import { journeyMilestones } from '@/data/portfolioData';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const typeIcons: Record<string, React.ElementType> = {
  Education: GraduationCap,
  Certification: Award,
  'Professional Learning': BookOpen,
  'Technical Training': Wrench,
};

export const JourneySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Progressively draw the vertical timeline line as user scrolls
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { strokeDashoffset: 1000 },
          {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'bottom 85%',
              scrub: 1.2,
            },
          }
        );
      }

      // Stagger timeline card items into view
      if (itemsRef.current) {
        gsap.from(itemsRef.current.children, {
          scrollTrigger: {
            trigger: itemsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          stagger: 0.15,
          duration: 0.85,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="py-28 md:py-36 px-6 md:px-16 bg-[#F8F8F5] border-t border-[#E5E5E0] relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E5E5E0] pb-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#777777] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A7C7B5]" />
              05 / Chronology &amp; Learning
            </span>
            <h2 className="clamp-headline-lg font-serif-editorial text-[#171717] tracking-tight">
              Academic &amp; Professional Path
            </h2>
          </div>

          <p className="text-sm font-sans text-[#777777] max-w-sm">
            Milestones across undergraduate engineering, structured certification tracks, and corporate learning.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 md:pl-10">
          {/* Animated SVG Timeline Line */}
          <svg
            className="absolute left-[23px] md:left-[39px] top-6 bottom-6 w-1 h-[calc(100%-48px)] overflow-visible pointer-events-none"
            aria-hidden="true"
          >
            <line
              ref={lineRef}
              x1="0"
              y1="0"
              x2="0"
              y2="100%"
              stroke="#A7C7B5"
              strokeWidth="2"
              strokeDasharray="1000"
              strokeDashoffset="1000"
            />
          </svg>

          {/* Timeline Items */}
          <div ref={itemsRef} className="space-y-10">
            {journeyMilestones.map((milestone, idx) => {
              const Icon = typeIcons[milestone.type] || BookOpen;
              const isCompleted = milestone.status === 'Completed';

              return (
                <div key={idx} className="relative flex items-start gap-6 group">
                  {/* Timeline Node Marker */}
                  <div className="relative -ml-[23px] md:-ml-[39px] mt-1 shrink-0">
                    <div
                      className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm ${
                        isCompleted
                          ? 'bg-[#171717] border-[#A7C7B5] text-[#A7C7B5]'
                          : 'bg-white border-[#171717]/40 text-[#171717]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Milestone Card */}
                  <div className="flex-grow p-6 md:p-8 rounded-2xl bg-white border border-[#E5E5E0] shadow-sm hover:border-[#171717]/30 hover:shadow-md transition-all duration-300 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E5E0]/60 pb-3">
                      <div className="flex items-center gap-2 text-xs font-mono text-[#777777]">
                        <Calendar className="w-3.5 h-3.5 text-[#A7C7B5]" />
                        <span>{milestone.period}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-[#F8F8F5] border border-[#E5E5E0] text-[#777777]">
                          {milestone.type}
                        </span>
                        <span
                          className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                            isCompleted
                              ? 'bg-[#A7C7B5]/20 text-[#171717] font-semibold'
                              : 'bg-[#D8B8A5]/25 text-[#171717] font-semibold'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-3 h-3 text-[#171717]" />
                          ) : (
                            <Clock className="w-3 h-3 text-[#171717]" />
                          )}
                          <span>{milestone.status}</span>
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl md:text-2xl font-serif-editorial text-[#171717] mb-1">
                        {milestone.title}
                      </h3>
                      <p className="text-xs font-mono text-[#777777]">
                        {milestone.institution}
                      </p>
                    </div>

                    <p className="text-xs md:text-sm text-[#171717]/80 font-sans leading-relaxed">
                      {milestone.details}
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
