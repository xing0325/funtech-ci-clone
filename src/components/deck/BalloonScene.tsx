"use client";

import { Suspense, useLayoutEffect, useRef } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { useGLTF, useTexture, Environment, Lightformer, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { asset } from "@/lib/asset";

// world width the word should fill — derived from the fixed camera (z 14, fov 24, 16:9
// stage): visible width ≈ 10.6, so ~9.6 fills it. Fixed & deterministic — does NOT depend
// on state.viewport (which measures unreliably inside the container-query stage on load).
const TARGET_W = 9.6;
const FLIGHT = 0.8; // click poke impulse
const L_STIFF = 0.14;
const L_DAMP = 0.82;

interface Letter {
  mesh: THREE.Mesh;
  rest: THREE.Vector3;
  restRotZ: number;
  offset: THREE.Vector3;
  vel: THREE.Vector3;
  rotZ: number;
  rotVel: number;
}

function Content({ onReady }: { onReady?: () => void }) {
  const { camera } = useThree();
  const fitG = useRef<THREE.Group>(null); // scale (idempotent each frame — never compounds)
  const floatG = useRef<THREE.Group>(null); // gentle float
  const centerG = useRef<THREE.Group>(null); // -center (once)

  const letters = useGLTF(asset("/webgl/logo/home-logo-letters.glb"), asset("/draco/"));
  const stickers = useGLTF(asset("/webgl/logo/home-logo-stickers.glb"), asset("/draco/"));
  const atlas = useTexture(asset("/webgl/logo/home-logo-stickers-atlas.webp"));

  const list = useRef<Letter[]>([]);
  const rawW = useRef(1);

  useLayoutEffect(() => {
    const black = new THREE.MeshPhysicalMaterial({ color: "#0a0a0b", metalness: 0, roughness: 0.25, clearcoat: 1, clearcoatRoughness: 0.14, envMapIntensity: 1.3 });
    const arr: Letter[] = [];
    letters.scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        m.material = black;
        arr.push({ mesh: m, rest: m.position.clone(), restRotZ: m.rotation.z, offset: new THREE.Vector3(), vel: new THREE.Vector3(), rotZ: 0, rotVel: 0 });
      }
    });
    list.current = arr;

    atlas.flipY = false;
    atlas.colorSpace = THREE.SRGBColorSpace;
    atlas.needsUpdate = true;
    const stickerMat = new THREE.MeshBasicMaterial({ map: atlas, transparent: true, alphaTest: 0.5, side: THREE.DoubleSide });
    stickers.scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) m.material = stickerMat;
    });

    // measure the RAW letters box once, center the content on it
    const box = new THREE.Box3();
    letters.scene.updateWorldMatrix(true, true);
    box.setFromObject(letters.scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    rawW.current = Math.max(size.x, 1e-3);
    if (centerG.current) centerG.current.position.copy(center).multiplyScalar(-1);

    onReady?.();
  }, [letters.scene, stickers.scene, atlas, onReady]);

  const poke = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const l = list.current.find((x) => x.mesh === e.object);
    if (l) { l.vel.z -= FLIGHT; l.rotVel += (Math.random() - 0.5) * 0.5; }
  };

  useFrame((state) => {
    if (fitG.current) fitG.current.scale.setScalar(TARGET_W / rawW.current);
    if (floatG.current) floatG.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
    for (const l of list.current) {
      l.vel.addScaledVector(l.offset, -L_STIFF);
      l.vel.multiplyScalar(L_DAMP);
      l.offset.add(l.vel);
      l.mesh.position.copy(l.rest).add(l.offset);
      l.rotVel += (0 - l.rotZ) * L_STIFF;
      l.rotVel *= L_DAMP;
      l.rotZ += l.rotVel;
      l.mesh.rotation.z = l.restRotZ + l.rotZ;
    }
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  void camera;

  return (
    <group ref={fitG}>
      <group ref={floatG}>
        <group ref={centerG}>
          <primitive object={letters.scene} onClick={poke} />
          <primitive object={stickers.scene} />
        </group>
      </group>
    </group>
  );
}

/**
 * Interactive 3D hero matching the original: big black-glossy balloon letters + stickers.
 * Idempotent scale keeps it large & stable; OrbitControls gives a small damped drag clamped
 * near the front (±8° azimuth / ±6° polar — the original's "微微侧面", no back-flip); click a
 * letter to poke it (it springs back); gentle float.
 */
export function BalloonScene({ onReady }: { onReady?: () => void }) {
  return (
    <Canvas camera={{ position: [0, 0, 14], fov: 24 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }} style={{ cursor: "grab" }}>
      <ambientLight intensity={0.25} />
      <Suspense fallback={null}>
        <Content onReady={onReady} />
        <Environment resolution={256}>
          <Lightformer intensity={2.4} position={[0, 3, 5]} scale={[8, 8, 1]} />
          <Lightformer intensity={1.4} position={[-5, 1, 3]} scale={[5, 5, 1]} />
          <Lightformer intensity={1.2} color="#ff8a5c" position={[4, -2, 3]} scale={[4, 4, 1]} />
          <Lightformer intensity={1} position={[0, -3, -4]} scale={[8, 3, 1]} />
        </Environment>
      </Suspense>
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.12}
        rotateSpeed={0.25}
        minAzimuthAngle={-0.07}
        maxAzimuthAngle={0.07}
        minPolarAngle={Math.PI / 2 - 0.06}
        maxPolarAngle={Math.PI / 2 + 0.06}
      />
    </Canvas>
  );
}
