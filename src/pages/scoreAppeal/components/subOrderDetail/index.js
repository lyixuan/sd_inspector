import React from 'react';
import moment from 'moment';
import styles from './style.css';

export default class SubOrderDetailComponent extends React.Component {
  renderOrd = (collegeName, familyName, groupName) => {
    if (collegeName && familyName && groupName) {
      return `${collegeName} | ${familyName} | ${groupName}`;
    } else if (collegeName && familyName) {
      return `${collegeName} | ${familyName}`;
    } else if (collegeName) {
      return `${collegeName}`;
    } else {
      return null;
    }
  };
  render() {
    const { data } = this.props;
    const {
      stuName,
      bizDate,
      stuId,
      mobile,
      packageName,
      amount,
      classTeacherName,
      collegeName,
      familyName,
      groupName,
    } = data || {};

    return (
      <section className={styles.subOrderCon}>
        <span className={styles.boxTitle}>子订单详情</span>
        <div className={styles.container}>
          <div className={styles.secRow}>
            <div>学员姓名：</div>
            <div>学员ID：</div>
            <div>组织：</div>
          </div>
          <div className={styles.secRow}>
            <div>子订单编号：</div>
            <div>实际支付金额：</div>
            <div>订单状态：</div>
          </div>
          <div className={styles.secRow}>
            <div>报名时间：</div>
            <div>产品包：</div>
            <div>班主任花名：</div>
          </div>
        </div>
      </section>
    );
  }
}
