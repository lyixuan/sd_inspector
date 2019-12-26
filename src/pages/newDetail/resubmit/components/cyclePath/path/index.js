import React from 'react';
import styles from './style.less';

class Path extends React.Component {
  render() {
    return (
      <div className={styles.familyWrap}>
        <p className={styles.title}>
          <span></span>
          转班路径
          <i>(自考)</i>
        </p>
      </div>
    );
  }
}

export default Path;
