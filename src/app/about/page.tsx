'use client';

import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import TypewriterText from '@/components/ui/TypewriterText';
import NeonButton from '@/components/ui/NeonButton';
import CinematicBg from '@/components/ui/CinematicBg';

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
      {/* Cinematic Background */}
      <CinematicBg palette="cyan-purple" />

      {/* Internal Scrolling Container */}
      <div className="flex-1 overflow-y-auto custom-scrollbar w-full relative z-10 pt-24 pb-12 flex flex-col">
        <div className="w-full max-w-5xl mx-auto px-6 flex-1 flex flex-col justify-center items-center">
          {/* Bio Container */}
          <div className="w-full space-y-6">
            <motion.div initial="hidden" animate="visible" className="space-y-4">
              <motion.p custom={0} variants={fadeInUp} className="section-eyebrow">
                {'// ABOUT ME'}
              </motion.p>

              <motion.h2
                custom={1}
                variants={fadeInUp}
                className="font-orbitron text-2xl md:text-4xl font-bold text-text-primary text-shadow-heading"
              >
                RESEARCHER & BUILDER
              </motion.h2>

              <motion.div custom={2} variants={fadeInUp} className="text-sm md:text-base leading-relaxed text-text-primary/85">
                <TypewriterText
                  text="I am Kavya Jain — a Quantum Computing researcher and GenAI engineer pursuing a B.Tech in Artificial Intelligence & Machine Learning at Newton School of Technology (Rishihood University). I operate at the intersection of non-local quantum mechanics and artificial intelligence: designing hybrid quantum-classical simulations with Qiskit Aer (Mermin-GHZ voting games, 4-qubit entangled epidemic immunity clusters) while developing production GenAI applications (RAG pipelines with Qdrant & LangChain, ultra-fast LLM music generation with Groq, and interactive 3D WebGL experiences). Whether in Hilbert space or vector embedding space, I build with scientific rigor and human-centered design."
                  speed={12}
                />
              </motion.div>

              {/* Quick Tags */}
              <motion.div custom={3} variants={fadeInUp} className="flex flex-wrap gap-2 pt-1">
                {[
                  'B.Tech AI & ML (2024-2028)',
                  'IBM Qiskit Fall Fest 2026',
                  'Hybrid Quantum-Classical Algorithms',
                  'GenAI & RAG Architectures',
                  'Jaipur, India',
                ].map((tag) => (
                  <GlassCard key={tag} className="px-3.5 py-1.5 border border-white/5">
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
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2"
              >
                {[
                  { label: 'Mermin-GHZ Win', value: '100% vs 75%', note: 'Quantum vs Classical' },
                  { label: 'Pytest QA', value: '55+ Suites', note: 'Statevector checks' },
                  { label: 'LeetCode', value: '170+ Solved', note: 'DSA & Algorithms' },
                  { label: 'B.Tech CGPA', value: '7.02 / 10.0', note: 'Rishihood University' },
                ].map((stat) => (
                  <GlassCard key={stat.label} className="p-3.5 text-center border border-white/5" hover>
                    <div className="font-orbitron text-sm md:text-base font-bold neon-text-cyan">
                      {stat.value}
                    </div>
                    <div className="text-[9px] text-text-primary/70 mt-1 font-orbitron tracking-widest uppercase">
                      {stat.label}
                    </div>
                    <div className="text-[8px] text-text-primary/40 mt-0.5 font-mono">
                      {stat.note}
                    </div>
                  </GlassCard>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div custom={5} variants={fadeInUp} className="pt-2 flex flex-wrap gap-4">
                <NeonButton href="/projects" variant="cyan">
                  EXPLORE MY PROJECTS →
                </NeonButton>
                <NeonButton href="/skills" variant="purple">
                  SKILLS & EXPERTISE →
                </NeonButton>
                <NeonButton href="/AI-Resume-Kavya_Jain.pdf" variant="orange" download>
                  DOWNLOAD RESUME 📄
                </NeonButton>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
