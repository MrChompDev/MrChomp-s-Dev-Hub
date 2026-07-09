import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function Fish({ index, count }: { index: number; count: number }) {
  const ref = useRef<THREE.Mesh>(null)
  const startX = useMemo(() => (Math.random() - 0.5) * 20, [])
  const startY = useMemo(() => (Math.random() - 0.5) * 12, [])
  const startZ = useMemo(() => (Math.random() - 0.5) * 12 - 4, [])
  const speed = useMemo(() => 0.2 + Math.random() * 0.3, [])
  const phase = useMemo(() => Math.random() * Math.PI * 2, [])
  const flip = useMemo(() => Math.random() > 0.5, [])
  const color = useMemo(() => {
    const colors = ['#06b6d4', '#0ea5e9', '#22d3ee', '#14b8a6', '#2dd4bf', '#0891b2']
    return colors[Math.floor(Math.random() * colors.length)]
  }, [])
  const scale = useMemo(() => 0.2 + Math.random() * 0.3, [])

  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(0.8, 0)
    shape.lineTo(-0.8, 0)
    shape.lineTo(-0.4, 0)
    shape.closePath()

    const settings: THREE.ExtrudeGeometryOptions = {
      steps: 1,
      depth: 0.15,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 2,
    }

    return new THREE.ExtrudeGeometry(shape, settings)
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime() * speed + phase
    const x = startX + Math.sin(t * 0.5) * 3 + t * (flip ? -0.4 : 0.4)
    ref.current.position.x = x
    ref.current.position.y = startY + Math.sin(t * 1.2) * 0.5
    ref.current.rotation.z = Math.sin(t * 1.2) * 0.15
    ref.current.rotation.y = flip ? -0.3 + Math.sin(t * 0.3) * 0.2 : 0.3 + Math.sin(t * 0.3) * 0.2

    if (x > 12) ref.current.position.x = -12
    if (x < -12) ref.current.position.x = 12
  })

  return (
    <mesh ref={ref} position={[startX, startY, startZ]} scale={[scale, scale, scale]} rotation={[0, flip ? Math.PI : 0, 0]}>
      <primitive object={geometry} />
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={0.6}
        metalness={0.5}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.1}
      />
    </mesh>
  )
}

function FishSchool({ count = 8 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Fish key={i} index={i} count={count} />
      ))}
    </>
  )
}

function Bubble({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null)
  const speed = useMemo(() => 0.1 + Math.random() * 0.15, [])
  const wobbleSpeed = useMemo(() => 0.5 + Math.random() * 0.5, [])
  const wobbleAmp = useMemo(() => 0.1 + Math.random() * 0.2, [])
  const size = useMemo(() => 0.02 + Math.random() * 0.06, [])
  const startY = position[1]

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()
    const yOffset = ((t * speed + startY + 8) % 16) - 8
    ref.current.position.y = yOffset
    ref.current.position.x = position[0] + Math.sin(t * wobbleSpeed + startY) * wobbleAmp
    ref.current.position.z = position[2] + Math.cos(t * wobbleSpeed * 0.7 + startY) * wobbleAmp * 0.5
  })

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshPhysicalMaterial
        color="#22d3ee"
        transparent
        opacity={0.2}
        metalness={0}
        roughness={0}
        emissive="#22d3ee"
        emissiveIntensity={0.05}
      />
    </mesh>
  )
}

function Bubbles({ count = 40 }: { count?: number }) {
  const positions = useMemo(() => {
    const arr: [number, number, number][] = []
    for (let i = 0; i < count; i++) {
      arr.push([
        (Math.random() - 0.5) * 16,
        Math.random() * 14 - 7,
        (Math.random() - 0.5) * 12 - 3,
      ])
    }
    return arr
  }, [count])

  return (
    <>
      {positions.map((pos, i) => (
        <Bubble key={i} position={pos} />
      ))}
    </>
  )
}

