import { combineReducers } from 'redux';

import form from './form';
import selectedVariable from './selectedVariable';
import variableData from './variableData';

export default combineReducers({ form, selectedVariable, variableData });
