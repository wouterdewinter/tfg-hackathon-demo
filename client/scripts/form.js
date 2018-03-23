import '../styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Form from './components/Form';

import createStore from './createStore';
import createInitialState from './createInitialState';

const initialState = createInitialState();
const store = createStore(initialState);
const container = document.querySelector('.box-content');

ReactDOM.render(
  <Provider store={store}>
    <Form/>
  </Provider>,
  container
);
