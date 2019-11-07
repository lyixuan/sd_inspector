import React from 'react';
import BICell from '@/components/BICell';
import styles from './style.less'

class BITextCell extends React.Component {
  render() {
    const { className='', ...props} = this.props;
    return (
      <BICell className={`${styles.BITextCell} ${className}`} {...props}/>
    );
  }
}

export default BITextCell;