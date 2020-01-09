import React from 'react';
import Echarts from '@/components/Echart';
import styles from './style.less';
import { getOption } from './npsOptions.js';
import { connect } from 'dva';
import zhutu from '@/assets/zhutu@2x.png';
import { Spin } from 'antd';

@connect(({ npsAnalyzeModel, loading }) => ({
  npsAnalyzeModel,
  paramsQuery: npsAnalyzeModel.paramsQuery || {},
  getRestTrendData: npsAnalyzeModel.getRestTrendData,
  loadingTime: loading.effects['npsAnalyzeModel/getRestTrend'],
}))
class NPS extends React.Component {
  render() {
    let { getRestTrendData, loadingTime } = this.props;
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
          <i>（5星占比-1~3星占比）</i>
        </p>
        <Spin spinning={loadingTime}>
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
            <Echarts options={options} style={{ width: '716px', height: '240px' }} />
            {/* )} */}
          </div>
        </Spin>
      </div>
    );
  }
}

export default NPS;
