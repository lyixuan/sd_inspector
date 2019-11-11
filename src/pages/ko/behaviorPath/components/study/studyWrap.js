import React from 'react';
import UserInfo from '../../components/userInfo';
import Study from './index';
import styles from './style.css';

export default class StudyWrap extends React.Component {
  render() {
    const { info={},stuId}  = this.props;

    return (
      <div  className={styles.layout}>
        <div className={styles.leftContent}>
          <Study stuId={stuId} />
        </div>
        <div className={styles.userInfo}>
          <UserInfo info={info} />
        </div>
      </div>
    );
  }
}
