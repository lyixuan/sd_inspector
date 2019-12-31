import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import stylefather from '../indexPage.less';
import IMImg from '@/assets/IM@2x.png';
import gengduo from '@/assets/newIndex/gengduo@2x.png';
import dianzan from '@/assets/dianzan@2x.png';
import flower from '@/assets/flower@2x.png';
import kaixin from '@/assets/kaixin@2x.png';
import bixin from '@/assets/bixin@2x.png';
import style from './style.less';
import Echarts from '@/components/Echart';
import { getOption } from './getImOptions';
import { jumpGobalRouter } from '@/pages/ko/utils/utils';
import { handleDataTrace } from '@/utils/utils';
import { jumpGobalSelfRouter } from '@/pages/ko/utils/utils';
import bingtu from '@/assets/bingtu@2x.png';

@connect(({ xdWorkModal, loading }) => ({
  WorkbenchImNegativeData: xdWorkModal.WorkbenchImNegativeData,
  WorkbenchImPieData: xdWorkModal.WorkbenchImPieData,
  getCurrentDateRangeData: xdWorkModal.getCurrentDateRangeData,
  loadingTime: loading.effects['xdWorkModal/getImPieData'],
  loadingTime1: loading.effects['xdWorkModal/getImNegativeData'],
}))
class Im extends React.Component {
  jump = (widgetName, traceName) => {
    const { getCurrentDateRangeData } = this.props;
    handleDataTrace({ widgetName: widgetName, traceName: traceName });
    jumpGobalRouter('xdCredit/im', {
      dataRange: [getCurrentDateRangeData.startTime, getCurrentDateRangeData.endTime],
      reasonTypeId: 0,
    });
  };

  clickEvent = item => {
    const { getCurrentDateRangeData } = this.props;
    handleDataTrace({ widgetName: 'IM负面原因', traceName: item.data.name });
    jumpGobalRouter('xdCredit/im', {
      dataRange: [getCurrentDateRangeData.startTime, getCurrentDateRangeData.endTime],
      reasonTypeId: item.data.reasonTypeId || 0,
    });
  };

  render() {
    const colorArr = [
      '#6665DD',
      '#FF602F',
      '#33D195',
      '#B5E1F9',
      '#FFC442',
      '#4A5F75',
      '#0496FF',
      '#AEB89F',
    ];
    const { WorkbenchImNegativeData, WorkbenchImPieData, loadingTime, loadingTime1 } = this.props;
    const options = getOption(WorkbenchImPieData);
    let dot = '';
    // let dotName = '';
    if (WorkbenchImPieData.length) {
      dot = WorkbenchImPieData.map((item, idx) => {
        return (
          <span key={idx} className={style.colorArr}>
            <i
              style={{
                backgroundColor: `${colorArr[idx]}`,
                width: '8px',
                height: '8px',
                display: 'inline-block',
                borderRadius: '50%',
                marginRight: '8px',
              }}
            />
            {item.reasonTypeName.replace('方向', '')}
          </span>
        );
      });
    }
    let total = 0;
    if (WorkbenchImPieData.length) {
      WorkbenchImPieData.map(item => {
        total += item.noStatisticNum;
      });
    }

    return (
      <div className={stylefather.boxLeft}>
        <div className={stylefather.boxHeader}>
          <img src={IMImg} />
          <span className={stylefather.headerTitle}>IM分析</span>
          <img src={gengduo} alt="" onClick={() => this.jump('IM_进入详情', '2.0/IM_进入详情')} />
        </div>

        <div className={style.imContent}>
          <Spin spinning={loadingTime1}>
            <div className={style.imContentLeft}>
              {WorkbenchImNegativeData.badContrasts ? (
                <div className={style.imItem}>
                  <p
                    className={style.items}
                    onClick={() => this.jump('IM不满意率', '2.0/IM不满意率')}
                    style={{ cursor: 'pointer' }}
                  >
                    {(WorkbenchImNegativeData.badContrasts * 100).toFixed(2)}
                    <span className={style.precent}>%</span>
                  </p>
                  <p className={style.small}>不满意率</p>
                </div>
              ) : (
                <div className={style.imItem}>
                  <p className={style.items}>
                    <img src={dianzan} className={style.iconImg} />
                  </p>
                  <p className={style.small}>全部满意</p>
                </div>
              )}
              {WorkbenchImNegativeData.notSatisfied ? (
                <div
                  className={style.imItem}
                  onClick={() => this.jump('IM不满意会话', '2.0/IM不满意会话')}
                  style={{ cursor: 'pointer' }}
                >
                  <p className={style.items}>{WorkbenchImNegativeData.notSatisfied}</p>
                  <p className={style.small}>不满意会话</p>
                </div>
              ) : (
                <div className={style.imItem}>
                  <p className={style.items}>
                    <img src={kaixin} className={style.iconImg} />
                  </p>
                  <p className={style.small}>全部满意</p>
                </div>
              )}
              {WorkbenchImNegativeData.notReply ? (
                <div className={style.imItem}>
                  <p className={style.items}>{WorkbenchImNegativeData.notReply}</p>
                  <p className={style.small}>未回复数</p>
                </div>
              ) : (
                <div className={style.imItem}>
                  <p className={style.items}>
                    <img src={flower} className={style.iconImg} />
                  </p>
                  <p className={style.small}>全部回复</p>
                </div>
              )}
              {WorkbenchImNegativeData.notInTime ? (
                <div className={style.imItem}>
                  <p className={style.items}>{WorkbenchImNegativeData.notInTime}</p>
                  <p className={style.small}>不及时数</p>
                </div>
              ) : (
                <div className={style.imItem}>
                  <p className={style.items}>
                    <img src={bixin} className={style.iconImg1} />
                  </p>
                  <p className={style.small}>全部及时</p>
                </div>
              )}
            </div>
          </Spin>
          <Spin spinning={loadingTime}>
            <div className={style.imContentRight}>
              {!total && <img src={bingtu} style={{ width: '150px', marginTop: '-26px' }} />}
              {total > 0 && (
                <Echarts
                  options={options}
                  style={{ width: '275px', height: 235 + 'px', top: '-10px' }}
                  clickEvent={item => this.clickEvent(item)}
                />
              )}
            </div>
            {total > 0 && (
              <div className={style.imContentDot}>
                <div className={style.imContentDotCon}>{dot}</div>
              </div>
            )}
          </Spin>
        </div>
      </div>
    );
  }
}

export default Im;