function Seaweed({ position, height = 1.5 }: { position: [number, number, number]; height?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const segments = 8
  const geo = useMemo(() => {
    const g = new THREE.CylinderGeometry(0.04, 0.08, height, 6, segments)
    g.translate(0, height / 2 - 5, 0)
    return g
  }, [height])

  const initialPositions = useMemo(() => {
    const pos = geo.attributes.position.array.slice()
    return new Float32Array(pos)
  }, [geo])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array
    const t = clock.getElapsedTime()
    for (let i = 0; i < pos.length; i += 3) {
      const y = initialPositions[i + 1]
      const normalizedY = (y + 5) / height
      const sway = Math.sin(t * 1.2 + position[0] * 0.5 + y * 0.8) * 0.12 * normalizedY
      pos[i] = initialPositions[i] + sway
      pos[i + 2] = initialPositions[i + 2] + Math.sin(t * 0.9 + position[0] * 0.3 + y * 0.6) * 0.06 * normalizedY
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <mesh ref={meshRef} position={position} geometry={geo}>
      <meshPhysicalMaterial
        color="#0d9488"
        transparent
        opacity={0.5}
        roughness={0.8}
        metalness={0}
        emissive="#0d9488"
        emissiveIntensity={0.05}
      />
    </mesh>
  )
}

function KelpForest() {
  const positions = useMemo(() => {
    const arr: { pos: [number, number, number]; height: number }[] = []
    for (let i = 0; i < 20; i++) {
      arr.push({
        pos: [(Math.random() - 0.5) * 14, -4.5, (Math.random() - 0.5) * 10 - 2],
        height: 1.2 + Math.random() * 1.5,
      })
    }
    return arr
  }, [])

  return (
    <>
      {positions.map((p, i) => (
        <Seaweed key={i} position={p.pos} height={p.height} />
      ))}
    </>
  )
}

function Caustics() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime() * 0.15
    ref.current.position.x = Math.sin(t * 0.3) * 2
    ref.current.position.y = Math.cos(t * 0.2) * 1
  })

  return (
    <mesh ref={ref} position={[0, 4, -6]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[16, 10]} />
      <meshBasicMaterial
        color="#22d3ee"
        transparent
        opacity={0.03}
        wireframe={false}
      />
    </mesh>
  )
}

function LightRays() {
  return (
    <group position={[0, 6, -5]}>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          position={[(i - 2) * 1.8, 0, 0]}
          rotation={[0.1, (i - 2) * 0.15, 0]}
        >
          <planeGeometry args={[0.4, 6]} />
          <meshBasicMaterial
            color="#06b6d4"
            transparent
            opacity={0.015 + i * 0.005}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

function EnvironmentParticles({ count = 300 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return geo
  }, [count])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.getElapsedTime() * 0.005
  })

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.04}
        color="#0ea5e9"
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function FloatingMesh({ position, geometry, color = '#06b6d4' }: {
  position: [number, number, number]
  geometry: THREE.BufferGeometry
  color?: string
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.15
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.2
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} geometry={geometry}>
        <meshPhysicalMaterial
          ref={matRef}
          color={color}
          wireframe
          transparent
          opacity={0.35}
          metalness={0.3}
          roughness={0.8}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  )
}

function CameraController() {
  const { pointer, camera } = useThree()
  const target = useRef({ x: 0, y: 0 })

  useFrame(() => {
    target.current.x += (pointer.x * 0.4 - target.current.x) * 0.02
    target.current.y += (-pointer.y * 0.2 - target.current.y) * 0.02
    camera.position.x += (target.current.x - camera.position.x) * 0.02
    camera.position.y += (target.current.y - camera.position.y) * 0.02
    camera.lookAt(0, 0, 0)
  })

  return null
}

function Scene() {
  const torusKnot = useMemo(() => new THREE.TorusKnotGeometry(1.2, 0.4, 128, 16), [])
  const icosahedron = useMemo(() => new THREE.IcosahedronGeometry(1.1, 0), [])
  const dodecahedron = useMemo(() => new THREE.DodecahedronGeometry(0.9, 0), [])
  const octahedron = useMemo(() => new THREE.OctahedronGeometry(1.0, 0), [])

  return (
    <>
      <color attach="background" args={['#020813']} />
      <fog attach="fog" args={['#020813', 8, 18]} />

      <CameraController />
      <EnvironmentParticles count={400} />
      <Bubbles count={50} />
      <FishSchool count={10} />
      <KelpForest />
      <LightRays />
      <Caustics />

      <FloatingMesh position={[-3, 1.5, -2]} geometry={torusKnot} color="#06b6d4" />
      <FloatingMesh position={[3.5, -1, -1.5]} geometry={icosahedron} color="#0ea5e9" />
      <FloatingMesh position={[-2.5, -2, -3]} geometry={dodecahedron} color="#06b6d4" />
      <FloatingMesh position={[4, 2, -2.5]} geometry={octahedron} color="#22d3ee" />
      <FloatingMesh position={[0, 2.8, -4]} geometry={torusKnot} color="#0ea5e9" />

      <ambientLight intensity={0.2} color="#06b6d4" />
      <directionalLight position={[5, 8, 5]} intensity={0.6} color="#22d3ee" />
      <directionalLight position={[-3, -2, -5]} intensity={0.2} color="#0ea5e9" />
      <pointLight position={[0, 5, 2]} intensity={0.3} color="#06b6d4" />
    </>
  )
}

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
