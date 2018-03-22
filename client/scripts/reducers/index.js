import { combineReducers } from 'redux';

import selectedVariable from './selectedVariable';
import variableData from './variableData';

export default combineReducers({ selectedVariable, variableData });
