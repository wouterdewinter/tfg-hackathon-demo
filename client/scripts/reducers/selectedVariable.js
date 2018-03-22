import {
  ACTION_SELECT_VARIABLE,
  ACTION_DESELECT_VARIABLE
} from '../constants';

export default function selectedVariableReducer(state = {}, action) {
  switch (action.type) {
    case ACTION_SELECT_VARIABLE:
      return action.variable;

    case ACTION_DESELECT_VARIABLE:
      return null;

    default:
      return state;
  }
}
