import React from 'react';
import UserInfo from '../../components/userInfo';
import Im from './index';
import styles from './style.css';

export default class ImWrap extends React.Component {
  render() {
    const { info={},stuId}  = this.props;

    return (
      <div  className={styles.layout}>
        <div className={styles.leftContent}>
          <Im stuId={stuId} />
        </div>
        <div className={styles.userInfo}>
          <UserInfo info={info} />
        </div>
      </div>
    );
  }
}
