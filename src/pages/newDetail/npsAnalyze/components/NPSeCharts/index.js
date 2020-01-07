import React from 'react';
import Echarts from '@/components/Echart';
import styles from './style.less';
import { getOption } from './npsOptions.js';
import { connect } from 'dva';
import zhutu from '@/assets/zhutu@2x.png';

@connect(({ npsAnalyzeModel }) => ({
  npsAnalyzeModel,
  paramsQuery: npsAnalyzeModel.paramsQuery || {},
  getRestTrendData: npsAnalyzeModel.getRestTrendData,
}))
class NPS extends React.Component {
  clickEvent = item => {
    const { getRestTrendData } = this.props;
    if (!getRestTrendData[item.dataIndex].value) return;
    const cycle = this.props.paramsQuery.lifeCycle;
    let val = item.name.replace('天', '');
    if (cycle && cycle.length && cycle == item.name.replace('天', '')) {
      val = undefined;
    }
    this.props.onParamsChange(val, 'lifeCycle');
  };

  render() {
    const { getRestTrendData } = this.props;
    let value = 0;
    if (getRestTrendData && getRestTrendData.length > 0) {
      getRestTrendData.map(item => {
        value += item.value;
      });
    }
    const options = getOption(getRestTrendData);
    return (
      <div className={styles.collegeWrap}>
        <p className={styles.title}>
          <span></span>
          净推荐值趋势
          <i>（5星占比-1-3星占比）</i>
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '240px',
          }}
        >
          {/* {!value && (
            <img
              src={zhutu}
              style={{
                width: '150px',
                height: '150px',
              }}
            />
          )} */}
          {/* {value > 0 && ( */}
          <Echarts
            clickEvent={item => this.clickEvent(item)}
            options={options}
            style={{ width: '761px', height: '240px' }}
          />
          {/* )} */}
        </div>
      </div>
    );
  }
}

export default NPS;
