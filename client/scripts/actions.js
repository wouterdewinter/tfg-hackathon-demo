import {
  ACTION_SELECT_VARIABLE,
  ACTION_DESELECT_VARIABLE,

  ACTION_SELECT_COHORT,
  ACTION_DESELECT_COHORT,

  ACTION_FETCH_VARIABLE_DATA,
  ACTION_FETCH_VARIABLE_DATA_SUCCESS,
  ACTION_FETCH_VARIABLE_DATA_ERROR
} from './constants';

import { getVariableData } from './api';

export function fetchVariableData() {
  return dispatch => {
    dispatch({ type: ACTION_FETCH_VARIABLE_DATA });

    return getVariableData().then(
      data => dispatch({ type: ACTION_FETCH_VARIABLE_DATA_SUCCESS, data })
    ).catch(
      error => dispatch({ type: ACTION_FETCH_VARIABLE_DATA_ERROR, error })
    );
  };
}

export function selectVariable(variable) {
  return { type: ACTION_SELECT_VARIABLE, variable };
}

export function deselectVariable() {
  return { type: ACTION_DESELECT_VARIABLE };
}

export function selectCohort(cohort) {
  return { type: ACTION_SELECT_COHORT, cohort };
}

export function deselectCohort() {
  return { type: ACTION_DESELECT_COHORT };
}
