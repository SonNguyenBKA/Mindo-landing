"use client";

import { useMemo, useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import {
  BufferGeometry,
  Color,
  LineBasicMaterial,
  MeshBasicMaterial,
  Shape,
  ShapeGeometry,
  SRGBColorSpace,
  TextureLoader,
  Vector3,
} from "three";

const FOCUSED = new Color("#ffffff");
const BACKGROUND = new Color("#a5b2bd");
// A decorative line has a wide default hit threshold, even at zero opacity.
// Only the visible device meshes should participate in selection.
const ignoreRaycast = () => undefined;

function roundedShape(width: number, height: number, radius: number) {
  const x = -width / 2,
    y = -height / 2;
  const shape = new Shape();
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  return shape;
}

export function PhoneModel({
  src,
  selected,
}: {
  src: string;
  selected?: boolean;
}) {
  const display = useRef<MeshBasicMaterial>(null);
  const outline = useRef<LineBasicMaterial>(null);
  const texture = useLoader(TextureLoader, src);
  const anisotropy = useThree((state) =>
    Math.min(8, state.gl.capabilities.getMaxAnisotropy()),
  );
  const body = useMemo(() => roundedShape(2.38, 5.12, 0.3), []);
  const focusOutline = useMemo(
    () =>
      new BufferGeometry().setFromPoints(
        roundedShape(2.46, 5.2, 0.34)
          .getPoints(32)
          .map((point) => new Vector3(point.x, point.y, 0)),
      ),
    [],
  );
  useFrame((_, delta) => {
    const alpha = 1 - Math.exp(-10 * Math.min(delta, 0.05));
    display.current?.color.lerp(
      selected === false ? BACKGROUND : FOCUSED,
      alpha,
    );
    if (outline.current)
      outline.current.opacity +=
        ((selected === true ? 0.75 : 0) - outline.current.opacity) * alpha;
  });
  const glass = useMemo(
    () => new ShapeGeometry(roundedShape(2.355, 5.035, 0.285), 16),
    [],
  );
  const screen = useMemo(() => {
    const geometry = new ShapeGeometry(roundedShape(2.335, 5.015, 0.275), 16);
    const positions = geometry.attributes.position;
    const uv = geometry.attributes.uv;
    for (let i = 0; i < positions.count; i++)
      uv.setXY(
        i,
        (positions.getX(i) + 1.1675) / 2.335,
        (positions.getY(i) + 2.5075) / 5.015,
      );
    return geometry;
  }, []);

  return (
    <group>
      <lineLoop
        geometry={focusOutline}
        position={[0, 0, 0.03]}
        raycast={ignoreRaycast}
      >
        <lineBasicMaterial
          ref={outline}
          color="#cfe24a"
          transparent
          opacity={0}
          depthWrite={false}
        />
      </lineLoop>
      <mesh position={[0, 0, -0.135]}>
        <extrudeGeometry
          args={[
            body,
            {
              depth: 0.18,
              bevelEnabled: true,
              bevelThickness: 0.015,
              bevelSize: 0.015,
              bevelSegments: 3,
              steps: 1,
              curveSegments: 16,
            },
          ]}
        />
        <meshPhysicalMaterial
          color="#f5f5f0"
          metalness={0.12}
          roughness={0.2}
          clearcoat={1}
          envMapIntensity={0.9}
        />
      </mesh>
      <mesh position={[0, 0, 0.064]} geometry={glass}>
        <meshBasicMaterial color="#101418" />
      </mesh>
      <mesh position={[0, 0, 0.068]} geometry={screen}>
        <meshBasicMaterial
          ref={display}
          map={texture}
          map-colorSpace={SRGBColorSpace}
          map-anisotropy={anisotropy}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[-1.218, 1.6, -0.045]}>
        <boxGeometry args={[0.025, 0.18, 0.075]} />
        <meshStandardMaterial color="#d5d9da" metalness={0.6} roughness={0.2} />
      </mesh>
      <mesh position={[1.218, 0.65, -0.045]}>
        <boxGeometry args={[0.025, 0.6, 0.075]} />
        <meshStandardMaterial color="#b7bfc5" metalness={1} roughness={0.2} />
      </mesh>
      <mesh position={[-1.218, 0.9, -0.045]}>
        <boxGeometry args={[0.025, 0.35, 0.075]} />
        <meshStandardMaterial color="#b7bfc5" metalness={1} roughness={0.2} />
      </mesh>
      <mesh position={[-1.218, 0.42, -0.045]}>
        <boxGeometry args={[0.025, 0.35, 0.075]} />
        <meshStandardMaterial color="#b7bfc5" metalness={1} roughness={0.2} />
      </mesh>
    </group>
  );
}
