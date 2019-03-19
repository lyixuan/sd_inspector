import React from 'react';
import BIButton from '@/ant_components/BIButton';
import './style.less';

class BIButtonGreen extends React.Component {

  render() {
    return (
      <span className='BIButtonGreen'>
        <BIButton {...this.props}></BIButton>
      </span>
    );
  }
}

export default BIButtonGreen;
