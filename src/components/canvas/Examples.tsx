'use client'

import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef, useState } from 'react'
import { Line, useCursor, MeshDistortMaterial, Points} from '@react-three/drei'
import { useRouter } from 'next/navigation'
import { GLTF } from 'three-stdlib'

export const Blob = ({ route = '/', ...props }) => {
  const router = useRouter()
  const [hovered, hover] = useState(false)
  useCursor(hovered)

  return (
    <mesh
      onClick={() => router.push(route)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      {...props}>
      <sphereGeometry args={[1, 64, 64]}  />
      <MeshDistortMaterial roughness={0} color={hovered ? 'hotpink' : '#1fb2f5'}  />
    </mesh>
  )
}

export const Logo = ({ route = '/blob', ...props }) => {
  const mesh = useRef(null)
  const router = useRouter()

  const [hovered, hover] = useState(false)
  const points = useMemo(() => new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(100), [])

  useCursor(hovered)
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    mesh.current.rotation.y = Math.sin(t) * (Math.PI / 8)
    mesh.current.rotation.x = Math.cos(t) * (Math.PI / 8)
    mesh.current.rotation.z -= delta / 4
  })

  return (
    <group ref={mesh} {...props}>
      {/* @ts-ignore */}
      <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} />
      {/* @ts-ignore */}
      <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} rotation={[0, 0, 1]} />
      {/* @ts-ignore */}
      <Line worldUnits points={points} color='#1fb2f5' lineWidth={0.15} rotation={[0, 0, -1]} />
      <mesh onClick={() => router.push(route)} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}>
        <sphereGeometry args={[0.55, 64, 64]} />
        <meshPhysicalMaterial roughness={0} color={hovered ? 'hotpink' : '#1fb2f5'} />
      </mesh>
    </group>
  )
}

/*
export function Ducks(props) {
  const { scene } = useGLTF('/duck.glb')

  useFrame((state, delta) => (scene.rotation.y += delta))

  return <primitive object={scene} {...props} />
}
*/

type DuckGLTFResult = GLTF & {
  nodes: {
    character_duck: THREE.Mesh
    Cube1338: THREE.Mesh
    Cube1338_1: THREE.Mesh
  }
  materials: {
    ['White.026']: THREE.MeshStandardMaterial
    ['Yellow.043']: THREE.MeshStandardMaterial
    ['Black.027']: THREE.MeshStandardMaterial
  }
}

export function Duck(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/duck-transformed.glb') as DuckGLTFResult
  const refGroup = useRef(null)
  useFrame((state, delta) => (refGroup.current.rotation.y += delta))
  return (
    <group ref={refGroup} {...props} dispose={null}>
      <mesh geometry={nodes.character_duck.geometry} material={materials['White.026']} rotation={[Math.PI / 2, 0, 0]} />
      <group position={[0, 0.704, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.Cube1338.geometry} material={materials['Yellow.043']} />
        <mesh geometry={nodes.Cube1338_1.geometry} material={materials['Black.027']} />
      </group>
    </group>
  )
}
useGLTF.preload('/duck-transformed.glb')

export function Dog(props) {
  let { scene }= useGLTF('/dog.glb')
  //const { nodes, materials } = useGLTF('/dog.glb')
  //const gltf = useLoader(Stdlib.GLTFLoader, '/dog.glb')
  return <primitive object={scene} {...props} />
}


// gltfjsx verwendet um eine ordentliche Type Struktur für TS zu erschaffen
// verwendet im Mock 
// npx gltfjsx public\duck.glb --transform --types
type DogGLTFResult = GLTF & {
  nodes: {
    character_dog: THREE.Mesh
    Cube1339: THREE.Mesh
    Cube1339_1: THREE.Mesh
  }
  materials: {
    ['Beige.017']: THREE.MeshStandardMaterial
    ['Red.034']: THREE.MeshStandardMaterial
    ['Black.026']: THREE.MeshStandardMaterial
  }
}

export function Dogs(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/dog-transformed.glb') as DogGLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.character_dog.geometry} material={materials['Beige.017']} rotation={[Math.PI / 2, 0, 0]} />
      <group position={[0, 0.704, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.Cube1339.geometry} material={materials['Red.034']} />
        <mesh geometry={nodes.Cube1339_1.geometry} material={materials['Black.026']} />
      </group>
    </group>
  )
}

useGLTF.preload('/dog-transformed.glb')
