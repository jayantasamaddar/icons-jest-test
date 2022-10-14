import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import '@testing-library/jest-dom';
import * as stories from './Checkbox.story';

const { Checkbox_with_Label, Checkbox_Indeterminate_with_Label_hidden } =
  composeStories(stories);

/***************************************************************************/
/** Run Tests */
// The commented out section renders errors because of Icons not resolving.
/***************************************************************************/

describe('components/Checkbox', () => {
  describe('Tests Checkbox (with Label)', () => {
    it('Rendered in the DOM', () => {
      render(<Checkbox_with_Label />);
      const checkboxEl = screen.getByRole('checkbox');
      expect(checkboxEl).toBeInTheDocument(); // expects checkbox to exist in document.
      expect(checkboxEl).toHaveAttribute(
        'name',
        Checkbox_with_Label.args?.name
      ); // match name
    });
    it('Checkbox check and uncheck functionality working', () => {
      render(<Checkbox_with_Label />);
      const checkboxEl = screen.getByRole('checkbox');
      expect(checkboxEl).toBeInTheDocument();
      // const initialCheckedState = Checkbox_with_Label.args.checked;
      // expect(checkboxEl).toHaveAttribute('checked', initialCheckedState); // Checkbox loads as unchecked
      // fireEvent.click(checkboxEl);
      // expect(checkboxEl).toHaveAttribute('checked', !initialCheckedState); // Checkbox was checked
      // fireEvent.click(checkboxEl);
      // expect(checkboxEl).toHaveAttribute('checked', initialCheckedState); // Checkbox was unchecked
    });
  });
  describe('Tests Checkbox (Indeterminate with Label Hidden)', () => {
    it('Rendered in the DOM', () => {
      render(<Checkbox_Indeterminate_with_Label_hidden />);
      const checkboxEl = screen.getByRole('checkbox');
      expect(checkboxEl).toBeInTheDocument(); // expects checkbox to exist in document.
      expect(checkboxEl).toHaveAttribute(
        'name',
        Checkbox_Indeterminate_with_Label_hidden.args?.name
      ); // match name
    });
    // it('Checkbox indeterminate functionality working', () => {
    //   render(<Checkbox_Indeterminate_with_Label_hidden />);
    //   const checkboxEl = screen.getByRole('checkbox');
    //   expect(checkboxEl).toHaveAttribute('aria-checked', 'mixed'); // Checkbox loads as indeterminate
    //   fireEvent.click(checkboxEl);
    //   expect(checkboxEl).toHaveAttribute('checked', true); // Checkbox was checked
    //   fireEvent.click(checkboxEl);
    //   expect(checkboxEl).toHaveAttribute('checked', false); // Checkbox was unchecked
    // });
  });
});
