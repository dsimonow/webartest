'use client'

import { useScenarioStore, useTransformControlsStore, useFireSimulationStore } from "./store";
import { Sphere, Hud, OrthographicCamera, ScreenSpace, Text, Box, Billboard, Html } from "@react-three/drei";
import { Interactive} from "@react-three/xr";
import { useThree } from '@react-three/fiber'
import { useState, Suspense } from "react";

 
export function HUDElements() {
    // StateStore
    const transformControlMode = useTransformControlsStore((state) => state.mode);
    const transformControlEnabled = useTransformControlsStore((state) => state.enabled);
    const toggleTransformControlMode = useTransformControlsStore((state) => state.toggleTransformControlMode);
    const toggleTransformControlEnabled = useTransformControlsStore((state) => state.toggleTransformControlEnabled);
    const increaseScenarioSize = useScenarioStore((state) => state.increaseSize);
    const decreaseScenarioSize = useScenarioStore((state) => state.decreaseSize);
    const scenarioSize = useScenarioStore((state) => state.size);
    const setFireState = useFireSimulationStore((state) => state.setFireState);
    const [sceneStarted, setStartScene] = useState(false)

    return(
            <Hud renderPriority={1}>
                <ambientLight intensity={1} />
                <pointLight position={[200, 200, 100]} intensity={0.5} />
                <OrthographicCamera makeDefault position={[0, 0, 50]}>
                    <group  visible={!sceneStarted}>
                    <Interactive onSelect={() => {
                        // XR Deactivate and Hide
                        if(!sceneStarted){
                            setFireState(0, "ignite")
                            setStartScene(true)
                        }}}>
                          <Sphere
                          position={[75, -130, -500]}
                            scale={[15,15,1]}
                            onClick={() => {
                                  // XR Deactivate and Hide
                                  if (!sceneStarted) {
                                      setFireState(0, "ignite")
                                      setStartScene(true)
                                  }}}>
                              <meshPhysicalMaterial color={'#1E90FF'} />
                          </Sphere>
                    </Interactive>
                    </group>
                    <Interactive onSelect={() => increaseScenarioSize()}>
                        <Sphere
                        position={[110, -130, -500]} 
                        scale={[15,15,1]} 
                        onClick={() => increaseScenarioSize()} 
                        >
                        <meshPhysicalMaterial color={scenarioSize < 0.010 ? ('#DFFF00') : '#32CD32'} />
                        </Sphere >
                    </Interactive>
                    <Interactive onSelect={() => decreaseScenarioSize()}>
                        <Sphere 
                            position={[145, -130, -500]}
                            scale={[15,15,1]}
                        onClick={() => decreaseScenarioSize()}
                        >
                        <meshPhysicalMaterial color={scenarioSize > 0.0001 ? ('#808000') : '#1E90FF'} />
                        </Sphere >
                    </Interactive>
                    <Interactive onSelect={() => toggleTransformControlEnabled()}>
                        <Sphere  
                        position={[180, -130, -500]} 
                        scale={[15,15,1]}
                        onClick={() => toggleTransformControlEnabled()} 
                        >
                            <meshPhysicalMaterial color={transformControlEnabled === true ? ('#7CFC00') : '#B22222'} />
                        </Sphere >
                    </Interactive>
                </OrthographicCamera>
            </Hud>
    )
}