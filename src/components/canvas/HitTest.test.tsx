//import ReactThreeTestRenderer from "@react-three/test-renderer";
import ReactThreeTestRenderer from "@react-three/test-renderer"
import { composeStories } from '@storybook/react';
import * as stories from './HitTest.stories'
import * as Fiber from '@react-three/fiber';
import * as THREE from 'three'
import * as Stdlib from 'three-stdlib'
import * as Drei from '@react-three/drei';
import { GLTF } from 'three-stdlib';

const { HitTestExample } = composeStories(stories,
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

test('HitTest onClick hide Finder show Scenario', async () => {
    jest.spyOn(Fiber, 'useLoader').mockImplementation(() => MockGLTFResult);
    const renderer = await ReactThreeTestRenderer.create(
        <HitTestExample/>
    )

    //console.log(renderer.scene.findAll(() => true))
    //console.log(renderer.toTree())

    const finder = renderer.scene.children[2].children[0]
    const display = renderer.scene.children[3]
    expect(finder.props.visible).toBe(true)
    expect(display.props.visible).toBe(false)

    await renderer.fireEvent(finder, 'onClick')
    const finderUpdated = renderer.scene.children[2].children[0]
    const displayUpdated = renderer.scene.children[3]
    expect(finderUpdated.props.visible).toBe(false)
    expect(displayUpdated.props.visible).toBe(true)

    
 }
)

