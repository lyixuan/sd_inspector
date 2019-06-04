import React from 'react';
import styles from './style.css';
import moment from 'moment';
import { BiFilter } from '@/utils/utils';

export default class BasicInfoComponent extends React.Component {
  render() {
    const { baseAppealInfo = {},dimensionType=11 } = this.props;
    const { dimensionName,dimensionId,creditDate, completeDate, imConsultId, imNum, workorderStartTime, workorderFlowupFlag, bottomLineChannal, upFlag,score,source } = baseAppealInfo;

    const IMName = dimensionId === 17?'不及时条数':dimensionId===15?'未回复条数':'不满意条数';
    return (
      <section className={styles.personInfoCon}>
        <div className={styles.boxTitle}>
          <span>申诉基础信息</span>
        </div>
        {dimensionType===11&&(
          // 优新
          <div className={styles.container}>
            <div className={styles.secRow}>
              <div>学分纬度：{dimensionName}</div>
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
        {dimensionType===14&&(
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
        {dimensionType===19&&(
          // 工单
          <div className={styles.container}>
            <div className={styles.secRow}>
              <div>学分纬度：{dimensionName}</div>
              <div>学分日期：{creditDate}</div>
            </div>
            <div className={styles.secRow}>
              <div>咨询ID：{imConsultId}</div>
              <div>工单发起时间：{workorderStartTime}</div>
            </div>
            <div className={styles.secRow}>
              <div>是否跟进：{workorderFlowupFlag}</div>
            </div>
          </div>
        )}
        {dimensionType===23&&(
          // 底线
          <div className={styles.container}>
            <div className={styles.secRow}>
              <div>学分纬度：{dimensionName}</div>
              <div>学分日期：{creditDate}</div>
            </div>
            <div className={styles.secRow}>
              <div>工单编号：{imConsultId}</div>
              <div>{dimensionId!==26?`渠道：${bottomLineChannal}`:''}</div>
            </div>
            <div className={styles.secRow}>
            </div>
          </div>
        )}
        {dimensionType===42&&(
          // 创收
          <div className={styles.container}>
            <div className={styles.secRow}>
              <div>学分纬度：{dimensionName}</div>
              <div>学分日期：{creditDate}</div>
            </div>
            <div className={styles.secRow}>
              <div>UP值是否达标：{upFlag}</div>
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
