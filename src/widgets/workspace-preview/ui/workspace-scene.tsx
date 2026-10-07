"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Group, OrthographicCamera } from "three";
import type { OrbitControls as OrbitControlsType } from "three-stdlib";
import { findProduct } from "@/entities/product";
import type { WorkspaceConfig } from "@/entities/workspace";
import { useMediaQuery } from "@/shared/lib/use-media-query";
import { Box, Chair, Desk, Lamp, Monitor, Plant } from "./furniture";

export type CameraView = { angle: "angle" | "front"; revision: number };

function ItemEntrance({ children, position = [0, 0, 0] }: { children: ReactNode; position?: [number, number, number] }) {
  const group = useRef<Group>(null);
  const invalidate = useThree((state) => state.invalidate);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  useEffect(() => {
    if (group.current) group.current.scale.setScalar(reducedMotion ? 1 : 0.96);
    invalidate();
  }, [invalidate, reducedMotion]);
  useFrame((_, delta) => {
    if (!group.current || group.current.scale.x >= 0.9999) return;
    const scale = Math.min(1, group.current.scale.x + delta * 0.2);
    group.current.scale.setScalar(scale);
    invalidate();
  });
  return <group ref={group} position={position}>{children}</group>;
}

function BackdropBox(props: Parameters<typeof Box>[0]) {
  return <Box {...props} castShadow={false} />;
}

function Room() {
  return <group name="Room backdrop">
    <BackdropBox size={[2.8, 0.07, 2.6]} position={[0, -0.04, 0]} color="#e4ddca" />
    <BackdropBox size={[2.8, 1.6, 0.035]} position={[0, 0.8, -1.3]} color="#eee8db" />
    <BackdropBox size={[0.035, 1.6, 2.6]} position={[-1.4, 0.8, 0]} color="#d7dfce" />
    <BackdropBox size={[2.8, 0.035, 0.035]} position={[0, 0.02, -1.27]} color="#f5f0e3" />
    <BackdropBox size={[0.035, 0.035, 2.6]} position={[-1.37, 0.02, 0]} color="#f5f0e3" />
    <gridHelper args={[2.5, 10, "#d3cbb8", "#dcd5c4"]} position={[0, -0.003, 0]} />
    <BackdropBox size={[0.006, 0.74, 0.57]} position={[-1.379, 0.97, -0.48]} color="#f6efda" />
    <BackdropBox size={[0.012, 0.74, 0.022]} position={[-1.372, 0.97, -0.48]} color="#cbd6bf" />
    <BackdropBox size={[0.012, 0.022, 0.57]} position={[-1.372, 0.97, -0.48]} color="#cbd6bf" />
    <BackdropBox size={[0.39, 0.49, 0.025]} position={[0.74, 1.09, -1.271]} color="#b39470" />
    <BackdropBox size={[0.335, 0.435, 0.028]} position={[0.74, 1.09, -1.256]} color="#f7f0df" />
    <BackdropBox size={[0.18, 0.27, 0.007]} position={[0.71, 1.06, -1.234]} color="#b1c49d" rounded />
    <BackdropBox size={[0.075, 0.19, 0.009]} position={[0.78, 1.02, -1.23]} color="#557657" rounded />
  </group>;
}

function SceneDiagnostics() {
  useFrame(({ gl }) => {
    gl.domElement.dataset.renderTriangles = String(gl.info.render.triangles);
    gl.domElement.dataset.renderCalls = String(gl.info.render.calls);
  });
  return null;
}

