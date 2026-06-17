'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import SkillPill from '@/components/ui/SkillPill';
import NeonButton from '@/components/ui/NeonButton';

const skillCategories = [
  {
    name: 'AI / ML',
    color: '#00f5ff',
    skills: ['LangChain', 'LangGraph', 'n8n', 'Google Gemini API', 'Llama 70B', 'Qdrant', 'RAG Pipelines'],
  },
  {
    name: 'Frontend',
    color: '#bf00ff',
    skills: ['Next.js', 'React.js', 'Three.js', 'Framer Motion', 'GSAP', 'Tailwind CSS', 'HTML', 'CSS'],
  },
  {
    name: 'Backend',
    color: '#ff6b35',
    skills: ['Node.js', 'FastAPI', 'Supabase', 'PostgreSQL', 'JWT Auth'],
  },
  {
    name: 'Languages',
    color: '#00f5ff',
    skills: ['Python', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    name: 'Data',
    color: '#39ff14',
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Tableau', 'Power BI', 'Looker Studio'],
  },
  {
    name: 'Database',
    color: '#ff6b35',
    skills: ['MongoDB', 'MySQL'],
  },
  {
    name: 'DevOps',
    color: '#fff200',
    skills: ['Git', 'GitHub', 'Vercel'],
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function SkillsPage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-base-dark flex items-center justify-center pt-24 pb-12">
      {/* Background Image */}
      <div
        className="scene-bg"
        style={{ backgroundImage: 'url(/bg/skills.webp)' }}
      />

      <div className="w-full max-w-5xl mx-auto z-10 px-6 flex flex-col items-center justify-center">
        {/* Left Side: Skills lists */}
        <div className="w-full space-y-8">
          <motion.div initial="hidden" animate="visible" className="space-y-4">
            <motion.p custom={0} variants={fadeInUp} className="section-eyebrow">
              {'// SKILL MATRIX'}
            </motion.p>
            <motion.h2
              custom={1}
              variants={fadeInUp}
              className="font-orbitron text-2xl md:text-4xl font-bold text-text-primary"
            >
              THE CITY OF SKILLS
            </motion.h2>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar"
            >
              {skillCategories.map((cat) => (
                <motion.div key={cat.name} variants={staggerItem}>
                  <GlassCard className="p-4 border border-white/5">
                    <h3
                      className="font-orbitron text-[10px] font-bold mb-2 tracking-widest uppercase"
                      style={{ color: cat.color }}
                    >
                      {cat.name}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((skill) => (
                        <SkillPill key={skill} name={skill} color={cat.color} />
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>

            <motion.div custom={4} variants={fadeInUp} className="pt-2 flex gap-4">
              <NeonButton href="/projects" variant="cyan">
                VIEW MY PROJECTS →
              </NeonButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
