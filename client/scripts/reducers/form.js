import {
  ACTION_FORM_SET_AGE,
  ACTION_FORM_SET_GENDER,

  ACTION_FORM_SUBMIT,
  ACTION_FORM_SUBMIT_SUCCESS,
  ACTION_FORM_SUBMIT_ERROR
} from '../constants';

export default function selectedVariableReducer(state = {}, action) {
  switch (action.type) {
    case ACTION_FORM_SET_AGE:
      return {
        ...state,
        age: action.age
      };

    case ACTION_FORM_SET_GENDER:
      return {
        ...state,
        gender: action.gender
      };

    case ACTION_FORM_SUBMIT:
      return {
        ...state,
        isSubmitting: true
      };

    case ACTION_FORM_SUBMIT_ERROR:
    case ACTION_FORM_SUBMIT_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        result: action.result.result
      };

    default:
      return state;
  }
}
