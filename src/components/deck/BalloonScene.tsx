"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";
import type { Group } from "three";
import { asset } from "@/lib/asset";

/** The real home balloon-logo model — draggable (orbit) + gently floating. */
function Balloons() {
  const ref = useRef<Group>(null);
  // local draco decoder (gstatic CDN is unreliable here) — harmless if the model isn't draco
  const { scene } = useGLTF(asset("/webgl/logo/home-logo-letters.glb"), asset("/draco/"));
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = Math.sin(t * 0.8) * 0.12; // idle float
    // damped mouse-follow tilt (the scene leans toward the cursor)
    const targetX = state.pointer.y * 0.25;
    const targetY = state.pointer.x * 0.4;
    ref.current.rotation.x += (targetX - ref.current.rotation.x) * 0.04;
    ref.current.rotation.y += (targetY - ref.current.rotation.y) * 0.04;
  });
  return (
    <Center>
      <group ref={ref}>
        <primitive object={scene} />
      </group>
    </Center>
  );
}

/**
 * Interactive 3D hero for the home slide: loads the real FUNTECH balloon-letter .glb,
 * lets you drag to spin it, and idles with a slow auto-rotate + float. Transparent
 * canvas so the static PNG behind it shows while the 6MB model streams in.
 */
export function BalloonScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "auto", cursor: "grab" }}
    >
      <ambientLight intensity={0.75} />
      <hemisphereLight intensity={0.5} groundColor="#1c1d1e" />
      <directionalLight position={[6, 8, 6]} intensity={1.4} />
      <directionalLight position={[-6, -2, 3]} intensity={0.6} />
      <directionalLight position={[0, 2, -8]} intensity={0.5} color="#ff481b" />
      <Suspense fallback={null}>
        <Balloons />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.9}
      />
    </Canvas>
  );
}
