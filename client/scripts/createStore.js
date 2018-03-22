import { applyMiddleware, createStore as createReduxStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from './utils/loggerMiddleware';

import reducers from './reducers';

export default function createStore(initialState) {
  const enhancer = applyMiddleware(thunkMiddleware, loggerMiddleware);

  return createReduxStore(reducers, initialState, enhancer);
}
