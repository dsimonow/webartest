import ReactThreeTestRenderer  from "@react-three/test-renderer";
import { composeStories } from '@storybook/react';
import * as stories from './Examples.stories'
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn() 
}))
const mockOn = jest.fn()

const { BlobExample, LogoExample, DuckExample, DogExample} = composeStories(stories, 
    { args: { disableDecorator: true}
});

test('renders Blob default', async () => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockOn })
    const renderer = await ReactThreeTestRenderer.create(
        <BlobExample />
    )
    const mesh = renderer.scene.children[0].allChildren
    //console.log(renderer)
    //console.log(renderer.scene.children[0])
    //console.log(mesh)
    expect(mesh.length).toBe(2)
    }
)

test('Blob turn hotpink on hover', async() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockOn })
    const renderer = await ReactThreeTestRenderer.create(
        <BlobExample />
    )
    const mesh = renderer.scene.children[0]
    const meshMaterial = renderer.scene.findAll(
        (node) => node.props.color === '#1fb2f5'
    )
    const box = renderer.toTree()[0].children[1]
    
    //console.log(renderer.toTree()[0].children[1])
    
    //console.log(renderer.scene.children[0])
    expect(box.props.color).toBe('#1fb2f5')
    await renderer.fireEvent(mesh, 'pointerOver')

    //box.props.color = 'hotpink'

    await ReactThreeTestRenderer.act(async () => {
        await renderer.advanceFrames(10, 2)
    })
    expect(box.props.color).toBe('hotpink')


    }
)