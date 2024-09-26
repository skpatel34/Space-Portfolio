"use client";

import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three"; // Importing THREE for types
// @ts-expect-error: maath has no official types
import * as random from "maath/random/dist/maath-random.esm";

const StarBackground = (props: JSX.IntrinsicElements["points"]) => {
  // Use useRef for Points component from @react-three/fiber
  const ref = useRef<THREE.Points>(null); // Correctly typing ref for THREE.Points
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.2 })
  );

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
      <PointMaterial
        transparent
        color="#fff"
        size={0.002}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
};

const StarsCanvas = () => (
  <div className="w-full h-auto fixed inset-0 z-[20]">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <StarBackground />
      </Suspense>
    </Canvas>
  </div>
);

export default StarsCanvas;
