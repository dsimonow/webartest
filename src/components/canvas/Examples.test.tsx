import ReactThreeTestRenderer  from "@react-three/test-renderer";
import { composeStories } from '@storybook/react';
import * as stories from './Examples.stories'

const { BlobExample, LogoExample, DuckExample, DogExample} = composeStories(stories, 
    { decorators: [(Story) => <Story /> ]});

test('renders Blob default', async () => {
    const renderer = await ReactThreeTestRenderer.create(<BlobExample />)
    //const mesh = renderer.scene.children[0]
    console.log(renderer)
    console.log(renderer.scene.children[0])

    //expect(mesh.length).toBe(2)
}

)