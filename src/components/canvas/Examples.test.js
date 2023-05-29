import ReactThreeTestRenderer  from "@react-three/test-renderer";
import { composeStories } from '@storybook/react';
import * as stories from './Examples.stories'

const { Blob, Logo, Duck, Dog} = composeStories(stories);

test('renders Blob default', async () => {
    //const renderer = await ReactThreeTestRenderer.create(<Blob />)
    

    //expect(mesh.length).toBe(2)
}

)