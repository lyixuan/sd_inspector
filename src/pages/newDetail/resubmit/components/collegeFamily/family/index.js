import React from 'react';
import styles from './style.less';

class Family extends React.Component {
  render() {
    return (
      <div className={styles.familyWrap}>
        <p className={styles.title}>
          <span></span>
          家族分析
        </p>
      </div>
    );
  }
}

export default Family;
