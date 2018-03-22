import React from 'react';
import PropTypes from 'prop-types';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import DataStatusIndicator from './DataStatusIndicator';
import JobStatusIndicator from './JobStatusIndicator';
import { connect } from 'react-redux';

import { fetchDataStreams } from 'client/scripts/actions';

const getDataStreamName = dataStream => `${dataStream.item_name} (${dataStream.data_type}, ${dataStream.country})`;

class DataStreamsList extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchDataStreams());
  }
  getTableStyle() {
    if (this.props.isDogeModeActive) {
      return {
        background: 'none transparent'
      };
    }

    return {};
  }
  renderItems() {
    const { items } = this.props;

    return items.map(item => {
      const name = getDataStreamName(item);

      return <TableRow key={item.id}>
        <TableRowColumn title={name}>{name}</TableRowColumn>
        <TableRowColumn>{item.report_center_name}</TableRowColumn>
        <TableRowColumn>{item.source}</TableRowColumn>

        <TableRowColumn>
          <JobStatusIndicator dataStream={item}/>
        </TableRowColumn>
        <TableRowColumn>
          <DataStatusIndicator dataStream={item}/>
        </TableRowColumn>
      </TableRow>;
    });
  }
  renderSpinner() {
    if (!this.props.isFetching) return null;

    return <RefreshIndicator
      size={40}
      left={-20}
      top={80}
      status='loading'
      style={{
        marginLeft: '50%'
      }}/>;
  }
  render() {
    return <div style={{ position: 'relative' }}>
      <Table
        selectable={false}
        style={this.getTableStyle()}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Data stream</TableHeaderColumn>
            <TableHeaderColumn>Report Center</TableHeaderColumn>
            <TableHeaderColumn>Source</TableHeaderColumn>

            <TableHeaderColumn>Job status</TableHeaderColumn>
            <TableHeaderColumn>Data status</TableHeaderColumn>
          </TableRow>
        </TableHeader>

        <TableBody displayRowCheckbox={false}>
          {this.renderItems()}
        </TableBody>
      </Table>

      {this.renderSpinner()}
    </div>;
  }
}

DataStreamsList.propTypes = {
  isDogeModeActive: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired
  })
};

export default connect(state => ({ ...state.dataStreams, isDogeModeActive: state.dogeMode.isActive }))(DataStreamsList);
