import React, { Component } from 'react';
import styles from './indexPage.less';
import homeImg from '@/assets/homeImg.png';
import homeText from '@/assets/homeText.png';
import XdWorkbench from '../xdWorkbench'

class IndexPage extends Component {
  render() {
    const admin_user = localStorage.getItem('admin_user');
    const userType = JSON.parse(admin_user) ? JSON.parse(admin_user).userType : null;
    return (
      <>
        {userType === 'class' || userType === 'group' ? <XdWorkbench/> : <div className={styles.container}>
          <div className={styles.content}>
            <img src={homeImg} alt="首页" className={styles.homeImg} />
            <div className={styles.userDescription}>
              <img src={homeText} alt="首页文字" />
            </div>
          </div>
        </div> }
      </>
    );
  }
}

export default IndexPage;
