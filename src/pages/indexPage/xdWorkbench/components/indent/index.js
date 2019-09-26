import React from 'react';

class Indent extends React.Component {
  getMarNum = () => {
    const { valueNum, children } = this.props;
    let num = -8;
    if (valueNum) {
      num = valueNum;
    }else if (typeof children === "number" && children < 0) {
      num = -12;
    }
    return num;
  }
  render() {
    return (
      <div style={{ marginLeft: this.getMarNum()}}>{this.props.children}</div>
    );
  }
}

export default Indent;
