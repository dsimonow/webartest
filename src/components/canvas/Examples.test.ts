import ReactThreeTestRenderer  from "@react-three/test-renderer";
import { composeStories } from '@storybook/react';
import * as stories from './Examples.stories'

const { BlobExample, LogoExample, DuckExample, DogExample} = composeStories(stories);

test('renders Blob default', async () => {
    const renderer = await ReactThreeTestRenderer.create(<BlobExample />)
    

    expect(mesh.length).toBe(2)
}

)