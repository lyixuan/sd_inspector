import React from 'react';
import styles from './style.less';
import Echarts from '@/components/Echart';
import { getOption } from './familyOptions.js';
import { connect } from 'dva';

@connect(({ resubmitModal }) => ({
  resubmitModal,
  getFamilyAnalyzeData: resubmitModal.getFamilyAnalyzeData,
}))
class Family extends React.Component {
  clickEvent = item => {
    const { getFamilyAnalyzeData } = this.props;
    this.props.onParamsChange(
      [
        getFamilyAnalyzeData[item.dataIndex].collegeId,
        getFamilyAnalyzeData[item.dataIndex].familyId,
      ],
      'orgId'
    );
  };

  render() {
    const { getFamilyAnalyzeData } = this.props;
    let options = getOption(getFamilyAnalyzeData);
    return (
      <div className={styles.familyWrap}>
        <p className={styles.title}>
          <span></span>
          家族分析
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Echarts
            options={options}
            style={{ width: '720px', height: '240px' }}
            clickEvent={item => this.clickEvent(item)}
          />
        </div>
      </div>
    );
  }
}

export default Family;
