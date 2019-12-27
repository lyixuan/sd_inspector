import React from 'react';
import Echarts from '@/components/Echart';
import styles from './style.less';
import { getOption } from './collegeOptions.js';
import { connect } from 'dva';

@connect(({ resubmitModal }) => ({
  resubmitModal,
  getCollegeAnalyzeData: resubmitModal.getCollegeAnalyzeData,
}))
class College extends React.Component {
  render() {
    const { getCollegeAnalyzeData } = this.props;
    let options = getOption(getCollegeAnalyzeData);
    return (
      <div className={styles.collegeWrap}>
        <p className={styles.title}>
          <span></span>
          NPS评分
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Echarts
            options={options}
            style={{ width: '263px', height: '240px' }}
          />
        </div>
      </div>
    );
  }
}

export default College;
