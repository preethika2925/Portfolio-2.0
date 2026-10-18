'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '@/components/ui/SocialIcons';
import { Project } from '@/types/portfolio';
import { ProjectDiagram } from './ProjectDiagram';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(project)}
      data-cursor-text="VIEW"
      className="group relative flex flex-col justify-between rounded-3xl bg-[#1c1c1c] border border-white/10 hover:border-[#A7C7B5]/60 transition-all duration-500 overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1"
    >
      {/* Top Graphic Blueprint */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#121212] border-b border-white/10">
        <ProjectDiagram projectId={project.id} className="transition-transform duration-700 ease-out group-hover:scale-105" />

        {/* Oversized Subtle Number */}
        <div className="absolute top-4 left-5 text-4xl font-serif-editorial text-white/30 group-hover:text-white/80 transition-colors">
          {project.number}
        </div>

        {/* Category Pill */}
        <div className="absolute top-4 right-4 text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/80">
          {project.category}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 md:p-8 flex flex-col justify-between flex-grow space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-[#A7C7B5] tracking-wider">
              {project.status}
            </span>
            <div className="w-8 h-8 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white/70 group-hover:text-white group-hover:bg-[#A7C7B5] group-hover:text-[#171717] transition-all duration-300">
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          <h3 className="text-2xl font-serif-editorial text-white group-hover:text-[#A7C7B5] transition-colors tracking-tight">
            {project.title}
          </h3>

          <p className="text-xs md:text-sm text-white/70 font-sans leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Footer Tags & Actions */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5 max-w-[75%]">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/60"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 text-white/40">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`View ${project.title} GitHub repository`}
              className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#A7C7B5]"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
