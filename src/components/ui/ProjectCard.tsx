'use client';

import GlassCard from './GlassCard';
import NeonButton from './NeonButton';
import { ExternalLink, Globe } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  date?: string;
  type: string;
  description: string;
  techStack: string[];
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export default function ProjectCard({
  title,
  date,
  type,
  description,
  techStack,
  highlights,
  githubUrl,
  liveUrl,
}: ProjectCardProps) {
  return (
    <GlassCard className="p-6 group" hover>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-orbitron text-base md:text-lg font-bold text-text-primary group-hover:text-neon-cyan transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            {date && (
              <span className="text-xs text-neon-purple font-orbitron">{date}</span>
            )}
            <span className="text-xs text-text-primary/40">•</span>
            <span className="text-xs text-text-primary/60">{type}</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-text-primary/70 mb-4 leading-relaxed">{description}</p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="skill-pill text-[10px] text-neon-cyan/80 border-neon-cyan/20"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Highlights */}
      <ul className="space-y-1.5 mb-4">
        {highlights.map((h, i) => (
          <li key={i} className="text-xs text-text-primary/60 flex items-start gap-2">
            <span className="text-neon-cyan mt-0.5 text-[8px]">▸</span>
            {h}
          </li>
        ))}
      </ul>

      {/* Action buttons */}
      <div className="flex gap-2 pt-2 border-t border-white/5">
        {githubUrl && (
          <NeonButton href={githubUrl} variant="cyan" className="text-[10px] px-4 py-2">
            <Globe size={12} /> GitHub
          </NeonButton>
        )}
        {liveUrl && (
          <NeonButton href={liveUrl} variant="purple" className="text-[10px] px-4 py-2">
            <ExternalLink size={12} /> Live Demo
          </NeonButton>
        )}
      </div>
    </GlassCard>
  );
}
