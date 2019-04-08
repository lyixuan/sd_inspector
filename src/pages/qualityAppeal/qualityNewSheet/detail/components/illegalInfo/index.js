import React from 'react';
import moment from 'moment';
import DownLoad from '@/components/DownLoad';
import styles from './style.css';
import { STATIC_HOST } from '@/utils/constants';

export default class IllegalInfoComponent extends React.Component {
  render() {
    const {data,masterQualityValue,masterMail}= this.props;
    const {violationDate,qualityType,reduceScoreDate,dimension,violationLevelName,qualityValue,attUrl,desc,primaryAssortment,secondAssortment,thirdAssortment} = data;
    const name=attUrl&&attUrl.split('/')[3];
    return (
      <section className={styles.personInfoCon}>
        <div className={styles.container}>
          <div className={styles.secRow}>
            <div>质检违规日期：{violationDate?moment(violationDate).format('YYYY-MM-DD'):null}</div>
            {/*<div>质检类型：{Number(qualityType) === 1 ? '客诉质检' : '班主任质检'}</div>*/}
            <div>分维：{dimension}</div>
            <div>违规分类：{primaryAssortment}{secondAssortment?`| ${secondAssortment}`:null}{thirdAssortment?`| ${thirdAssortment}`:null}</div>
          </div>
          <div className={styles.secRow}>
            <div>质检扣分日期：{reduceScoreDate?moment(reduceScoreDate).format('YYYY-MM-DD'):null}</div>
            <div>违规等级：{violationLevelName}（{Number(qualityType) !== 1 ?'扣除学分':'扣除绩效'}{Number(qualityType) !== 1 ?qualityValue:`${(qualityValue*100).toFixed(2)}%`}）</div>
          </div>
        </div>
        <div className={styles.container}>
          {
            Number(qualityType) === 1?(
              <>
                <div className={styles.secRow}>
                  <div>客诉主管邮箱：{masterMail}</div>
                </div>
                <div className={styles.secRow}>
                  <div>主管扣除绩效：{(masterQualityValue*100).toFixed(2)}%</div>
                </div>
              </>
            ):null
          }
        </div>
        <div>
          <div className={`${styles.secCol} ${styles.secDesc}`}>
            <span>附件：</span> <div>{attUrl?<DownLoad loadUrl={`${STATIC_HOST}/${attUrl}`} text={name} fileName={()=>name} textClassName={styles.downCls} />:null}</div>
          </div>
          <div className={`${styles.secCol} ${styles.secDesc}`}>
            <div>违规详情：</div>
            <div>{desc}</div>
          </div>
        </div>
      </section>
    );
  }
}
