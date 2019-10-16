import React from 'react';
import BICell from '../BICell';

const colorObj = [1, 0.8, 0.6, 0.5, 0.4, 0.3];
class BIColorCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: `rgba(75, 253, 255, ${this.getOpacity()})`,
    }
  }
  getAttribute = type => {
    return this.props[type] ? this.props[type] : this.state[type];
  }
  getOpacity = () => {
    return this.props.order ? colorObj[this.props.order] : colorObj[0];
  }
  render() {
    return (
      <BICell bgColor={this.getAttribute('bgColor')} {...this.props}/>
    );
  }
}

export default BIColorCell;
