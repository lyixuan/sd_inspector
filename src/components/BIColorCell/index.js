import React from 'react';
import BICell from './BICell';
import styles from './style.less';

const colorObj = [1, 0.8, 0.6, 0.5, 0.4, 0.3];
class BIColorCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: `rgba(75, 253, 255,)`,
    }
  }
  getAttribute = type => {
    return this.props[type] ? this.props[type] : this.state[type];
  }
  render() {
    return (
      <BICell styles={{backgroundColor: this.getAttribute('bgColor') }} {...this.props}/>
    );
  }
}

export default BIColorCell;
