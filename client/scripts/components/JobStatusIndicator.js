import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import { grey400, red500, amber500, green500 } from 'material-ui/styles/colors';

import { JOB_STATUS_OK_NEW_DATA, JOB_STATUS_OK_DUPLICATE_DATE, JOB_STATUS_ERROR_NORMALIZATION, JOB_STATUS_ERROR_LOADER } from 'common/constants';

export default class JobStatusIndicator extends React.Component {
  render() {
    const jobId = this.props.dataStream.job_id;
    const jobStatus = this.props.dataStream.job_status;
    if (!jobStatus) {
      return <FontIcon
        className='material-icons'
        color={grey400}
        title={`Job ID ${jobId} could not be found`}>
        help
      </FontIcon>;
    }

    const jobDidRun = this.props.dataStream.job_did_run;
    if (!jobDidRun) {
      return <FontIcon
        className='material-icons'
        color={red500}
        title={`Job ID ${jobId} did not run as scheduled`}>
        error
      </FontIcon>;
    }

    const wasSuccessful = jobStatus === JOB_STATUS_OK_NEW_DATA || jobStatus === JOB_STATUS_OK_DUPLICATE_DATE;
    if (!wasSuccessful) {
      return <FontIcon
        className='material-icons'
        color={amber500}
        title={`Job ID ${jobId} was not successful`}>
        error
      </FontIcon>;
    }

    return <FontIcon
      className='material-icons'
      color={green500}
      title={`Job ID ${jobId} was successful`}>
      check_circle
    </FontIcon>;
  }
}

JobStatusIndicator.propTypes = {
  dataStream: PropTypes.shape({
    job_id: PropTypes.number.isRequired,
    job_did_run: PropTypes.bool,
    job_date_time: PropTypes.string,
    job_status: PropTypes.oneOf([JOB_STATUS_OK_NEW_DATA, JOB_STATUS_OK_DUPLICATE_DATE, JOB_STATUS_ERROR_NORMALIZATION, JOB_STATUS_ERROR_LOADER]),
    job_interval: PropTypes.shape({
      months: PropTypes.number.isRequired,
      weeks: PropTypes.number.isRequired,
      days: PropTypes.number.isRequired,
      hours: PropTypes.number.isRequired,
      minutes: PropTypes.number.isRequired,
      seconds: PropTypes.number.isRequired
    })
  }).isRequired
};
