import React from 'react';
import { thousandsFormat } from '@/utils/utils';

class IndentNum extends React.Component {
  getMarNum = () => {
    const { valueNum = -8, children } = this.props;
    if (Number(children) < 0 ) {
      return valueNum;
    } else {
      return valueNum + 8;
    }
  }
  render() {
    return (
      <div style={{ marginLeft: this.getMarNum()}} {...this.props}>{this.props.children}{this.props.unit}</div>
    );
  }
}

export default IndentNum;
