import React from 'react';
import styles from './style.css';
import { BiFilter } from '@/utils/utils';
import moment from 'moment/moment';


export default class IllegalInfo extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <section className={styles.personInfoCon}>
        <div className={styles.boxTitle}>
          <span>违规基础信息</span>
        </div>
        <div className={styles.container}>
          <div className={styles.secRow}>
            <div><span className={styles.spanLabel}>违规日期</span>：{moment(data.violationDate).format('YYYY-MM-DD')}</div>
            <div><span className={styles.spanLabel}>扣分日期</span>：{moment(data.reduceScoreDate).format('YYYY-MM-DD')}</div>
            <div><span className={styles.spanLabel}>质检类型</span>：{BiFilter(`QUALITY_TYPE|id:${data.qualityType}`).name}</div>
            <div><span className={styles.spanLabel}>分维</span>：{data.mail}</div>
            <div><span className={styles.spanLabel}>违规分类</span>：{data.mail}</div>
          </div>
          <div className={styles.secRow}>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
            <div><span className={styles.spanLabel}>学院类型</span>：{data.mail}</div>
            <div><span className={styles.spanLabel}>违规等级</span>：{data.mail}</div>
            <div>&nbsp;</div>
          </div>
        </div>
      </section>
    );
  }
}
