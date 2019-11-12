import React from 'react';
import { Spin,Empty } from 'antd';
import UserInfo from '../../components/userInfo';
import styles from './style.css';

export default class Score extends React.Component {
  render() {
    const { baseInfo={},info={},isLoading=false}  = this.props;

    return (
      <Spin spinning={isLoading}>
        {baseInfo?<div  className={styles.layout}>
            <div className={styles.leftContent}>
              成绩
            </div>
          <div className={styles.userInfo}>
            <UserInfo info={info} />
          </div>
        </div>:
        <div className={styles.layout1}>
          <div className={styles.contentLayout} style={{minHeight:800,marginBottom:20,paddingTop:50}}><Empty/> </div>
        </div>
        }
      </Spin>
    );
  }
}
