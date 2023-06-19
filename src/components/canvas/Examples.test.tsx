import ReactThreeTestRenderer from "@react-three/test-renderer";
import { composeStories } from '@storybook/react';
import * as stories from './Examples.stories'
import { useRouter } from 'next/navigation';
import * as Fiber from '@react-three/fiber';
import * as THREE from 'three'
import { GLTF } from 'three-stdlib';

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

    //console.log(renderer.scene.findByType('SphereGeometry'))
    //console.log(renderer.scene.findAllByProps({ geometry: 'SphereGeometry'}))
    //console.log(renderer.scene.children[0])
    // Element mit dem onPointerHover finden
    const mesh = renderer.scene.findByType('Mesh')
    // Element mit dem zu testenden Element finden
    const meshMaterial = renderer.scene.findByType('MeshPhysicalMaterial')
    
    // Asset Farbe start
    expect(meshMaterial.props.color).toBe('#1fb2f5')
    // Synthetisches Event auslösen
    // Achtung: schreibweise vom Event Wichtig
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
    // Synthetisches Event auslösen.
    // Achtung: schreibweise vom Event Wichtig
    await renderer.fireEvent(mesh, 'onPointerOver')

    // Objekt muss neu gesucht werden für den geupdaten State
    const updatedMeshmaterial = renderer.scene.findByType('MeshPhysicalMaterial')
    expect(updatedMeshmaterial.props.color).toBe('hotpink')
    }
)

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

// Die Komponenten Dog und Duck verfügen über keine Funktionen
// ausser der Darstellung der Modelle
// Ob useGLTF funktioniert hat, kann an der Anzahl an Mesh Elementen festgestellt werden
// Sonst ist dieser Mock bei allen Verwendungen mit useGLTF notwendig damit keine Fehler geworfen werden

test('Dog useGLTF Boilerplate', async () => {
    // Mock des useLoaders von useGLTF
    jest.spyOn(Fiber, 'useLoader').mockImplementation(() => MockGLTFResult);
    const renderer = await ReactThreeTestRenderer.create(
        <DogExample />
    )
    // Alle Mesh Komponenten finden, aus der gltfjsx generierten Komponente ist es klar das es 3 sind für Dog
    // in der Übersicht wird der Type in klein geschrieben, im Element ist der echte in groß
    //wconsole.log(renderer.scene.children[0]._fiber.__r3f)
    const mesh = renderer.scene.findAllByType('Group')
    expect(mesh.length).toBe(1)
    }
)

test('Duck useGLTF Boilerplate', async () => {
    // Mock des useLoaders von useGLTF
    jest.spyOn(Fiber, 'useLoader').mockImplementation(() => MockGLTFResult);
    const renderer = await ReactThreeTestRenderer.create(
        <DuckExample />
    )
    //console.log(renderer.scene.findByType('BufferGeometry'))
    // Alle Mesh Komponenten finden, aus der gltfjsx generierten Komponente ist es klar das es 3 sind für Duck
    // Großklein Schreibung beachten
    // in der Übersicht wird der Type in klein geschrieben, im Element ist der echte in groß
    const mesh = renderer.scene.findAllByType('Mesh')
    expect(mesh.length).toBe(3)
    }
)
