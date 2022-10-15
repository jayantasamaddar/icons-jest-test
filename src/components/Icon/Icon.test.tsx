import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import '@testing-library/jest-dom';
import * as stories from './Icon.story'; // import all stories from the stories file

const { DefaultIcon } = composeStories(stories);

describe('components/Icon', () => {
  it('Renders Default Icon', () => {
    render(<DefaultIcon />);
    const iconEl = screen.getByTestId('icon-external');
    expect(iconEl).not.toBeNull();
  });
  it('Renders Placeholder Icon', () => {
    render(<DefaultIcon source={'placeholder'} />);
    const iconEl = screen.getByTestId('icon-placeholder');
    expect(iconEl).not.toBeNull();
  });
  it('Renders External Icon', () => {
    render(<DefaultIcon source="https://via.placeholder.com/150" />);
    const iconEl = screen.getByTestId('icon-external');
    expect(iconEl).not.toBeNull();
  });
});
