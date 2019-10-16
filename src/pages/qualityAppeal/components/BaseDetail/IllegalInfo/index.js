import React from 'react';
import styles from './style.css';
import { BiFilter } from '@/utils/utils';
import moment from 'moment/moment';


export default class IllegalInfo extends React.Component {
  renderAttached = ()=>{
    const { data } = this.props;
    const { attachedPersonList = []} = data || {};
    return attachedPersonList && attachedPersonList.map((v,i)=>{
      return <div key={i}>
        <span>{v.roleName?BiFilter(`FRONT_ROLE_TYPE_LIST|id:${v.roleName}`).name:'--'}</span>，
        <span>{v.userName?v.userName:'--'}@sunlands.com</span>，
        <span>{v.punishType?BiFilter(`PUNISH_TYPE_LIST|id:${v.punishType}`).name:'--'}</span>，
        <span>{v.qualityValue?v.qualityValue:'--'}</span>
        <span>{v.punishType?v.punishType===2?'分':'元':'--'}</span>
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
            <div><span className={styles.spanLabel}>违规分类</span>：{data.thirdAssortment||data.secondAssortment||data.primaryAssortment}</div>
          </div>
          <div className={styles.secRow}>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
            <div><span className={styles.spanLabel}>学院类型</span>：{BiFilter(`FAMILY_TYPE|id:${data.familyType}`).name}</div>
            <div>&nbsp;</div>
            <div><span className={styles.spanLabel}>违规等级</span>：{data.violationLevelName}</div>
          </div>
        </div>
        <div style={{padding:'10px 20px'}}><div className={styles.line}/></div>
        <div className={styles.container}>
          <div className={styles.secRow}>
            <div><span className={styles.spanLabel}>责任人处罚</span>：{BiFilter(`PUNISH_TYPE_LIST|id:${data.punishType}`).name} {data.ownQualityValue}{data.qualityType?data.qualityType===2?'分':'元':''}</div>
            <span><span className={styles.spanLabel}>连带责任人处罚</span>：<span className={styles.listWrap}>{this.renderAttached()}</span></span>
          </div>
        </div>
      </section>
    );
  }
}
