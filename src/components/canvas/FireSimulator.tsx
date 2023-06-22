'use client'
import { Cloud, PositionalAudio} from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Suspense, useRef, useState } from "react";
import { Model as Campfire } from './Campfire'
import { useFireSimulationStore } from './store';


type FireStates = "off" | "ignite" | "mid" | "end";
type FireSimulatorProps = {
    index: number;
};

export function FireSimulator(props: FireSimulatorProps) {
    const index = props.index
    // Store
    const externalFireStates = useFireSimulationStore((state) => state.fireStates)
    const externalFireState = externalFireStates[index]
    const setFireState = useFireSimulationStore((state) => state.setFireState);
    const setAllStepsDone = useFireSimulationStore((state) => state.setStepsDone)
    
    const [fireAdjuster, setFireAdjuster] = useState(2)
    const [internalFireState, setInternalFireState] = useState("off")

    const smokeColor = 'black'
    const smokeSpeed = 1
    const [fireIntensity, setFireIntensity] = useState(100)
    const [fireHeight, setFireHeight] = useState(5)
    
    const [stepsDone, setDone] = useState(false)
    let timeRemaining = useRef(5); 
    const [time, setTime] = useState(0)
    useFrame((state, delta) => {
    // This function runs at the native refresh rate inside of a shared render-loop
        if (externalFireState != 'off'){
            // Animation Update
            setTime(time+delta)
            setFireIntensity(2 + Math.sin(time * Math.PI * 2) * Math.cos(time * Math.PI * 1.5) * 0.25)
            setFireHeight((fireAdjuster + Math.sin(time * Math.PI * 5 ) * Math.cos(time * Math.PI * 1.5) * 2))
            //******************* */
            // Fire Progress Steps, Countdown Timer
            //******************* */
            if(stepsDone != true){
            timeRemaining.current -= delta;

            // Internal Fire State Progress
            // jedes platzierte Feuer hat einen eigenen Progress
            if ((timeRemaining.current <= 0 && internalFireState == "off")) {
            setInternalFireState("ignite")
            setFireAdjuster(2)
            timeRemaining.current = 40 - (index * 11.6)

            }
            if ((timeRemaining.current <= 0 && internalFireState == "ignite")) {
                if (index < externalFireStates.length - 1) {
                    setFireState(index + 1, "ignite")
                }
                setInternalFireState("mid")
                setFireAdjuster(5)
                    timeRemaining.current = 20 - (index * 6.66)

            }
            if ((timeRemaining.current <= 0 && internalFireState == "mid")) {
                setInternalFireState("end")
                setFireAdjuster(10)
                
                if(index == 3){
                    setAllStepsDone()
                }
                setDone(true)
            }}
        }
    })

    return(
        <>
            <pointLight position={[-3, -10, 17]} decay={0.5} distance={0.03} intensity={200} color={'red'} />
            <pointLight position={[-3, -5, 17]} decay={2} distance={0.1} intensity={fireIntensity} color={'orange'} />
            {(externalFireStates[index] == "ignite") && <PositionalAudio autoplay loop url="/feuereffekt.mp3" distance={0.4} load={"/feuer.mp4"} />}
            <group visible={internalFireState != 'off' ? (true) : false} name='Schrankfeuer'>
                <Campfire 
                position={[0,-1,0]} scale={[8, fireHeight,8]} />
                <Suspense fallback={null}>
                <Cloud
                    visible={true}
                    scale={1}
                    color={smokeColor}
                    position={[0, 10, 0]}
                    opacity={0.6}
                    speed={smokeSpeed} // Rotation speed
                    width={1} // Width of the full cloud
                    depth={1} // Z-dir depth
                    segments={10} // Number of particles 
                />
                <Cloud
                    visible={true}
                    scale={0.5}
                    color={smokeColor}
                    position={[0, 5, 0]}
                    opacity={0.6}
                    speed={smokeSpeed} // Rotation speed
                    width={1} // Width of the full cloud
                    depth={0.1} // Z-dir depth
                    segments={10} // Number of particles 
                />
                </Suspense>
            </group>
        </>

    )
}
