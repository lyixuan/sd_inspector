import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import stylefather from '../indexPage.less';
import zhijian from '@/assets/zhijian@2x.png';
import gengduo from '@/assets/newIndex/gengduo@2x.png';
import zheng1 from '@/assets/newIndex/zheng1@2x.png';
import fu1 from '@/assets/newIndex/fu1@2x.png';
import zhutu from '@/assets/zhutu@2x.png';
import style from './style.less';
import Echarts from '@/components/Echart';
import { getOptions } from './getQualityOptions.js';
import { Tooltip } from 'antd';
import { Popover, Button } from 'antd';
import { handleDataTrace } from '@/utils/utils';
import { jumpGobalRouter, jumpQualityRouter } from '@/pages/ko/utils/utils';

@connect(({ xdWorkModal, loading }) => ({
  WorkbenchQualityData: xdWorkModal.WorkbenchQualityData,
  getCurrentDateRangeData: xdWorkModal.getCurrentDateRangeData,
  loadingTime: loading.effects['xdWorkModal/getQualityData'],
}))
class Quality extends React.Component {
  jump = () => {
    handleDataTrace({ widgetName: '质检_进入质检报告', traceName: '2.0/质检_进入质检报告' });
    jumpGobalRouter('qualityReport/classReport', {});
  };

  clickEvent = item => {
    const userInfo = localStorage.getItem('admin_user');
    if (
      (userInfo && JSON.parse(userInfo).userType === 'boss') ||
      JSON.parse(userInfo).userType === 'admin'
    ) {
      return;
    }
    const { getCurrentDateRangeData, WorkbenchQualityData } = this.props;
    // const data = WorkbenchQualityData.class.detailList[item.dataIndex];

    let status = null;
    let type = '1';
    switch (item.seriesName) {
      case '待申诉':
        status = '1';
        type = '1';
        break;
      case '一次SOP待审核':
        status = '2';
        type = '1';
        break;
      case '一次SOP已驳回':
        status = '3';
        type = '1';
        break;
      case '一次质检主管待审核':
        status = '4';
        type = '1';
        break;
      case '一次申诉失败':
        status = '5';
        type = '1';
        break;
      case '二次SOP待审核':
        status = '6';
        type = '1';
        break;
      case '二次SOP已驳回':
        status = '7';
        type = '1';
        break;
      case '二次质检主管待审核':
        status = '8';
        type = '1';
        break;
      case '二次申诉失败':
        status = '12';
        type = '2';
        break;
      case '一次申诉超时':
        status = '10';
        type = '2';
        break;
      case '二次申诉超时':
        status = '13';
        type = '2';
        break;
    }

    jumpQualityRouter('qualityAppeal/qualityAppeal', {
      reduceScoreBeginDate: getCurrentDateRangeData.startTime,
      reduceScoreEndDate: getCurrentDateRangeData.endTime,
      tabType: type,
      status: status,
    });
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
      qoqTotal =
        Number(WorkbenchQualityData.class.qoqTotal) === 0
          ? 0
          : Number(Number(WorkbenchQualityData.class.qoqTotal) * 100).toFixed(0);
      qoqPersonCount =
        Number(WorkbenchQualityData.class.qoqPersonCount) === 0
          ? 0
          : Number(Number(WorkbenchQualityData.class.qoqPersonCount) * 100).toFixed(0);
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
                    {qoqTotal == 0 && <span className={style.block}>{qoqTotal}%</span>}
                    {Number(qoqTotal) != 0 &&
                      (qoqTotal && (
                        <Popover content={title}>
                          <span
                            style={{ cursor: 'pointer' }}
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
                    {Number(qoqTotal) > 0 && qoqTotal !== null && <img src={fu1} />}
                    {Number(qoqTotal) !== 0 && Number(qoqTotal) < 0 && qoqTotal !== null && (
                      <img src={zheng1} />
                    )}
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
                            style={{ cursor: 'pointer' }}
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
                {!WorkbenchQualityData.class.detailList.length && (
                  <div>
                    <img src={zhutu} style={{ width: '193px' }} />
                  </div>
                )}
                {WorkbenchQualityData.class.detailList.length > 0 && (
                  <Echarts
                    options={options}
                    style={{ width: '300px', height: 253 + 'px' }}
                    clickEvent={item => this.clickEvent(item)}
                  />
                )}
              </div>
            </div>
          </Spin>
        )}
      </div>
    );
  }
}

export default Quality;
