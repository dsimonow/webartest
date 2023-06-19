import ReactThreeTestRenderer from "@react-three/test-renderer"
import { composeStories } from '@storybook/react';
import * as stories from './Scenario.stories'
import * as Fiber from '@react-three/fiber';
import * as THREE from 'three'
import { GLTF} from 'three-stdlib';
import useSpline from '@splinetool/r3f-spline'

const { ScenarioExample } = composeStories(stories,
    {
        args: { disableDecorator: true }
    });

// TypeScript Mocken von useGLTF
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


test('Scenario Darstellung', async () => {
    jest.spyOn(Fiber, 'useLoader').mockImplementation(() => MockGLTFResult);
    const renderer = await ReactThreeTestRenderer.create(
        <ScenarioExample />
    )
    }

)