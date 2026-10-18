'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '@/data/portfolioData';
import { Project } from '@/types/portfolio';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectDetailModal } from '@/components/projects/ProjectDetailModal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = [
    'All',
    'Agriculture Technology',
    'Software Development',
    'Embedded Systems / IoT',
    'Programming / Data Structures',
  ];

  const filteredProjects =
    activeFilter === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
          y: 50,
          opacity: 0,
          stagger: 0.1,
          duration: 0.85,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeFilter]);

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseProject = () => {
    setIsModalOpen(false);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-28 md:py-36 px-6 md:px-16 bg-[#151515] text-[#F8F8F5] relative overflow-hidden transition-colors duration-700"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#A7C7B5]/5 rounded-full blur-[140px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#A7C7B5] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A7C7B5]" />
              04 / Selected Works &amp; Concepts
            </span>
            <h2 className="clamp-headline-lg font-serif-editorial text-white tracking-tight">
              Engineering Explorations
            </h2>
          </div>

          <p className="text-sm font-sans text-white/60 max-w-md">
            Architectures spanning grassroots agriculture intelligence, high-performance data structures,
            and embedded feedback circuits.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((category) => {
            const isSelected = activeFilter === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A7C7B5] ${
                  isSelected
                    ? 'bg-[#F8F8F5] text-[#151515] font-semibold'
                    : 'bg-white/5 border border-white/10 text-white/70 hover:border-white/30 hover:text-white'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={handleOpenProject}
            />
          ))}
        </div>

        {/* Transparent Disclaimer Notice */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-xs font-mono text-white/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span>* All projects are classified honestly by their verified status: Concept, Implemented Software, or Hardware Specification.</span>
          <a
            href="https://github.com/preethika2925"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#A7C7B5] hover:underline shrink-0"
          >
            Explore github.com/preethika2925 &rarr;
          </a>
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseProject}
      />
    </section>
  );
};
