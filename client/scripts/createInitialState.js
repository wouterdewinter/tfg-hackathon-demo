import { VARIABLE_AGE } from './constants';

export default function createInitalState() {
  return {
    selectedVariable: VARIABLE_AGE,
    variableData: {
      isFetching: false,
      data: null,
      error: null
    },
    variableStatus: {
      age: true,
      gender: false
    }
  };
}
