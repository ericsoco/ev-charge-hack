// @flow
import { createGlobalStyle } from 'styled-components';
import { createMuiTheme } from '@material-ui/core';
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

export default {
  color: '#000000',
  mixins,
};

export const muiTheme = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
    MuiInputBase: {
      classes: {
        input: {
          padding: 0,
        },
      },
    },
  },
});
