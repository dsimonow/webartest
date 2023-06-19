import type { Meta, StoryObj } from '@storybook/react';
import { FireSimulator } from './FireSimulator'
import { Setup } from '../../stories/Setup'
import { Vector3 } from 'three'
import { Sphere } from '@react-three/drei'
import { useFireSimulationStore } from './store';

interface Args {
    disableDecorator?: boolean;
    // ... other properties
}

type Story = StoryObj<typeof FireSimulator>;

const meta: Meta<typeof FireSimulator> = {
    title: '3D/FireSimulator',
    component: FireSimulator,
    tags: ['autodocs'],
    decorators: [(Story, options) => {
        const args = options.args as Args;
        if (args.disableDecorator) {
            return (
                <Story {...options} />
            );
        }
        const setFireState = useFireSimulationStore((state) => state.setFireState);
        return (
            <Setup cameraPosition={new Vector3(5, 5, 5)}>
                
                <Story {...options} />
                <Sphere
                    position={[75, -130, -500]}
                    scale={15}
                    onClick={() => {
                        // XR Deactivate and Hide
                            setFireState(0, "ignite")
                        }
                    }   
                > </Sphere>
            </Setup>
        );
    }]
};

export default meta;

export const FireSimulatorExample: Story = () => <FireSimulator index={0} />
FireSimulatorExample.storyName = 'FireSimulator'