import ReactThreeTestRenderer from "@react-three/test-renderer"
import { composeStories } from '@storybook/react';
import * as stories from './HUDElements.stories'
import * as Fiber from '@react-three/fiber';
import { MockGLTFResult } from '../../../setupTests';

const { HUDElementsExample } = composeStories(stories,
    {
        args: { disableDecorator: true }
    });

test('HUD Nicht-Testbar, Hud rendert komplett andere Szene', async () => {
    jest.spyOn(Fiber, 'useLoader').mockImplementation(() => MockGLTFResult);
    const renderer = await ReactThreeTestRenderer.create(
        <HUDElementsExample />
    )

    const transformModeMesh = renderer.scene.findAll(() => true)
    
    // 3 Objekte
    // Die übergeben PerspectiveCamera
    // Die Szene
    // und die Gruppe in der die Camera ist
    // Rest der Szene ist nicht sichtbar aufgrund der Hud Komponente
    expect(transformModeMesh.length).toBe(3)
    }
)

