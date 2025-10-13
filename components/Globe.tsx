"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

import SceneFX from "@/components/SceneFX";
import OrbitingUI from "@/components/OrbitingUI";
import CameraRig from "@/components/camera/CameraRig";
import { useUI } from "@/components/ui/store";

type WireProps = {
  radius: number;
  color: string;
  refObj: React.MutableRefObject<THREE.LineSegments | null>;
};

type GlobeProps = {
  radius?: number;
};

function GlobeScene({ radius = 2.8 }: GlobeProps) {
  const group = useRef<THREE.Group>(null!);
  const wire1 = useRef<THREE.LineSegments>(null!);
  const wire2 = useRef<THREE.LineSegments>(null!);
  const animationSpeed = useUI((s) => s.animationSpeed);

  useFrame((_, dt) => {
    const delta = dt * animationSpeed;
    if (group.current) group.current.rotation.y += delta * 0.05;
    if (wire1.current) wire1.current.rotation.y += delta * 0.1;
    if (wire2.current) wire2.current.rotation.y -= delta * 0.08;
  });

  const R = radius;

  return (
    <group ref={group}>
      {/* Atmosphere halo */}
      <mesh>
        <sphereGeometry args={[R + 0.7, 64, 64]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.1} />
      </mesh>

      {/* Core sphere */}
      <Sphere args={[R, 128, 128]}>
        <meshStandardMaterial color="#0b132b" metalness={0.45} roughness={0.8} />
      </Sphere>

      {/* Dual wireframes */}
      <Wire radius={R + 0.06} refObj={wire1} color="#22d3ee" />
      <Wire radius={R + 0.06} refObj={wire2} color="#8b5cf6" />
    </group>
  );
}

function Wire({ radius, color, refObj }: WireProps) {
  const geometry = useMemo(
    () => new THREE.IcosahedronGeometry(radius, 3),
    [radius]
  );

  const edges = useMemo(
    () => new THREE.EdgesGeometry(geometry),
    [geometry]
  );

  useEffect(() => {
    return () => {
      geometry.dispose();
      edges.dispose();
    };
  }, [edges, geometry]);
  return (
    <lineSegments ref={refObj}>
      <bufferGeometry attach="geometry" {...edges} />
      <lineBasicMaterial attach="material" color={color} linewidth={1} />
    </lineSegments>
  );
}

export default function Globe(props: GlobeProps) {
  return (
    <div className="absolute inset-0 z-10">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 45 }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={["#010313"]} />
          <ambientLight intensity={0.55} />
          <directionalLight
            color="#38bdf8"
            intensity={1.1}
            position={[5, 4, 6]}
          />
          <directionalLight
            color="#8b5cf6"
            intensity={0.55}
            position={[-4, -2, -6]}
          />
          <SceneFX />
          <GlobeScene {...props} />
          <OrbitingUI />
          <CameraRig />
        </Suspense>
      </Canvas>
    </div>
  );
}
