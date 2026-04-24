'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'

function AbstractGeometry() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { viewport, mouse } = useThree()

  // Slower, calmer rotation
  useFrame((state, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += delta * 0.05
    meshRef.current.rotation.y += delta * 0.08
    
    // Very subtle reaction to mouse to make it feel "alive" but not erratic
    const targetX = (mouse.x * viewport.width) / 20
    const targetY = (mouse.y * viewport.height) / 20
    
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.02
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.02
  })

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={viewport.width / 2.5}>
      <MeshDistortMaterial
        color="#06111f" // Finance-950 base
        attach="material"
        distort={0.4} // Moderate distortion for calmness
        speed={1.5} // Slow movement
        roughness={0.2} // Glossy enough to reflect light
        metalness={0.8} // Deep reflections
      />
    </Sphere>
  )
}

export default function Hero3DScene() {
  return (
    <div className="absolute inset-0 z-0 bg-[#020617]"> {/* Navy-950 fallback */}
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#38bdf8" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#10b981" />
        <AbstractGeometry />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
