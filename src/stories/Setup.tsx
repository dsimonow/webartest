import * as React from 'react'
import { Vector3 } from 'three'
import { Canvas, Props as CanvasProps } from '@react-three/fiber'
import { OrbitControls, PivotControls } from '@react-three/drei'
import { XR } from '@react-three/xr'

type Props = React.PropsWithChildren<
  CanvasProps & {
    cameraFov?: number
    cameraPosition?: Vector3
    controls?: boolean
    lights?: boolean
  }
>

export const Setup = ({
  children,
  cameraFov = 75,
  cameraPosition = new Vector3(-5, 5, 5),
  controls = true,
  lights = true,
  ...restProps
}: Props) => (
  <Canvas shadows camera={{ position: cameraPosition, fov: cameraFov }} {...restProps}>
    {children}
    {lights && (
      <>
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
        
      </>
    )}
    {controls && (
      <OrbitControls makeDefault />
    )}
    
  </Canvas>
)

export const Setup3D = ({
  children,
  cameraFov = 75,
  cameraPosition = new Vector3(-5, 5, 5),
  controls = true,
  lights = true,
  ...restProps
}: Props) => (
  <Canvas shadows camera={{ position: cameraPosition, fov: cameraFov }} {...restProps}>
    {children}
    {lights && (
      <>
        <ambientLight intensity={0.8} />
        <pointLight intensity={1} position={[0, 6, 0]} />
      </>
    )}
    {controls }
  </Canvas>
)

export const SetupAR = ({
  children,
  cameraFov = 75,
  cameraPosition = new Vector3(-5, 5, 5),
  controls = true,
  lights = true,
  ...restProps
}: Props) => (
  <Canvas shadows camera={{ position: cameraPosition, fov: cameraFov }} {...restProps}>
    <XR>
      {children}
      {lights && (
        <>
          <ambientLight intensity={0.8} />
          <pointLight intensity={1} position={[0, 6, 0]} />
        </>
      )}
      {controls }
      
    </XR>
  </Canvas>
)