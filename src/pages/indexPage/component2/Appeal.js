import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import stylefather from '../indexPage.less';
import shensu from '@/assets/shensu@2x.png';
import gengduo from '@/assets/newIndex/gengduo@2x.png';
import style from './style.less';
import Echarts from '@/components/Echart';
import { getOption } from './getAppealOptions.js';
import { getAppealLeftOption } from './getAppealLeftOps.js';
import { jumpGobalRouter } from '@/pages/ko/utils/utils';

@connect(({ xdWorkModal, loading }) => ({
  WorkbenchAppealData: xdWorkModal.WorkbenchAppealData,
  getCurrentDateRangeData: xdWorkModal.getCurrentDateRangeData,
  loadingTime: loading.effects['xdWorkModal/getAppealData'],
}))
class Appeal extends React.Component {
  jump = id => {
    const { getCurrentDateRangeData } = this.props;
    jumpGobalRouter('scoreAppeal/awaitAppeal', {
      creditBeginDate: getCurrentDateRangeData.startTime,
      creditEndDate: getCurrentDateRangeData.endTime,
    });
  };

  clickEvent = item => {
    const { getCurrentDateRangeData } = this.props;
    jumpGobalRouter('xdCredit/im', {
      dataRange: [getCurrentDateRangeData.startTime, getCurrentDateRangeData.endTime],
      reasonTypeId: item.reasonTypeId || 0,
    });
  };

  render() {
    const { WorkbenchQualityData, WorkbenchAppealData, loadingTime } = this.props;
    const options = getOption(WorkbenchAppealData);
    const options1 = getAppealLeftOption(WorkbenchAppealData);
    return (
      <div className={stylefather.boxRight}>
        <div className={stylefather.boxHeader}>
          <img src={shensu} />
          <span className={stylefather.headerTitle}>学分申诉</span>
          <img src={gengduo} alt="" onClick={() => this.jump()} />
        </div>
        <Spin spinning={loadingTime}>
          <div className={style.appealContent}>
            <div className={style.appealLeft} style={{ width: '230px' }}>
              <Echarts options={options1} style={{ width: '230px', height: 213 + 'px' }} />
            </div>
            <div className={style.appealRight} style={{ width: '280px' }}>
              <Echarts options={options} style={{ width: '280px', height: 213 + 'px' }} />
            </div>
          </div>
          <div className={style.appealContentDot}>
            <span>
              <i className={style.yellow}></i>审核中
            </span>
            <span>
              <i className={style.purple}></i>申诉失败
            </span>
          </div>
        </Spin>
      </div>
    );
  }
}

export default Appeal;
