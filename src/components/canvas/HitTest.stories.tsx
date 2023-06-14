import type { Meta, StoryObj } from '@storybook/react';
import { HitTest } from './HitTest'
import { SetupAR } from '../../stories/Setup'
import { Vector3 } from 'three'
import { OrbitControls } from '@react-three/drei'
import { XR } from "@react-three/xr";

type Story = StoryObj<typeof HitTest>;
interface StoryArgs {
    disableDecorator?: boolean;
}

// Finder Test der HitTest Komponente da die einzelnen Komponenten ausserhalb von AR Testbar sein sollen
const meta: Meta<typeof HitTest> = {
    title: '3D/Finder',
    component: HitTest,
    tags: ['autodocs'],
    decorators: [(Story, options) => {
        const args = options.args as StoryArgs;
        if (args.disableDecorator) {
            return (
                <XR>
                    <Story {...options} />
                </XR>
            );
        }
        return (
            <SetupAR cameraPosition={new Vector3(10, 10, 10)}>
                <Story {...options} />
                <OrbitControls makeDefault />
            </SetupAR>
        );
    }]
};

export default meta;

export const HitTestExample: Story = () => <HitTest />
HitTestExample.storyName = 'Finder'