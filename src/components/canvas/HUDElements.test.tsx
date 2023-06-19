import ReactThreeTestRenderer from "@react-three/test-renderer"
import { composeStories } from '@storybook/react';
import * as stories from './HUDElements.stories'
import * as Fiber from '@react-three/fiber';
import * as THREE from 'three'
import { GLTF } from 'three-stdlib';

const { HUDElementsExample } = composeStories(stories,
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


test('HUD TransformControlsMode Toggle', async () => {
    jest.spyOn(Fiber, 'useLoader').mockImplementation(() => MockGLTFResult);
    const renderer = await ReactThreeTestRenderer.create(
        <HUDElementsExample />
    )

    const transformModeMesh = renderer.scene.findAllByType('Mesh')[0]
    const transformMode = renderer.scene.findAllByType('MeshPhysicalMaterial')[0]

    expect(transformMode.props.color).toBe('#DDA0DD')
    await renderer.fireEvent(transformModeMesh, 'onClick')
    expect(transformMode.props.color).toBe('#1E90FF')
    
    await renderer.fireEvent(transformModeMesh, 'onClick')
    expect(transformMode.props.color).toBe('#DDA0DD')
    }
)

test('HUD TransformControlsEnabled Toggle', async () => {
    jest.spyOn(Fiber, 'useLoader').mockImplementation(() => MockGLTFResult);
    const renderer = await ReactThreeTestRenderer.create(
        <HUDElementsExample />
    )

    const transformEnabledMesh = renderer.scene.findAllByType('Mesh')[1]
    const transformEnabled = renderer.scene.findAllByType('MeshPhysicalMaterial')[1]

    expect(transformEnabled.props.color).toBe('#7CFC00')
    await renderer.fireEvent(transformEnabledMesh, 'onClick')
    expect(transformEnabled.props.color).toBe('#B22222')

    await renderer.fireEvent(transformEnabledMesh, 'onClick')
    expect(transformEnabled.props.color).toBe('#7CFC00')
}
)