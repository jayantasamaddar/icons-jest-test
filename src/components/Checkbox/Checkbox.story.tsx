import React, { useEffect, useState, useCallback } from 'react';
import {
  ComponentMeta,
  ComponentStory,
  ComponentStoryFn,
} from '@storybook/react';

import { Checkbox } from './Checkbox';

interface IndeterminateTemplateProps {
  [key: string]: boolean;
}

type checkedProps = boolean | 'indeterminate';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

/** Template 1 */
const Template: ComponentStory<typeof Checkbox> = args => {
  const [isChecked, setIsChecked] = useState<checkedProps>(
    args.checked || false
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsChecked(prev => (prev === true ? false : true));
    },
    []
  );

  return <Checkbox {...args} checked={isChecked} onChange={handleChange} />;
};

/** Template 2 */
const IndeterminateTemplate: ComponentStory<typeof Checkbox> = args => {
  const [checkboxes, setCheckboxes] = useState<IndeterminateTemplateProps>({
    item1: false,
    item2: false,
    item3: false,
  });

  const [controller, setController] = useState<checkedProps>(false);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = event.target;

      if (name !== 'control') setCheckboxes({ ...checkboxes, [name]: checked });
      else {
        const updatedCheckboxes = Object.keys(checkboxes).reduce(
          (acc, key) => ({ ...acc, [key]: checked }),
          {}
        );
        setCheckboxes(prevCheckboxes => ({
          ...prevCheckboxes,
          ...updatedCheckboxes,
        }));
      }
    },
    [checkboxes]
  );

  useEffect(() => {
    const checkboxValues = Object.values(checkboxes);
    if (checkboxValues.every(checkbox => checkbox === true)) {
      setController(true);
    } else if (checkboxValues.findIndex(checkbox => checkbox === true) >= 0) {
      setController('indeterminate');
    } else {
      setController(false);
    }
  }, [checkboxes]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Checkbox
        {...args}
        name="control"
        label={`${
          controller === false
            ? 'None'
            : controller === 'indeterminate'
            ? Object.values(checkboxes).filter(checkbox => checkbox === true)
                .length
            : 'All'
        } selected`}
        onChange={handleChange}
        checked={controller}
      />
      <Checkbox
        {...args}
        name="item1"
        label="Item 1"
        onChange={handleChange}
        checked={checkboxes.item1}
      />
      <Checkbox
        {...args}
        name="item2"
        label="Item 2"
        onChange={handleChange}
        checked={checkboxes.item2}
      />
      <Checkbox
        {...args}
        name="item3"
        label="Item 3"
        onChange={handleChange}
        checked={checkboxes.item3}
      />
    </div>
  );
};

export const Checkbox_with_Label: ComponentStoryFn<typeof Checkbox> =
  Template.bind({});
Checkbox_with_Label.args = {
  name: 'agree',
  label: 'Agree to the terms and conditions',
  checked: false,
};

export const Checkbox_Indeterminate_with_Label_hidden: ComponentStoryFn<
  typeof Checkbox
> = Template.bind({});
Checkbox_Indeterminate_with_Label_hidden.args = {
  name: 'partially-agree',
  label: 'Partially agree to the terms and conditions',
  labelHidden: true,
  checked: 'indeterminate',
};

export const Checkbox_Indeterminate_List: ComponentStoryFn<typeof Checkbox> =
  IndeterminateTemplate.bind({});
