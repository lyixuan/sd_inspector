import React from 'react';
import styles from './style.css';
import {formatDateToWeek} from '@/utils/utils';

export default class BasicInfoComponent extends React.Component {
  render() {
    const { baseAppealInfo = {},dimensionType } = this.props;
    const { dimensionName,workorderNumber,dimensionType:creditType,creditDate:creditDate1, completeDate, imConsultId, imNum, workorderStartTime, workorderFlowupFlag, bottomLineChannal, upFlag,score,source } = baseAppealInfo||{};

    const IMName = Number(creditType) === 17?'不及时条数':Number(creditType)===15?'未回复条数':'不满意条数';
    const creditDate = formatDateToWeek(creditDate1);
    return (
      <section className={styles.personInfoCon}>
        <div className={styles.boxTitle}>
          <span>申诉基础信息</span>
        </div>
        {Number(dimensionType)===11&&(
          // 优新
          <div className={styles.container}>
            <div className={styles.secRow}>
              <div>学分维度：{dimensionName}</div>
              <div>学分日期：{creditDate}</div>
            </div>
            <div className={styles.secRow}>
              <div>开班电话完成时间：{completeDate}</div>
              <div>&nbsp;</div>
            </div>
            <div className={styles.secRow}>
            </div>
          </div>
        )}
        {Number(dimensionType)===14&&(
          // IM
          <div className={styles.container}>
            <div className={styles.secRow}>
              <div>学分纬度：{dimensionName}</div>
              <div>学分日期：{creditDate}</div>
            </div>
            <div className={styles.secRow}>
              <div>咨询ID：{imConsultId}</div>
              <div>{IMName}：{imNum}</div>
            </div>
            <div className={styles.secRow}>
            </div>
          </div>
        )}
        {Number(dimensionType)===19&&(
          // 工单
          <div className={styles.container}>
            <div className={styles.secRow}>
              <div>学分纬度：{dimensionName}</div>
              <div>学分日期：{creditDate}</div>
            </div>
            <div className={styles.secRow}>
              {/*<div>咨询ID：{imConsultId}</div>*/}
              <div>工单发起时间：{workorderStartTime}</div>
            </div>
            <div className={styles.secRow}>
              <div>是否跟进：{workorderFlowupFlag?'是':'否'}</div>
            </div>
          </div>
        )}
        {Number(dimensionType)===23&&(
          // 底线
          <div className={styles.container}>
            <div className={styles.secRow}>
              <div>学分纬度：{dimensionName}</div>
              <div>学分日期：{creditDate}</div>
            </div>
            <div className={styles.secRow}>
              <div>工单编号：{workorderNumber}</div>
              <div>{creditType!==26?`渠道：${bottomLineChannal}`:''}</div>
            </div>
            <div className={styles.secRow}>
            </div>
          </div>
        )}
        {Number(dimensionType)===42&&(
          // 创收
          <div className={styles.container}>
            <div className={styles.secRow}>
              <div>学分纬度：{dimensionName}</div>
              <div>学分日期：{creditDate}</div>
            </div>
            <div className={styles.secRow}>
              <div>UP值是否达标：{upFlag?'是':'否'}</div>
              <div>学分：{score}</div>
            </div>
            <div className={styles.secRow}>
              <div>来源：{source}</div>
            </div>
          </div>
        )}
      </section>
    );
  }
}
