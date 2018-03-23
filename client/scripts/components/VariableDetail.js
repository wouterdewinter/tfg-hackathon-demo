import React from 'react';
import Highcharts from 'highcharts';
import ReactHighcharts from 'react-highcharts';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { VARIABLE_AGE, VARIABLE_GENDER } from '../constants';
import { deselectVariable, fetchVariableData, selectCohort } from '../actions';
import getVariableName from '../utils/getVariableName';
import Spinner from './Spinner';

const ReactWithHighcharts = ReactHighcharts.withHighcharts(Highcharts);

const VARIABLES = [VARIABLE_AGE, VARIABLE_GENDER];

class VariableDetail extends React.Component {
  componentDidMount() {
    this.fetchVariableDataIfNeeded();
    // this.startFetchingData();
  }
  componentDidUpdate() {
    this.fetchVariableDataIfNeeded();
  }
  componentWillUnmount() {
    this.stopFetchingData();
  }
  startFetchingData() {
    this.stopFetchingData();

    this.timer = setInterval(this.props.fetchVariableData, 1000);
    this.fetchVariableDataIfNeeded();
  }
  stopFetchingData() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
  onClickOnChart(categories, event) {
    const category = categories[event.point.index];
    this.props.selectCohort(category);
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
    const weight = data.reduce((sum, point) => sum + point, 0);
    const weightedData = data.map(point => Math.round(point / weight * 100) / 100);

    console.log(weight, data, weightedData);

    return {
      chart: {
        animation: {
          duration: 500
        },
        backgroundColor: 'transparent',
        type: 'column',
        height: 300
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
        data: weightedData
      }],
      tooltip: {
        backgroundColor: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, '#F37021'],
            [1, '#CE0E4A']
          ]
        },
        borderRadius: 15,
        borderWidth: 0,
        shadow: false,
        useHTML: true,
        style: {
          color: '#FFFFFF'
        },
        formatter: function() {
          return `${this.y}% for ${this.series.name} of ${this.x}`;
        }
      },
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

    return <ReactWithHighcharts
      config={this.getChartConfig()}
      domProps={{
        className: 'variable-detail-chart'
      }}/>;
  }
  renderSpinner() {
    if (this.props.variableData) return null;
    if (!this.props.isFetchingVariableData) return null;

    return <Spinner/>;
  }
  render() {
    if (!this.props.selectedVariable) return null;

    return <div className='variable-detail'>
      {this.renderChart()}
      {this.renderSpinner()}
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
