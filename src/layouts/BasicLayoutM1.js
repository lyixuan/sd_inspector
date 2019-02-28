import React  from 'react';
import styles from './basicLayout.less'

function BasicLayoutM1(props) {
  return (
    <div className={styles.basicWrap}>
      <div className={styles.headerWrap}>智能报考督学平台</div>
      { props.children }
    </div>
  );
}

export default BasicLayoutM1;
