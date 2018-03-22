import {
  ACTION_FETCH_VARIABLE_DATA,
  ACTION_FETCH_VARIABLE_DATA_SUCCESS,
  ACTION_FETCH_VARIABLE_DATA_ERROR
} from '../constants';

export default function selectedVariableReducer(state = {}, action) {
  switch (action.type) {
    case ACTION_FETCH_VARIABLE_DATA:
      return {
        ...state,
        isFetching: false
      };

    case ACTION_FETCH_VARIABLE_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data,
        error: null
      };

    case ACTION_FETCH_VARIABLE_DATA_ERROR:
      return {
        ...state,
        isFetching: false,
        data: null,
        error: action.error
      };

    default:
      return state;
  }
}
