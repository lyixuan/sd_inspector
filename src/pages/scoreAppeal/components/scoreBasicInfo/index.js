import React from 'react';
import styles from './style.css';
import moment from 'moment';
import { BiFilter } from '@/utils/utils';

export default class BasicInfoComponent extends React.Component {
  render() {
    const { qualityInfoCollapse, data = {} } = this.props;
    const { qualityType, verifyDate, mail, role, collegeName, familyName, groupName, name } = data;

    return (
      <section className={styles.personInfoCon}>
        <div className={styles.boxTitle}>
          <span>申诉基础信息</span>
        </div>
        <div className={styles.container}>
          <div className={styles.secRow}>
            <div>学分纬度：</div>
            <div>学分日期：</div>
          </div>
          <div className={styles.secRow}>
            <div>开班电话完成时间：</div>
            <div>&nbsp;</div>
          </div>
          <div className={styles.secRow}>
          </div>
        </div>
      </section>
    );
  }
}
