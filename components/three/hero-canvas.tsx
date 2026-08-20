"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { HeroScene } from "@/components/three/hero-scene";

export function HeroCanvas() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "100px" });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="hero-canvas" aria-hidden="true">
      <div className="hero-orbit" />
      {visible && (
        <Suspense fallback={null}>
          <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 42 }} gl={{ antialias: true, alpha: true }}>
            <HeroScene animate={!reduced} />
          </Canvas>
        </Suspense>
      )}
    </div>
  );
}
