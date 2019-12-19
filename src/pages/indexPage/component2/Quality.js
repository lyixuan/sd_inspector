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
import { jumpGobalRouter } from '@/pages/ko/utils/utils';
import { Tooltip } from 'antd';
import { Popover, Button } from 'antd';

@connect(({ xdWorkModal, loading }) => ({
  WorkbenchQualityData: xdWorkModal.WorkbenchQualityData,
  getCurrentDateRangeData: xdWorkModal.getCurrentDateRangeData,
  loadingTime: loading.effects['xdWorkModal/getQualityData'],
}))
class Quality extends React.Component {
  jump = () => {
    // const { getCurrentDateRangeData } = this.props;
    jumpGobalRouter('qualityReport/classReport', {
      // dataRange: [getCurrentDateRangeData.startTime, getCurrentDateRangeData.endTime],
    });
  };

  clickEvent = item => {
    // const { getCurrentDateRangeData } = this.props;
    // jumpGobalRouter('xdCredit/im', {
    //   dataRange: [getCurrentDateRangeData.startTime, getCurrentDateRangeData.endTime],
    //   reasonTypeId: item.reasonTypeId || 0,
    // });
  };

  render() {
    const { WorkbenchQualityData, loadingTime } = this.props;
    const options = getOptions(WorkbenchQualityData);
    let qoqTotal = 0;
    let qoqPersonCount = 0;
    let total = 0;
    let word = '';
    let word1 = '';
    let title = '';
    let title1 = '';
    if (WorkbenchQualityData && WorkbenchQualityData.class) {
      qoqTotal = Number(WorkbenchQualityData.class.qoqTotal) * 100;
      qoqPersonCount = Number(WorkbenchQualityData.class.qoqPersonCount) * 100;
      total = WorkbenchQualityData.class.total;
      word = qoqTotal > 0 ? '增长' : '降低';
      word1 = qoqPersonCount > 0 ? '增长' : '降低';
      title = (
        <span>
          对比{WorkbenchQualityData.class.qoqStartTime}~{WorkbenchQualityData.class.qoqEndTime}{' '}
          {word}
          {qoqTotal}%
        </span>
      );
      title1 = (
        <span>
          对比{WorkbenchQualityData.class.qoqStartTime}~{WorkbenchQualityData.class.qoqEndTime}{' '}
          {word1}
          {qoqPersonCount}%
        </span>
      );
    }

    return (
      <div className={stylefather.boxLeft}>
        <div className={stylefather.boxHeader}>
          <img src={zhijian} />
          <span className={stylefather.headerTitle}>质检</span>
          <img src={gengduo} alt="" onClick={() => this.jump()} />
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
                    <span className={style.qualityTotal}>{total}</span>
                    {qoqTotal === 0 ||
                      (qoqTotal && (
                        <Popover content={title}>
                          <span
                            className={
                              WorkbenchQualityData.class.qoqTotal < 0
                                ? style.qualityGreen
                                : style.qualityRed
                            }
                          >
                            {qoqTotal}
                            <i>%</i>
                          </span>
                        </Popover>
                      ))}
                    {qoqTotal === null && <span className={style.qualityGreen}>N/A</span>}
                    {qoqTotal > 0 && qoqTotal !== null ? <img src={fu} /> : <img src={zheng} />}
                  </p>
                  <p className={style.qualityWords}>违规总量</p>
                </div>
                <div className={style.qualityItem}>
                  <p style={{ marginTop: '32px' }}>
                    <span className={style.qualityTotal}>
                      {WorkbenchQualityData.class.personCount}
                    </span>
                    {qoqPersonCount === 0 ||
                      (qoqPersonCount && (
                        <Popover content={title1}>
                          <span className={style.qualityGreen}>
                            {qoqPersonCount}
                            <i>%</i>
                          </span>
                        </Popover>
                      ))}
                    {qoqPersonCount === null && <span className={style.qualityGreen}>N/A</span>}
                    {Number(qoqPersonCount) > 0 && qoqPersonCount !== null ? (
                      <img src={fu} />
                    ) : (
                      <img src={zheng} />
                    )}
                  </p>
                  <p className={style.qualityWords}>违规总人次</p>
                </div>
              </div>
              <div className={style.qualityRight}>
                <Echarts
                  options={options}
                  style={{ width: '300px', height: 253 + 'px' }}
                  clickEvent={item => this.clickEvent(item)}
                />
              </div>
            </div>
          )}
        </Spin>
      </div>
    );
  }
}

export default Quality;