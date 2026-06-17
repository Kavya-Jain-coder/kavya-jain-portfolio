'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import GlitchText from '@/components/ui/GlitchText';
import TypewriterText from '@/components/ui/TypewriterText';
import NeonButton from '@/components/ui/NeonButton';

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
      {/* Background Image Layer */}
      <div
        className="scene-bg"
        style={{ backgroundImage: 'url(/bg/hero.webp)' }}
      />

      {/* Internal Non-Scrolling Container */}
      <div className="flex-1 overflow-hidden w-full relative z-10 pt-16 lg:pt-0 flex flex-col">
        <div className="w-full max-w-7xl mx-auto px-6 py-6 lg:py-12 flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-10 items-center justify-center">
          {/* Left text column */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            WELCOME
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-orbitron font-black text-text-primary"
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
                'GenAI Engineer',
                'AI Software Engineer',
                'Full-Stack Builder',
                'B.Tech AI Student',
              ]}
              speed={80}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-xl p-4 md:p-6 rounded-2xl bg-base-dark/60 backdrop-blur-md border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          >
            <p className="text-text-primary/90 text-sm md:text-base leading-relaxed">
              I am a B.Tech Artificial Intelligence & Machine Learning student at Newton School of Technology. 
              I build production-grade GenAI pipelines, study workspaces, and immersive telemetry dashboards.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="pt-4 flex flex-wrap gap-4"
          >
            <NeonButton href="/about" variant="cyan">
              VIEW PROJECTS →
            </NeonButton>
            <NeonButton href="/AI-Resume-Kavya_Jain.pdf" variant="purple" download>
              DOWNLOAD RESUME
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
