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

@connect(({ xdWorkModal, loading }) => ({
  WorkbenchAppealData: xdWorkModal.WorkbenchAppealData,
  loadingTime: loading.effects['xdWorkModal/getAppealData'],
}))
class Appeal extends React.Component {
  render() {
    const { WorkbenchQualityData, WorkbenchAppealData, loadingTime } = this.props;
    const options = getOption(WorkbenchAppealData);
    const options1 = getAppealLeftOption(WorkbenchAppealData);
    return (
      <div className={stylefather.boxRight}>
        <div className={stylefather.boxHeader}>
          <img src={shensu} />
          <span className={stylefather.headerTitle}>学分申诉</span>
          <img src={gengduo} alt="" />
        </div>
        <Spin spinning={loadingTime}>
          <div className={style.appealContent}>
            <div className={style.appealLeft} style={{ width: '230px' }}>
              <Echarts options={options1} style={{ width: '230px', height: 233 + 'px' }} />
            </div>
            <div className={style.appealRight} style={{ width: '280px' }}>
              <Echarts options={options} style={{ width: '280px', height: 233 + 'px' }} />
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
