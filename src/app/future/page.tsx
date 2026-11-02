'use client';

import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
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

const futureRoadmap = [
  {
    title: 'Variational Quantum Eigensolver (VQE) & QNNs',
    domain: 'Quantum Computing',
    tech: 'Qiskit Aer + PennyLane + PyTorch',
    description:
      'Designing parameterized quantum circuits (PQCs) to solve molecular ground-state energy problems and exploring hybrid Quantum Neural Networks (QNN) for non-linear pattern classification.',
    status: 'RESEARCHING',
  },
  {
    title: 'Superconducting Hardware Execution & ZNE',
    domain: 'Quantum Computing',
    tech: 'IBM Quantum Heron/Eagle + Qiskit Runtime',
    description:
      'Migrating from local Aer simulation to real IBM Quantum QPUs, implementing Zero-Noise Extrapolation (ZNE) and probabilistic error cancellation (PEC) to benchmark against classical baselines.',
    status: 'IN_PROGRESS',
  },
  {
    title: 'Autonomous Multi-Agent Research Orchestrator',
    domain: 'Generative AI',
    tech: 'LangGraph + CrewAI + MCP Protocol',
    description:
      'Building a multi-agent system coordinating specialized LLM agents for automated literature analysis, quantum code generation, statevector verification, and test report synthesis.',
    status: 'IN_PROGRESS',
  },
  {
    title: 'Hybrid Quantum Network Epidemic Simulator v2.0',
    domain: 'Quantum + Simulation',
    tech: 'Python + NetworkX + Qiskit + WebGL 3D',
    description:
      'Expanding the 4-qubit entangled cluster model to scale-free graph topologies and spatial lattices, incorporating real-time 3D Three.js visualization of quantum state collapse.',
    status: 'PLANNED',
  },
];

export default function FuturePage() {
  return (
    <main className="h-[100dvh] relative overflow-hidden bg-base-dark flex flex-col pt-24 pb-6">
      {/* Cinematic Background */}
      <CinematicBg palette="purple-cyan" />

      <div className="w-full max-w-5xl mx-auto z-10 px-6 flex flex-col h-full overflow-hidden">
        <div className="w-full flex flex-col h-full overflow-hidden">
          <motion.div initial="hidden" animate="visible" className="space-y-2 mb-6 shrink-0">
            <motion.p custom={0} variants={fadeInUp} className="section-eyebrow">
              {"// WHAT'S NEXT"}
            </motion.p>
            <motion.h2
              custom={1}
              variants={fadeInUp}
              className="font-orbitron text-2xl md:text-4xl font-bold text-text-primary text-shadow-heading"
            >
              RESEARCH ROADMAP
            </motion.h2>
            <motion.p custom={2} variants={fadeInUp} className="text-text-primary/60 text-sm">
              Pushing the boundaries of quantum simulation and autonomous AI
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 overflow-y-auto pr-2 pb-4 flex-1 min-h-0"
          >
            {futureRoadmap.map((item) => (
              <motion.div key={item.title} variants={staggerItem}>
                <GlassCard
                  className="p-5 text-left relative overflow-hidden h-full border border-white/5 flex flex-col justify-between"
                  hover
                >
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 text-[8px] font-orbitron tracking-widest text-plasma-orange bg-plasma-orange/10 rounded-full border border-plasma-orange/20 animate-pulse">
                      {item.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-orbitron text-neon-cyan uppercase tracking-widest block mb-1">
                      {item.domain}
                    </span>
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

          <motion.div initial="hidden" animate="visible" className="pt-4 shrink-0 mt-2">
            <motion.div custom={4} variants={fadeInUp} className="flex flex-wrap gap-4">
              <NeonButton href="/stats" variant="cyan">
                VIEW LIVE STATS →
              </NeonButton>
              <NeonButton href="/contact" variant="purple">
                GET IN TOUCH →
              </NeonButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
