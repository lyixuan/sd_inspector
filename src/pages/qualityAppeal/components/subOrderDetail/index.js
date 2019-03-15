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
    return (
      <section className={styles.subOrderCon}>
        <span className={styles.secctionTitle}>子订单详情</span>
        <div className={styles.container}>
          <div className={styles.secRow}>
            <div>学员姓名：{this.state.data.stuName}</div>
            <div>报名时间：{this.state.data.signDate}</div>
            <div>学员id：{this.state.data.stuId}</div>
          </div>
          <div className={styles.secRow}>
            <div>联系方式：{this.state.data.phoneNum}</div>
            <div>产品包：{this.state.data.produce}</div>
            <div>缴费金额：{this.state.data.payment}</div>
          </div>
          <div className={styles.secRow}>
            <div>班主任：{this.state.data.teaName}</div>
            <div>组织：{this.state.data.groupName}</div>
          </div>
        </div>
      </section>
    );
  }
}
