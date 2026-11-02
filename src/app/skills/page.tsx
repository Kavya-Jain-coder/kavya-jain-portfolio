'use client';

import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import SkillPill from '@/components/ui/SkillPill';
import NeonButton from '@/components/ui/NeonButton';
import CinematicBg from '@/components/ui/CinematicBg';

const skillCategories = [
  {
    name: 'Quantum Computing',
    color: '#00f5ff',
    icon: '⚛️',
    isPrimary: true,
    skills: [
      'Qiskit',
      'Qiskit Aer Simulator',
      'OpenQASM',
      'IBM Quantum Composer',
      'Entanglement & GHZ States',
      'Statevector Pauli Checks',
      'Depolarizing Noise Models',
      'Readout Error Mitigation',
      'Hybrid Quantum-Classical',
    ],
  },
  {
    name: 'AI & Agentic Systems',
    color: '#bf00ff',
    icon: '⚡',
    skills: [
      'LangChain',
      'LangGraph',
      'Hugging Face',
      'RAG Architectures',
      'MCP (Model Context Protocol)',
      'Generative AI & LLMs',
      'Groq Inference',
      'Google Gemini API',
      'Qdrant Vector DB',
    ],
  },
  {
    name: 'Core Languages',
    color: '#39ff14',
    icon: '💻',
    skills: [
      'Python (Scientific & Qiskit)',
      'TypeScript',
      'JavaScript (ES6+)',
      'SQL (PostgreSQL / MySQL)',
      'C++ (Algorithmic / DSA)',
    ],
  },
  {
    name: 'Backend & Web Architecture',
    color: '#ff6b35',
    icon: '🛠️',
    skills: [
      'Next.js (App Router)',
      'FastAPI',
      'Node.js',
      'Express JS',
      'React',
      'REST APIs & WebSockets',
      'Web Audio API',
    ],
  },
  {
    name: 'Frontend & 3D Telemetry',
    color: '#ff00aa',
    icon: '🌐',
    skills: [
      'Three.js',
      'Tailwind CSS',
      'Framer Motion',
      'GSAP Animations',
      'Streamlit',
      'Plotly Interactive',
    ],
  },
  {
    name: 'Databases & DevOps',
    color: '#fff200',
    icon: '🗄️',
    skills: [
      'Neon Postgres',
      'Supabase',
      'MongoDB',
      'MySQL',
      'Firebase',
      'Docker',
      'Git & GitHub',
      'Vercel',
    ],
  },
  {
    name: 'ML, Data Science & QA',
    color: '#00e5ff',
    icon: '📊',
    skills: [
      'Pytest (55+ Test Suites)',
      'NumPy',
      'Pandas',
      'Scikit-learn',
      'TensorFlow',
      'Matplotlib',
      'Natural Language Processing',
      'Permutation Tests',
    ],
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
    transition: { staggerChildren: 0.07 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function SkillsPage() {
  return (
    <main className="h-[100dvh] relative overflow-hidden bg-base-dark flex flex-col">
      {/* Cinematic Background */}
      <CinematicBg palette="cyan-green" />

      {/* Internal Scrolling Container */}
      <div className="flex-1 overflow-y-auto custom-scrollbar w-full relative z-10 pt-24 pb-12 flex flex-col">
        <div className="w-full max-w-5xl mx-auto px-6 flex-1 flex flex-col justify-center items-center">
          <div className="w-full space-y-6">
            <motion.div initial="hidden" animate="visible" className="space-y-4">
              <motion.p custom={0} variants={fadeInUp} className="section-eyebrow">
                {'// SKILL MATRIX & DOMAINS'}
              </motion.p>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <motion.h2
                  custom={1}
                  variants={fadeInUp}
                  className="font-orbitron text-2xl md:text-4xl font-bold text-text-primary text-shadow-heading"
                >
                  TECHNICAL EXPERTISE
                </motion.h2>
                <motion.span custom={2} variants={fadeInUp} className="text-xs font-orbitron text-neon-cyan">
                  QUANTUM COMPUTING × GENERATIVE AI
                </motion.span>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5"
              >
                {skillCategories.map((cat) => (
                  <motion.div
                    key={cat.name}
                    variants={staggerItem}
                    className={cat.isPrimary ? 'md:col-span-2 lg:col-span-2' : ''}
                  >
                    <GlassCard
                      className={`p-4 border ${
                        cat.isPrimary
                          ? 'border-neon-cyan/40 bg-neon-cyan/[0.04] shadow-[0_0_20px_rgba(0,245,255,0.1)]'
                          : 'border-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2.5">
                        <h3
                          className="font-orbitron text-[11px] font-bold tracking-widest uppercase flex items-center gap-1.5"
                          style={{ color: cat.color }}
                        >
                          <span>{cat.icon}</span>
                          <span>{cat.name}</span>
                        </h3>
                        {cat.isPrimary && (
                          <span className="text-[8px] font-orbitron px-2 py-0.5 rounded-full bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/40">
                            SPECIALIZATION
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.skills.map((skill) => (
                          <SkillPill key={skill} name={skill} color={cat.color} />
                        ))}
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div custom={4} variants={fadeInUp} className="pt-2 flex flex-wrap gap-4">
                <NeonButton href="/projects" variant="cyan">
                  VIEW QUANTUM & AI PROJECTS →
                </NeonButton>
                <NeonButton href="/education" variant="purple">
                  ACADEMIC BACKGROUND →
                </NeonButton>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
