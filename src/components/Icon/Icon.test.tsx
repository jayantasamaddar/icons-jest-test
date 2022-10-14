import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import '@testing-library/jest-dom';
import * as stories from './Icon.story'; // import all stories from the stories file

const { DefaultIcon } = composeStories(stories);

/** Mock Icon */
const Icon = () => (
  <svg
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    className="Ursa-IconSVG"
    focusable="false"
    aria-hidden="true"
    data-testid="icon"
  >
    <path d="M18 7.261v10.239c0 .841-.672 1.5-1.5 1.5h-2c-.828 0-1.5-.659-1.5-1.5v-4.5h-6v4.477c0 .841-.672 1.523-1.5 1.523h-2c-.828 0-1.5-.682-1.5-1.523v-10.216a1.5 1.5 0 0 1 .615-1.21l6.59-4.82a1.481 1.481 0 0 1 1.59 0l6.59 4.82a1.5 1.5 0 0 1 .615 1.209z"></path>
  </svg>
);

describe('components/Icon', () => {
  it('Renders Default Icon (Mocked)', () => {
    render(<DefaultIcon source={Icon} />); // Icon is Mocked
    const iconEl = screen.getByTestId('icon');
    expect(iconEl).not.toBeNull();
  });
  // it('Renders Default Icon (Not Mocked)', () => {
  //   render(<DefaultIcon />); // Icon is Not Mocked
  //   const iconEl = screen.getByTestId('icon');
  //   expect(iconEl).not.toBeNull();
  // });
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
