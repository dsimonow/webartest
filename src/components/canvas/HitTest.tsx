'use client'

import { useState, useRef, Suspense } from "react";
import { useHitTest, useInteraction, Interactive, XR } from "@react-three/xr";
import { OrbitControls, Grid, Torus, PerspectiveCamera, Text, PivotControls, TransformControls, Stage } from "@react-three/drei";
import { Vector3 } from 'three'
import { useThree } from "@react-three/fiber";
import { Common } from './View';
import { Scenario } from './Scenario'
import { useTransformControlsStore } from "./store";

export function HitTest() {
  // StateStore
  const transformControlsMode = useTransformControlsStore((state) => state.mode);
  const transformControlsEnabled = useTransformControlsStore((state) => state.enabled);

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
      <Interactive onSelect={() => setHitenabled(true)} >
        <Torus
          visible={!hitEnabled}
          ref={ref}
          scale={0.1}
          position={[fPosition.x, fPosition.y, fPosition.z]}
          onClick={() => setHitenabled(true)}
          rotation-x={5}
        />
      </Interactive>
      
      <group visible={hitEnabled} >
        <TransformControls 
        mode={transformControlsMode}  
        enabled={transformControlsEnabled} 
        showX={transformControlsEnabled} showY={transformControlsEnabled} showZ={transformControlsEnabled}  
        position={[fPosition.x, fPosition.y, fPosition.z]} >
            <Scenario  />
        </TransformControls>
      </group>
      
  
    </>
  )
}
