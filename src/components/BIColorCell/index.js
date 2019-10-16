import React from 'react';
import BICell from './BICell';

class BIColorCell extends React.Component {
  constructor(props) {
    super();
    this.state = {
      text: 'ppp',
      color: 'red',

    }
  }
  onClick = obj => {
    if (this.props.onClick && typeof this.props.onClick === 'function') {
      this.props.onClick(obj);
    }
  }
  render() {
    return (
      <BICell/>
    );
  }
}

export default BIColorCell;
