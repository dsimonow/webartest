import ReactThreeTestRenderer from "@react-three/test-renderer"
import { composeStories } from '@storybook/react';
import * as stories from './FireSimulator.stories'
import * as Fiber from '@react-three/fiber';
import { MockGLTFResult } from '../../../setupTests';

const { FireSimulatorExample } = composeStories(stories,
    {
        args: { disableDecorator: true }
    });

test('FireSimulator darstellbar', async() => {
    jest.spyOn(Fiber, 'useLoader').mockImplementation(() => MockGLTFResult);
    const renderer = await ReactThreeTestRenderer.create(
        <FireSimulatorExample />
    )
    
})