import { RoundedBox } from "@react-three/drei";
import { Quaternion, Vector3 } from "three";

type Point = [number, number, number];

export function Box({ size, position = [0, 0, 0], color, rotation = [0, 0, 0], rounded = false, castShadow = true }: { size: Point; position?: Point; color: string; rotation?: Point; rounded?: boolean; castShadow?: boolean }) {
  return rounded ? <RoundedBox args={size} position={position} rotation={rotation} radius={Math.min(...size) * 0.3} smoothness={2} castShadow={castShadow} receiveShadow><meshStandardMaterial color={color} roughness={0.85} /></RoundedBox> : <mesh position={position} rotation={rotation} castShadow={castShadow} receiveShadow><boxGeometry args={size} /><meshStandardMaterial color={color} roughness={0.85} /></mesh>;
}

export function Rod({ start, end, radius = 0.012, color = "#4b5b48" }: { start: Point; end: Point; radius?: number; color?: string }) {
  const from = new Vector3(...start);
  const to = new Vector3(...end);
  const direction = to.clone().sub(from);
  const midpoint = from.clone().add(to).multiplyScalar(0.5);
  const quaternion = new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), direction.clone().normalize());
  return <mesh position={midpoint} quaternion={quaternion}><cylinderGeometry args={[radius, radius, direction.length(), 8]} /><meshStandardMaterial color={color} roughness={0.8} /></mesh>;
}

export function Desk({ width, depth, wide }: { width: number; depth: number; wide: boolean }) {
  const wood = wide ? "#bd9467" : "#d0a777";
  return <group name={wide ? "Wide Desk" : "Compact Desk"}>
    <Box size={[width, 0.055, depth]} position={[0, 0.7225, 0]} color={wood} rounded />
    {wide ? [-1, 1].map((side) => <group key={side}>
      <Box size={[0.035, 0.68, 0.035]} position={[side * (width / 2 - 0.08), 0.355, -depth / 2 + 0.06]} color="#485548" />
      <Box size={[0.035, 0.68, 0.035]} position={[side * (width / 2 - 0.08), 0.355, depth / 2 - 0.06]} color="#485548" />
      <Box size={[0.035, 0.035, depth - 0.085]} position={[side * (width / 2 - 0.08), 0.03, 0]} color="#485548" />
    </group>) : [-1, 1].flatMap((x) => [-1, 1].map((z) => <Box key={`${x}-${z}`} size={[0.055, 0.69, 0.055]} position={[x * (width / 2 - 0.065), 0.35, z * (depth / 2 - 0.065)]} color="#b68b5c" />))}
    {wide && <Box size={[width - 0.16, 0.035, 0.035]} position={[0, 0.62, -depth / 2 + 0.06]} color="#485548" />}
    <DeskExtras width={width} depth={depth} />
  </group>;
}

export function Chair({ ergonomic }: { ergonomic: boolean }) {
  const color = ergonomic ? "#355e49" : "#668269";
  return <group name={ergonomic ? "Ergonomic Chair" : "Mesh Chair"}>
    <Box size={[0.45, 0.075, 0.43]} position={[0, 0.46, 0]} color={color} rounded />
    {ergonomic ? <>
      <Box size={[0.43, 0.59, 0.075]} position={[0, 0.8, 0.17]} rotation={[-0.1, 0, 0]} color={color} rounded />
      <Box size={[0.25, 0.12, 0.07]} position={[0, 1.18, 0.21]} color={color} rounded />
      <Rod start={[0, 1.02, 0.19]} end={[0, 1.17, 0.2]} color="#465849" />
      <Box size={[0.37, 0.09, 0.03]} position={[0, 0.61, 0.124]} color="#50715a" rounded />
    </> : <>
      <Box size={[0.035, 0.42, 0.035]} position={[-0.21, 0.75, 0.18]} color="#3d5942" />
      <Box size={[0.035, 0.42, 0.035]} position={[0.21, 0.75, 0.18]} color="#3d5942" />
      <Box size={[0.45, 0.035, 0.035]} position={[0, 0.945, 0.18]} color="#3d5942" />
      <Box size={[0.45, 0.035, 0.035]} position={[0, 0.56, 0.18]} color="#3d5942" />
      <mesh position={[0, 0.75, 0.18]}><planeGeometry args={[0.4, 0.385, 10, 10]} /><meshStandardMaterial color="#6e8d70" wireframe side={2} /></mesh>
    </>}
    {[-1, 1].map((side) => <group key={side}><Rod start={[side * 0.26, 0.43, 0.09]} end={[side * 0.26, 0.64, 0.09]} /><Box size={[0.065, 0.035, 0.27]} position={[side * 0.26, 0.65, 0.03]} color="#3d5743" rounded /></group>)}
    <Rod start={[0, 0.08, 0]} end={[0, 0.45, 0]} radius={0.026} color="#687368" />
    {Array.from({ length: 5 }, (_, index) => {
      const angle = index * Math.PI * 2 / 5;
      const x = Math.sin(angle) * 0.28;
      const z = Math.cos(angle) * 0.28;
      return <group key={index}><Rod start={[0, 0.11, 0]} end={[x, 0.065, z]} radius={0.018} /><mesh position={[x, 0.036, z]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.033, 0.033, 0.035, 10]} /><meshStandardMaterial color="#344639" /></mesh></group>;
    })}
  </group>;
}

