import { commonStyles } from './common';

export const lightTheme = {
  name: 'light',
  ...commonStyles,
  color: {
    ...commonStyles.color,
    '--ursa-color-scheme': 'light',
    '--ursa-bg-primary': 'rgba(246, 246, 247, 1)',
    '--ursa-text-primary': 'rgba(0, 0, 0, 1)',
    '--ursa-text-secondary': 'rgba(128, 128, 128, 1)',
    '--ursa-backdrop': 'rgba(0, 0, 0, 0.5)',
    '--ursa-border-primary': 'rgba(203, 213, 225, 1)',
    '--ursa-nav-bg-primary': 'rgba(255, 255, 255, 1)',
    '--ursa-nav-item-bg-active': 'rgba(204, 251, 241, 1)',
    '--ursa-nav-item-bg-hovered': 'rgba(240, 253, 250, 1)'
  }
};
