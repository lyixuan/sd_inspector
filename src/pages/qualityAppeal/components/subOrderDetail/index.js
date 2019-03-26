import React from 'react';
import styles from './style.css';

export default class SubOrderDetailComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }
  componentDidMount() {}

  render() {
    const {
      stuName,
      bizDate,
      stuId,
      mobile,
      packageName,
      amount,
      classTeacherName,
      groupName,
    } = this.props.data ? this.props.data : {};
    return (
      <section className={styles.subOrderCon}>
        <span className={styles.secctionTitle}>子订单详情</span>
        <div className={styles.container}>
          <div className={styles.secRow}>
            <div>学员姓名：{stuName}</div>
            <div>报名时间：{bizDate}</div>
            <div>学员id：{stuId}</div>
          </div>
          <div className={styles.secRow}>
            <div>联系方式：{mobile}</div>
            <div>产品包：{packageName}</div>
            <div>缴费金额：{amount}</div>
          </div>
          <div className={styles.secRow}>
            <div>班主任：{classTeacherName}</div>
            <div>组织：{groupName}</div>
          </div>
        </div>
      </section>
    );
  }
}