function CameraControls({ view, onError }: { view: CameraView; onError: () => void }) {
  const controls = useRef<OrbitControlsType>(null);
  const { camera, size, invalidate, gl } = useThree();
  const coarsePointer = useMediaQuery("(pointer: coarse)");
  useEffect(() => {
    const zoom = Math.min(size.width / 4.15, size.height / 3.1);
    if (camera instanceof OrthographicCamera) {
      // Three.js cameras are mutable scene objects, not React state.
      // eslint-disable-next-line react-hooks/immutability
      camera.zoom = zoom;
      camera.updateProjectionMatrix();
    }
    invalidate();
  }, [camera, invalidate, size.width, size.height]);
  useEffect(() => {
    const position = view.angle === "front" ? [0.9, 2.5, 4.7] : [4.1, 3.1, 4.1];
    camera.position.set(position[0], position[1], position[2]);
    controls.current?.target.set(0, 0.64, 0);
    camera.lookAt(0, 0.64, 0);
    controls.current?.update();
    invalidate();
  }, [camera, invalidate, view]);
  useEffect(() => {
    const canvas = gl.domElement;
    const lost = (event: Event) => { event.preventDefault(); onError(); };
    canvas.addEventListener("webglcontextlost", lost);
    return () => canvas.removeEventListener("webglcontextlost", lost);
  }, [gl, onError]);
  return coarsePointer ? null : <OrbitControls ref={controls} makeDefault enablePan={false} enableZoom={false} enableDamping={false} minPolarAngle={Math.PI / 5} maxPolarAngle={Math.PI / 2.55} minAzimuthAngle={-Math.PI / 5} maxAzimuthAngle={Math.PI / 2.6} target={[0, 0.64, 0]} />;
}

export default function WorkspaceScene({ config, view, onReady, onError }: { config: WorkspaceConfig; view: CameraView; onReady: () => void; onError: () => void }) {
  const desk = findProduct(config.deskId);
  const chair = findProduct(config.chairId);
  const monitors = config.accessoryCounts["monitor-standard"] ?? 0;
  const width = desk?.dimensions.width ?? 1.2;
  const depth = desk?.dimensions.depth ?? 0.6;
  return (
    <Canvas orthographic camera={{ position: [4.1, 3.1, 4.1], near: 0.1, far: 30, zoom: 100 }} frameloop="demand" dpr={[1, 1.5]} shadows gl={{ antialias: true, alpha: true, powerPreference: "low-power" }} onCreated={onReady} aria-label="Interactive 3D workspace preview" style={{ touchAction: "pan-y" }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[1.5, 5, 3]} intensity={2.4} castShadow shadow-mapSize={[1024, 1024]} shadow-camera-left={-3} shadow-camera-right={3} shadow-camera-top={3} shadow-camera-bottom={-3} shadow-bias={-0.0005} shadow-normalBias={0.025} />
      <Room />
      {!desk && <group name="Desk placement guide" position={[0, 0.005, -0.15]}><mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[1.25, 0.65]} /><meshStandardMaterial color="#b7c4a7" transparent opacity={0.24} /></mesh><Box size={[1.25, 0.002, 0.007]} position={[0, 0, -0.325]} color="#a7b995" /><Box size={[1.25, 0.002, 0.007]} position={[0, 0, 0.325]} color="#a7b995" /></group>}
      {desk && <ItemEntrance key={desk.id} position={[0, 0, -0.15]}><Desk width={width} depth={depth} wide={desk.id === "desk-wide"} /></ItemEntrance>}
      {chair && <ItemEntrance key={chair.id} position={[0, 0, depth / 2 + 0.43]}><Chair ergonomic={chair.id === "chair-ergo"} /></ItemEntrance>}
      {desk && Array.from({ length: monitors }, (_, index) => <ItemEntrance key={`monitor-${monitors}-${index}`} position={[monitors === 1 ? 0 : (index ? 1 : -1) * 0.278, 0.75, -0.15 - depth * 0.15]}><Monitor /></ItemEntrance>)}
      {desk && Boolean(config.accessoryCounts["lamp-task"]) && <ItemEntrance position={[-width / 2 + 0.095, 0.75, -0.15 - depth / 2 + 0.075]}><Lamp /></ItemEntrance>}
      {desk && Boolean(config.accessoryCounts["plant-small"]) && <ItemEntrance position={[width / 2 - 0.09, 0.75, -0.15 - depth / 2 + 0.07]}><Plant /></ItemEntrance>}
      <CameraControls view={view} onError={onError} />
      <SceneDiagnostics />
    </Canvas>
  );
}
