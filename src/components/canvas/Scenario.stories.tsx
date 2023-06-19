import type { Meta, StoryObj } from '@storybook/react';
import { Scenario } from './Scenario'
import { Setup } from '../../stories/Setup'
import { Vector3 } from 'three'
import { OrbitControls } from '@react-three/drei'

interface Args {
    disableDecorator?: boolean;
    // ... other properties
}

type Story = StoryObj<typeof Scenario>;

const meta: Meta<typeof Scenario> = {
    title: '3D/Scenario',
    component: Scenario,
    tags: ['autodocs'],
    decorators: [(Story, options) => {
        const args = options.args as Args;
        if (args.disableDecorator) {
            return (
                    <Story {...options} />
            );
        }
        return (
            <Setup cameraPosition={new Vector3(5, 5, 5)}>
                    <Story {...options} />
            </Setup>
        );
    }]
};

export default meta;

export const ScenarioExample: Story = () => <Scenario scale={1}/>
ScenarioExample.storyName = 'Scenario'