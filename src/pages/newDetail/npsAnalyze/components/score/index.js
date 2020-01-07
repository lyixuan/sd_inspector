import React from 'react';
import Echarts from '@/components/Echart';
import styles from './style.less';
import { getOption } from './scoreOptions.js';
import { connect } from 'dva';
import zhutu from '@/assets/zhutu@2x.png';

@connect(({ npsAnalyzeModel }) => ({
  npsAnalyzeModel,
  paramsQuery: npsAnalyzeModel.paramsQuery || {},
  npsData: npsAnalyzeModel.npsData,
}))
class Score extends React.Component {
  clickEvent = item => {
    const {
      npsData: { starList },
    } = this.props;
    if (!starList[item.dataIndex].value) return;
    const starVal = this.props.paramsQuery.star;
    let val = String(Number(item.dataIndex) + 1);
    if (starVal && starVal == val) {
      val = undefined;
    }
    this.props.onParamsChange(val, 'star');
  };

  render() {
    const { npsData } = this.props;
    let value = 0;
    if (npsData && npsData.starList && npsData.starList.length > 0) {
      npsData.starList.map(item => {
        value += item.value;
      });
    }
    const options = getOption(npsData);
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
                // height: '150px',
              }}
            />
          )}
          {value > 0 && (
            <Echarts
              clickEvent={item => this.clickEvent(item)}
              options={options}
              style={{ width: '243px', height: 194 + 'px' }}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Score;
