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
  constructor(props) {
    super(props);
    this.state = {
      bflag:
        JSON.parse(localStorage.getItem('resubmit_query')) &&
        JSON.parse(localStorage.getItem('resubmit_query')).orgId &&
        JSON.parse(localStorage.getItem('resubmit_query')).orgId.length > 0
          ? true
          : false,
    };
  }
  clickEvent = item => {
    const { getCollegeAnalyzeData } = this.props;
    if (!getCollegeAnalyzeData[item.dataIndex].value) return;
    let { bflag } = this.state;
    bflag = !bflag;

    if (bflag) {
      this.props.onParamsChange([getCollegeAnalyzeData[item.dataIndex].collegeId], 'orgId');
    } else {
      this.props.onParamsChange([], 'orgId');
    }
    this.setState({ bflag });
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
