import React from 'react';
import styles from './style.css';
import moment from 'moment';

export default class PersonInfoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }
  componentDidMount() {}

  render() {
    const { qualityType, verifyDate, mail, role, groupName, name } = this.props.data;
    return (
      <section className={styles.personInfoCon}>
        <div className={styles.personInfo}>
          <span>质检违规详情</span>
          <span>(质检审核通过时间：{moment(verifyDate).format('YYYY-MM-DD HH:mm:ss')})</span>
        </div>
        <div className={styles.container}>
          <div className={styles.secRow}>
            <div>质检类型：{qualityType == 1 ? '客诉质检' : '班主任质检'}</div>
            <div>归属人邮箱：{mail}</div>
            <div>归属人角色：{role}</div>
          </div>
          <div className={styles.secRow}>
            <div />
            <div>归属组织：{groupName}</div>
            <div>归属人：{name}</div>
          </div>
        </div>
        <div className={styles.divideLine} />
      </section>
    );
  }
}
