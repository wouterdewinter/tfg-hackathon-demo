import '../styles/index.scss';
import '../icons';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';

import createStore from './createStore';
import createInitialState from './createInitialState';

const initialState = createInitialState();
const store = createStore(initialState);
const container = document.querySelector('.box-content');

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  container
);
