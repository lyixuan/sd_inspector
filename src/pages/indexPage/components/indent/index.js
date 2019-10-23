import React from 'react';

class Indent extends React.Component {
  render() {
    const { valueNum = -8 } = this.props;
    return (
      <div style={{ marginLeft: valueNum}} {...this.props}>{this.props.children}</div>
    );
  }
}

export default Indent;
