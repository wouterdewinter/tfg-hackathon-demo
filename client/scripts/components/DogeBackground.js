import React from 'react';

const ACTION_CLICK = 'click';
const ACTION_KEYPRESS = 'keypress';
const ACTION_MOUSEMOVE = 'mousemove';

export default class DogeBackground extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);

    this.state = {
      actions: []
    };
  }
  componentDidMount() {
    // TODO Enable when thought through
    // window.addEventListener('click', this.onClick);
    // window.addEventListener('keypress', this.onKeyPress);
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.onClick);
    window.removeEventListener('keypress', this.onKeyPress);
  }
  onClick(event) {
    const action = {
      type: ACTION_CLICK,
      x: event.pageX,
      y: event.pageY
    };

    this.addAction(action);
  }
  onKeyPress(event) {
    const action = {
      type: ACTION_KEYPRESS,
      keyCode: event.code || event.keyIdentifier || event.keyCode
    };

    this.addAction(action);
  }
  addAction(action) {
    console.log('adding action');

    this.setState(oldState => ({
      actions: [...oldState.actions, action]
    }));
  }
  render() {
    return <div style={{
      position: 'fixed',
      zIndex: -1,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }}>
      <div style={{
        background: 'url(/images/doge--head.png) center center no-repeat',
        backgroundSize: 'contain',
        width: '100%',
        height: '100%',
        maxWidth: 300,
        maxHeight: 300,
        position: 'absolute',
        right: 20,
        bottom: 20
      }}/>
    </div>;
  }
}
