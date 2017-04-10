import React from 'react';
// import { createStore } from 'redux';
import configureStore from '../app/store/configureStore';
import { Provider } from 'react-redux';
import rootReducer from '../app/reducers';
import Root from '../app/containers/Root';
import { renderToString } from 'react-dom/server';

import { match, RouterContext } from 'react-router';
import routes from '../app/containers/routes_prm';
import DevTools from '../app/containers/DevTools';

import { processThemesListReq } from '../app/actions/portal';

function handleRender(req, res) {
  // Create a new Redux store instance
  // const store = createStore(rootReducer)
  const store = configureStore();

  // store.dispatch(processThemesListReq('qb2'));

  setTimeout(() => {

    // Grab the initial state from our Redux store
    let preloadedState = store.getState();

    // console.log(preloadedState);

    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        // You can also check renderProps.components or renderProps.routes for
        // your "not found" component or route respectively, and send a 404 as
        // below, if you're using a catch-all route.
        let html;

        if( !(process.env.NODE_ENV=='production') ){
          html = renderToString(
            <Provider store={store}>
              <div>
                  <RouterContext {...renderProps} />
                  <DevTools />
              </div>
            </Provider>
          );
        } else {
          html = renderToString(
            <Provider store={store}>
              <div>
                  <RouterContext {...renderProps} />
              </div>
            </Provider>
          );
        }
        res.status(200).send(renderFullPage(html, preloadedState));
      } else {
        res.status(404).send('Not found');
      }
    })

  }, 1000);

}

function renderFullPage(html, preloadedState) {
  const Handlebars = require('handlebars');
  const fs = require('fs');
  let fileData = fs.readFileSync(__dirname + '/../public/assets/main.html').toString();
  let layoutTemplate = Handlebars.compile(fileData);
  let renderedLayout = layoutTemplate({
    content: `<div id="root"><div>${html}</div></div>`,
    script: `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}</script>`
  });
  // console.log(renderedLayout)
  return renderedLayout;
  // return `
  //   <!doctype html>
  //   <html>
  //     <head>
  //       <title>Redux Universal Example</title>
  //       <link href="/assets/style.css" rel="stylesheet">
  //     </head>
  //     <body>
  //       <div id="root"><div>${html}</div></div>
  //       <script>
  //         window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
  //       </script>
  //       <script src="/assets/bundle.js"></script>
  //     </body>
  //   </html>
  //   `
}

module.exports = handleRender;
//export default handleRender;