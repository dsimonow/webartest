import type { Meta, StoryObj } from '@storybook/react';
import { HitTest } from './HitTest'
import { Setup } from '../../stories/Setup'
import { Vector3 } from 'three'
import { OrbitControls } from '@react-three/drei'
import { XR } from "@react-three/xr";

interface Args {
    disableDecorator?: boolean;
    // ... other properties
}

type Story = StoryObj<typeof HitTest>;

// Finder Test der HitTest Komponente da die einzelnen Komponenten ausserhalb von AR Testbar sein sollen
const meta: Meta<typeof HitTest> = {
    title: '3D/Finder',
    component: HitTest,
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

export const HitTestExample: Story = () => <HitTest />
HitTestExample.storyName = 'Finder'