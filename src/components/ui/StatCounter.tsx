'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface StatCounterProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

export default function StatCounter({
  value,
  label,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
}: StatCounterProps) {
  const numberRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!numberRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: value,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
              if (numberRef.current) {
                numberRef.current.textContent = prefix + obj.val.toFixed(decimals) + suffix;
              }
            },
          });
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(numberRef.current);
    return () => observer.disconnect();
  }, [value, suffix, prefix, decimals]);

  return (
    <div className={`glass p-6 text-center ${className}`}>
      <div
        ref={numberRef}
        className="font-orbitron text-3xl md:text-4xl font-bold neon-text-cyan"
      >
        {prefix}0{suffix}
      </div>
      <div className="text-text-primary/60 text-sm mt-2 font-inter">{label}</div>
    </div>
  );
}
