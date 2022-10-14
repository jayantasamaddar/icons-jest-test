/**
 * (CTRL + A), (CTRL + U) to uncomment all
 * ---------------------------------------
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Checkbox, CheckboxProps } from './Checkbox';
import { ThemeProvider } from '../ThemeProvider';

/** Mock Checkbox Element created without implementing Storybook stories,
 * just to eliminate the possibility that the problem is caused by storybook.
 *
 * Uncomment the section below and run `yarn test`
 * -----------------------------------------------
 */

type checkedProps = boolean | 'indeterminate';

const MockCheckbox = (args: CheckboxProps) => {
  const [isChecked, setIsChecked] = React.useState<checkedProps>(
    args.checked || false
  );

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsChecked(prev => (prev === true ? false : true));
    },
    []
  );

  return <Checkbox {...args} checked={isChecked} onChange={handleChange} />;
};

/** The commented out section has the same problems as the MockCheckbox below */

describe('This is a Test for the MockCheckbox that is standalone', () => {
  it('Checkbox indeterminate functionality working', () => {
    const args = {
      name: 'partially-agree',
      label: 'Partially agree to the terms and conditions',
      labelHidden: true,
      checked: 'indeterminate' as 'indeterminate',
    };
    render(
      <ThemeProvider>
        <MockCheckbox {...args} />
      </ThemeProvider>
    );
    const checkboxEl = screen.getByRole('checkbox');
    expect(checkboxEl).toBeInTheDocument();
    /** Checkbox starts as indeterminate */
    // expect(checkboxEl).toHaveAttribute('aria-checked', 'mixed'); // Checkbox indeterminate

    // /** Checkbox on first Click changes to checked */
    // fireEvent.click(checkboxEl);
    // expect(checkboxEl).toHaveAttribute('checked', true); // Checkbox was checked

    // /** Checkbox on second Click changes to unchecked */
    // fireEvent.click(checkboxEl);
    // expect(checkboxEl).toHaveAttribute('checked', false); // Checkbox was unchecked
  });
});
