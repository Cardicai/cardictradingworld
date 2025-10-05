"use client";

import { Canvas, useFrame } from "@react-three/fiber";

function Scene() {
  useFrame(() => {
    // animations...
  });
  return <group>{/* meshes or effects */}</group>;
}

export default function OrbitingUI() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 50 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
