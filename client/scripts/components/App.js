import React from 'react';

import VariableDetail from './VariableDetail';
import VariableHelp from './VariableHelp';
import VariableList from './VariableList';

export default class App extends React.Component {
  render() {
    return <div className='content-panel fill-height vertical-center'>
      <div className='content-panel__container'>
        <VariableDetail/>
        <VariableHelp/>
        <VariableList/>
      </div>
    </div>;
  }
}
