'use client'

import dynamic from 'next/dynamic'
import { Canvas, useThree} from '@react-three/fiber'
import { ARButton, XR } from '@react-three/xr'
import {  PerspectiveCamera, OrbitControls, Stats, Text } from "@react-three/drei";
import { Suspense, useRef } from "react"


const HitTest = dynamic(() => import('@/components/canvas/HitTest').then((mod) => mod.HitTest), { ssr: false })
const HUDElements = dynamic(() => import('@/components/canvas/HUDElements').then((mod) => mod.HUDElements), { ssr: false })


export default function Page() {
  
  return (
    <>
      <ARButton />
      <Canvas >
        <XR>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
            <HUDElements />
            <Suspense fallback={<Text>Loading...</Text>}>
            <HitTest />
          </Suspense>
        </XR>
          
        <hemisphereLight name="Default Ambient Light" intensity={0.25} color="#eaeaea" />
        <directionalLight
          name="Directional Light"
          castShadow
          intensity={0.8}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={-10000}
          shadow-camera-far={100000}
          shadow-camera-left={-1250}
          shadow-camera-right={1250}
          shadow-camera-top={1250}
          shadow-camera-bottom={-1250}
          position={[274.61, 586.79, 630.88]}
        />
        <OrbitControls makeDefault />
        <Stats />
      </Canvas>
    </>
  )
}