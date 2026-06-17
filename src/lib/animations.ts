'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export function useGsapFadeIn() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const isReduced = prefersReducedMotion();
          gsap.fromTo(
            el.children,
            { opacity: 0, y: isReduced ? 0 : 40 },
            { opacity: 1, y: 0, duration: isReduced ? 0 : 0.8, stagger: isReduced ? 0 : 0.15, ease: 'power3.out' }
          );
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

export function useCountUp(
  end: number,
  duration: number = 2,
  suffix: string = '',
  decimals: number = 0
) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const obj = { val: 0 };
          const isReduced = prefersReducedMotion();
          gsap.to(obj, {
            val: end,
            duration: isReduced ? 0 : duration,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = obj.val.toFixed(decimals) + suffix;
            },
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, suffix, decimals]);

  return ref;
}

export function useThreeVisibility() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useRef(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return { containerRef, isVisible };
}

export function useMousePosition() {
  const mouse = useRef({ x: 0, y: 0, nx: 0, ny: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.nx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.ny = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return mouse;
}
