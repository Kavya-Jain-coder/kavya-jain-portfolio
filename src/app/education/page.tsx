'use client';

import { motion } from 'framer-motion';
import Timeline from '@/components/ui/Timeline';
import NeonButton from '@/components/ui/NeonButton';
import CinematicBg from '@/components/ui/CinematicBg';

const timelineEntries = [
  {
    period: '2024 → 2028',
    title: 'Bachelor of Technology (B.Tech) — AI & ML',
    institution: 'Newton School of Technology, Rishihood University',
    grade: 'CGPA: 7.02 / 10.0',
    description:
      'Pursuing specialized coursework in Artificial Intelligence, Machine Learning, Data Structures & Algorithms, Quantum Computing, and Distributed Systems. Actively researching hybrid quantum algorithms and generative architectures.',
    icon: '🎓',
  },
  {
    period: '2023 → 2024',
    title: 'Senior Secondary / Intermediate (Class XII)',
    institution: "Kid's Valley School",
    grade: 'Score: 75.6%',
    description: 'Focused on Physics, Mathematics, Chemistry, and Computer Science foundations.',
    icon: '📚',
  },
  {
    period: '2021 → 2022',
    title: 'Secondary School Matriculation (Class X)',
    institution: "Kid's Valley School",
    grade: 'Score: 88.0%',
    description: 'High academic distinction with strong quantitative aptitude.',
    icon: '🏫',
  },
  {
    period: 'October 2026',
    title: 'Quantum Research & Simulation Experience',
    institution: 'IBM Qiskit Fall Fest 2026 & Independent Research',
    description:
      'Hands-on Qiskit experience from engineering and validating a hybrid quantum-classical simulator with 4-qubit entangled clusters and Mermin-GHZ non-locality games under depolarizing noise.',
    icon: '⚛️',
  },
  {
    period: 'Athletics & Leadership',
    title: 'Inter-School Kho-Kho Championship, Jaipur',
    institution: 'District / Inter-School Sports Representation',
    description: 'Represented school in competitive Kho-Kho tournaments, cultivating tactical coordination, discipline, and endurance.',
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
    <main className="h-[100dvh] relative overflow-hidden bg-base-dark flex flex-col">
      {/* Cinematic Background */}
      <CinematicBg palette="orange-yellow" />

      {/* Internal Scrolling Container */}
      <div className="flex-1 overflow-y-auto custom-scrollbar w-full relative z-10 pt-24 pb-12 flex flex-col">
        <div className="w-full max-w-5xl mx-auto px-6 flex-1 flex flex-col justify-center items-center">
          <div className="w-full space-y-6">
            <motion.div initial="hidden" animate="visible" className="space-y-4">
              <motion.p custom={0} variants={fadeInUp} className="section-eyebrow">
                {'// ACADEMIC & ATHLETIC MILESTONES'}
              </motion.p>
              <motion.h2
                custom={1}
                variants={fadeInUp}
                className="font-orbitron text-2xl md:text-4xl font-bold text-text-primary text-shadow-heading"
              >
                MY JOURNEY
              </motion.h2>

              <motion.div custom={2} variants={fadeInUp} className="pr-2">
                <Timeline entries={timelineEntries} />
              </motion.div>

              <motion.div custom={3} variants={fadeInUp} className="pt-2 flex flex-wrap gap-4">
                <NeonButton href="/certifications" variant="cyan">
                  VIEW CERTIFICATIONS →
                </NeonButton>
                <NeonButton href="/projects" variant="purple">
                  VIEW PROJECTS →
                </NeonButton>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
