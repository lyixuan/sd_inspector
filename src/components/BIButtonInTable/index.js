import React from 'react';
import BIButton from '@/ant_components/BIButton';
import './style.less';

class BIButtonInTable extends React.Component {

  render() {
    return (
      <span className='BIButtonInTable'>
        <BIButton {...this.props}></BIButton>
      </span>
    );
  }
}

export default BIButtonInTable;
