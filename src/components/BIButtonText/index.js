import React from 'react';
import BIButton from '@/ant_components/BIButton';
import './style.less';

class BIButtonText extends React.Component {

  render() {
    return (
      <span className='BIButtonText'>
        <BIButton {...this.props}></BIButton>
      </span>
    );
  }
}

export default BIButtonText;
