import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { Provider } from 'react-redux';

import reducers from './reducers';

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
