import React from 'react';
import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';

class BIRepeatProgress extends React.Component {
  getStyle = () => {
    const { style } = this.props;
    if (style) {
      return {
        marginTop: '10px',
        ...style
      }
    } else {
      return {
        marginTop: '10px'
      }
    }
  }
  render() {
    const { style, ...props} = this.props;
    return(
      <BIWrapperProgress style={{...this.getStyle()}} {...props}/>
    )
  }
}
export default BIRepeatProgress;
