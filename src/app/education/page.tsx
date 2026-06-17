'use client';

import { motion } from 'framer-motion';
import Timeline from '@/components/ui/Timeline';
import NeonButton from '@/components/ui/NeonButton';

const timelineEntries = [
  {
    period: '2024 → 2028',
    title: 'B.Tech — Artificial Intelligence & Machine Learning Engineering',
    institution: 'Newton School of Technology, Rishihood University',
    grade: 'GPA: 7.65 / 10.0',
    description: 'Currently building production AI systems in Year 1',
    icon: '🎓',
  },
  {
    period: '2023 → 2024',
    title: 'Intermediate — Class XII',
    institution: 'Rahul Ma Shikshan Sansthan Sr. Secondary School, Jaipur, Rajasthan',
    grade: '75.6%',
    icon: '📚',
  },
  {
    period: '2021 → 2022',
    title: 'Matriculation — Class X',
    institution: 'Rahul Ma Shikshan Sansthan',
    grade: '88.0%',
    icon: '📖',
  },
  {
    period: 'Extra-curricular',
    title: 'Inter-School Kho-Kho Championship, Jaipur',
    institution: '🏅 3rd Place',
    description: 'Teamwork, discipline, competitive spirit',
    icon: '🏆',
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

export default function EducationPage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-base-dark flex items-center justify-center pt-24 pb-12">
      {/* Background Image */}
      <div
        className="scene-bg"
        style={{ backgroundImage: 'url(/bg/education.webp)' }}
      />

      <div className="w-full max-w-5xl mx-auto z-10 px-6 flex flex-col items-center justify-center">
        {/* Left Side: Timeline */}
        <div className="w-full space-y-8">
          <motion.div initial="hidden" animate="visible" className="space-y-4">
            <motion.p custom={0} variants={fadeInUp} className="section-eyebrow">
              {'// MY JOURNEY'}
            </motion.p>
            <motion.h2
              custom={1}
              variants={fadeInUp}
              className="font-orbitron text-2xl md:text-4xl font-bold text-text-primary"
            >
              BEYOND EARTH
            </motion.h2>

            <motion.div
              custom={2}
              variants={fadeInUp}
              className="max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar"
            >
              <Timeline entries={timelineEntries} />
            </motion.div>

            <motion.div custom={3} variants={fadeInUp} className="pt-2 flex gap-4">
              <NeonButton href="/certifications" variant="cyan">
                VIEW CERTIFICATIONS →
              </NeonButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
