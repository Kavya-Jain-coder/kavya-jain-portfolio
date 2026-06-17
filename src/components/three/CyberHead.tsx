'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

export default function CyberHead() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useRef(true);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 6.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      // Use window dimensions for global tracking to prevent extreme sensitivity
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // ==========================================
    // LIGHTING
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(5, 10, 7.5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x00f5ff, 2, 10);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);

    // ==========================================
    // ROBOT MODEL
    // ==========================================
    const headGroup = new THREE.Group();
    scene.add(headGroup);

    const textureLoader = new THREE.TextureLoader();
    const eyesTexture = textureLoader.load('/ai-robot/textures/eyesTexture.png');
    eyesTexture.colorSpace = THREE.SRGBColorSpace;

    const fbxLoader = new FBXLoader();
    let robotModel: THREE.Group | null = null;
    
    fbxLoader.load('/ai-robot/source/Robot/Robot.fbx', (object) => {
      object.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          // Instead of replacing the material completely, just ensure it looks good if it has its own.
          // Or if it's missing materials, we can give it a fallback.
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat: THREE.MeshStandardMaterial) => {
              if (mat.name && mat.name.toLowerCase().includes('eye')) {
                mat.emissive = new THREE.Color(0x00f5ff);
                mat.emissiveIntensity = 2;
                mat.emissiveMap = eyesTexture;
              } else {
                mat.metalness = Math.max(mat.metalness || 0, 0.6);
                mat.roughness = Math.min(mat.roughness || 1, 0.4);
              }
            });
          } else if (mesh.material) {
            const mat = mesh.material as THREE.MeshStandardMaterial;
            if (mat.name && mat.name.toLowerCase().includes('eye')) {
              mat.emissive = new THREE.Color(0x00f5ff);
              mat.emissiveIntensity = 2;
              mat.emissiveMap = eyesTexture;
            } else {
              mat.metalness = Math.max(mat.metalness || 0, 0.6);
              mat.roughness = Math.min(mat.roughness || 1, 0.4);
            }
          }
        }
      });
      
      // Auto-scale and center the model so it's always visible
      const box = new THREE.Box3().setFromObject(object);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      
      // Target height/width of around 4 units
      const scale = 4 / maxDim;
      object.scale.setScalar(scale);

      // Recompute bounding box after scaling to find the new center
      const scaledBox = new THREE.Box3().setFromObject(object);
      const center = scaledBox.getCenter(new THREE.Vector3());
      
      object.position.x = -center.x;
      object.position.y = -center.y; // Center vertically
      object.position.z = -center.z;

      robotModel = object;
      headGroup.add(robotModel);
    });

    const observer = new IntersectionObserver(
      ([entry]) => { isVisible.current = entry.isIntersecting; },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      if (!isVisible.current) return;

      const t = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // 1. Head rotation (clamped for realism so it doesn't spin wildly)
      // Restrict X rotation (forward/backward) so the robot doesn't lean back too far
      const targetRotY = Math.max(-0.6, Math.min(0.6, mouse.x * 0.6)); 
      const targetRotX = Math.max(-0.1, Math.min(0.2, -mouse.y * 0.2));

      headGroup.rotation.y = targetRotY;
      headGroup.rotation.x = targetRotX;

      // 2. Head subtle breathing
      headGroup.position.y = Math.sin(t * 1.5) * 0.04;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      eyesTexture.dispose();

      renderer.dispose();
      if (container && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full min-h-[400px] md:min-h-[600px] cursor-crosshair flex items-center justify-center" 
    />
  );
}
