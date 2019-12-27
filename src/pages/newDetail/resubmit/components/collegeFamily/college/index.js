import React from 'react';
import Echarts from '@/components/Echart';
import styles from './style.less';
import { getOption } from './collegeOptions.js';
import { connect } from 'dva';
import { jumpGobalRouter } from '@/pages/ko/utils/utils';
import { handleDataTrace } from '@/utils/utils';

@connect(({ resubmitModal }) => ({
  resubmitModal,
  getCollegeAnalyzeData: resubmitModal.getCollegeAnalyzeData,
}))
class College extends React.Component {
  clickEvent = item => {
    const { getCollegeAnalyzeData } = this.props;
    this.props.onParamsChange([getCollegeAnalyzeData[item.dataIndex].collegeId], 'orgId');
    // handleDataTrace({ widgetName: 'IM负面原因', traceName: item.data.name });
    // jumpGobalRouter('xdCredit/im', {
    //   dataRange: [getCurrentDateRangeData.startTime, getCurrentDateRangeData.endTime],
    //   reasonTypeId: item.data.reasonTypeId || 0,
    // });
  };

  render() {
    const { getCollegeAnalyzeData } = this.props;
    let options = getOption(getCollegeAnalyzeData);
    return (
      <div className={styles.collegeWrap}>
        <p className={styles.title}>
          <span></span>
          学院分析
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Echarts
            options={options}
            style={{ width: '263px', height: '240px' }}
            clickEvent={item => this.clickEvent(item)}
          />
        </div>
      </div>
    );
  }
}

export default College;
