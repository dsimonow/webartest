import ReactThreeTestRenderer from "@react-three/test-renderer"
import { composeStories } from '@storybook/react';
import * as stories from './Scenario.stories'
import * as Fiber from '@react-three/fiber';
import * as THREE from 'three'
import { GLTF} from 'three-stdlib';
import { MockGLTFResult } from '../../../setupTests';
import { XR } from "@react-three/xr";


const { ScenarioExample } = composeStories(stories,
    {
        args: { disableDecorator: true }
    });

test('Scenario Darstellung', async () => {
    jest.spyOn(Fiber, 'useLoader').mockImplementation(() => MockGLTFResult);
    const renderer = await ReactThreeTestRenderer.create(
        <XR>
        <ScenarioExample />
        </XR>
    )
    
    // Besitzt keine Logik
    // Läd das Mesh aus useSpline siehe setupTests.tsx
    // Struktur notwendig gltfjsx oder spline
    expect(renderer.scene.findAllByType('Mesh').length).toBe(456)
    }

)
