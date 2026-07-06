"use client";

import { Suspense, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useTexture, Environment, Lightformer, Bounds } from "@react-three/drei";
import * as THREE from "three";
import { asset } from "@/lib/asset";

/** Balloon letters — the glb ships unlit/untextured, so give them a black glossy PBR skin. */
function Letters() {
  const { scene } = useGLTF(asset("/webgl/logo/home-logo-letters.glb"), asset("/draco/"));
  useLayoutEffect(() => {
    const mat = new THREE.MeshPhysicalMaterial({
      color: "#0a0a0b", metalness: 0, roughness: 0.25, clearcoat: 1, clearcoatRoughness: 0.14, envMapIntensity: 1.25,
    });
    scene.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) (o as THREE.Mesh).material = mat;
    });
  }, [scene]);
  return <primitive object={scene} />;
}

/** Stickers — separate glb whose meshes UV-map into the sticker atlas texture. */
function Stickers() {
  const { scene } = useGLTF(asset("/webgl/logo/home-logo-stickers.glb"), asset("/draco/"));
  const atlas = useTexture(asset("/webgl/logo/home-logo-stickers-atlas.webp"));
  useLayoutEffect(() => {
    atlas.flipY = false; // glTF UV convention
    atlas.colorSpace = THREE.SRGBColorSpace;
    atlas.needsUpdate = true;
    const mat = new THREE.MeshBasicMaterial({ map: atlas, transparent: true, alphaTest: 0.5, side: THREE.DoubleSide });
    scene.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) (o as THREE.Mesh).material = mat;
    });
  }, [scene, atlas]);
  return <primitive object={scene} />;
}

/** Signals once the suspended assets have resolved (so the PNG fallback can hide). */
function Ready({ onReady }: { onReady?: () => void }) {
  useEffect(() => { onReady?.(); }, [onReady]);
  return null;
}

/** Floating + mouse-follow rig wrapping the model. */
function Rig() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = Math.sin(t * 0.8) * 0.1;
    const tx = state.pointer.y * 0.22;
    const ty = state.pointer.x * 0.4;
    ref.current.rotation.x += (tx - ref.current.rotation.x) * 0.04;
    ref.current.rotation.y += (ty - ref.current.rotation.y) * 0.04;
  });
  return (
    <group ref={ref}>
      <Letters />
      <Stickers />
    </group>
  );
}

/**
 * Interactive 3D hero: the real FUNTECH balloon-letter + sticker models, re-skinned
 * black-glossy with a procedural environment. Drag to orbit, mouse-follow tilt, idle float.
 */
export function BalloonScene({ onReady }: { onReady?: () => void }) {
  return (
    <Canvas camera={{ position: [0, 0, 9], fov: 42 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }} style={{ cursor: "grab" }}>
      <ambientLight intensity={0.25} />
      <Suspense fallback={null}>
        <Bounds fit clip margin={1.15}>
          <Rig />
        </Bounds>
        <Environment resolution={256}>
          <Lightformer intensity={2.4} position={[0, 3, 5]} scale={[8, 8, 1]} />
          <Lightformer intensity={1.4} position={[-5, 1, 3]} scale={[5, 5, 1]} />
          <Lightformer intensity={1.2} color="#ff8a5c" position={[4, -2, 3]} scale={[4, 4, 1]} />
          <Lightformer intensity={1} position={[0, -3, -4]} scale={[8, 3, 1]} />
        </Environment>
        <Ready onReady={onReady} />
      </Suspense>
      <OrbitControls enablePan={false} enableZoom={false} enableDamping dampingFactor={0.08} rotateSpeed={0.9} />
    </Canvas>
  );
}
