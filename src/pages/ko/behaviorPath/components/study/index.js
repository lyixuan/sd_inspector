import React from 'react';
import UserInfo from './../userInfo';
import styles from '../../style.less';
class Study extends React.Component {

  render() {
    return (
      <div className={styles.comWrap}>

        <UserInfo></UserInfo>
      </div>
    );
  }
}

export default Study;
