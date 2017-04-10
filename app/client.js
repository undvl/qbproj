import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Root from './containers/Root';
import configureStore from './store/configureStore';

import { AppContainer } from 'react-hot-loader';

const preloadedState = window.__PRELOADED_STATE__;

const store = configureStore(preloadedState);

// console.log(preloadedState);
// const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

const rootEl = document.getElementById('root');

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  rootEl
);

if (module.hot) {
  // module.hot.decline('./containers/Routes.js');
  module.hot.accept('./containers/Root', () => {
    setTimeout(() => {
      unmountComponentAtNode(rootEl);
      const NextApp = require('./containers/Root').default;

      render(
        <AppContainer>
          <NextApp store={store} history={history} />
        </AppContainer>,
        rootEl
      );
    });
  });
  // module.hot.accept('./containers/Root', () => {
  //   // If you use Webpack 2 in ES modules mode, you can
  //   // use <App /> here rather than require() a <NextApp />.
  //   const NextApp = require('./containers/Root').default;

  //   render(
  //     <AppContainer>
  //       <NextApp store={store} history={history} />
  //     </AppContainer>,
  //     rootEl
  //   );
  // });
}
