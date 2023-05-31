import ReactThreeTestRenderer  from "@react-three/test-renderer";
import { composeStories } from '@storybook/react';
import * as stories from './Examples.stories'
import { useRouter } from 'next/router';
import mockRouter from 'next-router-mock'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

//jest.mock('next/router', () => require('next-router-mock'));
jest.mock('next/router', () => ({
    useRouter: jest.fn()
}))

const { BlobExample, LogoExample, DuckExample, DogExample} = composeStories(stories, 
    { decorators: [(Story) => <Story/> ],
    args: { disableDecorator: true}
});

test('renders Blob default', async () => {
    (useRouter as jest.Mock).mockReturnValue({ query: {} })
    const renderer = await ReactThreeTestRenderer.create(
        <BlobExample />
    )
    const mesh = renderer.scene.children[0].allChildren
    console.log(renderer)
    console.log(renderer.scene.children[0])

    expect(mesh.length).toBe(2)
}

)