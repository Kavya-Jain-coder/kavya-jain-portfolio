'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navItems = [
  { href: '/', label: 'HOME' },
  { href: '/about', label: 'ABOUT' },
  { href: '/skills', label: 'SKILLS' },
  { href: '/projects', label: 'PROJECTS' },
  { href: '/education', label: 'EDUCATION' },
  { href: '/certifications', label: 'CERTIFICATIONS' },
  { href: '/future', label: 'FUTURE' },
  { href: '/stats', label: 'STATS' },
  { href: '/contact', label: 'CONTACT' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 pointer-events-none">
      <div className="max-w-5xl mx-auto glass rounded-full border border-white/10 backdrop-blur-md px-6 py-3 flex items-center justify-between shadow-xl shadow-black/50 pointer-events-auto">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2 font-orbitron font-black tracking-widest text-text-primary transition-colors"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 group-hover:border-neon-cyan/50 group-hover:shadow-[0_0_15px_rgba(0,245,255,0.4)] transition-all duration-300">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-neon-cyan group-hover:animate-pulse">
              <path d="M12 2L22 7.77317V16.2268L12 22L2 16.2268V7.77317L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 10L17 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17 10L7 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="absolute inset-0 rounded-lg bg-neon-purple/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="hidden sm:block text-sm group-hover:text-neon-cyan transition-colors">
            KAVYA<span className="text-neon-purple">.AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1.5">
          {navItems.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`px-3.5 py-1.5 text-[9px] font-orbitron font-semibold tracking-widest transition-all duration-300 rounded-full ${
                  isActive
                    ? 'text-neon-cyan bg-neon-cyan/15 shadow-sm shadow-neon-cyan/30 border border-neon-cyan/25'
                    : 'text-text-primary/60 hover:text-text-primary hover:bg-white/5 border border-transparent'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-text-primary p-1.5 focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-20 left-4 right-4 bg-base-dark/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl transition-all duration-300 pointer-events-auto ${
          mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="px-4 py-4 space-y-1.5">
          {navItems.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`block w-full text-center px-4 py-2.5 text-xs font-orbitron font-semibold tracking-widest rounded-xl transition-all ${
                  isActive
                    ? 'text-neon-cyan bg-neon-cyan/15 border border-neon-cyan/20'
                    : 'text-text-primary/60 hover:text-text-primary hover:bg-white/5 border border-transparent'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
