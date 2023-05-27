// Examples.stories.ts|tsx


import type { Meta, StoryObj } from '@storybook/react';

import {Setup} from '../../stories/Setup'
import { Vector3 } from 'three'
import { Blob, Logo, Duck, Dog } from './Examples';


// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Blob> = {
  title: '3D/Examples',
  component: Blob,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Blob>;

export function AssetBlob(){
  return <Blob />
}

AssetBlob.storyName = 'Blob'
AssetBlob.decorators = [(storyFn) => <Setup cameraPosition={new Vector3(10, 10, 10)}>{storyFn()}</Setup>]

export function AssetLogo(){
  return <Logo />
}

AssetLogo.storyName = 'Logo'
AssetLogo.decorators = [(storyFn) => <Setup cameraPosition={new Vector3(10, 10, 10)}>{storyFn()}</Setup>]

export function AssetDuck(){
  return <Duck />
}

AssetDuck.storyName = 'Duck'
AssetDuck.decorators = [(storyFn) => <Setup cameraPosition={new Vector3(10, 10, 10)}>{storyFn()}</Setup>]

export function AssetDog(){
  return <Dog />
}

AssetDog.storyName = 'Dog'
AssetDog.decorators = [(storyFn) => <Setup cameraPosition={new Vector3(10, 10, 10)}>{storyFn()}</Setup>]