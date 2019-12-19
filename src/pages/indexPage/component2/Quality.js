import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import stylefather from '../indexPage.less';
import zhijian from '@/assets/zhijian@2x.png';
import gengduo from '@/assets/newIndex/gengduo@2x.png';
import zheng from '@/assets/newIndex/zheng@2x.png';
import fu from '@/assets/newIndex/fu@2x.png';
import style from './style.less';
import Echarts from '@/components/Echart';
import { getOptions } from './getQualityOptions.js';

@connect(({ xdWorkModal, loading }) => ({
  WorkbenchQualityData: xdWorkModal.WorkbenchQualityData,
  loadingTime: loading.effects['xdWorkModal/getQualityData'],
}))
class Quality extends React.Component {
  render() {
    const { WorkbenchQualityData, loadingTime } = this.props;
    const options = getOptions(WorkbenchQualityData);
    return (
      <div className={stylefather.boxLeft}>
        <div className={stylefather.boxHeader}>
          <img src={zhijian} />
          <span className={stylefather.headerTitle}>质检</span>
          <img src={gengduo} alt="" />
        </div>
        <Spin spinning={loadingTime}>
          {WorkbenchQualityData && WorkbenchQualityData.class && (
            <div className={style.qualityContent}>
              <div
                className={style.qualityLeft}
                style={{ width: '160px', height: 253 + 'px', paddingTop: '48px' }}
              >
                <div className={style.qualityItem}>
                  <p>
                    <span className={style.qualityTotal}>{WorkbenchQualityData.class.total}</span>
                    {WorkbenchQualityData.class.qoqTotal === 0 ||
                      (WorkbenchQualityData.class.qoqTotal && (
                        <span className={style.qualityGreen}>
                          {Number(Number(WorkbenchQualityData.class.qoqTotal) * 100).toFixed(2)}
                          <i>%</i>
                        </span>
                      ))}
                    {WorkbenchQualityData.class.qoqTotal === null && (
                      <span className={style.qualityGreen}>N/A</span>
                    )}
                    {Number(WorkbenchQualityData.class.qoqTotal) > 0 &&
                    WorkbenchQualityData.class.qoqTotal !== null ? (
                      <img src={zheng} />
                    ) : (
                      <img src={fu} />
                    )}
                  </p>
                  <p className={style.qualityWords}>违规总量</p>
                </div>
                <div className={style.qualityItem}>
                  <p>
                    <span className={style.qualityTotal}>
                      {WorkbenchQualityData.class.personCount}
                    </span>
                    {WorkbenchQualityData.class.qoqPersonCount === 0 ||
                      (WorkbenchQualityData.class.qoqPersonCount && (
                        <span className={style.qualityGreen}>
                          {Number(Number(WorkbenchQualityData.class.qoqPersonCount) * 100).toFixed(
                            2
                          )}
                          <i>%</i>
                        </span>
                      ))}
                    {WorkbenchQualityData.class.qoqPersonCount === null && (
                      <span className={style.qualityGreen}>N/A</span>
                    )}
                    {Number(WorkbenchQualityData.class.qoqPersonCount) > 0 &&
                    WorkbenchQualityData.class.qoqPersonCount !== null ? (
                      <img src={zheng} />
                    ) : (
                      <img src={fu} />
                    )}
                  </p>
                  <p className={style.qualityWords}>违规总人次</p>
                </div>
              </div>
              <div className={style.qualityRight}>
                <Echarts options={options} style={{ width: '300px', height: 253 + 'px' }} />
              </div>
            </div>
          )}
        </Spin>
      </div>
    );
  }
}

export default Quality;
