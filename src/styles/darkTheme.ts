import { commonStyles } from './common';

export const darkTheme = {
  name: 'dark',
  ...commonStyles,
  color: {
    ...commonStyles.color,
    '--ursa-color-scheme': 'dark',
    '--ursa-bg-primary': 'rgba(4, 12, 24, 1)',
    '--ursa-text-primary': 'rgba(255, 255, 255, 1)',
    '--ursa-text-secondary': 'rgba(128, 128, 128, 1)',
    '--ursa-backdrop': 'rgba(15, 23, 42, 1)',
    '--ursa-border-primary': 'rgba(71, 85, 105, 1)',
    '--ursa-nav-bg-primary': 'rgba(22, 78, 99, 1)',
    '--ursa-nav-item-bg-active': 'rgba(204, 251, 241, 1)',
    '--ursa-nav-item-bg-hovered': 'rgba(21, 94, 117, 1)'
  }
};
