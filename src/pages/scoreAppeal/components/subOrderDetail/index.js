import React from 'react';
import moment from 'moment';
import styles from './style.css';

export default class SubOrderDetailComponent extends React.Component {
  render() {
    const { orderInfo } = this.props;
    const {stuName,orderNum,signDate,stuId,actualAmount,productName,collegeName, familyName, groupName,orderStatus,nickName} = orderInfo || {};
    const groupName2 = groupName ? ` | ${groupName}`:'';
    const familyName2 = familyName ? ` | ${familyName}`:'';
    return (
      <section className={styles.subOrderCon}>
        <span className={styles.boxTitle}>子订单详情</span>
        <div className={styles.container}>
          <div className={styles.secRow}>
            <div>学员姓名：{stuName}</div>
            <div>学员ID：{stuId}</div>
            <div>组织：{collegeName}{familyName2}{groupName2}</div>
          </div>
          <div className={styles.secRow}>
            <div>子订单编号：{orderNum}</div>
            <div>实际支付金额：{actualAmount}</div>
            <div>订单状态：{orderStatus}</div>
          </div>
          <div className={styles.secRow}>
            <div>报名时间：{signDate}</div>
            <div>产品包：{productName}</div>
            <div>班主任花名：{nickName}</div>
          </div>
        </div>
      </section>
    );
  }
}
