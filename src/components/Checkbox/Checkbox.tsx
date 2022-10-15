import React, {
  ReactElement,
  MouseEvent,
  ChangeEvent,
  FocusEvent,
  useState,
  useEffect,
  useCallback,
  useImperativeHandle,
  useRef,
  forwardRef,
} from 'react';

import styled from '@emotion/styled';

import { MinusMinor, TickMinor } from '@zenius-one/ursa-icons';
import { Icon } from '../Icon';
import { generateUniqueID } from '../../utilities';

export interface CheckboxProps {
  /** Unique identifier for checkbox input */
  id?: string;
  /** Name for checkbox input */
  name: string;
  /** Label for the checkbox */
  label: string;
  /** Visually hide the label */
  labelHidden?: boolean;
  /** Value for form input */
  value?: string;
  /* Classes to apply to the tag */
  className?: string;
  /** Checkbox is selected. */
  checked?: boolean | 'indeterminate';
  /** Disable input */
  disabled?: boolean;
  /** Callback when checkbox is toggled */
  // onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  /** Callback when checkbox is focussed */
  onFocus?: (event?: FocusEvent<HTMLInputElement>) => void;
  /** Callback when focus is removed */
  onBlur?: (event?: FocusEvent<HTMLInputElement>) => void;
  /** Indicates the ID of the element that is controlled by the checkbox*/
  ariaControls?: string;
  /** Indicates the ID of the element that describes the checkbox*/
  ariaDescribedBy?: string;
}

const UrsaCheckbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref): ReactElement => {
    const {
      id,
      name,
      label,
      value,
      className,
      checked,
      disabled,
      onChange,
      onFocus,
      onBlur,
    } = props;

    const _id = id || generateUniqueID(name);
    const [isChecked, setIsChecked] = useState(checked == true || false);
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    /********************************************************************/
    // Handle Indeterminate
    /********************************************************************/
    const isIndeterminate = checked === 'indeterminate';

    const indeterminateAttributes = isIndeterminate
      ? { indeterminate: 'true', 'aria-checked': 'mixed' as const }
      : { 'aria-checked': isChecked };

    const iconSource = isIndeterminate ? MinusMinor : TickMinor;

    useEffect(() => {
      if (inputRef.current) {
        if (checked === 'indeterminate') {
          inputRef.current.indeterminate = true;
        } else {
          inputRef.current.indeterminate = false;
          setIsChecked(Boolean(checked));
        }
      }
    }, [checked]);

    /********************************************************************/
    // Event Handlers
    /********************************************************************/
    const handleClick = useCallback((event: MouseEvent<HTMLInputElement>) => {
      setIsChecked(prevState => !prevState);
    }, []);

    /********************************************************************/
    // Render Checkbox JSX
    /********************************************************************/

    return (
      <div className={`Ursa-CheckboxContainer ${className || ''}`}>
        <label className="Ursa-CheckboxLabel" htmlFor={id}>
          <input
            id={_id}
            className="Ursa-Checkbox"
            ref={inputRef}
            name={name}
            value={value}
            type="checkbox"
            role="checkbox"
            checked={isChecked}
            disabled={disabled}
            onClick={handleClick}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            {...indeterminateAttributes}
          />
          <span className="Ursa-CheckboxIcon">
            <Icon source={iconSource} color={'--ursa-white'} />
          </span>

          <span className="Ursa-LabelText">{label}</span>
        </label>
      </div>
    );
  }
);

/********************************************************************/
// Styled Checkbox
/********************************************************************/

const Checkbox = styled(UrsaCheckbox)(
  ({ theme: { color }, labelHidden, checked }) => `
    display: inline-flex;
    align-items: center;
    label.Ursa-CheckboxLabel {
        display: inline-flex;
        align-items: center;
        padding-left: 4px;
    }
    input[type="checkbox"].Ursa-Checkbox {
        width: 1.2em;
        height: 1.2em;
        border: 2px solid ${color['--ursa-text-primary']};
        clip: rect(0, 0, 0, 0);
        clip-path: inset(50%);
        height: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        width: 1px;
    }
    .Ursa-CheckboxIcon {
      display: inline-flex;
      cursor: pointer;
      height: 1.2em;
      width: 1.2em;
      border-width: 2px;
      border-style: solid;
      border-radius: 2px;
      margin-right: ${labelHidden ? '0' : '10px'};
      background-color: ${
        checked ? color['--ursa-accent-color'] : color['--ursa-white']
      };
      border-color: ${
        checked
          ? color['--ursa-accent-color']
          : color['--ursa-border-secondary']
      };
    }
    .Ursa-LabelText {
      visibility: ${labelHidden ? 'hidden' : 'visible'};
    }
    `
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
