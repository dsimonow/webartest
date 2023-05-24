'use client'

import dynamic from 'next/dynamic'

import { useState, useRef } from "react";
import { useHitTest, Interactive } from "@react-three/xr";
import { Sphere, PerspectiveCamera, Text } from "@react-three/drei";
import { Vector3 } from 'three'
import { useThree } from "@react-three/fiber";
import { Common } from './View';


const Dog = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Dog), { ssr: false })

export function HitTest() {
  
  const ref = useRef(null);
  // useState für updaten des Wertes
  const [hitEnabled, setHitenabled] = useState(false);
  const [fPosition, setfPosition] = useState({ x: 0, y: 0, z: 0});
  
  // Hittest Hook - get Position jeden Frame
  useHitTest((hitMatrix) => {
    // Conditional Hook Regel, Hooks müssen immer in der gleichen Reihenfolge passieren
    // Conditions deswegen innerhalb der Hooks
    if(!hitEnabled) {
      const newPosition = new Vector3();
      newPosition.setFromMatrixPosition(hitMatrix);
      setfPosition({
        x: newPosition.x,
        y: newPosition.y,
        z: newPosition.z,
      });
    }
  });
  
  return (
    <>
      <Interactive
        onSelect={() => setHitenabled(true) }
      >
        <Sphere
          visible={!hitEnabled} 
          ref={ref}
          scale={0.5}
          position={[fPosition.x, fPosition.y, fPosition.z]}
          onClick={() => setHitenabled(true)}
        />
    
      </Interactive>
      <Dog visible={hitEnabled} position={[fPosition.x, fPosition.y, fPosition.z]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[20, 30, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color='blue' />
      <PerspectiveCamera makeDefault position={[0, 0, 6]} >
        <Text
        position={[0, 0,-0.5]}
        scale={0.02}
        >Position: {fPosition.x}{fPosition.y}{fPosition.z}</Text>
      </PerspectiveCamera>
    </>
  )
}