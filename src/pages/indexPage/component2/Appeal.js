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
import { jumpGobalRouter, jumpQualityRouter } from '@/pages/ko/utils/utils';
import { handleDataTrace } from '@/utils/utils';
import { jumpGobalSelfRouter } from '@/pages/ko/utils/utils';

@connect(({ xdWorkModal, loading }) => ({
  WorkbenchAppealData: xdWorkModal.WorkbenchAppealData,
  getCurrentDateRangeData: xdWorkModal.getCurrentDateRangeData,
  loadingTime: loading.effects['xdWorkModal/getAppealData'],
}))
class Appeal extends React.Component {
  jump = id => {
    handleDataTrace({ widgetName: '质检_进入质检报告', traceName: '2.0/质检_进入质检报告' });
    const { getCurrentDateRangeData } = this.props;
    jumpGobalRouter('scoreAppeal/awaitAppeal', {
      creditBeginDate: getCurrentDateRangeData.startTime,
      creditEndDate: getCurrentDateRangeData.endTime,
    });
  };

  clickEvent = item => {
    const userInfo = localStorage.getItem('admin_user');
    debugger;
    if (
      (userInfo && JSON.parse(userInfo).userType === 'boss') ||
      JSON.parse(userInfo).userType === 'admin'
    ) {
      return;
    }
    let dimensionType = 0;
    if (item.name == '创收') dimensionType = 11;
    if (item.name == 'IM') dimensionType = 14;
    if (item.name == '工单') dimensionType = 19;
    if (item.name == '底线') dimensionType = 23;
    if (item.name == '优新') dimensionType = 42;

    handleDataTrace({
      widgetName: `学分申诉_质检${item.seriesName}`,
      traceName: `学分申诉_质检${item.seriesName}`,
    });
    const { getCurrentDateRangeData } = this.props;

    if (item.name == '质检') {
      // 质检在途申诉
      jumpQualityRouter('qualityAppeal/qualityAppeal', {
        reduceScoreBeginDate: getCurrentDateRangeData.startTime,
        reduceScoreEndDate: getCurrentDateRangeData.endTime,
        // statusList: ['4', '7'],
      });
      return;
    } else {
      // 学分
      if (item.seriesName == '审核失败') {
        jumpGobalRouter('scoreAppeal/onAppeal', {
          creditBeginDate: getCurrentDateRangeData.startTime,
          creditEndDate: getCurrentDateRangeData.endTime,
          statusList: ['4', '7'],
          dimensionType,
        });
      } else {
        jumpGobalRouter('scoreAppeal/onAppeal', {
          creditBeginDate: getCurrentDateRangeData.startTime,
          creditEndDate: getCurrentDateRangeData.endTime,
          dimensionType,
          statusList: ['2', '5', '6'],
        });
      }
    }
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
            <div className={style.appealRight} style={{ width: '260px' }}>
              <Echarts
                options={options}
                style={{ width: '280px', height: 243 + 'px' }}
                clickEvent={item => this.clickEvent(item)}
              />
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
