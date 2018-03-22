import React from 'react';
import Highcharts from 'highcharts';
import ReactHighcharts from 'react-highcharts';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { VARIABLE_AGE, VARIABLE_GENDER } from '../constants';
import { deselectVariable, fetchVariableData, selectCohort } from '../actions';
import getVariableDescription from '../utils/getVariableDescription';
import getVariableName from '../utils/getVariableName';

const ReactWithHighcharts = ReactHighcharts.withHighcharts(Highcharts);

const VARIABLES = [VARIABLE_AGE, VARIABLE_GENDER];

class VariableDetail extends React.Component {
  componentDidMount() {
    this.fetchVariableDataIfNeeded();
  }
  componentDidUpdate() {
    this.fetchVariableDataIfNeeded();
  }
  onClickOnChart(categories, event) {
    console.log('on click on chart', event);

    const category = categories[event.point.index];
    this.selectCohort(category);
  }
  fetchVariableDataIfNeeded() {
    const { variableData, isFetchingVariableData, selectedVariable } = this.props;
    if (selectedVariable && !variableData && !isFetchingVariableData) {
      this.props.fetchVariableData();
    }
  }
  getChartConfig() {
    const { variableData, selectedVariable } = this.props;
    const variableDataForVariable = variableData[selectedVariable];
    const name = getVariableName(selectedVariable);
    const categories = Object.keys(variableDataForVariable);
    const data = categories.map(category => variableDataForVariable[category]);

    return {
      chart: {
        backgroundColor: 'transparent',
        type: 'column'
      },
      title: null,
      subtitle: null,
      legend: {
        enabled: false
      },
      xAxis: {
        gridLineWidth: 0,
        lineWidth: 1,
        minorGridLineWidth: 0,
        categories,
        tickLength: 0,
        minorTickLength: 0,
        lineColor: '#FFFFFF',
        labels: {
          style: {
            color: '#FFFFFF'
          }
        }
      },
      yAxis: {
        gridLineColor: 'rgba(127, 127, 127, 0.5)',
        gridLineWidth: 1,
        minorGridLineWidth: 0,
        min: 0,
        labels: {
          enabled: false
        },
        title: {
          text: null
        }
      },
      series: [{
        name,
        data
      }],
      plotOptions: {
        series: {
          borderRadius: 3,
          pointPadding: 0,
          groupPadding: 0.1,
          borderWidth: 0,
          color: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
              [0, '#F37021'],
              [1, '#CE0E4A']
            ]
          },
          events: {
            click: this.onClickOnChart.bind(this, categories)
          }
        }
      }
    };
  }
  renderChart() {
    if (!this.props.variableData) return null;

    return <ReactWithHighcharts config={this.getChartConfig()}/>;
  }
  render() {
    if (!this.props.selectedVariable) return null;

    return <div className='variable-detail'>
      <h1>{getVariableName(this.props.selectedVariable)}</h1>

      <p>
        {getVariableDescription(this.props.selectedVariable)}
      </p>

      <div>
        {this.renderChart()}
      </div>
    </div>;
  }
}

VariableDetail.propTypes = {
  selectedVariable: PropTypes.oneOf(VARIABLES),
  isFetchingVariableData: PropTypes.bool.isRequired,
  variableData: PropTypes.objectOf(PropTypes.number),
  onDeselectVariable: PropTypes.func.isRequired
};

const mapStateToProps = ({ selectedVariable, variableData }) => {
  return {
    selectedVariable,
    isFetchingVariableData: variableData.isFetching,
    variableData: variableData.data
  };
};
const mapDispatchToProps = dispatch => ({
  fetchVariableData: () => dispatch(fetchVariableData()),
  selectCohort: cohort => selectCohort(cohort),
  deselectVariable: () => dispatch(deselectVariable())
});

export default connect(mapStateToProps, mapDispatchToProps)(VariableDetail);
