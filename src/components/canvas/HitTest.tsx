'use client'

import dynamic from 'next/dynamic'

import { useState, useRef } from "react";
import { useHitTest, useInteraction, Interactive } from "@react-three/xr";
import { Torus, PerspectiveCamera, Text, PivotControls } from "@react-three/drei";
import { Vector3 } from 'three'
import { useThree } from "@react-three/fiber";
import { Common } from './View';


const Dog = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.Dog), { ssr: false })

export function HitTest() {
  const ref = useRef(null);
  const dogref = useRef(null);
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
        <Torus
          visible={!hitEnabled} 
          ref={ref}
          scale={0.1}
          position={[fPosition.x, fPosition.y, fPosition.z]}
          onClick={() => setHitenabled(true)}
          rotation-x={5}
        />
      </Interactive>
      <group visible={hitEnabled} position={[fPosition.x, fPosition.y, fPosition.z]}>
        <PivotControls lineWidth={8} scale={0.1}>
          <Dog ref={dogref} scale={0.1}   />
        </PivotControls>
      </group>
      <ambientLight intensity={0.5} />
      <pointLight position={[20, 30, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color='blue' />
    </>
  )
}

