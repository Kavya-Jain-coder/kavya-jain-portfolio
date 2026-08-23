'use client';

import { useRef, useEffect, useCallback } from 'react';

/**
 * CinematicBg – Interactive Neural Network Canvas Background
 *
 * A living, breathing neural network visualization that reacts to the mouse.
 * Floating luminous particles (nodes) are connected by glowing synaptic lines.
 * The cursor acts as an attractor — nearby particles are pulled toward it,
 * connections brighten, and a soft glow pulse radiates from the cursor.
 *
 * Each page gets a unique colour palette for visual variety across the portfolio.
 */

interface CinematicBgProps {
  palette?:
    | 'cyan-purple'
    | 'purple-orange'
    | 'cyan-green'
    | 'orange-yellow'
    | 'purple-cyan'
    | 'cyan-orange'
    | 'purple-green';
}

interface Palette {
  primary: [number, number, number];
  secondary: [number, number, number];
  accent: [number, number, number];
}

const PALETTES: Record<string, Palette> = {
  'cyan-purple':   { primary: [0, 245, 255],   secondary: [191, 0, 255],   accent: [120, 120, 255] },
  'purple-orange': { primary: [191, 0, 255],    secondary: [255, 107, 53],  accent: [255, 80, 150] },
  'cyan-green':    { primary: [0, 245, 255],    secondary: [57, 255, 20],   accent: [0, 200, 150] },
  'orange-yellow': { primary: [255, 107, 53],   secondary: [255, 242, 0],   accent: [255, 170, 30] },
  'purple-cyan':   { primary: [191, 0, 255],    secondary: [0, 245, 255],   accent: [100, 130, 255] },
  'cyan-orange':   { primary: [0, 245, 255],    secondary: [255, 107, 53],  accent: [130, 180, 255] },
  'purple-green':  { primary: [191, 0, 255],    secondary: [57, 255, 20],   accent: [130, 100, 255] },
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  colorIdx: number; // 0 = primary, 1 = secondary, 2 = accent
  alpha: number;
  pulsePhase: number;
  pulseSpeed: number;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function CinematicBg({ palette = 'cyan-purple' }: CinematicBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const palRef = useRef<Palette>(PALETTES[palette] ?? PALETTES['cyan-purple']);

  // Update palette ref when prop changes
  useEffect(() => {
    palRef.current = PALETTES[palette] ?? PALETTES['cyan-purple'];
  }, [palette]);

  const initParticles = useCallback((w: number, h: number) => {
    // Responsive particle count — more on big screens, fewer on mobile
    const area = w * h;
    const count = Math.floor(Math.min(Math.max(area / 12000, 40), 160));
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const baseRadius = Math.random() * 1.8 + 0.6;
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: baseRadius,
        baseRadius,
        colorIdx: Math.floor(Math.random() * 3),
        alpha: Math.random() * 0.5 + 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.008 + 0.003,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles(w, h);
    };

    resize();
    window.addEventListener('resize', resize);

    // Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    // Touch support
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchEnd = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Connection distance
    const CONNECTION_DIST = 150;
    const MOUSE_RADIUS = 200;
    const MOUSE_ATTRACT = 0.012;

    const getColor = (idx: number): [number, number, number] => {
      const pal = palRef.current;
      if (idx === 0) return pal.primary;
      if (idx === 1) return pal.secondary;
      return pal.accent;
    };

    // Animation loop
    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Dark base
      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, w, h);

      // Update particles
      for (const p of particles) {
        // Drift
        p.x += p.vx;
        p.y += p.vy;

        // Pulse
        p.pulsePhase += p.pulseSpeed;
        const pulse = Math.sin(p.pulsePhase) * 0.3 + 0.7;
        p.radius = p.baseRadius * pulse;

        // Wrap around edges with padding
        if (p.x < -50) p.x = w + 50;
        if (p.x > w + 50) p.x = -50;
        if (p.y < -50) p.y = h + 50;
        if (p.y > h + 50) p.y = -50;

        // Mouse interaction — attract particles toward cursor
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 1) {
          const force = (1 - dist / MOUSE_RADIUS) * MOUSE_ATTRACT;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
          // Boost alpha near mouse
          p.alpha = Math.min(p.alpha + 0.02, 0.95);
        } else {
          // Decay back to base alpha
          p.alpha = lerp(p.alpha, Math.random() * 0.3 + 0.3, 0.005);
        }

        // Damping
        p.vx *= 0.995;
        p.vy *= 0.995;

        // Enforce min speed so particles never fully stop
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed < 0.1) {
          p.vx += (Math.random() - 0.5) * 0.05;
          p.vy += (Math.random() - 0.5) * 0.05;
        }
      }

      // Draw connections (synapses)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.25;

            // Blend colors of connected nodes
            const cA = getColor(a.colorIdx);
            const cB = getColor(b.colorIdx);
            const r = Math.round((cA[0] + cB[0]) / 2);
            const g = Math.round((cA[1] + cB[1]) / 2);
            const bl = Math.round((cA[2] + cB[2]) / 2);

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${r},${g},${bl},${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();

            // Bright pulse for connections near mouse
            const midX = (a.x + b.x) / 2;
            const midY = (a.y + b.y) / 2;
            const mouseDist = Math.sqrt(
              (mouse.x - midX) ** 2 + (mouse.y - midY) ** 2
            );
            if (mouseDist < MOUSE_RADIUS) {
              const boost = (1 - mouseDist / MOUSE_RADIUS) * 0.4;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(${r},${g},${bl},${boost})`;
              ctx.lineWidth = 1.2;
              ctx.stroke();
            }
          }
        }
      }

      // Draw particles (nodes)
      for (const p of particles) {
        const [r, g, b] = getColor(p.colorIdx);

        // Outer glow
        const glowRadius = p.radius * 6;
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, glowRadius
        );
        gradient.addColorStop(0, `rgba(${r},${g},${b},${p.alpha * 0.3})`);
        gradient.addColorStop(0.4, `rgba(${r},${g},${b},${p.alpha * 0.08})`);
        gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha})`;
        ctx.fill();
      }

      // Mouse cursor glow
      if (mouse.x > -1000) {
        const pal = palRef.current;
        const [mr, mg, mb] = pal.primary;
        const mouseGlow = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, MOUSE_RADIUS
        );
        mouseGlow.addColorStop(0, `rgba(${mr},${mg},${mb},0.06)`);
        mouseGlow.addColorStop(0.5, `rgba(${mr},${mg},${mb},0.02)`);
        mouseGlow.addColorStop(1, `rgba(${mr},${mg},${mb},0)`);
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, MOUSE_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = mouseGlow;
        ctx.fill();
      }

      // Subtle radial vignette
      const vignette = ctx.createRadialGradient(
        w / 2, h / 2, Math.min(w, h) * 0.25,
        w / 2, h / 2, Math.max(w, h) * 0.75
      );
      vignette.addColorStop(0, 'rgba(10,10,15,0)');
      vignette.addColorStop(1, 'rgba(10,10,15,0.55)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, w, h);

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ background: '#0a0a0f' }}
      aria-hidden="true"
    />
  );
}
