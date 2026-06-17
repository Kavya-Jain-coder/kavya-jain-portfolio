'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
interface NeonButtonProps {
  children: ReactNode;
  variant?: 'cyan' | 'purple' | 'orange';
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  download?: boolean;
  ariaLabel?: string;
}

const variantStyles = {
  cyan: {
    border: '1px solid #00f5ff',
    boxShadow: '0 0 5px rgba(0,245,255,0.3), inset 0 0 5px rgba(0,245,255,0.1)',
    hoverShadow: '0 0 20px rgba(0,245,255,0.5), inset 0 0 10px rgba(0,245,255,0.2)',
  },
  purple: {
    border: '1px solid #bf00ff',
    boxShadow: '0 0 5px rgba(191,0,255,0.3), inset 0 0 5px rgba(191,0,255,0.1)',
    hoverShadow: '0 0 20px rgba(191,0,255,0.5), inset 0 0 10px rgba(191,0,255,0.2)',
  },
  orange: {
    border: '1px solid #ff6b35',
    boxShadow: '0 0 5px rgba(255,107,53,0.3), inset 0 0 5px rgba(255,107,53,0.1)',
    hoverShadow: '0 0 20px rgba(255,107,53,0.5), inset 0 0 10px rgba(255,107,53,0.2)',
  },
};

export default function NeonButton({
  children,
  variant = 'cyan',
  href,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  download = false,
  ariaLabel,
}: NeonButtonProps) {
  const style = variantStyles[variant];

  const baseClasses = `
    inline-flex items-center gap-2 px-6 py-3
    font-orbitron text-xs tracking-widest
    bg-white/5 backdrop-blur-sm rounded-lg
    transition-all duration-300 ease-out
    hover:scale-105 hover:bg-white/10
    disabled:opacity-50 disabled:cursor-not-allowed
    ${className}
  `;

  if (href) {
    if (download) {
      return (
        <a
          href={href}
          download
          aria-label={ariaLabel}
          className={baseClasses}
          data-hover
          style={{
            border: style.border,
            boxShadow: style.boxShadow,
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.boxShadow = style.hoverShadow;
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.boxShadow = style.boxShadow;
          }}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        aria-label={ariaLabel}
        className={baseClasses}
        data-hover
        style={{
          border: style.border,
          boxShadow: style.boxShadow,
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.boxShadow = style.hoverShadow;
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.boxShadow = style.boxShadow;
        }}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={baseClasses}
      data-hover
      style={{
        border: style.border,
        boxShadow: style.boxShadow,
      }}
      onMouseEnter={(e) => {
        (e.target as HTMLElement).style.boxShadow = style.hoverShadow;
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLElement).style.boxShadow = style.boxShadow;
      }}
    >
      {children}
    </button>
  );
}
