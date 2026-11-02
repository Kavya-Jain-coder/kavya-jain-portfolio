'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '@/components/ui/ProjectCard';
import NeonButton from '@/components/ui/NeonButton';
import CinematicBg from '@/components/ui/CinematicBg';
import MerminGHZSimulator from '@/components/quantum/MerminGHZSimulator';

interface ProjectItem {
  title: string;
  date: string;
  type: string;
  category: 'quantum' | 'genai';
  description: string;
  techStack: string[];
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
}

const projects: ProjectItem[] = [
  {
    title: 'Quantum Council: Mermin-GHZ Voting Game',
    date: 'October 2026',
    category: 'quantum',
    type: 'IBM Qiskit Fall Fest 2026 — Quantum Game Theory',
    description:
      'Interactive 3-party Mermin-GHZ quantum non-locality voting game. Demonstrates provable quantum advantage over classical limits, simulating depolarizing noise thresholds on Qiskit Aer.',
    techStack: ['Python', 'Qiskit', 'Qiskit Aer', 'Streamlit', 'Plotly', 'Pytest'],
    highlights: [
      'GHZ strategy wins 100% of simulation rounds vs 75% classical cap (brute-forced over 64 classical strategies)',
      'Modelled depolarizing gate and readout noise; quantum advantage persists up to ~7-8% gate error',
      'Engineered 55 unit tests with pytest, checking Pauli statevector expectations (XXX = +1, XYY = -1)',
      'Included Trust Audit detailing boundary limits: what entanglement provides vs does not provide (anonymity/tamper resistance)',
    ],
    githubUrl: 'https://github.com/Kavya-Jain-coder',
    liveUrl: 'https://github.com/Kavya-Jain-coder',
  },
  {
    title: 'Quantum-Hybrid Infection Spread Simulator',
    date: 'October 2026',
    category: 'quantum',
    type: 'Hybrid Quantum-Classical Epidemic Simulator',
    description:
      'Hybrid quantum-classical epidemiological simulator where 4-qubit entangled circuits generate spatially correlated immunity clusters across a simulated population grid.',
    techStack: ['Python', 'Qiskit', 'Qiskit Aer', 'NumPy', 'Matplotlib', 'SciPy'],
    highlights: [
      'Engineered 4-qubit entangled clusters with RY and controlled-RY gates executed on Qiskit Aer simulator',
      'Normalized mean immunity so only spatial correlation varied (neighbour correlation -0.01 vs 0.81)',
      'Benchmarked 20-seed Monte Carlo ensembles against matched classical samplers via permutation tests',
      'Open science practice: identified an artifact from a truncated 100-tick window and transparently reported the verified null result',
    ],
    githubUrl: 'https://github.com/Kavya-Jain-coder',
    liveUrl: 'https://github.com/Kavya-Jain-coder',
  },
  {
    title: 'Cadenza',
    date: 'June 2026',
    category: 'genai',
    type: 'AI-Powered Music Generation Platform',
    description:
      'Scrollytelling web application utilizing Groq-accelerated LLMs and procedural algorithmic composition for end-to-end music production, lyrics generation, and mastering.',
    techStack: ['Next.js', 'Groq API', 'Three.js', 'Web Audio API', 'Tailwind CSS', 'Framer Motion', 'Neon Postgres'],
    highlights: [
      'Procedural beat and instrumental stem generation using algorithmic composition',
      'Ultra-fast lyrics generation using Groq LLMs for sub-second creative output',
      'In-browser vocal recording with custom AI Vocoder via Web Audio API',
      'Interactive 3D sound visualizer dashboard built with Three.js',
    ],
    githubUrl: 'https://github.com/Kavya-Jain-coder/Cadenza.git',
    liveUrl: 'https://cadenza-sigma.vercel.app',
  },
  {
    title: 'NEXUS.GG',
    date: 'Jan 2026 - May 2026',
    category: 'genai',
    type: 'Full-Stack AI Gaming Platform',
    description:
      'AI esports companion featuring telemetry analysis, custom checklists, and gamified 3D holographic dashboards for competitive gamers.',
    techStack: ['Google Gemini API', 'Three.js', 'Framer Motion', 'Supabase', 'PostgreSQL', 'Node.js', 'Next.js'],
    highlights: [
      '3D hologram dashboard interface with interactive Three.js scenes',
      'Telemetry-based AI coaching and performance feedback via Gemini API',
      'PostgreSQL state management trigger pipeline for game sessions',
      'Rate-limiting proxy with custom fallback thresholds',
    ],
    githubUrl: 'https://github.com/Kavya-Jain-coder/Nexus.GG.git',
    liveUrl: 'https://nexus-gg-beta.vercel.app',
  },
  {
    title: 'CORTEX',
    date: 'Aug 2025 - Dec 2025',
    category: 'genai',
    type: 'AI-Native Learning Workspace',
    description:
      'Full-stack RAG study workspace supporting multi-format document ingestion, semantic search, KaTeX math note-taking, and interactive canvas boards.',
    techStack: ['Next.js', 'FastAPI', 'Qdrant', 'LangChain', 'Google Gemini', 'Llama 70B', 'Supabase', 'tldraw'],
    highlights: [
      'Automated RAG embedding pipeline with Qdrant vector database',
      'Advanced Markdown note editor with KaTeX math rendering and flashcards',
      'Interactive vector study card generation with tldraw canvas',
      'Anki-exportable cards and Supabase session management',
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

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'quantum' | 'genai'>('all');
  const [showQuantumLab, setShowQuantumLab] = useState(false);

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'all') return true;
    return project.category === activeFilter;
  });

  return (
    <main className="h-[100dvh] relative overflow-hidden bg-base-dark flex flex-col">
      {/* Cinematic Background */}
      <CinematicBg palette="purple-orange" />

      {/* Internal Scrolling Container */}
      <div className="flex-1 overflow-y-auto custom-scrollbar w-full relative z-10 pt-24 pb-12 flex flex-col">
        <div className="w-full max-w-5xl mx-auto px-6 flex-1 flex flex-col justify-center items-center">
          <div className="w-full space-y-6">
            <motion.div initial="hidden" animate="visible" className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <motion.p custom={0} variants={fadeInUp} className="section-eyebrow">
                    {'// RESEARCH & PRODUCTION WORK'}
                  </motion.p>
                  <motion.h2
                    custom={1}
                    variants={fadeInUp}
                    className="font-orbitron text-2xl md:text-4xl font-bold text-text-primary text-shadow-heading"
                  >
                    FEATURED PROJECTS
                  </motion.h2>
                </div>

                {/* Filter buttons */}
                <motion.div custom={2} variants={fadeInUp} className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by discipline">
                  <button
                    role="tab"
                    aria-selected={activeFilter === 'all'}
                    onClick={() => setActiveFilter('all')}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-orbitron font-semibold tracking-wider transition-all ${
                      activeFilter === 'all'
                        ? 'bg-white/20 text-white border border-white/40 shadow-[0_0_12px_rgba(255,255,255,0.2)]'
                        : 'bg-white/5 text-text-primary/60 hover:text-white border border-white/10'
                    }`}
                  >
                    ALL ({projects.length})
                  </button>
                  <button
                    role="tab"
                    aria-selected={activeFilter === 'quantum'}
                    onClick={() => setActiveFilter('quantum')}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-orbitron font-semibold tracking-wider transition-all flex items-center gap-1.5 ${
                      activeFilter === 'quantum'
                        ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50 shadow-[0_0_15px_rgba(0,245,255,0.3)]'
                        : 'bg-neon-cyan/5 text-neon-cyan/70 hover:text-neon-cyan border border-neon-cyan/20'
                    }`}
                  >
                    <span>⚛️ QUANTUM COMPUTING</span>
                    <span className="text-[9px] opacity-70">
                      ({projects.filter((p) => p.category === 'quantum').length})
                    </span>
                  </button>
                  <button
                    role="tab"
                    aria-selected={activeFilter === 'genai'}
                    onClick={() => setActiveFilter('genai')}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-orbitron font-semibold tracking-wider transition-all flex items-center gap-1.5 ${
                      activeFilter === 'genai'
                        ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/50 shadow-[0_0_15px_rgba(191,0,255,0.3)]'
                        : 'bg-neon-purple/5 text-neon-purple/70 hover:text-neon-purple border border-neon-purple/20'
                    }`}
                  >
                    <span>⚡ GENERATIVE AI</span>
                    <span className="text-[9px] opacity-70">
                      ({projects.filter((p) => p.category === 'genai').length})
                    </span>
                  </button>
                </motion.div>
              </div>

              {/* Interactive Quantum Lab Toggle */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowQuantumLab(!showQuantumLab)}
                  className="w-full py-2.5 px-4 rounded-xl border border-neon-cyan/40 bg-neon-cyan/[0.07] hover:bg-neon-cyan/[0.14] text-neon-cyan font-orbitron text-xs font-semibold tracking-wider flex items-center justify-between transition-all shadow-[0_0_20px_rgba(0,245,255,0.12)]"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-sm">⚛️</span>
                    <span>
                      {showQuantumLab
                        ? 'HIDE MERMIN-GHZ QUANTUM LAB'
                        : 'TRY LIVE LAB: MERMIN-GHZ QUANTUM ADVANTAGE SIMULATOR'}
                    </span>
                  </span>
                  <span className="text-[10px] opacity-75 font-mono">
                    {showQuantumLab ? '▲ COLLAPSE' : '▼ LAUNCH SIMULATOR'}
                  </span>
                </button>

                <AnimatePresence>
                  {(showQuantumLab || activeFilter === 'quantum') && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <MerminGHZSimulator />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Projects Grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFilter}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {filteredProjects.map((project) => (
                    <ProjectCard key={project.title} {...project} />
                  ))}
                </motion.div>
              </AnimatePresence>

              <motion.div custom={4} variants={fadeInUp} className="pt-4 flex flex-wrap gap-4">
                <NeonButton href="/skills" variant="cyan">
                  EXPLORE SKILLS MATRIX →
                </NeonButton>
                <NeonButton href="/education" variant="purple">
                  VIEW EDUCATION & BACKGROUND →
                </NeonButton>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
