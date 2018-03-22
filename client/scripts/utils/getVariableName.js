import { VARIABLE_AGE, VARIABLE_GENDER } from '../constants';

export default function getVariableName(variable) {
  switch (variable) {
    case VARIABLE_AGE:
      return 'Age';

    case VARIABLE_GENDER:
      return 'Gender';

    default:
      throw new Error(`Invalid variable: ${variable}`);
  }
}
