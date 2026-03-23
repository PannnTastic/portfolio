"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
  const mesh = useRef<THREE.Points>(null);

  const count = 500;
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.2 + 0.5, 0.8, 0.5);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    return [positions, colors];
  }, []);

  const positionAttribute = useMemo(() => {
    const attr = new THREE.BufferAttribute(positions, 3);
    return attr;
  }, [positions]);

  const colorAttribute = useMemo(() => {
    const attr = new THREE.BufferAttribute(colors, 3);
    return attr;
  }, [colors]);

  useFrame((state) => {
    if (!mesh.current) return;
    
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.y = time * 0.05;
    mesh.current.rotation.x = time * 0.02;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <primitive attach="attributes-position" object={positionAttribute} />
        <primitive attach="attributes-color" object={colorAttribute} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

function FloatingShapes() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const time = state.clock.getElapsedTime();
    group.current.rotation.y = time * 0.1;
    group.current.position.y = Math.sin(time * 0.5) * 0.5;
  });

  return (
    <group ref={group}>
      {/* Floating Cube */}
      <mesh position={[-3, 0, 0]} rotation={[0.5, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#6366f1"
          transparent
          opacity={0.6}
          wireframe
        />
      </mesh>
      
      {/* Floating Sphere */}
      <mesh position={[3, 1, -2]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial
          color="#8b5cf6"
          transparent
          opacity={0.5}
          wireframe
        />
      </mesh>
      
      {/* Floating Torus */}
      <mesh position={[0, -2, 1]} rotation={[1, 0.5, 0]}>
        <torusGeometry args={[0.8, 0.2, 16, 100]} />
        <meshStandardMaterial
          color="#ec4899"
          transparent
          opacity={0.5}
          wireframe
        />
      </mesh>
      
      {/* Floating Octahedron */}
      <mesh position={[2, 2, 1]} rotation={[0.3, 0.5, 0]}>
        <octahedronGeometry args={[0.6]} />
        <meshStandardMaterial
          color="#14b8a6"
          transparent
          opacity={0.5}
          wireframe
        />
      </mesh>
    </group>
  );
}

export default function ParticlesBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Particles />
        <FloatingShapes />
      </Canvas>
    </div>
  );
}
