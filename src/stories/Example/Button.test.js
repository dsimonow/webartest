import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Button.stories';

const { Primary, Secondary } = composeStories(stories);

test('renders primary button with default args', () => {
    render(<Primary />);
    const buttonElement = screen.getByText(
        /Text coming from args in stories file!/i
    );
    expect(buttonElement).not.toBeNull();
});

test('renders primary button with overriden props', () => {
    render(<Primary>Hello world</Primary>); // you can override props and they will get merged with values from the Story's args
    const buttonElement = screen.getByText(/Hello world/i);
    expect(buttonElement).not.toBeNull();
});