import React from 'react';
import styles from './style.css';
import { BiFilter } from '@/utils/utils';


export default class PersonInfoComponent extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <section className={styles.personInfoCon}>
        <div className={styles.boxTitle}>
          <span>质检归属人信息</span>
        </div>
        <div className={styles.container}>
          <div className={styles.secRow}>
            <div><span className={styles.spanLabel}>邮箱</span>：{data.mail}</div>
            <div><span className={styles.spanLabel}>姓名</span>：{data.name}</div>
          </div>
          <div className={styles.secRow}>
            <div><span className={styles.spanLabel}>角色</span>：{BiFilter(`FRONT_ROLE_TYPE_LIST|id:${data.role}`).name}</div>
            <div><span className={styles.spanLabel}>组织架构</span>：{data.collegeName} {data.familyName && '|'} {data.familyName} {data.familyName && '|'} {data.groupName}</div>
          </div>
        </div>
      </section>
    );
  }
}
