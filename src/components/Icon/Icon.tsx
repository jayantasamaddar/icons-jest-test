import React, { FC, ReactElement } from 'react';
import { IconSource } from '../../types';
import styled from '@emotion/styled';
import type { Color as themeColor } from '../../types/theme';
import { generateUniqueID, useTestId } from '../../utilities';

type colorKeys = keyof themeColor;

type Color = 'primary' | 'alert' | 'disabled' | 'success' | 'info' | 'warning';

const COLORS_WITH_BACKDROPS = ['success', 'info', 'warning', 'alert'];

export interface IconProps {
  /** The SVG contents to display in the icon (icons should fit in a 20 × 20 pixel viewBox) */
  source: IconSource;
  /** Set the color for the SVG fill */
  color?: colorKeys;
  bgColor?: colorKeys;
  /** Set the size for the SVG */
  size?: 'small' | 'medium' | 'large';
  /** Show a backdrop behind the icon */
  backdrop?: boolean;
  /** Descriptive text to be read to screenreaders */
  accessibilityLabel?: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const UrsaIcon: FC<IconProps> = ({
  source: IconSVGComponent,
  color,
  size,
  backdrop,
  accessibilityLabel,
  className,
  onClick,
}): ReactElement => {
  /*****************************************************************/
  // Find the typeof source as sourceType
  /*****************************************************************/

  let sourceType: 'function' | 'placeholder' | 'external';
  let testid: string | { 'data-testid': undefined | string } = 'icon';

  if (typeof IconSVGComponent === 'function') {
    sourceType = 'function';
  } else if (IconSVGComponent === 'placeholder') {
    sourceType = 'placeholder';
    testid += '-placeholder';
  } else {
    sourceType = 'external';
    testid += '-external';
  }

  testid = useTestId(testid) as { 'data-testid': undefined | string };

  /*********************************************************************************/
  // Show warning if color provided for sourceType "external" in development mode,
  // i.e. if the icon is not a react component included in @zenius-one/ursa-icons
  /*********************************************************************************/

  if (
    color &&
    sourceType === 'external' &&
    process.env.NODE_ENV === 'development'
  ) {
    console.warn(
      'Recoloring external SVGs is not supported. Set the intended color on your SVG instead.'
    );
  }

  /*********************************************************************************/
  // Show warning if backdrop is not available in development
  /*********************************************************************************/

  if (
    backdrop &&
    color &&
    !COLORS_WITH_BACKDROPS.includes(color) &&
    process.env.NODE_ENV === 'development'
  ) {
    console.warn(
      `The ${color} variant does not have a supported backdrop color`
    );
  }

  /*********************************************************************************/
  // Content Markup based on sourceType
  /*********************************************************************************/

  const _id = generateUniqueID('Ursa-Icon');

  const iconMarkup = {
    function: (
      <IconSVGComponent
        className="Ursa-IconSVG"
        focusable="false"
        aria-hidden="true"
        {...testid}
      />
    ),
    placeholder: <div className="Ursa-IconPlaceholder" {...testid} />,
    external: (
      <img
        className="Ursa-IconSVG"
        src={`data:image/svg+xml;utf8,${IconSVGComponent}`}
        alt=""
        aria-hidden="true"
        {...testid}
      />
    ),
  };

  /*****************************************************************/
  // Render icon
  /*****************************************************************/

  return (
    <span id={_id} className={`Ursa-Icon ${className || ''}`} onClick={onClick}>
      {iconMarkup[sourceType]}
    </span>
  );
};

export const Icon = styled(UrsaIcon)(
  ({ theme: { color, fontSize }, color: IconColor, bgColor, size }) => `
      display: block;
      height: ${fontSize['--ursa-font-size-4']};
      width: ${fontSize['--ursa-font-size-4']};
      max-height: 100%;
      max-width: 100%;

      svg {
          fill: ${IconColor ? color[IconColor] : color['--ursa-text-primary']};
          transform: scale(${
            size === 'small' ? 0.5 : size === 'large' ? 2 : 1
          });
          background-color: ${bgColor ? color[bgColor] : 'none'};
      }
      &:hover {
        color: auto;
        background-color: auto;
      }
    `
);
