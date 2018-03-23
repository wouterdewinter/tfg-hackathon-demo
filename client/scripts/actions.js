import {
  ACTION_SELECT_VARIABLE,
  ACTION_DESELECT_VARIABLE,

  ACTION_SELECT_COHORT,
  ACTION_DESELECT_COHORT,

  ACTION_FETCH_VARIABLE_DATA,
  ACTION_FETCH_VARIABLE_DATA_SUCCESS,
  ACTION_FETCH_VARIABLE_DATA_ERROR,

  ACTION_FORM_SET_AGE,
  ACTION_FORM_SET_GENDER,

  ACTION_FORM_SUBMIT,
  ACTION_FORM_SUBMIT_SUCCESS,
  ACTION_FORM_SUBMIT_ERROR,

  ACTION_FORM_FLUSH
} from './constants';

import { getVariableData, submitData, flushData } from './api';

export function setAge(age) {
  return { type: ACTION_FORM_SET_AGE, age };
}

export function setGender(gender) {
  return { type: ACTION_FORM_SET_GENDER, gender };
}

export function submit(age, gender) {
  return dispatch => {
    dispatch({ type: ACTION_FORM_SUBMIT });

    return submitData(age, gender).then(
      result => dispatch({ type: ACTION_FORM_SUBMIT_SUCCESS, result })
    ).catch(
      () => dispatch({ type: ACTION_FORM_SUBMIT_ERROR })
    );
  };
}

export function flush() {
  return dispatch => {
    return flushData();
  };
}

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
