import React from 'react';
import BICell from '../BICell';

const colorObj = [1, 0.8, 0.6, 0.5, 0.4, 0.3];
class BIColorCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: `rgba(75, 193, 255, ${this.getOpacity()})`,
      order: 0,
    }
  }
  getAttribute = type => {
    return this.props[type] ? this.props[type] : this.state[type];
  }
  getOpacity = () => {
    const order = this.props.order ? this.props.order : 0;
    return colorObj[order];
  }

  render() {
    const {bgColor, order, ...props} = this.props;
    return (
      <BICell bgColor={this.getAttribute('bgColor')} {...props}/>
    );
  }
}

export default BIColorCell;
