import * as ResizeObserverModule from 'resize-observer-polyfill';
import { Cloud, Box } from '@react-three/drei'
import { GLTF } from 'three-stdlib';
import useSpline from '@splinetool/r3f-spline'
import * as THREE from 'three'
import { useRouter } from 'next/navigation';

(global as any).ResizeObserver = ResizeObserverModule.default;

// Next Router Mock
jest.mock('next/navigation', () => ({
    useRouter: jest.fn()
}))

// TypeScript Mocken von useGLTF
// Endergebnis des useLoaders wird gemockt
// durch verwenden der Proxy Elemente wird trotzdem die Struktur gesichert
type GLTFResult = GLTF & {
    nodes: Record<string, THREE.Object3D>;
    materials: Record<string, THREE.Material>;
};
const MockGLTFResult: GLTFResult = {
    animations: [],
    scene: new THREE.Group(),
    scenes: [],
    cameras: [],
    asset: {},
    parser: {} as any,
    userData: {},
    nodes: new Proxy(
        {},
        {
            get: (target, prop) => new THREE.Mesh()
        }
    ),
    materials: new Proxy(
        {},
        {
            get: (target, prop) => new THREE.MeshStandardMaterial()
        }
    )
};
export { MockGLTFResult };

// Mock von der drei/Cloud Komponente
// nicht Production-Ready
// hat keinerlei interaktion dadurch ersatz durch Box
jest.mock('@react-three/drei', () => ({
    ...jest.requireActual('@react-three/drei'),
    Cloud: jest.fn(() => <Box material-color="white" />)
}));

// Mock der useSpline
// Auch ein loader ähnlich zum useLoader
jest.mock('@splinetool/r3f-spline', () => ({
    __esModule: true,
    default: jest.fn(() => {
        // create a mock object for nodes
        const nodes = new Proxy({}, {
            get: (target, prop) => {
                // return a mock object for the requested node
                return {
                    // add any properties that you need to mock here
                    geometry: {/* mock geometry object */ }
                }
            }
        })

        // create a mock object for materials
        const materials = new Proxy({}, {
            get: (target, prop) => {
                // return a mock material for the requested material
                return {/* mock material object */ }
            }
        })

        // return the mock nodes and materials
        return { nodes, materials }
    })
}))



beforeEach(() => {
    
});