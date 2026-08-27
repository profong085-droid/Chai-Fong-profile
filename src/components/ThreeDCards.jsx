import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PresentationControls, useGLTF, Environment, Float, Bounds } from '@react-three/drei';

function Model({ url, baseRotation = [0, -Math.PI / 2, 0] }) {
  const { scene } = useGLTF(url);
  const group = useRef();
  
  return (
    <group ref={group} rotation={baseRotation}>
      <primitive object={scene} />
    </group>
  );
}

// Preload the models
useGLTF.preload('/assets/card/card k1.glb');
useGLTF.preload('/assets/card/card k2.glb');
useGLTF.preload('/assets/card/card k3.glb');

export default function ThreeDCards() {
  return (
    <section className="px-3 sm:px-7 py-4 sm:py-5 bg-transparent relative w-full overflow-hidden mt-2">
      


      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 w-full relative z-20">
        
        {/* Card 1 */}
        <div className="w-full sm:w-1/3 h-[180px] sm:h-[240px] relative overflow-visible group cursor-grab active:cursor-grabbing">
          <div className="absolute -bottom-4 left-0 right-0 z-10 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="bg-black/70 text-white text-[11px] font-bold px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg border border-white/20">360° Rotate</span>
          </div>
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }} className="w-full h-full drop-shadow-2xl">
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#4338ca" />
            <Suspense fallback={null}>
              <PresentationControls
                global={false}
                cursor={true}
                snap={true}
                speed={1.5}
                zoom={1}
                rotation={[0.1, 0.2, 0]}
                polar={[-Math.PI / 2, Math.PI / 2]}
                azimuth={[-Infinity, Infinity]}
              >
                <Float rotationIntensity={1.5} floatIntensity={2} speed={2}>
                  <Bounds fit clip margin={0.85}>
                    <Model url="/assets/card/card k1.glb" />
                  </Bounds>
                </Float>
              </PresentationControls>
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>

        {/* Card 2 */}
        <div className="w-full sm:w-1/3 h-[180px] sm:h-[240px] relative overflow-visible group cursor-grab active:cursor-grabbing">
          <div className="absolute -bottom-4 left-0 right-0 z-10 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="bg-black/70 text-white text-[11px] font-bold px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg border border-white/20">360° Rotate</span>
          </div>
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }} className="w-full h-full drop-shadow-2xl">
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#4338ca" />
            <Suspense fallback={null}>
              <PresentationControls
                global={false}
                cursor={true}
                snap={true}
                speed={1.5}
                zoom={1}
                rotation={[0.1, 0, 0]}
                polar={[-Math.PI / 2, Math.PI / 2]}
                azimuth={[-Infinity, Infinity]}
              >
                <Float rotationIntensity={1.5} floatIntensity={2} speed={2.5}>
                  <Bounds fit clip margin={0.85}>
                    <Model url="/assets/card/card k2.glb" />
                  </Bounds>
                </Float>
              </PresentationControls>
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>

        {/* Card 3 */}
        <div className="w-full sm:w-1/3 h-[180px] sm:h-[240px] relative overflow-visible group cursor-grab active:cursor-grabbing">
          <div className="absolute -bottom-4 left-0 right-0 z-10 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="bg-black/70 text-white text-[11px] font-bold px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg border border-white/20">360° Rotate</span>
          </div>
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }} className="w-full h-full drop-shadow-2xl">
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#4338ca" />
            <Suspense fallback={null}>
              <PresentationControls
                global={false}
                cursor={true}
                snap={true}
                speed={1.5}
                zoom={1}
                rotation={[0.1, -0.2, 0]}
                polar={[-Math.PI / 2, Math.PI / 2]}
                azimuth={[-Infinity, Infinity]}
              >
                <Float rotationIntensity={1.5} floatIntensity={2} speed={1.8}>
                  <Bounds fit clip margin={0.85}>
                    <Model url="/assets/card/card k3.glb" />
                  </Bounds>
                </Float>
              </PresentationControls>
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>

      </div>
    </section>
  );
}
