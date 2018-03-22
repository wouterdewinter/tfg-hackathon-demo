import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class VariableHelp extends React.Component {
  render() {
    if (this.props.isVariableSelected) return null;

    return <div className='variable-help'>
      <h1>Hamsters</h1>

      <p>
        They have age and gender. Start with one.
      </p>
    </div>;
  }
}

VariableHelp.propTypes = {
  isVariableSelected: PropTypes.bool.isRequired
};

const mapStateToProps = ({ selectedVariable }) => ({ isVariableSelected: !!selectedVariable });

export default connect(mapStateToProps)(VariableHelp);