export function Monitor() {
  return <group name="24 Inch Monitor">
    <Box size={[0.18, 0.016, 0.14]} position={[0, 0.009, 0.015]} color="#5c655e" rounded />
    <Rod start={[0, 0.012, 0]} end={[0, 0.21, 0]} radius={0.018} color="#6d766f" />
    <Box size={[0.53, 0.31, 0.032]} position={[0, 0.265, 0]} color="#2b3934" rounded />
    <Box size={[0.49, 0.269, 0.002]} position={[0, 0.266, 0.0175]} color="#3c6355" castShadow={false} />
    <Box size={[0.2, 0.014, 0.001]} position={[-0.1, 0.345, 0.02]} color="#b0c3a7" castShadow={false} />
    <Box size={[0.27, 0.009, 0.001]} position={[-0.065, 0.31, 0.02]} color="#7b9d83" castShadow={false} />
    <Box size={[0.16, 0.009, 0.001]} position={[-0.12, 0.282, 0.02]} color="#7b9d83" castShadow={false} />
    <Box size={[0.1, 0.075, 0.001]} position={[0.14, 0.205, 0.02]} color="#819e79" castShadow={false} />
  </group>;
}

export function Lamp() {
  return <group name="Task Lamp">
    <mesh position={[0, 0.008, 0]} castShadow><cylinderGeometry args={[0.065, 0.072, 0.016, 16]} /><meshStandardMaterial color="#52684b" /></mesh>
    <Rod start={[0, 0.01, 0]} end={[0, 0.33, 0]} radius={0.009} color="#486743" />
    <Rod start={[0, 0.33, 0]} end={[-0.075, 0.48, 0.015]} radius={0.009} color="#486743" />
    <mesh position={[-0.075, 0.45, 0.015]} rotation={[0, 0, -0.3]} castShadow><coneGeometry args={[0.067, 0.075, 16, 1, true]} /><meshStandardMaterial color="#486743" side={2} /></mesh>
    <mesh position={[-0.065, 0.412, 0.015]} rotation={[-Math.PI / 2, 0.3, 0]}><circleGeometry args={[0.063, 16]} /><meshStandardMaterial color="#eeddbc" emissive="#9c7847" emissiveIntensity={0.12} side={2} /></mesh>
  </group>;
}

export function Plant() {
  return <group name="Desk Plant">
    <mesh position={[0, 0.045, 0]} castShadow><cylinderGeometry args={[0.052, 0.038, 0.085, 14]} /><meshStandardMaterial color="#b97d5f" /></mesh>
    <mesh position={[0, 0.09, 0]}><cylinderGeometry args={[0.046, 0.046, 0.003, 14]} /><meshStandardMaterial color="#63583e" /></mesh>
    <Rod start={[0, 0.085, 0]} end={[0, 0.225, 0]} radius={0.004} color="#486744" />
    {[[-0.04, 0.15, 0, 0.7], [0.04, 0.18, 0, -0.7], [0, 0.205, 0.02, 0.2], [0.025, 0.13, 0.035, -0.9], [-0.02, 0.19, -0.025, 0.6]].map(([x, y, z, angle], index) => <mesh key={index} position={[x, y, z]} rotation={[0.25, index * 0.7, angle]} scale={[0.022, 0.055, 0.009]} castShadow><sphereGeometry args={[1, 8, 6]} /><meshStandardMaterial color={index % 2 ? "#527c4e" : "#7d965e"} /></mesh>)}
  </group>;
}

export function DeskExtras({ width, depth }: { width: number; depth: number }) {
  const front = depth * 0.22;
  const mug: Point = [-width / 2 + 0.3, 0.79, front - 0.03];
  return <group name="Desk extras">
    <Box size={[0.36, 0.014, 0.12]} position={[0, 0.757, front]} color="#e9e5d7" rounded />
    <Box size={[0.32, 0.004, 0.08]} position={[0, 0.766, front]} color="#c6cabb" castShadow={false} />
    <Box size={[0.055, 0.03, 0.09]} position={[0.27, 0.765, front + 0.01]} color="#f1eee4" rounded />
    <mesh position={mug} castShadow><cylinderGeometry args={[0.032, 0.028, 0.08, 14]} /><meshStandardMaterial color="#f3ede0" roughness={0.6} /></mesh>
    <mesh position={[mug[0] + 0.036, mug[1] + 0.005, mug[2]]}><torusGeometry args={[0.02, 0.006, 8, 14]} /><meshStandardMaterial color="#f3ede0" roughness={0.6} /></mesh>
    <mesh position={[mug[0], mug[1] + 0.041, mug[2]]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.026, 14]} /><meshStandardMaterial color="#6b4a33" /></mesh>
  </group>;
}
