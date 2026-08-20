"use client";

import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

export function HeroScene({ animate = true }: { animate?: boolean }) {
  const group = useRef<Group>(null);
  useFrame((_, delta) => {
    if (animate && group.current) group.current.rotation.y += delta * 0.16;
  });

  return (
    <>
      <ambientLight intensity={1.6} />
      <directionalLight position={[4, 5, 4]} intensity={5} color="#c8ff2e" />
      <pointLight position={[-4, -2, 3]} intensity={20} color="#65774d" />
      <Float speed={animate ? 1.2 : 0} rotationIntensity={animate ? 0.35 : 0} floatIntensity={animate ? 0.5 : 0}>
        <group ref={group} rotation={[0.4, -0.5, 0.15]}>
          <mesh>
            <torusKnotGeometry args={[1.45, 0.42, 96, 12]} />
            <MeshTransmissionMaterial
              color="#bffa35"
              transmission={0.35}
              roughness={0.24}
              thickness={1.2}
              chromaticAberration={0.05}
            />
          </mesh>
          <mesh scale={0.72}>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial color="#151914" roughness={0.35} metalness={0.8} />
          </mesh>
        </group>
      </Float>
    </>
  );
}
