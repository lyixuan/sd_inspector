import React from 'react';
import Echarts from '@/components/Echart';
import styles from './style.less';
import { getOption } from './cycleOptions.js';
import { connect } from 'dva';

@connect(({ resubmitModal }) => ({
  resubmitModal,
  getCycleListData: resubmitModal.getCycleListData,
}))
class Cycle extends React.Component {
  render() {
    const { getCycleListData } = this.props;
    const options = getOption(getCycleListData);
    return (
      <div className={styles.collegeWrap}>
        <p className={styles.title}>
          <span></span>
          续费学员生命周期分布
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Echarts
            options={options}
            style={{ width: '243px', height: 194 + 'px', marginTop: '24px' }}
          />
        </div>
      </div>
    );
  }
}

export default Cycle;
