import React from 'react';
import BICell from '@/components/BICell';

class Indent extends React.Component {
  
  render() {
    const { textalign = 'right', style={} } = this.props;
    return (
      <BICell textalign={textalign} style={style}>{this.props.children}</BICell>
    );
  }
}

export default Indent;
