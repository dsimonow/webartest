'use client'
import { Cloud, PositionalAudio, Preload} from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { Suspense, useMemo, useRef, useState } from "react";
import { Model as Campfire } from './Campfire'
import { useXR } from '@react-three/xr';
import { useFireSimulationStore } from './store';
import * as THREE from 'three'


type FireStates = "off" | "ignite" | "mid" | "end";
type FireSimulatorProps = {
    index: number;
};

export function FireSimulator(props: FireSimulatorProps) {
    const {
        // An array of connected `XRController`
        controllers,
        // Whether the XR device is presenting in an XR session
        isPresenting,
        // Whether hand tracking inputs are active
        isHandTracking,
        // A THREE.Group representing the XR viewer or player
        player,
        // The active `XRSession`
        session,
        // `XRSession` foveation. This can be configured as `foveation` on <XR>. Default is `0`
        foveation,
        // `XRSession` reference-space type. This can be configured as `referenceSpace` on <XR>. Default is `local-floor`
        referenceSpace
    } = useXR()
    const camera = useThree().camera
    camera.layers.enable(1)
    const index = props.index
    // Store
    const externalFireStates = useFireSimulationStore((state) => state.fireStates)
    const externalFireState = externalFireStates[index]
    const setFireState = useFireSimulationStore((state) => state.setFireState);
    const setAllStepsDone = useFireSimulationStore((state) => state.setStepsDone)
    const allStepsDone = useFireSimulationStore((state) => state.stepsDone)
    
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
                    timeRemaining.current = 30
                } else {
                    setDone(true)
                }  
            }
                if ((timeRemaining.current <= 0 && allStepsDone == false && internalFireState == "end" && index == 3)){
                setDone(true)
                setAllStepsDone()
            }
        }
        }
    })

    return(
        <>
            {(externalFireStates[index] == "ignite") && <PositionalAudio  autoplay loop={!allStepsDone} url="/feuereffekt.mp3" distance={0.2} load={"/feuer.mp4"} />}
            
                <Suspense>
                    <pointLight distance={internalFireState == 'off' ? (0.1) : 2} intensity={internalFireState == 'off' ? (0.1) : 20} color="red" position={[0,-200,0]}>
                        
                    </pointLight>
                <group visible={internalFireState != 'off' ? (true) : false} >
                    <group visible={allStepsDone != true ? (true) : false}>
                        <mesh scale={[4, fireHeight, 4]} >
                            <dodecahedronGeometry />
                            <meshBasicMaterial color={'yellow'} />
                        </mesh>
                    </group>
                </group>
                </Suspense>
            
            
            <group visible={internalFireState != 'off' ? (true) : false } name='Schrankfeuer' position={[0,8,0]} scale={0.1}>
                <group visible={allStepsDone != true ? (true) : false}>
                    <Suspense >
                        <Swarm count={500}  />
                        <Preload all />
                    </Suspense>
                </group>
            </group>
        </>

    )
}
//<Campfire position={[0,-1,0]} scale={[8, fireHeight,8]} / >

function Swarm({ count }) {
    const mesh = useRef(null)
    const light = useRef()
    const { viewport, mouse } = useThree()

    const dummy = useMemo(() => new THREE.Object3D(), [])
    // Generate some random positions, speed factors and timings
    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 200
            const factor = 20 + Math.random() * 200
            const speed = 0.01 + Math.random() / 200
            const xFactor = -50 + Math.random() * 100
            const yFactor = -50 + Math.random() * 10
            const zFactor = -50 + Math.random() * 100
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
        }
        return temp
    }, [count])
    // The innards of this hook will run every frame
    useFrame((state) => {
        // Makes the light follow the mouse
        //light.current.position.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0)
        // Run through the randomized data to calculate some movement

        particles.forEach((particle, i) => {
            
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle
            t = particle.t += speed / 2
            const a = Math.cos(t) + Math.sin(t * 1) / 10
            const b = Math.sin(t) + Math.cos(t * 2) / 10
            const s = Math.cos(t)

            const verticalPosition = (particle.t % (2 * Math.PI)) / (2 * Math.PI) * 100; // Adjust maxHeight to control the height limit
            const updraftSpeed = 0.05; // Adjust the updraft speed as desired

            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 2) * factor) / 10 + verticalPosition,
                (particle.my / 10) + zFactor * Math.cos(t)
            );

            particle.my += updraftSpeed; // Increase the y-component of the particle's movement
            dummy.scale.set(s, s, s)
            dummy.rotation.set(s * 5, s * 5, s * 5)
            dummy.updateMatrix()

            // And apply the matrix to the instanced item
            mesh.current.setMatrixAt(i, dummy.matrix)
        })
        mesh.current.instanceMatrix.needsUpdate = true
    })
    return (
        <>
            
            <instancedMesh layers={1} ref={mesh} args={[null, null, count]}>
                <dodecahedronGeometry args={[5, 0]} />
                <meshStandardMaterial color="black" />
            </instancedMesh>
        </>
    )
}

/*                
<Suspense fallback={null}><Cloud
                    visible={!isPresenting}
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
                    visible={!isPresenting}
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
*/