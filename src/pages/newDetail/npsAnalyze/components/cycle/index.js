import React from 'react';
import Echarts from '@/components/Echart';
import styles from './style.less';
import { getOption } from './cycleOptions.js';
import { connect } from 'dva';
import bingtu from '@/assets/bingtu@2x.png';
import { Spin } from 'antd';

@connect(({ npsAnalyzeModel, loading }) => ({
  npsAnalyzeModel,
  paramsQuery: npsAnalyzeModel.paramsQuery || {},
  getCycleListData: npsAnalyzeModel.getCycleListData,
  loadingTime: loading.effects['npsAnalyzeModel/getCycleList'],
}))
class Cycle extends React.Component {
  clickEvent = item => {
    const {
      getCycleListData: { detailList },
    } = this.props;
    if (!detailList[item.dataIndex].value) return;
    const cycle = this.props.paramsQuery.cycle;
    let val = item.name.replace('天', '');
    if (cycle && cycle.length && cycle == item.name.replace('天', '')) {
      val = undefined;
    }
    this.props.onParamsChange(val, 'cycle');
  };

  render() {
    const { getCycleListData, loadingTime } = this.props;
    console.log(loadingTime, 'loadingTime');
    let value = getCycleListData.total;
    const options = getOption(getCycleListData);
    return (
      <div className={styles.collegeWrap}>
        <p className={styles.title}>
          <span></span>
          续报学员生命周期分布
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '240px',
          }}
        >
          <div
            className={styles.total}
            style={{
              width: '105px',
              textAlign: 'center',
            }}
          >
            <p className={styles.count}>{value}</p>
            <p>总数量</p>
          </div>
          <Spin spinning={loadingTime}>
            <div style={{ width: '243px', textAlign: 'center' }}>
              {!value && (
                <img
                  src={bingtu}
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
                  style={{ width: '243px', height: 194 + 'px', marginTop: '-29px' }}
                />
              )}
            </div>
          </Spin>
        </div>
      </div>
    );
  }
}

export default Cycle;
