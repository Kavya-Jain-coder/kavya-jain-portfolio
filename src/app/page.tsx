'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import GlitchText from '@/components/ui/GlitchText';
import TypewriterText from '@/components/ui/TypewriterText';
import NeonButton from '@/components/ui/NeonButton';
import CinematicBg from '@/components/ui/CinematicBg';

const CyberHead = dynamic(() => import('@/components/three/CyberHead'), { ssr: false });
const LoadingScreen = dynamic(() => import('@/components/ui/LoadingScreen'), { ssr: false });
const Chatbot = dynamic(() => import('@/components/chat/Chatbot'), { ssr: false });

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <main className="h-[100dvh] relative overflow-hidden bg-base-dark flex flex-col">
      {/* Cinematic Background */}
      <CinematicBg palette="cyan-purple" />

      {/* Internal Non-Scrolling Container */}
      <div className="flex-1 overflow-hidden w-full relative z-10 pt-16 lg:pt-0 flex flex-col">
        <div className="w-full max-w-7xl mx-auto px-6 py-6 lg:py-12 flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-10 items-center justify-center">
          {/* Left text column */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2"
          >
            <span className="section-eyebrow mb-0">
              {'// QUANTUM COMPUTING × GENERATIVE AI'}
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-orbitron font-black text-text-primary text-shadow-heading"
            style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', lineHeight: 1.1 }}
          >
            <GlitchText text="KAVYA JAIN" />
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-orbitron text-neon-cyan text-lg md:text-xl drop-shadow-[0_0_4px_rgba(0,245,255,0.4)]"
          >
            <TypewriterText
              words={[
                'Quantum Computing Researcher',
                'GenAI & Agentic Systems Engineer',
                'Qiskit Aer Simulator Specialist',
                'Hybrid Quantum-Classical Builder',
                'Full-Stack AI Software Engineer',
              ]}
              speed={80}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-xl p-4 md:p-6 rounded-2xl bg-base-dark/80 backdrop-blur-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] space-y-3"
          >
            <p className="text-text-primary/90 text-sm md:text-base leading-relaxed">
              B.Tech in Artificial Intelligence & Machine Learning at Newton School of Technology (Rishihood University). 
              Pioneering at the convergence of <span className="text-neon-cyan font-semibold">Quantum Computing</span> (Qiskit Aer, Mermin-GHZ non-locality, entangled cluster immunity) 
              and <span className="text-neon-purple font-semibold">Generative AI</span> (RAG pipelines, LLM-powered creative engines, Three.js 3D dashboards).
            </p>
            {/* Quick Domain Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[10px] font-orbitron px-2.5 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan">
                ⚛️ Qiskit & Aer (Mermin-GHZ 100% Win)
              </span>
              <span className="text-[10px] font-orbitron px-2.5 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/30 text-neon-purple">
                ⚡ GenAI & LLM Orchestration
              </span>
              <span className="text-[10px] font-orbitron px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/80">
                🌐 Full-Stack & Three.js 3D
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="pt-2 flex flex-wrap gap-4"
          >
            <NeonButton href="/projects" variant="cyan">
              EXPLORE WORK (QC & AI) →
            </NeonButton>
            <NeonButton href="/about" variant="purple">
              ABOUT ME →
            </NeonButton>
            <NeonButton href="/AI-Resume-Kavya_Jain.pdf" variant="orange" download>
              RESUME 📄
            </NeonButton>
          </motion.div>
        </div>

        {/* Right 3D Model Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.0, ease: 'easeOut' }}
          className="lg:col-span-5 w-full flex justify-center items-center flex-1 min-h-[200px] lg:h-[480px] lg:flex-none relative lg:mt-24"
        >
          <CyberHead onRobotClick={() => setIsChatOpen(true)} />
        </motion.div>
      </div>
      </div>

      {/* Global AI Chatbot Overlay */}
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </main>
  );
}
