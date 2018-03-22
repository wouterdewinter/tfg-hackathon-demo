import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import { grey400, red500, amber500, green500 } from 'material-ui/styles/colors';

export default class DataStatusIndicator extends React.Component {
  render() {
    const jobDateTime = this.props.dataStream.job_date_time;
    const dataDateTime = this.props.dataStream.data_date_time;
    if (!dataDateTime) {
      return <FontIcon
        className='material-icons'
        color={red500}
        title='Data was not stored'>
        error
      </FontIcon>;
    }

    return <FontIcon
      className='material-icons'
      color={green500}
      title={'Eeeeeeeeee'}>
      check_circle
    </FontIcon>;
  }
}

DataStatusIndicator.propTypes = {
  dataStream: PropTypes.shape({
    data_date_time: PropTypes.string,
    job_date_time: PropTypes.string
  }).isRequired
};
