import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import stylefather from '../indexPage.less';
import zhijian from '@/assets/zhijian@2x.png';
import gengduo from '@/assets/newIndex/gengduo@2x.png';
import zheng1 from '@/assets/newIndex/zheng1@2x.png';
import fu1 from '@/assets/newIndex/fu1@2x.png';
import style from './style.less';
import Echarts from '@/components/Echart';
import { getOptions } from './getQualityOptions.js';
import { jumpGobalRouter } from '@/pages/ko/utils/utils';
import { Tooltip } from 'antd';
import { Popover, Button } from 'antd';
import { handleDataTrace } from '@/utils/utils';

@connect(({ xdWorkModal, loading }) => ({
  WorkbenchQualityData: xdWorkModal.WorkbenchQualityData,
  getCurrentDateRangeData: xdWorkModal.getCurrentDateRangeData,
  loadingTime: loading.effects['xdWorkModal/getQualityData'],
}))
class Quality extends React.Component {
  jump = () => {
    handleDataTrace({ widgetName: '质检_进入质检报告', traceName: '2.0/质检_进入质检报告' });
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
      qoqTotal = Number(Number(WorkbenchQualityData.class.qoqTotal) * 100).toFixed(0);
      qoqPersonCount = Number(Number(WorkbenchQualityData.class.qoqPersonCount) * 100).toFixed(0);
      total = WorkbenchQualityData.class.total;
      word = qoqTotal > 0 ? '增长' : '降低';
      word1 = qoqPersonCount > 0 ? '增长' : '降低';
      title = (
        <span>
          对比{WorkbenchQualityData.class.qoqStartTime}~{WorkbenchQualityData.class.qoqEndTime}{' '}
          {word}
          {Math.abs(qoqTotal)}%
        </span>
      );
      title1 = (
        <span>
          对比{WorkbenchQualityData.class.qoqStartTime}~{WorkbenchQualityData.class.qoqEndTime}{' '}
          {word1}
          {Math.abs(qoqPersonCount)}%
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

        {WorkbenchQualityData && WorkbenchQualityData.class && (
          <Spin spinning={loadingTime}>
            <div className={style.qualityContent}>
              <div
                className={style.qualityLeft}
                style={{ width: '160px', height: 253 + 'px', paddingTop: '48px' }}
              >
                <div className={style.qualityItem}>
                  <p>
                    <span className={style.qualityTotal}>{total}</span>
                    {qoqTotal && (
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
                    )}
                    {qoqTotal === null && <span className={style.qualityGreen}>N/A</span>}
                    {qoqTotal > 0 && qoqTotal !== null ? <img src={fu1} /> : <img src={zheng1} />}
                  </p>
                  <p className={style.qualityWords}>违规总量</p>
                </div>
                <div className={style.qualityItem}>
                  <p style={{ marginTop: '32px' }}>
                    <span className={style.qualityTotal}>
                      {WorkbenchQualityData.class.personCount}
                    </span>
                    {qoqPersonCount == 0 && <span className={style.block}>{qoqPersonCount}%</span>}
                    {Number(qoqPersonCount) != 0 &&
                      (qoqPersonCount && (
                        <Popover content={title1}>
                          <span
                            className={
                              WorkbenchQualityData.class.qoqPersonCount < 0
                                ? style.qualityGreen
                                : style.qualityRed
                            }
                          >
                            {qoqPersonCount}
                            <i>%</i>
                          </span>
                        </Popover>
                      ))}
                    {qoqPersonCount === null && <span className={style.qualityGreen}>N/A</span>}
                    {Number(qoqPersonCount) > 0 && qoqPersonCount !== null && <img src={fu1} />}
                    {Number(qoqPersonCount) !== 0 &&
                      Number(qoqPersonCount) < 0 &&
                      qoqPersonCount !== null && <img src={zheng1} />}
                  </p>
                  <p className={style.qualityWords}>违规总人数</p>
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
          </Spin>
        )}
      </div>
    );
  }
}

export default Quality;
