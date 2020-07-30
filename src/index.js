// @flow
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { BaseProvider } from 'baseui';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';

import initialState from './state';
import rootReducer from './state/root-reducer';
import {
  BASE_WEB_THEME,
  STYLED_COMPONENTS_THEME,
  GlobalStyles,
} from './view/style/theme';
import App from './view/app';
import FourOhFour from './view/404';

const store = createStore(rootReducer, initialState);
const appElement = document.getElementById('app');
const basePath = process.env.BASE_PATH || '';

const styletronEngine = new Styletron();

if (appElement) {
  const bwt = BASE_WEB_THEME;
  console.log(bwt);
  render(
    <Provider store={store}>
      <StyletronProvider value={styletronEngine}>
        <BaseProvider theme={BASE_WEB_THEME}>
          <ThemeProvider theme={STYLED_COMPONENTS_THEME}>
            <BrowserRouter basename={`/${basePath}`}>
              <Switch>
                <Route path={'/'} exact component={App} />
                <Route component={FourOhFour} />
              </Switch>
            </BrowserRouter>
            <GlobalStyles />
          </ThemeProvider>
        </BaseProvider>
      </StyletronProvider>
    </Provider>,
    appElement
  );
}
