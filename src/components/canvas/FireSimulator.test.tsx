import ReactThreeTestRenderer from "@react-three/test-renderer"
import { composeStories } from '@storybook/react';
import * as stories from './FireSimulator.stories'
import * as Fiber from '@react-three/fiber';
import { MockGLTFResult } from '../../../setupTests';
import { XR } from "@react-three/xr";
import { useRef } from "react";


const { FireSimulatorExample } = composeStories(stories,
    {
        args: { disableDecorator: true }
    });

test('FireSimulator darstellbar', async() => {
    const tester = useRef(null)
    jest.spyOn(Fiber, 'useLoader').mockImplementation(() => MockGLTFResult);
    const renderer = await ReactThreeTestRenderer.create(
      <XR>
        <FireSimulatorExample />
      </XR>
    )
    
})
