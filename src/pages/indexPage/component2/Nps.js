import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import stylefather from '../indexPage.less';
import NpsImg from '@/assets/NPS@2x.png';
import gengduo from '@/assets/newIndex/gengduo@2x.png';
import style from './style.less';
import Echarts from '@/components/Echart';
import { getOption } from './getNpsOptions.js';
import NpsLeft from './npsLeft.js';

@connect(({ xdWorkModal, loading }) => ({
  WorkbenchNpsData: xdWorkModal.WorkbenchNpsData,
  loadingTime: loading.effects['xdWorkModal/getNpsData'],
}))
class Nps extends React.Component {
  render() {
    const { WorkbenchNpsData, loadingTime } = this.props;
    const options = getOption(WorkbenchNpsData);
    return (
      <div className={stylefather.boxRight}>
        <div className={stylefather.boxHeader}>
          <img src={NpsImg} />
          <span className={stylefather.headerTitle}>NPS分析</span>
          <img src={gengduo} alt="" />
        </div>
        <Spin spinning={loadingTime}>
          <div className={style.npsContent}>
            <div className={style.npsLeft}>
              <NpsLeft cloudOptions={WorkbenchNpsData.tagImageDtoList} />
            </div>
            <div className={style.npsRight}>
              <Echarts options={options} style={{ width: '243px', height: 253 + 'px' }} />
            </div>
          </div>
        </Spin>
      </div>
    );
  }
}

export default Nps;
