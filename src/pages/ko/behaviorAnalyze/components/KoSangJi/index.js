import React from 'react';
import BIButton from '@/ant_components/BIButton/index';
import './style.less';

class BIButtonBlue extends React.Component {

  render() {
    return (
      <span className='BIButtonBlue'>
        <BIButton {...this.props}></BIButton>
      </span>
    );
  }
}

export default BIButtonBlue;
