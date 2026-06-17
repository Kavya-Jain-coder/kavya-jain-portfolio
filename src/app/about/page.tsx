'use client';

import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import TypewriterText from '@/components/ui/TypewriterText';
import NeonButton from '@/components/ui/NeonButton';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: 'easeOut' as const },
  }),
};

export default function AboutPage() {
  return (
    <main className="h-[100dvh] relative overflow-hidden bg-base-dark flex flex-col">
      {/* Background Image */}
      <div
        className="scene-bg"
        style={{ backgroundImage: 'url(/bg/about.webp)' }}
      />

      {/* Internal Scrolling Container */}
      <div className="flex-1 overflow-y-auto custom-scrollbar w-full relative z-10 pt-24 pb-12 flex flex-col">
        <div className="w-full max-w-5xl mx-auto px-6 flex-1 flex flex-col justify-center items-center">
          {/* Left Bio Column */}
        <div className="w-full space-y-8">
          <motion.div
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <motion.p custom={0} variants={fadeInUp} className="section-eyebrow">
              {'// ABOUT ME'}
            </motion.p>
            
            <motion.h2
              custom={1}
              variants={fadeInUp}
              className="font-orbitron text-2xl md:text-4xl font-bold text-text-primary"
            >
              THE MIND OF A BUILDER
            </motion.h2>

            <motion.div custom={2} variants={fadeInUp} className="text-sm md:text-base leading-relaxed text-text-primary/80">
              <TypewriterText
                text="I am Kavya Jain — a GenAI-focused engineer in my third year at Newton School of Technology, Rishihood University. I build production-grade AI applications: RAG pipelines with Qdrant & LangChain, full-stack apps with Next.js & Supabase, and gamified AI experiences with Three.js. I don't just study AI — I ship it. 10+ live projects. One mission: build the future."
                speed={15}
              />
            </motion.div>

            {/* Quick Tags */}
            <motion.div
              custom={3}
              variants={fadeInUp}
              className="flex flex-wrap gap-2 pt-2"
            >
              {['3rd Year B.Tech', '10+ Live Projects', 'Jaipur, India'].map((tag) => (
                <GlassCard key={tag} className="px-4 py-1.5 border border-white/5">
                  <span className="font-orbitron text-[9px] tracking-wider text-neon-cyan">
                    {tag}
                  </span>
                </GlassCard>
              ))}
            </motion.div>

            {/* Stats Cards grid */}
            <motion.div
              custom={4}
              variants={fadeInUp}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4"
            >
              {[
                { label: 'LeetCode', value: '170+ solved' },
                { label: 'LC Rating', value: '1394' },
                { label: 'GPA', value: '7.65 / 10.0' },
              ].map((stat) => (
                <GlassCard key={stat.label} className="p-4 text-center border border-white/5" hover>
                  <div className="font-orbitron text-sm md:text-base font-bold neon-text-cyan">
                    {stat.value}
                  </div>
                  <div className="text-[9px] text-text-primary/50 mt-1 font-orbitron tracking-widest uppercase">
                    {stat.label}
                  </div>
                </GlassCard>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div custom={5} variants={fadeInUp} className="pt-4 flex gap-4">
              <NeonButton href="/skills" variant="cyan">
                MY SKILLS →
              </NeonButton>
              <NeonButton href="/projects" variant="purple">
                MY PROJECTS →
              </NeonButton>
            </motion.div>
          </motion.div>
        </div>
        </div>
      </div>
    </main>
  );
}
