import React from 'react';
import Echarts from '@/components/Echart';
import styles from './style.less';
import { getOption } from './scoreOptions.js';
import { connect } from 'dva';
import zhutu from '@/assets/zhutu@2x.png';

@connect(({ npsAnalyzeModel }) => ({
  npsAnalyzeModel,
  paramsQuery: npsAnalyzeModel.paramsQuery || {},
  getTagListData: npsAnalyzeModel.getTagListData,
}))
class Score extends React.Component {
  clickEvent = item => {
    const { getNpsAutonomousEvaluation } = this.props;
    if (!getNpsAutonomousEvaluation[item.dataIndex].value) return;
    const cycle = this.props.paramsQuery.lifeCycle;
    let val = item.name.replace('天', '');
    if (cycle && cycle.length && cycle == item.name.replace('天', '')) {
      val = undefined;
    }
    this.props.onParamsChange(val, 'lifeCycle');
  };

  render() {
    const { getNpsAutonomousEvaluation } = this.props;
    let value = 0;
    if (getNpsAutonomousEvaluation && getNpsAutonomousEvaluation.length > 0) {
      getNpsAutonomousEvaluation.map(item => {
        value += item.value;
      });
    }
    const options = getOption(getNpsAutonomousEvaluation);
    return (
      <div className={styles.collegeWrap}>
        <p className={styles.title}>
          <span></span>
          NPS评分
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '240px',
          }}
        >
          {!value && (
            <img
              src={zhutu}
              style={{
                width: '150px',
                height: '150px',
              }}
            />
          )}
          {value > 0 && (
            <Echarts
              clickEvent={item => this.clickEvent(item)}
              options={options}
              style={{ width: '243px', height: 194 + 'px', marginTop: '24px' }}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Score;
