'use client';

import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import NeonButton from '@/components/ui/NeonButton';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' as const },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FuturePage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-base-dark flex items-center justify-center pt-24 pb-12">
      {/* Background Image */}
      <div
        className="scene-bg"
        style={{ backgroundImage: 'url(/bg/future.webp)' }}
      />

      <div className="w-full max-w-5xl mx-auto z-10 px-6 flex flex-col items-center justify-center">
        {/* Left Side: Plans */}
        <div className="w-full space-y-8">
          <motion.div initial="hidden" animate="visible" className="space-y-4">
            <motion.p custom={0} variants={fadeInUp} className="section-eyebrow">
              {"// WHAT'S NEXT"}
            </motion.p>
            <motion.h2
              custom={1}
              variants={fadeInUp}
              className="font-orbitron text-2xl md:text-4xl font-bold text-text-primary"
            >
              WHAT I&apos;M BUILDING NEXT
            </motion.h2>
            <motion.p custom={2} variants={fadeInUp} className="text-text-primary/50 text-sm">
              The future is always in construction
            </motion.p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4"
            >
              {[
                {
                  title: 'Multi-Agent AI Orchestration System',
                  tech: 'LangGraph + CrewAI',
                  description: 'A system for coordinating specialized AI agents to autonomously handle complex coding tasks, complete with human-in-the-loop review processes.'
                },
                {
                  title: 'Real-Time Market Intelligence Platform',
                  tech: 'RAG + Financial APIs',
                  description: 'Aggregating live financial news and stock data through a high-speed vector database for sub-second semantic retrieval and risk analysis.'
                },
                {
                  title: 'AI-Powered Code Review Bot',
                  tech: 'AST Analysis + LLM Feedback',
                  description: 'An automated GitHub App that reviews pull requests, analyzing Abstract Syntax Trees combined with LLM context to catch structural vulnerabilities.'
                },
                {
                  title: 'Immersive 3D Portfolio v2.0',
                  tech: 'Three.js + WebGL + WebXR',
                  description: 'Expanding the current portfolio into a fully navigable 3D world with WebXR support for VR headsets and gamified physics interactions.'
                },
              ].map((item) => (
                <motion.div key={item.title} variants={staggerItem}>
                  <GlassCard className="p-5 text-left relative overflow-hidden h-full border border-white/5 flex flex-col justify-between" hover>
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 text-[8px] font-orbitron tracking-widest text-plasma-orange bg-plasma-orange/10 rounded-full border border-plasma-orange/20 animate-pulse">
                        IN_PROGRESS
                      </span>
                    </div>
                    <div>
                      <h3 className="font-orbitron text-sm font-bold text-text-primary mb-2 pr-16 leading-normal">
                        {item.title}
                      </h3>
                      <p className="text-[10px] text-neon-purple font-orbitron uppercase tracking-wider mb-3">
                        {item.tech}
                      </p>
                      <p className="text-xs text-text-primary/70 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>

            <motion.div custom={4} variants={fadeInUp} className="pt-2 flex gap-4">
              <NeonButton href="/stats" variant="cyan">
                VIEW MY STATS →
              </NeonButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
