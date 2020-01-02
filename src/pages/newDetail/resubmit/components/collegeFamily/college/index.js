import React from 'react';
import Echarts from '@/components/Echart';
import styles from './style.less';
import { getOption } from './collegeOptions.js';
import { connect } from 'dva';
import { jumpGobalRouter } from '@/pages/ko/utils/utils';
import { handleDataTrace } from '@/utils/utils';
import zhutu from '@/assets/zhutu@2x.png';

@connect(({ resubmitModal }) => ({
  resubmitModal,
  paramsQuery: resubmitModal.paramsQuery || {},
  getCollegeAnalyzeData: resubmitModal.getCollegeAnalyzeData,
}))
class College extends React.Component {
  clickEvent = item => {
    const { getCollegeAnalyzeData } = this.props;
    if (!getCollegeAnalyzeData[item.dataIndex].value) return;
    const orgId = this.props.paramsQuery.orgId;
    let orgIdVal = [getCollegeAnalyzeData[item.dataIndex].collegeId];
    if (orgId && orgId.length && orgId[0] == getCollegeAnalyzeData[item.dataIndex].collegeId) {
      orgIdVal = [];
    }
    this.props.onParamsChange(orgIdVal, 'orgId');
  };

  render() {
    const { getCollegeAnalyzeData } = this.props;
    let options = getOption(getCollegeAnalyzeData);
    let value = 0;
    if (getCollegeAnalyzeData && getCollegeAnalyzeData.length > 0) {
      getCollegeAnalyzeData.map(item => {
        value += item.value;
      });
    }
    return (
      <div className={styles.collegeWrap}>
        <p className={styles.title}>
          <span></span>
          学院分析
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '300px',
            height: '240px',
          }}
        >
          {!value && (
            <img
              src={zhutu}
              style={{
                width: '193px',
                height: '145px',
              }}
            />
          )}
          {value > 0 && (
            <Echarts
              options={options}
              style={{ width: '263px', height: '240px' }}
              clickEvent={item => this.clickEvent(item)}
            />
          )}
        </div>
      </div>
    );
  }
}

export default College;
