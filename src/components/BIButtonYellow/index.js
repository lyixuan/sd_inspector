import React from 'react';
import BIButton from '@/ant_components/BIButton';
import './style.less';

class BIButtonYellow extends React.Component {

  render() {
    return (
      <span className='BIButtonYellow'>
        <BIButton {...this.props}></BIButton>
      </span>
    );
  }
}

export default BIButtonYellow;
