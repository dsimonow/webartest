//import ReactThreeTestRenderer from "@react-three/test-renderer";
import ReactThreeTestRenderer from "@react-three/test-renderer"
import { composeStories } from '@storybook/react';
import * as stories from './HitTest.stories'
import * as Fiber from '@react-three/fiber';
import * as THREE from 'three'
import { GLTF } from 'three-stdlib';
import useSpline from '@splinetool/r3f-spline'
import { Cloud, Box } from '@react-three/drei';
import { MockGLTFResult } from '../../../setupTests';

const { HitTestExample } = composeStories(stories,
    { args: { disableDecorator: true }
});

test('HitTest onClick hide Finder show Scenario', async () => {
    jest.spyOn(Fiber, 'useLoader').mockImplementation(() => MockGLTFResult);
    const renderer = await ReactThreeTestRenderer.create(
        <HitTestExample/>
    )

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

