import React from 'react';
import styles from './style.css';

export default class PersonInfoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }
  componentDidMount() {}

  render() {
    return (
      <section className={styles.personInfoCon}>
        <div className={styles.personInfo}>
          <span>质检违规详情</span>
          <span>(质检审核通过时间：{this.state.data.verifyDate})</span>
        </div>
        <div className={styles.container}>
          <div className={styles.secRow}>
            <div>质检类型：{this.state.data.qualityType}</div>
            <div>归属人邮箱：{this.state.data.mail}</div>
            <div>归属人角色：{this.state.data.role}</div>
          </div>
          <div className={styles.secRow}>
            <div />
            <div>归属组织：{this.state.data.groupName}</div>
            <div>归属人：{this.state.data.name}</div>
          </div>
        </div>
        <div className={styles.divideLine} />
      </section>
    );
  }
}
