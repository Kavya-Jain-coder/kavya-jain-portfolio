'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Link as LinkIcon, Globe, Swords, Code2, MapPin, GraduationCap, Sparkles } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import ContactForm from '@/components/ui/ContactForm';
import CinematicBg from '@/components/ui/CinematicBg';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const },
  }),
};

const socialLinks = [
  { label: 'LinkedIn', icon: <LinkIcon size={14} />, url: 'https://www.linkedin.com/in/kavya-jain-9b062a323' },
  { label: 'GitHub', icon: <Globe size={14} />, url: 'https://github.com/Kavya-Jain-coder' },
  { label: 'Codeforces', icon: <Swords size={14} />, url: 'https://codeforces.com/profile/kavya_jain4935' },
  { label: 'LeetCode', icon: <Code2 size={14} />, url: 'https://leetcode.com/u/kavya_jain4935' },
];

const quickInfo = [
  { icon: <MapPin size={14} />, label: 'Jaipur, India' },
  { icon: <GraduationCap size={14} />, label: 'B.Tech AI & ML — NST' },
  { icon: <Sparkles size={14} />, label: 'Open to Internships' },
];

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
    <main className="h-[100dvh] relative overflow-hidden bg-base-dark flex flex-col">
      {/* Cinematic Background */}
      <CinematicBg palette="purple-green" />

      {/* Internal Scrolling Container */}
      <div className="flex-1 overflow-y-auto custom-scrollbar w-full relative z-10 pt-24 pb-12 flex flex-col">
        <div className="w-full max-w-6xl mx-auto px-6 flex-1 flex flex-col justify-center">
          <motion.div initial="hidden" animate="visible">
            {/* Header */}
            <motion.p custom={0} variants={fadeInUp} className="section-eyebrow">
              {'// CONTACT'}
            </motion.p>
            <motion.h2
              custom={1}
              variants={fadeInUp}
              className="font-orbitron text-2xl md:text-4xl font-bold text-text-primary text-shadow-heading mb-2"
            >
              LET&apos;S BUILD THE FUTURE
            </motion.h2>
            <motion.p custom={2} variants={fadeInUp} className="text-text-primary/50 text-sm mb-8">
              Open to internships, collaborations, and AI engineering projects.
            </motion.p>

            {/* Two-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
              {/* LEFT COLUMN — Info & Social */}
              <motion.div custom={3} variants={fadeInUp} className="space-y-5">
                {/* Email Card */}
                <GlassCard
                  className="p-5 flex items-center gap-4 cursor-pointer border border-white/5"
                  hover
                  onClick={handleEmailClick}
                >
                  <div className="w-10 h-10 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-neon-cyan" />
                  </div>
                  <div>
                    <p className="text-[10px] font-orbitron tracking-widest text-text-primary/40 uppercase mb-1">
                      Email
                    </p>
                    <p className="text-sm font-mono text-text-primary/80">{emailText}</p>
                  </div>
                </GlassCard>

                {/* Quick Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {quickInfo.map((info) => (
                    <GlassCard key={info.label} className="p-4 border border-white/5 text-center">
                      <div className="flex items-center justify-center gap-2 text-neon-cyan mb-1">
                        {info.icon}
                      </div>
                      <p className="text-xs text-text-primary/70 font-inter">{info.label}</p>
                    </GlassCard>
                  ))}
                </div>

                {/* Social Links Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((link) => (
                    <GlassCard key={link.label} className="border border-white/5" hover>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4"
                      >
                        <div className="w-8 h-8 rounded-lg bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center shrink-0">
                          <span className="text-neon-purple">{link.icon}</span>
                        </div>
                        <div>
                          <p className="text-xs font-orbitron font-semibold text-text-primary/80">{link.label}</p>
                          <p className="text-[9px] text-text-primary/30 font-orbitron tracking-wider">PROFILE →</p>
                        </div>
                      </a>
                    </GlassCard>
                  ))}
                </div>

                {/* Status indicator */}
                <GlassCard className="p-4 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-2.5 h-2.5 rounded-full bg-acid-green" />
                      <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-acid-green animate-ping opacity-75" />
                    </div>
                    <p className="text-xs text-text-primary/60 font-inter">
                      Currently <span className="text-acid-green font-semibold">available</span> for new opportunities
                    </p>
                  </div>
                </GlassCard>
              </motion.div>

              {/* RIGHT COLUMN — Contact Form */}
              <motion.div custom={4} variants={fadeInUp}>
                <ContactForm />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
