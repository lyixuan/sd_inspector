import React from 'react';
import styles from './style.css';
import ScorePersonInfo from '../scorePersonInfo';
import ScoreBasicInfo from '../scoreBasicInfo';
import SubOrderDetail from '../subOrderDetail';

export default class PersonInfoComponent extends React.Component {
  render() {
    const { detailInfo,dimensionType}  = this.props;
    const {userInfo={},orderInfo={},baseAppealInfo={}}=detailInfo||{};
    return (
      <>
        {/* 学分归属人信息 */}
        <ScorePersonInfo userInfo={userInfo}/>
        <div className={styles.spaceLine}/>
        {/* 子订单详情 */}
        {orderInfo&&<SubOrderDetail orderInfo={orderInfo}  dimensionType={Number(dimensionType)}/>}
        {orderInfo&&<div className={styles.spaceLine}/>}
        {/* 申诉基础信息 */}
        <ScoreBasicInfo baseAppealInfo={baseAppealInfo} dimensionType={Number(dimensionType)}/>
        <div className={styles.spaceLine}/>
      </>
    );
  }
}
