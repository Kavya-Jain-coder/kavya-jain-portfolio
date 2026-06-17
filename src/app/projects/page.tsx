'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ui/ProjectCard';
import NeonButton from '@/components/ui/NeonButton';

const projects = [
  {
    title: 'NEXUS.GG',
    date: 'June 2026',
    type: 'Full-Stack AI Gaming Platform',
    description:
      'AI e-sports companion featuring telemetry analysis, custom checklists, and gamified 3D holographic dashboards for competitive gamers.',
    techStack: ['Google Gemini API', 'Three.js', 'Framer Motion', 'Supabase', 'PostgreSQL', 'Node.js', 'Next.js'],
    highlights: [
      '3D hologram dashboard interface (Three.js)',
      'Telemetry-based AI coaching via Gemini API',
      'PostgreSQL state management trigger pipeline',
      'Rate-limiting proxy with custom fallback thresholds',
    ],
    githubUrl: 'https://github.com/Kavya-Jain-coder/Nexus.GG.git',
    liveUrl: 'https://nexus-gg-beta.vercel.app',
  },
  {
    title: 'CORTEX',
    date: 'June 2026',
    type: 'AI-Native Learning Workspace',
    description:
      'A full-stack RAG study workspace supporting PDF uploads, study guide generation, KaTeX note-taking, and interactive canvas boards.',
    techStack: ['Next.js', 'FastAPI', 'Qdrant', 'LangChain', 'Google Gemini', 'Llama 70B', 'Supabase', 'tldraw'],
    highlights: [
      'Automated RAG embedding pipeline with Qdrant',
      'Advanced Markdown note editor with KaTeX math styling',
      'Interactive vector study card generation with tldraw',
      'Anki-exportable cards and Supabase session auth',
    ],
    githubUrl: 'https://github.com/Kavya-Jain-coder/Cortex-AI.git',
    liveUrl: 'https://cortex-ai-web.vercel.app',
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

export default function ProjectsPage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-base-dark flex items-center justify-center pt-24 pb-12">
      {/* Background Image */}
      <div
        className="scene-bg"
        style={{ backgroundImage: 'url(/bg/projects.webp)' }}
      />

      <div className="w-full max-w-5xl mx-auto z-10 px-6 flex flex-col items-center justify-center">
        {/* Left Side: Projects Grid */}
        <div className="w-full space-y-8">
          <motion.div initial="hidden" animate="visible" className="space-y-4">
            <motion.p custom={0} variants={fadeInUp} className="section-eyebrow">
              {'// NEURAL PROJECTS'}
            </motion.p>
            <motion.h2
              custom={1}
              variants={fadeInUp}
              className="font-orbitron text-2xl md:text-4xl font-bold text-text-primary"
            >
              WHAT I&apos;VE BUILT
            </motion.h2>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar"
            >
              {projects.map((project) => (
                <motion.div key={project.title} variants={staggerItem}>
                  <ProjectCard {...project} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div custom={4} variants={fadeInUp} className="pt-2 flex gap-4">
              <NeonButton href="/education" variant="cyan">
                VIEW MY EDUCATION →
              </NeonButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
