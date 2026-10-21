"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Group, Mesh, MeshBasicMaterial, Vector3 } from "three";

export function SignalWaves({
  active,
  selected,
}: {
  active: boolean;
  selected: number;
}) {
  const waves = useRef<Group>(null);
  const phase = useRef(0);
  const pulse = useRef(0);
  const { invalidate, viewport, camera, size } = useThree();
  const bounds = useMemo(
    () => viewport.getCurrentViewport(camera, new Vector3(0, 0, -3), size),
    [viewport, camera, size],
  );
  const radius = Math.min(bounds.width, bounds.height) * 0.44;
  useEffect(() => {
    pulse.current = 1;
    invalidate();
  }, [selected, invalidate]);
  useFrame((_, delta) => {
    if (!active || document.hidden || !waves.current) return;
    phase.current += Math.min(delta, 0.05) * 0.23;
    pulse.current *= Math.exp(-Math.min(delta, 0.05) * 2);
    waves.current.children.forEach((child, i) => {
      const ring = child as Mesh;
      const p = (phase.current + i / 3) % 1;
      ring.scale.setScalar(radius * (0.24 + p * 0.76));
      (ring.material as MeshBasicMaterial).opacity =
        Math.sin(p * Math.PI) * (0.24 + pulse.current * 0.12);
    });
  });
  return (
    <group ref={waves} position={[0, 0, -3]}>
      {[0, 1, 2].map((i) => (
        <mesh key={i}>
          <torusGeometry args={[1, 0.003, 6, 128]} />
          <meshBasicMaterial
            color={i === 1 ? "#e8f4e5" : "#cfe24a"}
            transparent
            opacity={0}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
