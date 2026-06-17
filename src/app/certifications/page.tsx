'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import CertBadge from '@/components/ui/CertBadge';
import NeonButton from '@/components/ui/NeonButton';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' as const },
  }),
};

export default function CertificationsPage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-base-dark flex items-center justify-center pt-24 pb-12">
      {/* Background Image */}
      <div
        className="scene-bg"
        style={{ backgroundImage: 'url(/bg/certs.webp)' }}
      />

      <div className="w-full max-w-5xl mx-auto z-10 px-6 flex flex-col items-center justify-center">
        {/* Left Side: Badges */}
        <div className="w-full space-y-8">
          <motion.div initial="hidden" animate="visible" className="space-y-4">
            <motion.p custom={0} variants={fadeInUp} className="section-eyebrow">
              {'// CERTIFICATIONS'}
            </motion.p>
            <motion.h2
              custom={1}
              variants={fadeInUp}
              className="font-orbitron text-2xl md:text-4xl font-bold text-text-primary"
            >
              THE CORE ENGINE
            </motion.h2>

            <motion.div
              custom={2}
              variants={fadeInUp}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md"
            >
              <CertBadge
                title="GDG UI/UX Workshop"
                issuer="Google Developers Group, Rishihood University"
                date="February 2025"
                skills={['User-centered design', 'Accessibility', 'Intuitive interfaces', 'Visual design']}
                gradient="#4285F4, #00f5ff"
                icon="G"
              />
              <CertBadge
                title="Mastering Excel"
                issuer="SkillEcted"
                date="November 2024"
                skills={['Data organisation', 'Charts', 'Formulas', 'Statistical analysis', 'Pivot tables']}
                gradient="#ff6b35, #fff200"
                icon="📊"
              />
            </motion.div>

            <motion.div custom={3} variants={fadeInUp} className="pt-2 flex gap-4">
              <NeonButton href="/future" variant="cyan">
                VIEW FUTURE PLANS →
              </NeonButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
