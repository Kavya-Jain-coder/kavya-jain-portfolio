'use client';

import { useState } from 'react';
import GlassCard from './GlassCard';

interface CertBadgeProps {
  title: string;
  issuer: string;
  date: string;
  skills: string[];
  gradient: string;
  icon: string;
}

export default function CertBadge({ title, issuer, date, skills, gradient, icon }: CertBadgeProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <GlassCard
        className="p-6 text-center cursor-pointer relative overflow-hidden"
        hover
        onClick={() => setExpanded(true)}
      >
        {/* Animated gradient border ring */}
        <div
          className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 relative"
          style={{
            background: `linear-gradient(135deg, ${gradient})`,
            padding: '2px',
          }}
        >
          <div className="w-full h-full rounded-full bg-base-dark flex items-center justify-center">
            <span className="text-2xl">{icon}</span>
          </div>
        </div>
        <h3 className="font-orbitron text-xs font-semibold text-text-primary mb-1">
          {title}
        </h3>
        <p className="text-text-primary/50 text-[10px]">{issuer}</p>
        <p className="text-neon-cyan/60 text-[10px] mt-1 font-orbitron">{date}</p>
      </GlassCard>

      {/* Expanded Modal */}
      {expanded && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setExpanded(false)}
        >
          <GlassCard
            className="p-8 max-w-md mx-4 relative"
            onClick={undefined}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setExpanded(false)}
                className="absolute top-4 right-4 text-text-primary/60 hover:text-text-primary text-sm"
                data-hover
              >
                ✕
              </button>
              <div
                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
                style={{ background: `linear-gradient(135deg, ${gradient})`, padding: '2px' }}
              >
                <div className="w-full h-full rounded-full bg-base-dark flex items-center justify-center">
                  <span className="text-xl">{icon}</span>
                </div>
              </div>
              <h3 className="font-orbitron text-sm font-bold text-center text-text-primary mb-1">
                {title}
              </h3>
              <p className="text-center text-text-primary/50 text-xs mb-1">{issuer}</p>
              <p className="text-center text-neon-cyan/60 text-[10px] font-orbitron mb-4">{date}</p>
              <div className="border-t border-white/5 pt-4">
                <p className="text-[10px] font-orbitron text-neon-purple mb-2 tracking-widest">
                  SKILLS GAINED
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="skill-pill text-[10px] text-neon-cyan/80 border-neon-cyan/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      )}
    </>
  );
}
