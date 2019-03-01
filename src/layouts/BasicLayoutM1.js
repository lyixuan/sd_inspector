import React  from 'react';
import styles from './basicLayout.less'

function BasicLayoutM1(props) {
  return (
    <div className={styles.basicWrap}>
      <div className={styles.headerWrap} />
      { props.children }
    </div>
  );
}

export default BasicLayoutM1;
