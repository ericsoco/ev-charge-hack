// @flow
import { createGlobalStyle } from 'styled-components';
import { LightTheme, type ThemeT } from 'baseui';
import reset from './reset';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Lato&display=fallback');
  ${reset}
  body {
    font-family: 'Lato', sans-serif;
  }
`;

/**
 * Usage:
 * styled.div`
 *   ${p => p.theme.mixins.h1};
 *   ...other styles...
 * `
 */
const mixins = {
  h1: {
    'font-size': '2rem',
  },
  h2: {
    'font-size': '1.25rem',
  },
};

const APP_THEME = {
  color: '#000000',
  mixins,
};

export const STYLED_COMPONENTS_THEME = {
  ...APP_THEME,
};

/**
 * Merges Base Web theme with app themes.
 * For use with Base Web / Styletron components.
 */
export const BASE_WEB_THEME: ThemeT = ({
  ...LightTheme,
  ...APP_THEME,
  // BaseProvider requires an exact type for theme,
  // making extension impossible
}: any);
