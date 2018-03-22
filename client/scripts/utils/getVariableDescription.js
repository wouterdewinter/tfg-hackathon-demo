import { VARIABLE_AGE, VARIABLE_GENDER } from '../constants';

export default function getVariableDescription(variable) {
  switch (variable) {
    case VARIABLE_AGE:
      return 'The older the hamster gets, the more chubby it gets';

    case VARIABLE_GENDER:
      return 'There are boy hamsters and girl hamsters';

    default:
      throw new Error(`Invalid variable: ${variable}`);
  }
}
