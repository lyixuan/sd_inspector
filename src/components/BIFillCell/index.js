import React from 'react';
import BICell from '../BICell';
import styles from './style.less'

class BIFillCell extends React.Component {
  render() {
    const { className='', ...props} = this.props;
    return (
      <BICell className={`${styles.BIFillCell} ${className}`} {...props}/>
    );
  }
}

export default BIFillCell;

