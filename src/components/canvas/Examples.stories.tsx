// Examples.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';
import ReactThreeTestRenderer from "@react-three/test-renderer";
import {Setup} from '../../stories/Setup'
import { Vector3 } from 'three'
import { expect } from '@storybook/jest';
import { within, userEvent, screen } from '@storybook/testing-library';
import { Blob, Logo, Duck, Dog } from './Examples';

type Story = StoryObj<typeof Blob>;
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Blob> = {
  title: '3D/Examples',
  component: Blob,
  tags: ['autodocs'],
  decorators: [(Story, options) => {
    const { args } = options;
    if (args.disableDecorator) {
      return <Story {...options} />;
    }
    return (
      <Setup cameraPosition={new Vector3(10, 10, 10)}>
        <Story {...options} />
      </Setup>
    );
  }]
};

export default meta;

export const BlobExample: Story = () => <Blob alt="blobi" />
BlobExample.storyName = 'Blob'
BlobExample.play = async ({ args, canvasElement }) => {
  
  const canvas = within(canvasElement);
  console.log(canvas.getAllByRole('generic'));
  //console.log(canvas.getAllByAltText('blobi'));
  await userEvent.click(canvas.getAllByRole('generic')[0]);
  await expect(args.onClick).toHaveBeenCalled();
};

export const LogoExample = () => <Logo />
LogoExample.storyName = 'Logo'

export const DuckExample = () => <Duck />
DuckExample.storyName = 'Duck'

export const DogExample = () => <Dog />
DogExample.storyName = 'Dog'