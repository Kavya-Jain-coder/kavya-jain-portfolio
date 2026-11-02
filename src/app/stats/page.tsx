'use client';

import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import StatCounter from '@/components/ui/StatCounter';
import NeonButton from '@/components/ui/NeonButton';
import CinematicBg from '@/components/ui/CinematicBg';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' as const },
  }),
};

export default function StatsPage() {
  return (
    <main className="h-[100dvh] relative overflow-hidden bg-base-dark flex flex-col">
      {/* Cinematic Background */}
      <CinematicBg palette="cyan-orange" />

      {/* Internal Scrolling Container */}
      <div className="flex-1 overflow-y-auto custom-scrollbar w-full relative z-10 pt-24 pb-12 flex flex-col">
        <div className="w-full max-w-5xl mx-auto px-6 flex-1 flex flex-col justify-center items-center">
          <div className="w-full space-y-6">
            <motion.div initial="hidden" animate="visible" className="space-y-4">
              <motion.p custom={0} variants={fadeInUp} className="section-eyebrow">
                {'// QUANTUM & AI METRICS'}
              </motion.p>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <motion.h2
                  custom={1}
                  variants={fadeInUp}
                  className="font-orbitron text-2xl md:text-4xl font-bold text-text-primary text-shadow-heading"
                >
                  LIVE PULSE
                </motion.h2>
                <motion.span custom={2} variants={fadeInUp} className="text-xs font-orbitron text-neon-cyan">
                  BENCHMARKED PERFORMANCE
                </motion.span>
              </div>

              {/* Grid counters */}
              <motion.div
                custom={2}
                variants={fadeInUp}
                className="grid grid-cols-2 md:grid-cols-3 gap-3"
              >
                <StatCounter value={100} suffix="%" label="Mermin-GHZ Win Rate" className="border border-neon-cyan/20 bg-neon-cyan/[0.03]" />
                <StatCounter value={55} suffix="+" label="Pytest QA Suites" className="border border-white/5" />
                <StatCounter value={170} suffix="+" label="LeetCode Solved" className="border border-white/5" />
                <StatCounter value={7.02} suffix="" label="B.Tech CGPA / 10.0" decimals={2} className="border border-white/5" />
                <StatCounter value={10} suffix="+" label="Live Projects Built" className="border border-white/5" />
                <StatCounter value={4} suffix="-Qubit" label="Entangled Clusters" className="border border-neon-purple/20 bg-neon-purple/[0.03]" />
              </motion.div>

              {/* Scrolling ticker */}
              <motion.div custom={3} variants={fadeInUp} className="pt-2">
                <GlassCard className="py-2.5 px-4 overflow-hidden border border-white/5">
                  <div className="ticker-wrapper">
                    <div className="ticker-content">
                      <span className="font-orbitron text-[9px] tracking-widest text-neon-cyan uppercase">
                        ⚛️ Quantum: Qiskit · Qiskit Aer · Mermin-GHZ 100% Win · Entangled Clusters · OpenQASM &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        ⚡ GenAI: LangGraph · RAG · Groq · Three.js · Agentic Systems · Web Audio &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                        🏆 Competitive: 170+ LeetCode · 55+ Pytest Tests · Codeforces &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              <motion.div custom={4} variants={fadeInUp} className="pt-2 flex flex-wrap gap-4">
                <NeonButton href="/contact" variant="cyan">
                  CONNECT WITH KAVYA →
                </NeonButton>
                <NeonButton href="/projects" variant="purple">
                  VIEW ALL PROJECTS →
                </NeonButton>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
