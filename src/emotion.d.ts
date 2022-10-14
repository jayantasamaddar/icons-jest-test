import '@emotion/react';
import { Color, Font, FontSize, Border } from './types/theme';

declare module '@emotion/react' {
  export interface Theme {
    color: Color,
    font: Font,
    fontSize: FontSize,
    border: Border
  }
}