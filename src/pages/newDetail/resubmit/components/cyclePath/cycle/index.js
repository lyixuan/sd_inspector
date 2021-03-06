import React from 'react';
import Echarts from '@/components/Echart';
import styles from './style.less';
import { getOption } from './cycleOptions.js';
import { connect } from 'dva';
import bingtu from '@/assets/bingtu@2x.png';

@connect(({ resubmitModal }) => ({
  resubmitModal,
  paramsQuery: resubmitModal.paramsQuery || {},
  getCycleListData: resubmitModal.getCycleListData,
}))
class Cycle extends React.Component {
  clickEvent = item => {
    const { getCycleListData } = this.props;
    if (!getCycleListData[item.dataIndex].value) return;
    const cycle = this.props.paramsQuery.lifeCycle;
    let val = item.name.replace('天', '');
    if (cycle && cycle.length && cycle == item.name.replace('天', '')) {
      val = undefined;
    }
    this.props.onParamsChange(val, 'lifeCycle');
  };

  render() {
    const { getCycleListData } = this.props;
    let value = 0;
    if (getCycleListData && getCycleListData.length > 0) {
      getCycleListData.map(item => {
        value += item.value;
      });
    }
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
              style={{ width: '243px', height: 194 + 'px', marginTop: '24px' }}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Cycle;
