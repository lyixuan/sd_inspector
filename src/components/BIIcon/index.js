import React from 'react';
import styles from './style.less';
import deleteIcon from '@/assets/component/delete.png';

class BIIcon extends React.Component {
  render() {
    return (
      <img className={styles.BIIcon} src={deleteIcon} {...this.props}/>
    );
  }
}

export default BIIcon;

