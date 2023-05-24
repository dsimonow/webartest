// Examples.stories.ts|tsx


import {Setup} from '../Setup'
import { Vector3 } from 'three'
import { Blob, Logo, Duck, Dog } from '../../components/canvas/Examples';



export default {
  title: '3D/Examples',
  component: Blob,
}

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