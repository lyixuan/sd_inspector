import React from 'react';
import styles from './style.css';
import moment from 'moment';
import { BiFilter } from '@/utils/utils';

export default class PersonInfoComponent extends React.Component {
  render() {
    const { userInfo } = this.props;
    const { userName, collegeName, familyName, groupName, mail, roleName } = userInfo||{};

    const groupName2 = groupName ? ` | ${groupName}`:'';
    const familyName2 = familyName ? ` | ${familyName}`:'';
    return (
      <section className={styles.personInfoCon}>
        <div className={styles.boxTitle}>
          <span>学分归属人信息</span>
        </div>
        <div className={styles.container}>
          <div className={styles.secRow}>
            <div>归属人：{userName}</div>
            <div>归属人邮箱：{mail}</div>
          </div>
          <div className={styles.secRow}>
            <div>归属组织：{collegeName}{familyName2}{groupName2}</div>
            <div/>
            {/*<div>归属人角色：{roleName}</div>*/}
          </div>
          <div className={styles.secRow}>
          </div>
        </div>
      </section>
    );
  }
}
