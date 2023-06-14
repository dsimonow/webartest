'use client'



import { useState, useRef } from "react";
import { useHitTest, useInteraction, Interactive } from "@react-three/xr";
import { OrbitControls, Grid, Torus, PerspectiveCamera, Text, PivotControls, TransformControls, Stage } from "@react-three/drei";
import { Vector3 } from 'three'
import { useThree } from "@react-three/fiber";
import { Common } from './View';
import { Scenario } from './Scenario'




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
      
      <PerspectiveCamera makeDefault position={[0, 0, 10]}>
      </PerspectiveCamera>
      <Interactive onSelect={() => setHitenabled(true) } >
        <Torus
          visible={!hitEnabled} 
          ref={ref}
          scale={0.1}
          position={[fPosition.x, fPosition.y, fPosition.z]}
          onClick={() => setHitenabled(true)}
          rotation-x={5}
        />
      </Interactive>
      <group visible={hitEnabled}>
        <TransformControls mode="scale" enabled={hitEnabled} position={[fPosition.x, fPosition.y, fPosition.z]} >
            <Scenario />
        </TransformControls>
      </group>
      <Grid cellThickness={1.5} position={[fPosition.x, fPosition.y, fPosition.z]} />
      
      <ambientLight intensity={0.5} />
      <pointLight position={[20, 30, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color='blue' />
      <OrbitControls makeDefault />
    </>
  )
}

