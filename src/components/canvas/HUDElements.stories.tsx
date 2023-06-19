import type { Meta, StoryObj } from '@storybook/react';
import { HUDElements } from './HUDElements'
import { Setup } from '../../stories/Setup'
import { Vector3 } from 'three'
import { OrbitControls } from '@react-three/drei'
import { XR } from "@react-three/xr";

interface Args {
    disableDecorator?: boolean;
}

type Story = StoryObj<typeof HUDElements>;

// Finder Test der HitTest Komponente da die einzelnen Komponenten ausserhalb von AR Testbar sein sollen
const meta: Meta<typeof HUDElements> = {
    title: '3D/HUD',
    component: HUDElements,
    tags: ['autodocs'],
    decorators: [(Story, options) => {
        const args = options.args as Args;
        if (args.disableDecorator) {
            return (
                <XR>
                    <Story {...options} />
                </XR>
            );
        }
        return (
            <Setup cameraPosition={new Vector3(1, 1, 1)}>
                <XR>
                    <Story {...options} />
                </XR>
            </Setup>
        );
    }]
};

export default meta;

export const HUDElementsExample: Story = () => <HUDElements />
HUDElementsExample.storyName = 'HUD'