"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function WireframeHead() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1.2, 48, 48);

    // Deform to make it more head-like
    const positions = geo.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = positions.getZ(i);

      // Normalize to get direction
      const len = Math.sqrt(x * x + y * y + z * z);
      const nx = x / len;
      const ny = y / len;
      const nz = z / len;

      let scale = 1;

      // Elongate vertically (head is taller than wide)
      if (ny > 0) {
        scale = 1 + ny * 0.2;
      }

      // Flatten back of head significantly
      if (nx < -0.3) {
        scale *= 0.75 + nx * 0.1;
      }

      // Create face profile - indentation for face
      if (nz > 0.3 && Math.abs(nx) < 0.7) {
        const faceDepth = 1 - Math.abs(nx) * 0.15;
        scale *= faceDepth;

        // Nose bridge
        if (nz > 0.7 && Math.abs(nx) < 0.2 && ny > -0.1 && ny < 0.3) {
          scale *= 1.05;
        }
      }

      // Create chin
      if (ny < -0.6 && nz > 0) {
        scale *= 0.75;
      }

      // Temples indentation
      if (Math.abs(nx) > 0.7 && ny > 0 && ny < 0.4) {
        scale *= 0.92;
      }

      // Crown of head
      if (ny > 0.7) {
        scale *= 0.95;
      }

      positions.setXYZ(i, x * scale, y * scale, z * scale);
    }

    geo.computeVertexNormals();
    return geo;
  }, []);

  // Create animated glow cylinder that wraps around the head
  const glowGeometry = useMemo(() => {
    return new THREE.CylinderGeometry(0.15, 0.15, 2.8, 32, 1, true);
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !glowRef.current) return;

    timeRef.current += 0.008;

    // Very subtle rotation
    meshRef.current.rotation.y = Math.sin(timeRef.current * 0.25) * 0.12;
    meshRef.current.rotation.x = Math.cos(timeRef.current * 0.15) * 0.04;

    // Animate glow position - sweep from front to back continuously
    const glowProgress = (timeRef.current % (Math.PI * 2)) / (Math.PI * 2);
    const angle = glowProgress * Math.PI * 1.2 - Math.PI * 0.1; // Slightly wider sweep

    const radius = 1.35;
    const xPos = Math.sin(angle) * radius;
    const zPos = Math.cos(angle) * radius;

    glowRef.current.position.x = xPos;
    glowRef.current.position.z = zPos;
    glowRef.current.position.y = 0.05;

    // Rotate glow to always face outward from center
    glowRef.current.rotation.y = angle;

    // Pulse glow intensity smoothly
    const pulseIntensity = 0.5 + Math.sin(timeRef.current * 2.5) * 0.3;
    if (glowRef.current.material instanceof THREE.MeshBasicMaterial) {
      glowRef.current.material.opacity = pulseIntensity;
    }
  });

  return (
    <group position={[0, 0, 0]} rotation={[0, Math.PI * 0.15, 0]}>
      {/* Main wireframe head */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshBasicMaterial
          color="#00d4ff"
          wireframe
          transparent
          opacity={0.65}
          wireframeLinewidth={1}
        />
      </mesh>

      {/* Animated glow cylinder */}
      <mesh ref={glowRef} geometry={glowGeometry}>
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Additional glow effect - wider */}
      <mesh ref={glowRef} geometry={glowGeometry} scale={[1.15, 1, 1.15]}>
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Rim light effect around head */}
      <mesh geometry={geometry} scale={1.025}>
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Inner glow */}
      <mesh geometry={geometry} scale={0.98}>
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.05}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Ambient particles for atmosphere */}
      <points>
        <sphereGeometry args={[1.6, 32, 32]} />
        <pointsMaterial
          color="#00d4ff"
          size={0.015}
          transparent
          opacity={0.5}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Secondary particle layer */}
      <points rotation={[0, Math.PI / 2, 0]}>
        <sphereGeometry args={[1.7, 24, 24]} />
        <pointsMaterial
          color="#8b5cf6"
          size={0.012}
          transparent
          opacity={0.3}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
