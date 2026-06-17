'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Signal {
  path: number[];
  currentNodeIndex: number;
  t: number;
  speed: number;
  pos: THREE.Vector3;
}

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useRef(true);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Mouse tracking
    const mouse = { x: 0, y: 0 };
    const handleMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouse);

    // Dynamic glow texture helper
    const createGlowTexture = (colorStr: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d')!;
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, '#ffffff');
      gradient.addColorStop(0.2, colorStr);
      gradient.addColorStop(0.5, 'rgba(0, 245, 255, 0.15)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };

    const cyanGlow = createGlowTexture('#00f5ff');
    const purpleGlow = createGlowTexture('#bf00ff');

    // Neural brain structure node settings
    const nodeCount = 90;
    const nodePositions: THREE.Vector3[] = [];
    const nodeTargets: THREE.Vector3[] = [];
    const nodeVelocities: THREE.Vector3[] = [];

    // Mathematical brain shape generator
    for (let i = 0; i < nodeCount; i++) {
      let px = 0, py = 0, pz = 0;
      const rand = Math.random();

      if (rand < 0.2) {
        // Brain stem / cerebellum
        px = (Math.random() - 0.5) * 0.35;
        py = -1.0 - Math.random() * 0.7;
        pz = -0.3 + (Math.random() - 0.5) * 0.35;
      } else {
        // Left & Right hemispheres
        const isLeft = rand < 0.6;
        const centerOffsetX = isLeft ? -0.4 : 0.4;
        
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI;
        
        // Wrinkle structure (gyri/sulci)
        const wrinkle = 0.12 * Math.sin(u * 7) * Math.sin(v * 7);
        const r = 1.1 + wrinkle;
        
        px = r * Math.sin(v) * Math.cos(u) * 0.75 + centerOffsetX;
        py = r * Math.sin(v) * Math.sin(u) * 0.75 + 0.1; 
        pz = r * Math.cos(v) * 1.0; 
      }

      const pos = new THREE.Vector3(px, py, pz);
      nodePositions.push(pos.clone());
      nodeTargets.push(pos.clone());
      nodeVelocities.push(new THREE.Vector3());
    }

    // Connect nodes based on distance threshold to form brain mesh
    const connectionPairs: [number, number][] = [];
    const maxConnectionDist = 0.85;

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < maxConnectionDist) {
          connectionPairs.push([i, j]);
        }
      }
    }

    // Node geometry & points representation
    const nodePositionsArray = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      nodePositionsArray[i * 3] = nodePositions[i].x;
      nodePositionsArray[i * 3 + 1] = nodePositions[i].y;
      nodePositionsArray[i * 3 + 2] = nodePositions[i].z;
    }
    const nodeGeom = new THREE.BufferGeometry();
    nodeGeom.setAttribute('position', new THREE.BufferAttribute(nodePositionsArray, 3));
    const nodeMat = new THREE.PointsMaterial({
      size: 0.28,
      map: cyanGlow,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const nodePoints = new THREE.Points(nodeGeom, nodeMat);
    scene.add(nodePoints);

    // Line segments connecting synapses
    const lineGeom = new THREE.BufferGeometry();
    const linePositions = new Float32Array(connectionPairs.length * 6);
    lineGeom.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00f5ff,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });
    const lines = new THREE.LineSegments(lineGeom, lineMat);
    scene.add(lines);

    // Pulse signal logic along synapse paths
    const signals: Signal[] = [];
    const signalCount = 18;

    const findRandomPath = (startNode: number, length: number): number[] => {
      const path = [startNode];
      let current = startNode;
      for (let step = 0; step < length; step++) {
        const neighbors: number[] = [];
        connectionPairs.forEach(([a, b]) => {
          if (a === current) neighbors.push(b);
          if (b === current) neighbors.push(a);
        });
        if (neighbors.length === 0) break;
        current = neighbors[Math.floor(Math.random() * neighbors.length)];
        path.push(current);
      }
      return path;
    };

    for (let i = 0; i < signalCount; i++) {
      const start = Math.floor(Math.random() * nodeCount);
      const path = findRandomPath(start, 3 + Math.floor(Math.random() * 4));
      signals.push({
        path,
        currentNodeIndex: 0,
        t: Math.random(),
        speed: 0.012 + Math.random() * 0.015,
        pos: new THREE.Vector3(),
      });
    }

    // Render signals as purple glowing pulses
    const signalGeom = new THREE.BufferGeometry();
    const signalPositionsArray = new Float32Array(signalCount * 3);
    signalGeom.setAttribute('position', new THREE.BufferAttribute(signalPositionsArray, 3));
    const signalMat = new THREE.PointsMaterial({
      size: 0.38,
      map: purpleGlow,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const signalPoints = new THREE.Points(signalGeom, signalMat);
    scene.add(signalPoints);

    // Background cosmic starfield particles
    const cosmicCount = 120;
    const cosmicGeom = new THREE.BufferGeometry();
    const cosmicPos = new Float32Array(cosmicCount * 3);
    for (let i = 0; i < cosmicCount; i++) {
      cosmicPos[i * 3] = (Math.random() - 0.5) * 12;
      cosmicPos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      cosmicPos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    cosmicGeom.setAttribute('position', new THREE.BufferAttribute(cosmicPos, 3));
    const cosmicMat = new THREE.PointsMaterial({
      size: 0.12,
      map: cyanGlow,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const cosmicParticles = new THREE.Points(cosmicGeom, cosmicMat);
    scene.add(cosmicParticles);

    // Visibility observer
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible.current = entry.isIntersecting; },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // Animation Loop
    const clock = new THREE.Clock();
    let prevMouse = { x: 0, y: 0 };

    const animate = () => {
      requestAnimationFrame(animate);
      if (!isVisible.current) return;

      const t = clock.getElapsedTime();
      const mouseDelta = Math.abs(mouse.x - prevMouse.x) + Math.abs(mouse.y - prevMouse.y);
      prevMouse = { ...mouse };

      // Camera rotates gently following mouse
      camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, mouse.y * 0.08, 0.05);
      camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, -mouse.x * 0.08, 0.05);
      
      // Auto-orbit camera around the brain structure
      scene.rotation.y = t * 0.04;

      // Update neural node positions (orbit & mouse react)
      const nodePos = nodeGeom.attributes.position.array as Float32Array;
      for (let i = 0; i < nodeCount; i++) {
        const target = nodeTargets[i];

        // Orbit wiggle
        const angle = t * 0.2 + i * 0.15;
        target.x = nodePositions[i].x + Math.sin(angle) * 0.15;
        target.y = nodePositions[i].y + Math.cos(angle * 0.8) * 0.12;

        // Scatter target slightly on high mouse delta
        if (mouseDelta > 0.02) {
          target.x += (Math.random() - 0.5) * mouseDelta * 1.5;
          target.y += (Math.random() - 0.5) * mouseDelta * 1.5;
        }

        // Lerp nodes toward targets
        nodePositions[i].x += (target.x - nodePositions[i].x) * 0.04;
        nodePositions[i].y += (target.y - nodePositions[i].y) * 0.04;
        nodePositions[i].z += (target.z - nodePositions[i].z) * 0.04;

        nodePos[i * 3] = nodePositions[i].x;
        nodePos[i * 3 + 1] = nodePositions[i].y;
        nodePos[i * 3 + 2] = nodePositions[i].z;
      }
      nodeGeom.attributes.position.needsUpdate = true;

      // Update connection lines to link moving nodes
      const linePos = lineGeom.attributes.position.array as Float32Array;
      for (let i = 0; i < connectionPairs.length; i++) {
        const [a, b] = connectionPairs[i];
        linePos[i * 6] = nodePositions[a].x;
        linePos[i * 6 + 1] = nodePositions[a].y;
        linePos[i * 6 + 2] = nodePositions[a].z;
        linePos[i * 6 + 3] = nodePositions[b].x;
        linePos[i * 6 + 4] = nodePositions[b].y;
        linePos[i * 6 + 5] = nodePositions[b].z;
      }
      lineGeom.attributes.position.needsUpdate = true;

      // Update pulse signals
      const sigPos = signalGeom.attributes.position.array as Float32Array;
      signals.forEach((sig, i) => {
        if (sig.path.length < 2) {
          const start = Math.floor(Math.random() * nodeCount);
          sig.path = findRandomPath(start, 3 + Math.floor(Math.random() * 4));
          sig.currentNodeIndex = 0;
          sig.t = 0;
          return;
        }

        const curr = sig.path[sig.currentNodeIndex];
        const next = sig.path[sig.currentNodeIndex + 1];

        // Interpolate along segment path
        sig.pos.lerpVectors(nodePositions[curr], nodePositions[next], sig.t);
        
        sigPos[i * 3] = sig.pos.x;
        sigPos[i * 3 + 1] = sig.pos.y;
        sigPos[i * 3 + 2] = sig.pos.z;

        sig.t += sig.speed;
        if (sig.t >= 1.0) {
          sig.t = 0;
          sig.currentNodeIndex += 1;
          
          // Reached end of path, chain a new path
          if (sig.currentNodeIndex >= sig.path.length - 1) {
            const endNode = sig.path[sig.path.length - 1];
            sig.path = findRandomPath(endNode, 3 + Math.floor(Math.random() * 4));
            sig.currentNodeIndex = 0;
          }
        }
      });
      signalGeom.attributes.position.needsUpdate = true;

      // Float background cosmic particles upward
      const pp = cosmicGeom.attributes.position.array as Float32Array;
      for (let i = 0; i < cosmicCount; i++) {
        pp[i * 3 + 1] += 0.004;
        // Wrap around vertically
        if (pp[i * 3 + 1] > 5) {
          pp[i * 3 + 1] = -5;
          pp[i * 3] = (Math.random() - 0.5) * 12;
        }
      }
      cosmicGeom.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Disposal
    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('resize', handleResize);
      nodeGeom.dispose();
      cyanGlow.dispose();
      purpleGlow.dispose();
      nodeMat.dispose();
      lineGeom.dispose();
      lineMat.dispose();
      signalGeom.dispose();
      signalMat.dispose();
      cosmicGeom.dispose();
      cosmicMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="scene-canvas" />;
}
