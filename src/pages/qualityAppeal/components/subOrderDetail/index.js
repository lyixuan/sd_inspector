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
      <section>
        <h1>子订单详情</h1>
        <div className={styles.secRow}>
          <div>学员姓名：{this.state.data.name}</div>
          <div>报名时间：{this.state.data.time}</div>
          <div>学员id：{this.state.data.id}</div>
        </div>
        <div className={styles.secRow}>
          <div>联系方式：{this.state.data.contact}</div>
          <div>产品包：{this.state.data.proPack}</div>
          <div>缴费金额：{this.state.data.account}</div>
        </div>
        <div className={styles.secRow}>
          <div>班主任：{this.state.data.department}</div>
          <div>组织：{this.state.data.org}</div>
        </div>
      </section>
    );
  }
}
