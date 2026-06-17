'use client';

import GlassCard from './GlassCard';

interface TimelineEntry {
  period: string;
  title: string;
  institution: string;
  grade?: string;
  description?: string;
  icon?: string;
}

interface TimelineProps {
  entries: TimelineEntry[];
}

export default function Timeline({ entries }: TimelineProps) {
  return (
    <div className="relative pl-12 space-y-8">
      {/* Connecting line */}
      <div className="timeline-line" />

      {entries.map((entry, i) => (
        <div key={i} className="relative">
          {/* Dot */}
          <div className="timeline-dot" style={{ top: '24px' }} />

          <GlassCard className="p-5 ml-4" hover>
            <div className="flex items-center gap-2 mb-2">
              {entry.icon && <span className="text-lg">{entry.icon}</span>}
              <span className="font-orbitron text-[10px] tracking-widest text-neon-cyan">
                {entry.period}
              </span>
            </div>
            <h3 className="font-orbitron text-sm md:text-base font-semibold text-text-primary mb-1">
              {entry.title}
            </h3>
            <p className="text-text-primary/60 text-sm">{entry.institution}</p>
            {entry.grade && (
              <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-neon-cyan/10 text-neon-cyan text-xs font-orbitron">
                {entry.grade}
              </div>
            )}
            {entry.description && (
              <p className="mt-2 text-text-primary/50 text-xs italic">{entry.description}</p>
            )}
          </GlassCard>
        </div>
      ))}
    </div>
  );
}
