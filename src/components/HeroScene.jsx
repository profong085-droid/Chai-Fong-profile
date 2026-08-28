import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Bounds, Float, Clone } from '@react-three/drei';

function Model({ url }) {
  const { scene } = useGLTF(url);
  const group = useRef();
  
  return (
    <group ref={group} rotation={[0, Math.PI / 2, 0]} scale={15} position={[0, -1, 0]}>
      <Clone object={scene} />
    </group>
  );
}

useGLTF.preload('/assets/card/card k4.glb');

export default function HeroScene() {
  return (
    <div className="w-full h-[200px] sm:h-[300px] mt-5 pt-4 border-t border-gray-100 dark:border-slate-800 relative z-20 touch-none cursor-grab active:cursor-grabbing group">
      <div className="absolute inset-0 z-10 pointer-events-none flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="bg-black/70 text-white text-[10px] font-bold px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg border border-white/20">360° Rotate</span>
      </div>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} className="w-full h-full drop-shadow-2xl">
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#4338ca" />
        <Suspense fallback={null}>
          <Float rotationIntensity={0.5} floatIntensity={0.6} speed={1.5}>
            <Model url="/assets/card/card k4.glb" />
          </Float>
          <Environment preset="city" />
          <OrbitControls enableZoom={true} minDistance={1} maxDistance={15} enablePan={false} autoRotate={true} autoRotateSpeed={2} />
        </Suspense>
      </Canvas>
    </div>
  );
}
