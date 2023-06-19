//import ReactThreeTestRenderer from "@react-three/test-renderer";
import ReactThreeTestRenderer from "@react-three/test-renderer"
import { composeStories } from '@storybook/react';
import * as stories from './HitTest.stories'
import * as Fiber from '@react-three/fiber';
import * as THREE from 'three'
import { GLTF } from 'three-stdlib';
import useSpline from '@splinetool/r3f-spline'

const { HitTestExample } = composeStories(stories,
    { args: { disableDecorator: true }
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


test('HitTest onClick hide Finder show Scenario', async () => {
    jest.spyOn(Fiber, 'useLoader').mockImplementation(() => MockGLTFResult);
    const renderer = await ReactThreeTestRenderer.create(
        <HitTestExample/>
    )

    //console.log(renderer.scene.findAll(() => true))
    //console.log(renderer.toTree())
    //console.log(renderer.scene.findByType('PlaneGeometry'))
    //console.log(renderer.scene.children[2])

    const finder = renderer.scene.children[1].children[0]
    const display = renderer.scene.children[2]
    expect(finder.props.visible).toBe(true)
    expect(display.props.visible).toBe(false)

    await renderer.fireEvent(finder, 'onClick')
    const finderUpdated = renderer.scene.children[1].children[0]
    const displayUpdated = renderer.scene.children[2]
    expect(finderUpdated.props.visible).toBe(false)
    expect(displayUpdated.props.visible).toBe(true)

    
 }
)

