"use client";

import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";

export function useSceneGesture(
  active: boolean,
  onFailure: () => void,
  resetKey = 0,
) {
  const gesture = useRef({
    x: 0,
    y: 0,
    yaw: 0,
    pitch: 0,
    scroll: 0,
    down: false,
    distance: 0,
    dragged: false,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });
  const { gl, invalidate } = useThree();
  useEffect(() => {
    gesture.current.yaw = 0;
    gesture.current.pitch = 0;
    invalidate();
  }, [resetKey, invalidate]);
  useEffect(() => {
    const canvas = gl.domElement;
    const host = canvas.closest<HTMLElement>(".scene-surface");
    if (!host) return;
    const state = gesture.current;
    const stop = () => {
      state.down = false;
      host.dataset.dragging = "false";
    };
    const wake = () => {
      if (active && !document.hidden) {
        state.scroll = Math.min(
          1,
          window.scrollY / Math.max(1, host.offsetHeight),
        );
        invalidate();
      }
    };
    const down = (event: PointerEvent) => {
      if (
        !active ||
        event.button !== 0 ||
        (event.target as HTMLElement).closest("button,a")
      )
        return;
      state.down = true;
      state.distance = 0;
      state.dragged = false;
      state.startX = event.clientX;
      state.startY = event.clientY;
      state.lastX = event.clientX;
      state.lastY = event.clientY;
    };
    const move = (event: PointerEvent) => {
      if (!active || document.hidden) return;
      if (state.down && (event.buttons & 1) === 0) stop();
      const rect = host.getBoundingClientRect();
      if (!state.down) {
        state.x = Math.max(
          -0.5,
          Math.min(0.5, (event.clientX - rect.left) / rect.width - 0.5),
        );
        state.y = Math.max(
          -0.5,
          Math.min(0.5, (event.clientY - rect.top) / rect.height - 0.5),
        );
      }
      if (state.down) {
        const dx = event.clientX - state.lastX,
          dy = event.clientY - state.lastY;
        state.distance = Math.max(
          state.distance,
          Math.hypot(
            event.clientX - state.startX,
            event.clientY - state.startY,
          ),
        );
        if (state.distance >= 8) state.dragged = true;
        if (state.dragged) {
          state.yaw = Math.max(-0.65, Math.min(0.65, state.yaw + dx * 0.006));
          state.pitch = Math.max(
            -0.25,
            Math.min(0.25, state.pitch + dy * 0.004),
          );
        }
        state.lastX = event.clientX;
        state.lastY = event.clientY;
        if (state.dragged) {
          host.setPointerCapture(event.pointerId);
          host.dataset.dragging = "true";
        }
      }
      invalidate();
    };
    const up = (event: PointerEvent) => {
      stop();
      if (host.hasPointerCapture(event.pointerId))
        host.releasePointerCapture(event.pointerId);
      invalidate();
    };
    const leave = () => {
      if (!state.down) {
        state.x = 0;
        state.y = 0;
        invalidate();
      }
    };
    const lost = (event: Event) => {
      event.preventDefault();
      onFailure();
    };
    host.addEventListener("pointerdown", down);
    host.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    window.addEventListener("blur", stop);
    host.addEventListener("lostpointercapture", stop);
    host.addEventListener("pointerleave", leave);
    canvas.addEventListener("webglcontextlost", lost);
    window.addEventListener("scroll", wake, { passive: true });
    document.addEventListener("visibilitychange", wake);
    wake();
    return () => {
      host.removeEventListener("pointerdown", down);
      host.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      window.removeEventListener("blur", stop);
      host.removeEventListener("lostpointercapture", stop);
      stop();
      host.removeEventListener("pointerleave", leave);
      canvas.removeEventListener("webglcontextlost", lost);
      window.removeEventListener("scroll", wake);
      document.removeEventListener("visibilitychange", wake);
    };
  }, [active, gl, invalidate, onFailure]);
  return gesture;
}
