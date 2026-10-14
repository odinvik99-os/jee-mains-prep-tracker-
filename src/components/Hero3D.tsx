import React, { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { SubjectId, SubjectStats, OverallStats } from '../types/jee';

// Pre-allocated math vectors for render loop to avoid GC
const _tempVec3 = new THREE.Vector3();

// Physics 3D Atom Component
function PhysicsAtom({
  completionPercent,
  isSelected,
  onClick
}: {
  completionPercent: number;
  isSelected: boolean;
  onClick: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const electron1Ref = useRef<THREE.Mesh>(null);
  const electron2Ref = useRef<THREE.Mesh>(null);
  const electron3Ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Normalized completion ratio (0.1 to 1.0 glow factor)
  const glow = useMemo(() => 0.2 + (completionPercent / 100) * 0.8, [completionPercent]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * (0.4 + glow * 0.4);
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * (0.8 + glow * 0.8);
    if (ring2Ref.current) ring2Ref.current.rotation.x += delta * (0.9 + glow * 0.7);
    if (ring3Ref.current) ring3Ref.current.rotation.y += delta * (1.1 + glow * 0.9);

    // Orbiting electrons
    const t = performance.now() * 0.002 * (1 + glow);
    if (electron1Ref.current) {
      electron1Ref.current.position.set(Math.cos(t) * 1.5, Math.sin(t) * 1.5, 0);
    }
    if (electron2Ref.current) {
      electron2Ref.current.position.set(Math.cos(t * 1.2 + 1) * 1.5, 0, Math.sin(t * 1.2 + 1) * 1.5);
    }
    if (electron3Ref.current) {
      electron3Ref.current.position.set(0, Math.cos(t * 0.9 + 2) * 1.5, Math.sin(t * 0.9 + 2) * 1.5);
    }
  });

  return (
    <group
      ref={groupRef}
      position={[-3.3, 0.2, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      scale={hovered || isSelected ? 1.15 : 1}
    >
      {/* Nucleus cluster (protons & neutrons) */}
      <mesh>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#0891b2"
          emissiveIntensity={glow * 1.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      {/* Secondary nucleus nodes */}
      <mesh position={[0.22, 0.18, 0.1]}>
        <sphereGeometry args={[0.26, 24, 24]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={glow * 1.5}
          roughness={0.25}
          metalness={0.7}
        />
      </mesh>
      <mesh position={[-0.2, -0.15, 0.12]}>
        <sphereGeometry args={[0.24, 24, 24]} />
        <meshStandardMaterial
          color="#0284c7"
          emissive="#0369a1"
          emissiveIntensity={glow * 1.5}
          roughness={0.25}
          metalness={0.7}
        />
      </mesh>

      {/* Orbit Ring 1 */}
      <group ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.5, 0.025, 16, 80]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={glow}
            transparent
            opacity={0.75}
          />
        </mesh>
        <mesh ref={electron1Ref}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshBasicMaterial color="#67e8f9" />
        </mesh>
      </group>

      {/* Orbit Ring 2 */}
      <group ref={ring2Ref} rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
        <mesh>
          <torusGeometry args={[1.5, 0.025, 16, 80]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={glow}
            transparent
            opacity={0.75}
          />
        </mesh>
        <mesh ref={electron2Ref}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshBasicMaterial color="#bae6fd" />
        </mesh>
      </group>

      {/* Orbit Ring 3 */}
      <group ref={ring3Ref} rotation={[0, -Math.PI / 3, Math.PI / 4]}>
        <mesh>
          <torusGeometry args={[1.5, 0.025, 16, 80]} />
          <meshStandardMaterial
            color="#0284c7"
            emissive="#0284c7"
            emissiveIntensity={glow}
            transparent
            opacity={0.75}
          />
        </mesh>
        <mesh ref={electron3Ref}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      </group>
    </group>
  );
}

// Chemistry 3D Molecule Component (Tetrahedral & Benzene ring hybrid structure)
function ChemistryMolecule({
  completionPercent,
  isSelected,
  onClick
}: {
  completionPercent: number;
  isSelected: boolean;
  onClick: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const glow = useMemo(() => 0.2 + (completionPercent / 100) * 0.8, [completionPercent]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * (0.3 + glow * 0.2);
      groupRef.current.rotation.y += delta * (0.5 + glow * 0.4);
    }
  });

  // Molecular geometry positions
  const atoms = useMemo(() => {
    const r = 1.35;
    return [
      { pos: [0, 0, 0] as [number, number, number], color: '#10b981', size: 0.45, name: 'C' }, // Center Carbon
      { pos: [r, 0, 0] as [number, number, number], color: '#34d399', size: 0.32, name: 'O' },
      { pos: [-r * 0.5, r * 0.86, 0] as [number, number, number], color: '#059669', size: 0.32, name: 'N' },
      { pos: [-r * 0.5, -r * 0.86, 0] as [number, number, number], color: '#6ee7b7', size: 0.32, name: 'C' },
      { pos: [0, 0, r * 0.95] as [number, number, number], color: '#a7f3d0', size: 0.25, name: 'H' },
      { pos: [0, 0, -r * 0.95] as [number, number, number], color: '#a7f3d0', size: 0.25, name: 'H' }
    ];
  }, []);

  // Chemical covalent bonds connecting atoms
  const bonds = useMemo(() => {
    return [
      { start: [0, 0, 0], end: [1.35, 0, 0] },
      { start: [0, 0, 0], end: [-1.35 * 0.5, 1.35 * 0.86, 0] },
      { start: [0, 0, 0], end: [-1.35 * 0.5, -1.35 * 0.86, 0] },
      { start: [0, 0, 0], end: [0, 0, 1.35 * 0.95] },
      { start: [0, 0, 0], end: [0, 0, -1.35 * 0.95] },
      // Ring outer bonds
      { start: [1.35, 0, 0], end: [-1.35 * 0.5, 1.35 * 0.86, 0] }
    ];
  }, []);

  return (
    <group
      ref={groupRef}
      position={[0, 0.2, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      scale={hovered || isSelected ? 1.15 : 1}
    >
      {/* Atoms */}
      {atoms.map((atom, idx) => (
        <mesh key={idx} position={atom.pos}>
          <sphereGeometry args={[atom.size, 24, 24]} />
          <meshStandardMaterial
            color={atom.color}
            emissive={atom.color}
            emissiveIntensity={glow * 1.6}
            roughness={0.2}
            metalness={0.65}
          />
        </mesh>
      ))}

      {/* Covalent bonds (cylinders) */}
      {bonds.map((bond, idx) => {
        const vStart = new THREE.Vector3(...bond.start);
        const vEnd = new THREE.Vector3(...bond.end);
        const distance = vStart.distanceTo(vEnd);
        const midPoint = _tempVec3.addVectors(vStart, vEnd).multiplyScalar(0.5);
        const orientation = new THREE.Matrix4();
        orientation.lookAt(vStart, vEnd, new THREE.Vector3(0, 1, 0));

        return (
          <group key={idx} position={midPoint.toArray()}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.045, 0.045, distance, 12]} />
              <meshStandardMaterial
                color="#059669"
                emissive="#10b981"
                emissiveIntensity={glow * 0.8}
                transparent
                opacity={0.8}
                metalness={0.8}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// Maths 3D Geometric Solid / Parametric Torus Knot Component
function MathsGeometry({
  completionPercent,
  isSelected,
  onClick
}: {
  completionPercent: number;
  isSelected: boolean;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);
  const ringRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const glow = useMemo(() => 0.2 + (completionPercent / 100) * 0.8, [completionPercent]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * (0.5 + glow * 0.3);
      meshRef.current.rotation.y += delta * (0.7 + glow * 0.4);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * (0.6 + glow * 0.3);
    }
  });

  return (
    <group
      position={[3.3, 0.2, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      scale={hovered || isSelected ? 1.15 : 1}
    >
      {/* Mathematical Torus Knot (p=2, q=3 trefoil knot) */}
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[0.9, 0.24, 80, 18, 2, 3]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#6d28d9"
          emissiveIntensity={glow * 1.5}
          roughness={0.25}
          metalness={0.8}
          wireframe={completionPercent < 30}
        />
      </mesh>

      {/* Coordinate polar ring with tick marks */}
      <group ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.55, 0.02, 16, 64]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.6 * glow} />
        </mesh>
      </group>
    </group>
  );
}

// Background dynamic dust particles to add spatial depth
function DustParticles() {
  const count = 75;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 16;
      pos[i + 1] = (Math.random() - 0.5) * 10;
      pos[i + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);
  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#38bdf8"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

interface Hero3DProps {
  physicsStats: SubjectStats;
  chemistryStats: SubjectStats;
  mathsStats: SubjectStats;
  overallStats: OverallStats;
  weightedMode: boolean;
  selectedSubject: SubjectId | 'all';
  onSelectSubject: (sub: SubjectId | 'all') => void;
}

export function Hero3D({
  physicsStats,
  chemistryStats,
  mathsStats,
  overallStats,
  weightedMode,
  selectedSubject,
  onSelectSubject
}: Hero3DProps) {
  const phyPct = weightedMode ? physicsStats.weightedPercentage : physicsStats.percentage;
  const chemPct = weightedMode ? chemistryStats.weightedPercentage : chemistryStats.percentage;
  const mathPct = weightedMode ? mathsStats.weightedPercentage : mathsStats.percentage;
  const overallPct = weightedMode ? overallStats.weightedPercentage : overallStats.overallPercentage;

  return (
    <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[420px] rounded-2xl overflow-hidden border border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 shadow-2xl">
      {/* Ambient background glow layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Three.js Canvas */}
      <Canvas
        camera={{ position: [0, 0, 7.8], fov: 42 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} />
        <directionalLight position={[-5, -4, -3]} intensity={0.6} color="#38bdf8" />
        <pointLight position={[0, 0, 3]} intensity={0.8} />

        <Suspense fallback={null}>
          <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.5}>
            <PhysicsAtom
              completionPercent={phyPct}
              isSelected={selectedSubject === 'physics'}
              onClick={() => onSelectSubject(selectedSubject === 'physics' ? 'all' : 'physics')}
            />
            <ChemistryMolecule
              completionPercent={chemPct}
              isSelected={selectedSubject === 'chemistry'}
              onClick={() => onSelectSubject(selectedSubject === 'chemistry' ? 'all' : 'chemistry')}
            />
            <MathsGeometry
              completionPercent={mathPct}
              isSelected={selectedSubject === 'maths'}
              onClick={() => onSelectSubject(selectedSubject === 'maths' ? 'all' : 'maths')}
            />
          </Float>
          <DustParticles />
        </Suspense>
      </Canvas>

      {/* Floating 3D Subject Interactive HUD Cards at bottom */}
      <div className="absolute bottom-3 left-0 right-0 px-4 flex items-center justify-between pointer-events-none">
        <div className="max-w-4xl mx-auto w-full grid grid-cols-3 gap-2 sm:gap-4 pointer-events-auto">
          {/* Physics indicator */}
          <button
            onClick={() => onSelectSubject(selectedSubject === 'physics' ? 'all' : 'physics')}
            className={`flex flex-col p-2.5 sm:p-3 rounded-xl backdrop-blur-md border text-left transition-all duration-300 ${
              selectedSubject === 'physics'
                ? 'bg-cyan-950/60 border-cyan-500/70 shadow-lg shadow-cyan-950/50'
                : 'bg-slate-900/70 border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/90'
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-cyan-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block animate-pulse" />
                Physics
              </span>
              <span className="font-mono text-cyan-300 font-bold">{phyPct.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${phyPct}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 hidden sm:inline">
              Bohr Atom · {physicsStats.completedChapters}/{physicsStats.totalChapters} Ch
            </span>
          </button>

          {/* Chemistry indicator */}
          <button
            onClick={() => onSelectSubject(selectedSubject === 'chemistry' ? 'all' : 'chemistry')}
            className={`flex flex-col p-2.5 sm:p-3 rounded-xl backdrop-blur-md border text-left transition-all duration-300 ${
              selectedSubject === 'chemistry'
                ? 'bg-emerald-950/60 border-emerald-500/70 shadow-lg shadow-emerald-950/50'
                : 'bg-slate-900/70 border-slate-800 hover:border-emerald-500/40 hover:bg-slate-900/90'
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                Chemistry
              </span>
              <span className="font-mono text-emerald-300 font-bold">{chemPct.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${chemPct}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 hidden sm:inline">
              Molecular Bond · {chemistryStats.completedChapters}/{chemistryStats.totalChapters} Ch
            </span>
          </button>

          {/* Maths indicator */}
          <button
            onClick={() => onSelectSubject(selectedSubject === 'maths' ? 'all' : 'maths')}
            className={`flex flex-col p-2.5 sm:p-3 rounded-xl backdrop-blur-md border text-left transition-all duration-300 ${
              selectedSubject === 'maths'
                ? 'bg-violet-950/60 border-violet-500/70 shadow-lg shadow-violet-950/50'
                : 'bg-slate-900/70 border-slate-800 hover:border-violet-500/40 hover:bg-slate-900/90'
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-violet-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-violet-400 inline-block animate-pulse" />
                Mathematics
              </span>
              <span className="font-mono text-violet-300 font-bold">{mathPct.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${mathPct}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 hidden sm:inline">
              Torus Knot · {mathsStats.completedChapters}/{mathsStats.totalChapters} Ch
            </span>
          </button>
        </div>
      </div>

      {/* Top Left Headline Pill */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-800 text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span>Interactive 3D Visualizer: Realtime Syllabus Mastery</span>
        </div>
      </div>

      {/* Top Right Overall Ring Pill */}
      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-800 text-xs">
          <span className="text-slate-400">Total JEE Prep:</span>
          <span className="font-mono font-bold text-amber-400 text-sm">
            {overallPct.toFixed(1)}%
          </span>
          {weightedMode && (
            <span className="text-[10px] text-amber-500/90 border border-amber-500/30 px-1.5 py-0.5 rounded">
              Weighted
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
