'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Link as LinkIcon, Globe, Swords, Code2 } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import ContactForm from '@/components/ui/ContactForm';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const },
  }),
};

export default function ContactPage() {
  const [emailRevealed, setEmailRevealed] = useState(false);
  const [emailText, setEmailText] = useState('kavya.jain2024@nst.rishihood.edu.in');

  const handleEmailClick = () => {
    if (emailRevealed) {
      window.open('mailto:kavya.jain2024@nst.rishihood.edu.in');
      return;
    }
    const target = 'kavya.jain2024@nst.rishihood.edu.in';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@.';
    let iteration = 0;
    const interval = setInterval(() => {
      setEmailText(
        target
          .split('')
          .map((_char, i) => (i < iteration ? target[i] : chars[Math.floor(Math.random() * chars.length)]))
          .join('')
      );
      iteration += 1;
      if (iteration > target.length) {
        clearInterval(interval);
        setEmailRevealed(true);
      }
    }, 25);
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-base-dark flex items-center justify-center pt-24 pb-12">
      {/* Background Image */}
      <div
        className="scene-bg"
        style={{ backgroundImage: 'url(/bg/contact.webp)' }}
      />

      <div className="w-full max-w-5xl mx-auto z-10 px-6 flex flex-col items-center justify-center">
        {/* Left Side: Form */}
        <div className="w-full space-y-8">
          <motion.div initial="hidden" animate="visible" className="space-y-4">
            <motion.p custom={0} variants={fadeInUp} className="section-eyebrow">
              {'// CONTACT'}
            </motion.p>
            <motion.h2
              custom={1}
              variants={fadeInUp}
              className="font-orbitron text-2xl md:text-4xl font-bold text-text-primary"
            >
              LET&apos;S BUILD THE FUTURE
            </motion.h2>
            <motion.p custom={2} variants={fadeInUp} className="text-text-primary/50 text-sm">
              Open to internships, collaborations, and AI engineering projects.
            </motion.p>

            <motion.div custom={3} variants={fadeInUp}>
              <ContactForm />
            </motion.div>

            {/* Social badges */}
            <motion.div
              custom={4}
              variants={fadeInUp}
              className="flex flex-wrap gap-2 pt-2"
            >
              <GlassCard
                className="px-3.5 py-2 flex items-center gap-2 cursor-pointer border border-white/5"
                hover
                onClick={handleEmailClick}
              >
                <Mail size={12} className="text-neon-cyan" />
                <span className="text-[10px] font-mono text-text-primary/70">{emailText}</span>
              </GlassCard>

              {[
                { label: 'LinkedIn', icon: <LinkIcon size={12} />, url: 'https://www.linkedin.com/in/kavya-jain-9b062a323' },
                { label: 'GitHub', icon: <Globe size={12} />, url: 'https://github.com/Kavya-Jain-coder' },
                { label: 'Codeforces', icon: <Swords size={12} />, url: 'https://codeforces.com/profile/kavya_jain4935' },
                { label: 'LeetCode', icon: <Code2 size={12} />, url: 'https://leetcode.com/u/kavya_jain4935' },
              ].map((link) => (
                <GlassCard key={link.label} className="px-3.5 py-2 border border-white/5" hover>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <span className="text-neon-cyan">{link.icon}</span>
                    <span className="text-[10px] font-orbitron text-text-primary/70">{link.label}</span>
                  </a>
                </GlassCard>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
