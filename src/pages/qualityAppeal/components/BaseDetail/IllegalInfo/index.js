import React from 'react';
import styles from './style.css';
import { BiFilter } from '@/utils/utils';
import moment from 'moment/moment';


export default class IllegalInfo extends React.Component {
  renderAttached = ()=>{
    const { data } = this.props;
    const { attachedPersonList = []} = data || {};
    attachedPersonList && attachedPersonList.map((v)=>{
      return <div>
        <span>{v.roleName?v.roleName:'--'}</span>
        <span>{v.userName?v.userName:'--'}@sunlands.com</span>
        <span>{v.punishType?v.punishType:''}</span>
        <span>{v.qualityValue?v.qualityValue:'--'}</span>
      </div>
    });
  };
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
            <div><span className={styles.spanLabel}>分维</span>：{data.dimension}</div>
            <div><span className={styles.spanLabel}>违规分类</span>：{data.thirdAssortment}</div>
          </div>
          <div className={styles.secRow}>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
            <div><span className={styles.spanLabel}>学院类型</span>：{BiFilter(`FAMILY_TYPE|id:${data.familyType}`).name}</div>
            <div>&nbsp;</div>
            <div><span className={styles.spanLabel}>违规等级</span>：{data.violationLevelName}</div>
          </div>
        </div>
        <div style={{padding:'10px 20px'}}><div className={styles.line}></div></div>
        <div className={styles.container}>
          <div className={styles.secRow}>
            <div><span className={styles.spanLabel}>责任人处罚</span>：{BiFilter(`PUNISH_TYPE_LIST|id:${data.qualityType}`).name} {data.ownQualityValue}{data.qualityType?data.qualityType===2?'分':'元':''}</div>
            <div><span className={styles.spanLabel}>连带责任人处罚</span>：{this.renderAttached()}</div>
          </div>
        </div>
      </section>
    );
  }
}
