import React from 'react';

import VariableDetail from './VariableDetail';
import VariableHelp from './VariableHelp';
import VariableList from './VariableList';

export default class App extends React.Component {
  render() {
    return <div className='content-panel fill-height vertical-center'>
      <div className='container'>
        <div className='row'>
          <div className='col-3'>
            <VariableList/>
          </div>

          <div className='col-9'>
            <VariableDetail/>
            <VariableHelp/>
          </div>
        </div>
      </div>
    </div>;
  }
}
