import React from 'react';

import VariableDetail from './VariableDetail';
import VariableHelp from './VariableHelp';
import VariableList from './VariableList';

export default class App extends React.Component {
  render() {
    return <div className='app'>
      <h1 className='content-title text-right'>Statistics</h1>

      <div className='content-panel'>
        <VariableDetail/>
        <VariableHelp/>
        <VariableList/>
      </div>
    </div>;
  }
}
