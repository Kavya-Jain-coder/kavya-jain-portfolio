'use client';

import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import StatCounter from '@/components/ui/StatCounter';
import NeonButton from '@/components/ui/NeonButton';

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
      {/* Background Image */}
      <div
        className="scene-bg"
        style={{ backgroundImage: 'url(/bg/stats.webp)' }}
      />

      {/* Internal Scrolling Container */}
      <div className="flex-1 overflow-y-auto custom-scrollbar w-full relative z-10 pt-24 pb-12 flex flex-col">
        <div className="w-full max-w-5xl mx-auto px-6 flex-1 flex flex-col justify-center items-center">
          {/* Left Side: Stats counters */}
        <div className="w-full space-y-8">
          <motion.div initial="hidden" animate="visible" className="space-y-4">
            <motion.p custom={0} variants={fadeInUp} className="section-eyebrow">
              {'// MY PULSE'}
            </motion.p>
            <motion.h2
              custom={1}
              variants={fadeInUp}
              className="font-orbitron text-2xl md:text-4xl font-bold text-text-primary"
            >
              LIVE STATS
            </motion.h2>

            {/* Grid counters */}
            <motion.div
              custom={2}
              variants={fadeInUp}
              className="grid grid-cols-2 gap-3"
            >
              <StatCounter value={170} suffix="+" label="LeetCode Solved" className="border border-white/5" />
              <StatCounter value={7.65} suffix="" label="GPA / 10.0" decimals={2} className="border border-white/5" />
              <StatCounter value={10} suffix="+" label="Live Projects" className="border border-white/5" />
              <StatCounter value={1} suffix="" label="Hacktoberfest Supercontributor" className="border border-white/5" />
            </motion.div>

            {/* scrolling ticker */}
            <motion.div custom={3} variants={fadeInUp} className="pt-2">
              <GlassCard className="py-2.5 px-4 overflow-hidden border border-white/5">
                <div className="ticker-wrapper">
                  <div className="ticker-content">
                    <span className="font-orbitron text-[9px] tracking-widest text-neon-cyan uppercase">
                      Currently learning: LangGraph · CrewAI · Rust for ML &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                      Currently learning: LangGraph · CrewAI · Rust for ML &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                    </span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div custom={4} variants={fadeInUp} className="pt-2 flex gap-4">
              <NeonButton href="/contact" variant="cyan">
                GET IN TOUCH →
              </NeonButton>
            </motion.div>
          </motion.div>
        </div>
        </div>
      </div>
    </main>
  );
}
