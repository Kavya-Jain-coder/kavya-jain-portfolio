'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState('');
  const [fadeOut, setFadeOut] = useState(false);
  const fullText = 'INITIALIZING KAVYA\'S WORLD...';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const container = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particles
    const count = 200;
    const positions = new Float32Array(count * 3);
    const velocities: THREE.Vector3[] = [];

    for (let j = 0; j < count; j++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 3 + Math.random() * 3;
      positions[j * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[j * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[j * 3 + 2] = r * Math.cos(phi);
      velocities.push(new THREE.Vector3(
        -positions[j * 3] * 0.02,
        -positions[j * 3 + 1] * 0.02,
        -positions[j * 3 + 2] * 0.02
      ));
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x00f5ff,
      size: 0.04,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let frame = 0;
    const maxFrames = 150; // ~2.5s at 60fps

    const animate = () => {
      frame++;
      const posArray = geometry.attributes.position.array as Float32Array;

      for (let j = 0; j < count; j++) {
        posArray[j * 3] += velocities[j].x;
        posArray[j * 3 + 1] += velocities[j].y;
        posArray[j * 3 + 2] += velocities[j].z;
      }
      geometry.attributes.position.needsUpdate = true;

      // Fade particles as they converge
      material.opacity = Math.max(0, 1 - frame / maxFrames);

      renderer.render(scene, camera);

      if (frame < maxFrames) {
        requestAnimationFrame(animate);
      } else {
        setFadeOut(true);
        setTimeout(() => {
          onComplete();
          // Cleanup
          geometry.dispose();
          material.dispose();
          renderer.dispose();
        }, 600);
      }
    };

    animate();

    return () => {
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [onComplete]);

  return (
    <div
      className="loading-screen"
      style={{
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.6s ease-out',
        pointerEvents: fadeOut ? 'none' : 'all',
      }}
    >
      <div ref={canvasRef} className="absolute inset-0" />
      <div className="relative z-10 text-center">
        <div className="loading-text">
          {text}
          <span className="typewriter-cursor" />
        </div>
        <div className="mt-4 flex justify-center gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-neon-cyan"
              style={{
                animation: `pulseGlow 1s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
