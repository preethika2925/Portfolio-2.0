'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle, ShieldAlert } from 'lucide-react';
import { GithubIcon } from '@/components/ui/SocialIcons';
import { Project } from '@/types/portfolio';
import { ProjectDiagram } from './ProjectDiagram';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Focus management and Escape key listener
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      modalRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      previousActiveElement.current?.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
        >
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#151515]/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#1c1c1c] text-[#F8F8F5] border border-white/10 shadow-2xl p-6 md:p-10 no-scrollbar focus:outline-none"
          >
            {/* Header: Project Number & Close Button */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono text-[#A7C7B5] font-semibold">
                  PROJECT {project.number}
                </span>
                <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70">
                  {project.category}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close project detail modal"
                className="w-10 h-10 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/80 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A7C7B5]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Title & Tagline */}
            <div className="space-y-3 mb-8">
              <h3 id="modal-title" className="text-3xl sm:text-4xl md:text-5xl font-serif-editorial text-white tracking-tight">
                {project.title}
              </h3>
              <p className="text-base sm:text-lg text-[#A7C7B5] font-sans font-normal leading-relaxed">
                {project.tagline}
              </p>
            </div>

            {/* Visual Technical Diagram */}
            <div className="relative w-full aspect-[16/9] max-h-72 rounded-2xl overflow-hidden border border-white/10 mb-8 bg-[#111]">
              <ProjectDiagram projectId={project.id} className="w-full h-full" />
            </div>

            {/* Development Status Badge */}
            <div className="flex items-center gap-2 p-3.5 rounded-xl bg-white/5 border border-white/10 mb-8 text-xs font-mono">
              <ShieldAlert className="w-4 h-4 text-[#D8B8A5]" />
              <span className="text-white/60">Development Classification:</span>
              <span className="text-white font-medium">{project.status}</span>
            </div>

            {/* Problem & Solution Architecture */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#D8B8A5] block">
                  Problem &amp; Motivation
                </span>
                <p className="text-sm text-white/80 leading-relaxed font-sans">
                  {project.problemStatement}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#A7C7B5] block">
                  Solution Architecture
                </span>
                <p className="text-sm text-white/80 leading-relaxed font-sans">
                  {project.solutionArchitecture}
                </p>
              </div>
            </div>

            {/* Explored Features */}
            <div className="space-y-4 mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-white/60 block">
                Key Features &amp; Explorations
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-white/80 font-sans leading-relaxed"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-[#A7C7B5] mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="space-y-3 mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-white/60 block">
                Verified Technologies &amp; Concepts
              </span>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-white/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* External Links */}
            {(project.githubUrl || project.liveUrl) && (
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#171717] hover:bg-[#A7C7B5] transition-colors text-xs font-semibold uppercase tracking-wider focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A7C7B5]"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub Repository</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 hover:border-white text-white text-xs font-semibold uppercase tracking-wider transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A7C7B5]"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demonstration</span>
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
