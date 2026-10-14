import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ProgressCoreMesh({ percentage }: { percentage: number }) {
  const outerRingRef = useRef<THREE.Mesh>(null);
  const midRingRef = useRef<THREE.Mesh>(null);
  const innerGlobeRef = useRef<THREE.Mesh>(null);

  // Angle arc for completion (0 to 2*PI)
  const arc = useMemo(() => Math.max(0.05, (percentage / 100) * Math.PI * 2), [percentage]);

  useFrame((_, delta) => {
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.6;
    }
    if (midRingRef.current) {
      midRingRef.current.rotation.x += delta * 0.4;
      midRingRef.current.rotation.y += delta * 0.5;
    }
    if (innerGlobeRef.current) {
      innerGlobeRef.current.rotation.y -= delta * 0.8;
      const scale = 0.85 + Math.sin(performance.now() * 0.003) * 0.05;
      innerGlobeRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      {/* Outer Progress Ring Arc */}
      <mesh ref={outerRingRef} rotation={[Math.PI / 6, 0, 0]}>
        <ringGeometry args={[1.4, 1.55, 64, 1, 0, arc]} />
        <meshBasicMaterial
          color="#38bdf8"
          side={THREE.DoubleSide}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Dim track background for full 360 ring */}
      <mesh rotation={[Math.PI / 6, 0, 0]}>
        <ringGeometry args={[1.4, 1.55, 64]} />
        <meshBasicMaterial
          color="#1e293b"
          side={THREE.DoubleSide}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Middle Gimbal Ring */}
      <mesh ref={midRingRef}>
        <torusGeometry args={[1.15, 0.03, 16, 64]} />
        <meshStandardMaterial
          color="#818cf8"
          emissive="#6366f1"
          emissiveIntensity={0.8}
          wireframe
        />
      </mesh>

      {/* Inner Glowing Holographic Globe */}
      <mesh ref={innerGlobeRef}>
        <icosahedronGeometry args={[0.7, 2]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#d97706"
          emissiveIntensity={0.4 + (percentage / 100) * 0.8}
          wireframe
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  );
}

export function ProgressRing3D({
  percentage,
  weightedMode,
  completedTasks,
  totalTasks
}: {
  percentage: number;
  weightedMode: boolean;
  completedTasks: number;
  totalTasks: number;
}) {
  return (
    <div className="relative w-full h-44 sm:h-48 flex items-center justify-center">
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 4.2], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.8} />
          <pointLight position={[3, 3, 3]} intensity={1.2} />
          <pointLight position={[-3, -3, -3]} intensity={0.5} color="#06b6d4" />
          <Suspense fallback={null}>
            <ProgressCoreMesh percentage={percentage} />
          </Suspense>
        </Canvas>
      </div>

      {/* Center text overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none drop-shadow-md">
        <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
          {percentage.toFixed(1)}%
        </span>
        <span className="text-[11px] text-slate-300 font-medium mt-0.5">
          {completedTasks}/{totalTasks} tasks
        </span>
        <span className="text-[10px] text-amber-400 font-medium">
          {weightedMode ? 'Marks Weighted' : 'Equal Weight'}
        </span>
      </div>
    </div>
  );
}
