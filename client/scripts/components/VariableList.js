import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';

import { VARIABLE_AGE, VARIABLE_GENDER } from '../constants';
import { selectVariable } from '../actions';
import getVariableName from '../utils/getVariableName';

const VARIABLES = [VARIABLE_AGE, VARIABLE_GENDER];

class VariableList extends React.Component {
  renderVariable(variable) {
    const isSelected = variable === this.props.selectedVariable;
    const className = classnames('content-panel-button', isSelected && 'content-panel-button--active');
    const onClick = isSelected ? null : this.props.onSelectVariable.bind(null, variable);

    return <button
      type='button'
      key={variable}
      className={className}
      onClick={onClick}>
      {getVariableName(variable)}
    </button>;
  }
  render() {
    return <div>
      {VARIABLES.map(variable => this.renderVariable(variable))}
    </div>;
  }
}

VariableList.propTypes = {
  selectedVariable: PropTypes.oneOf(VARIABLES),
  variableStatus: PropTypes.shape({
    [VARIABLE_AGE]: PropTypes.bool.isRequired,
    [VARIABLE_GENDER]: PropTypes.bool.isRequired
  }).isRequired,
  onSelectVariable: PropTypes.func.isRequired
};

const mapStateToProps = ({ selectedVariable, variableStatus }) => ({ selectedVariable, variableStatus });
const mapDispatchToProps = dispatch => ({
  onSelectVariable: variable => dispatch(selectVariable(variable))
});

export default connect(mapStateToProps, mapDispatchToProps)(VariableList);
