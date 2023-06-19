'use client'

import { useScenarioStore, useTransformControlsStore, useFireSimulationStore } from "./store";
import { Sphere, Hud, OrthographicCamera, ScreenSpace } from "@react-three/drei";
import { Interactive} from "@react-three/xr";
import { useThree } from '@react-three/fiber'

 
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

    return(
            <Hud renderPriority={1}>
                <ambientLight intensity={1} />
                <pointLight position={[200, 200, 100]} intensity={0.5} />
                <OrthographicCamera makeDefault position={[0, 0, 50]}>
                    <Interactive onSelect={() => setFireState(0,"ignite")}>
                        <Sphere
                            position={[75, -130, -500]}
                            scale={15}
                            onClick={() => setFireState(0, "ignite")}
                        >
                            <meshPhysicalMaterial color={scenarioSize < 0.010 ? ('#DDA0DD') : '#1E90FF'} />
                        </Sphere>
                    </Interactive>
                    <Interactive onSelect={() => increaseScenarioSize()}>
                        <Sphere 
                            position={[110, -130, -500]} 
                        scale={15} 
                        onClick={() => increaseScenarioSize()} 
                        >
                        <meshPhysicalMaterial color={scenarioSize < 0.010 ? ('#DDA0DD') : '#1E90FF'} />
                        </Sphere>
                    </Interactive>
                    <Interactive onSelect={() => decreaseScenarioSize()}>
                        <Sphere
                            position={[145, -130, -500]}
                            scale={15}
                        onClick={() => decreaseScenarioSize()}
                        >
                        <meshPhysicalMaterial color={scenarioSize > 0.0001 ? ('#DDA0DD') : '#1E90FF'} />
                        </Sphere>
                    </Interactive>
                    <Interactive onSelect={() => toggleTransformControlEnabled()}>
                        <Sphere 
                        position={[180, -130, -500]} 
                        scale={15} 
                        onClick={() => toggleTransformControlEnabled()} 
                        >
                            <meshPhysicalMaterial color={transformControlEnabled === true ? ('#7CFC00') : '#B22222'} />
                        </Sphere>
                    </Interactive>
                </OrthographicCamera>
            </Hud>
    )
}