'use client';

import GlassCard from './GlassCard';
import NeonButton from './NeonButton';
import { ExternalLink, Globe } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  date?: string;
  type: string;
  category?: 'quantum' | 'genai' | 'fullstack';
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
  category = 'genai',
  description,
  techStack,
  highlights,
  githubUrl,
  liveUrl,
}: ProjectCardProps) {
  const isQuantum = category === 'quantum';

  return (
    <GlassCard className="p-6 group relative overflow-hidden border border-white/5 hover:border-white/15" hover>
      {/* Category corner badge */}
      <div className="flex items-start justify-between mb-3 gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span
              className={`text-[9px] font-orbitron font-semibold uppercase px-2 py-0.5 rounded-full border ${
                isQuantum
                  ? 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30 shadow-[0_0_10px_rgba(0,245,255,0.2)]'
                  : 'bg-neon-purple/10 text-neon-purple border-neon-purple/30 shadow-[0_0_10px_rgba(191,0,255,0.2)]'
              }`}
            >
              {isQuantum ? '⚛️ QUANTUM COMPUTING' : '⚡ GENERATIVE AI'}
            </span>
            {date && (
              <span className="text-xs text-text-primary/50 font-orbitron">{date}</span>
            )}
          </div>
          <h3 className="font-orbitron text-base md:text-lg font-bold text-text-primary group-hover:text-neon-cyan transition-colors">
            {title}
          </h3>
          <p className="text-xs text-text-primary/60 mt-0.5">{type}</p>
        </div>
      </div>

      <p className="text-sm text-text-primary/75 mb-4 leading-relaxed">{description}</p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {techStack.map((tech) => (
          <span
            key={tech}
            className={`skill-pill text-[10px] ${
              isQuantum
                ? 'text-neon-cyan/90 border-neon-cyan/30 bg-neon-cyan/5'
                : 'text-neon-purple/90 border-neon-purple/30 bg-neon-purple/5'
            }`}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Highlights */}
      <ul className="space-y-1.5 mb-4">
        {highlights.map((h, i) => (
          <li key={i} className="text-xs text-text-primary/70 flex items-start gap-2">
            <span className={isQuantum ? 'text-neon-cyan mt-0.5 text-[8px]' : 'text-neon-purple mt-0.5 text-[8px]'}>▸</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>

      {/* Action buttons */}
      <div className="flex gap-2 pt-3 border-t border-white/5">
        {githubUrl && (
          <NeonButton href={githubUrl} variant={isQuantum ? 'cyan' : 'purple'} className="text-[10px] px-4 py-2">
            <Globe size={12} /> GitHub
          </NeonButton>
        )}
        {liveUrl && (
          <NeonButton href={liveUrl} variant={isQuantum ? 'cyan' : 'purple'} className="text-[10px] px-4 py-2">
            <ExternalLink size={12} /> Live Demo
          </NeonButton>
        )}
      </div>
    </GlassCard>
  );
}
