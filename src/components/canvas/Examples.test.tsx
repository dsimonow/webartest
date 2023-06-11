import ReactThreeTestRenderer  from "@react-three/test-renderer";
import { composeStories } from '@storybook/react';
import * as stories from './Examples.stories'
import { useRouter } from 'next/navigation';
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import * as Stdlib from 'three-stdlib'
import { Gltf, useGLTF } from "@react-three/drei";

jest.mock('next/navigation', () => ({
    useRouter: jest.fn() 
}))
const mockOn = jest.fn()


const { BlobExample, LogoExample, DuckExample, DogExample} = composeStories(stories, 
    { args: { disableDecorator: true}
});

test('renders Blob default', async () => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockOn })
    const renderer = await ReactThreeTestRenderer.create(
        <BlobExample />
    )
    const mesh = renderer.scene.children[0].allChildren
    expect(mesh.length).toBe(2)
    }
)

test('Hover Testen von Blob', async() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockOn })
    const renderer = await ReactThreeTestRenderer.create(
        <BlobExample />
    )
    // Element mit dem onPointerHover finden
    const mesh = renderer.scene.findByType('Mesh')
    // Element mit dem zu testenden Element finden
    const meshMaterial = renderer.scene.findByType('MeshPhysicalMaterial')
    
    // Asset Farbe start
    expect(meshMaterial.props.color).toBe('#1fb2f5')
    // Synthetisches Event auslösen
    await renderer.fireEvent(mesh, 'onPointerOver')

    // Objekt muss neu gesucht werden für den geupdaten State
    const updatedMeshmaterial = renderer.scene.findByType('MeshPhysicalMaterial')
    expect(updatedMeshmaterial.props.color).toBe('hotpink')
    }
)

test('Hover Testen von Logo', async () => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockOn })
    const renderer = await ReactThreeTestRenderer.create(
        <LogoExample />
    )
    // Element mit dem onPointerHover finden
    const mesh = renderer.scene.findByType('Mesh')
    // Element mit dem zu testenden Element finden
    const meshMaterial = renderer.scene.findByType('MeshPhysicalMaterial')

    // Asset Farbe start
    expect(meshMaterial.props.color).toBe('#1fb2f5')
    // Synthetisches Event auslösen
    await renderer.fireEvent(mesh, 'onPointerOver')

    // Objekt muss neu gesucht werden für den geupdaten State
    const updatedMeshmaterial = renderer.scene.findByType('MeshPhysicalMaterial')
    expect(updatedMeshmaterial.props.color).toBe('hotpink')
    }
)

test('Hover Testen von Dog', async () => {
    const MockMesh = useGLTF
    jest.spyOn(Stdlib, 'GLTFLoader').mockImplementation(
        () =>
        ({
            load: jest.fn().mockImplementation((_url, onLoad) => {
                onLoad(MockMesh)
            }),
        } as unknown as Stdlib.GLTFLoader),
    )
    const renderer = await ReactThreeTestRenderer.create(
        <DogExample />
    )
    console.log(renderer)
    // Element mit dem onPointerHover finden
    
    const mesh = renderer.scene.findByType('Mesh')
    
    
    expect(mesh.props.color).toBe('hotpink')
}
)

