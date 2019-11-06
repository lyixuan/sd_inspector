import React from 'react';
import BICell from '@/components/BICell';

class Indent extends React.Component {
  
  render() {
    const { textalign = 'right' } = this.props;
    return (
      <BICell textalign={textalign}>{this.props.children}</BICell>
    );
  }
}

export default Indent;
