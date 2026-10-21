"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Group, MathUtils, Vector3 } from "three";
import { PhoneModel } from "./PhoneModel";
import { SignalWaves } from "./SignalWaves";
import { useSceneGesture } from "./useSceneGesture";

type Props = {
  active: boolean;
  onReady: () => void;
  onFailure: () => void;
  index?: number;
  onSelect?: (index: number) => void;
};
const HERO_SCREENS = [
  "/phones/hero-home-orbit.png",
  "/phones/hero-ai.png",
  "/phones/hero-news.png",
  "/phones/video-call.png",
];
const SLOTS = [
  { x: 0.28, y: 0.12, z: 1.35, rx: 0.04, ry: -0.14, rz: -0.035, scale: 0.95 },
  { x: -1.65, y: 0.8, z: -0.9, rx: -0.05, ry: 0.32, rz: 0.12, scale: 0.62 },
  { x: 1.85, y: 0.8, z: -1.2, rx: 0.04, ry: -0.3, rz: -0.12, scale: 0.62 },
  { x: -1.65, y: -0.85, z: -0.4, rx: 0.08, ry: 0.3, rz: 0.1, scale: 0.54 },
];

export function PhoneComposition({
  active,
  index = 0,
  onReady,
  onFailure,
  onSelect,
}: Props) {
  const rig = useRef<Group>(null);
  const phones = useRef<Array<Group | null>>([]);
  const elapsed = useRef(0);
  const label = useRef<HTMLElement | null>(null);
  const labelPoint = useRef(new Vector3());
  const gesture = useSceneGesture(active, onFailure, index);
  const { invalidate, gl, camera, size } = useThree();
  useEffect(() => {
    label.current =
      gl.domElement
        .closest(".scene-surface")
        ?.querySelector<HTMLElement>(".hero-active-label") ?? null;
  }, [gl]);
  useEffect(() => {
    invalidate();
    onReady();
  }, [invalidate, onReady]);
  useFrame((_, rawDelta) => {
    if (!rig.current || !active || document.hidden) return;
    const delta = Math.min(rawDelta, 0.05),
      g = gesture.current;
    elapsed.current += delta;
    rig.current.rotation.x = MathUtils.damp(
      rig.current.rotation.x,
      g.y * 0.22 + g.pitch + g.scroll * 0.08,
      g.down ? 18 : 10,
      delta,
    );
    rig.current.rotation.y = MathUtils.damp(
      rig.current.rotation.y,
      g.x * 0.4 + g.yaw,
      g.down ? 18 : 10,
      delta,
    );
    phones.current.forEach((phone, i) => {
      if (!phone) return;
      const slot = SLOTS[(i - index + 4) % 4];
      phone.position.x = MathUtils.damp(phone.position.x, slot.x, 7, delta);
      phone.position.y = MathUtils.damp(
        phone.position.y,
        slot.y + Math.sin(elapsed.current * 0.65 + i) * 0.035,
        7,
        delta,
      );
      phone.position.z = MathUtils.damp(phone.position.z, slot.z, 7, delta);
      phone.rotation.x = MathUtils.damp(phone.rotation.x, slot.rx, 7, delta);
      phone.rotation.y = MathUtils.damp(phone.rotation.y, slot.ry, 7, delta);
      phone.rotation.z = MathUtils.damp(phone.rotation.z, slot.rz, 7, delta);
      phone.scale.setScalar(
        MathUtils.damp(phone.scale.x, slot.scale, 7, delta),
      );
    });
    const selectedPhone = phones.current[index];
    if (selectedPhone && label.current) {
      selectedPhone.updateWorldMatrix(true, false);
      labelPoint.current.set(0, 2.8, 0.1);
      selectedPhone.localToWorld(labelPoint.current).project(camera);
      const x = (labelPoint.current.x * 0.5 + 0.5) * size.width;
      const y = (0.5 - labelPoint.current.y * 0.5) * size.height;
      label.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -100%)`;
    }
    invalidate();
  });
  return (
    <>
      <SignalWaves active={active} selected={index} />
      <group ref={rig}>
        {HERO_SCREENS.map((src, i) => {
          const slot = SLOTS[i];
          return (
            <group
              key={src}
              ref={(node) => {
                phones.current[i] = node;
              }}
              position={[slot.x, slot.y, slot.z]}
              rotation={[slot.rx, slot.ry, slot.rz]}
              scale={slot.scale}
              onClick={(event) => {
                event.stopPropagation();
                if (!gesture.current.dragged) onSelect?.(i);
              }}
            >
              <PhoneModel src={src} selected={i === index} />
            </group>
          );
        })}
      </group>
    </>
  );
}

export function StoryPhone({ active, index = 0, onReady, onFailure }: Props) {
  const rig = useRef<Group>(null);
  const gesture = useSceneGesture(active, onFailure, index);
  const { invalidate } = useThree();
  useEffect(() => {
    invalidate();
    onReady();
  }, [index, invalidate, onReady]);
  useFrame((_, rawDelta) => {
    if (!rig.current || !active || document.hidden) return;
    const delta = Math.min(rawDelta, 0.05),
      g = gesture.current;
    const y = [-0.35, -0.24][index] + g.yaw + g.x * 0.3,
      z = [-0.08, -0.06][index],
      x = 0.06 + g.pitch + g.y * 0.15;
    rig.current.rotation.y = MathUtils.damp(
      rig.current.rotation.y,
      y,
      6,
      delta,
    );
    rig.current.rotation.z = MathUtils.damp(
      rig.current.rotation.z,
      z,
      6,
      delta,
    );
    rig.current.rotation.x = MathUtils.damp(
      rig.current.rotation.x,
      x,
      6,
      delta,
    );
    if (
      Math.abs(rig.current.rotation.y - y) +
        Math.abs(rig.current.rotation.z - z) +
        Math.abs(rig.current.rotation.x - x) >
      0.001
    )
      invalidate();
  });
  return (
    <group>
      <group ref={rig} rotation={[0.06, -0.35, -0.08]} position={[0, 0.25, 0]}>
        {["/phones/ai-chat.png", "/phones/video-call.png"].map((src, i) => (
          <group key={src} visible={i === index}>
            <PhoneModel src={src} />
          </group>
        ))}
      </group>
    </group>
  );
}
