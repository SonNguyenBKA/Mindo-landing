"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { PMREMGenerator } from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { PhoneComposition, StoryPhone } from "./PhoneRig";

function StudioLighting() {
  const { gl, scene, invalidate } = useThree();
  // Three owns this mutable scene; the ref scopes imperative GPU setup/cleanup.
  const sceneRef = useRef(scene);
  useEffect(() => {
    const targetScene = sceneRef.current;
    const previous = targetScene.environment;
    const room = new RoomEnvironment();
    const generator = new PMREMGenerator(gl);
    const environment = generator.fromScene(room, 0.04);
    targetScene.environment = environment.texture;
    generator.dispose();
    room.dispose();
    invalidate();
    return () => {
      targetScene.environment = previous;
      environment.dispose();
    };
  }, [gl, invalidate]);
  return null;
}

type SceneProps = {
  active: boolean;
  onReady: () => void;
  onFailure: () => void;
  variant?: "hero" | "story";
  index?: number;
  onSelect?: (index: number) => void;
};
export default function PhoneScene(props: SceneProps) {
  const { onFailure } = props;
  const [supported] = useState(() => {
    try {
      const context = document.createElement("canvas").getContext("webgl2");
      if (!context) return false;
      context.getExtension("WEBGL_lose_context")?.loseContext();
      return true;
    } catch {
      return false;
    }
  });
  useEffect(() => {
    if (!supported) onFailure();
  }, [supported, onFailure]);
  if (!supported) return null;
  return (
    <Canvas
      camera={{
        position: props.variant === "story" ? [0, 0.5, 10.5] : [0, 0, 11.5],
        fov: 36,
      }}
      dpr={[1, 2]}
      frameloop={props.active ? "demand" : "never"}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
    >
      <StudioLighting />
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 5]} intensity={3} color="#fff9e8" />
      <directionalLight position={[-4, 0, 3]} intensity={2} color="#c3ddeb" />
      <Suspense fallback={null}>
        {props.variant === "story" ? (
          <StoryPhone {...props} />
        ) : (
          <PhoneComposition {...props} />
        )}
      </Suspense>
    </Canvas>
  );
}
