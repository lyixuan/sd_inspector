import React from 'react';
import UserInfo from '../../components/userInfo';
import Bbs from './index';
import styles from './style.css';

export default class BBsWrap extends React.Component {
  render() {
    const { info={},stuId}  = this.props;

    return (
      <div  className={styles.layout}>
        <div className={styles.leftContent}>
          <Bbs stuId={stuId}></Bbs>
        </div>
        <div className={styles.userInfo}>
          <UserInfo info={info} />
        </div>
      </div>
    );
  }
}
