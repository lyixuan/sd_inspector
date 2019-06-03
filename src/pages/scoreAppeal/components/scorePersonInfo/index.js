import React from 'react';
import styles from './style.css';
import moment from 'moment';
import { BiFilter } from '@/utils/utils';

export default class PersonInfoComponent extends React.Component {
  render() {
    const { data = {} } = this.props;
    const { qualityType, verifyDate, mail, role, collegeName, familyName, groupName, name } = data;

    return (
      <section className={styles.personInfoCon}>
        <div className={styles.boxTitle}>
          <span>学分归属人信息</span>
        </div>
        <div className={styles.container}>
          <div className={styles.secRow}>
            <div>归属人：</div>
            <div>归属人邮箱：</div>
          </div>
          <div className={styles.secRow}>
            <div>归属组织：</div>
            <div>归属人角色：</div>
          </div>
          <div className={styles.secRow}>
          </div>
        </div>
      </section>
    );
  }
}
