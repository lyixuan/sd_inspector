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


@connect(({ xdWorkModal, loading }) => ({
  WorkbenchImNegativeData: xdWorkModal.WorkbenchImNegativeData,
  WorkbenchImPieData: xdWorkModal.WorkbenchImPieData,
  loadingTime: loading.effects['xdWorkModal/getImPieData'],
}))
class Im extends React.Component {
  render() {
    const { WorkbenchImNegativeData, WorkbenchImPieData, loadingTime } = this.props;
    const options = getOption(WorkbenchImPieData);
    return (
      <div className={stylefather.boxLeft}>
        <div className={stylefather.boxHeader}>
          <img src={IMImg} />
          <span className={stylefather.headerTitle}>IM分析</span>
          <img src={gengduo} alt="" />
        </div>
        <div className={style.imContent}>
          <div className={style.imContentLeft}>
            {WorkbenchImNegativeData.badContrasts ? (
              <div className={style.imItem}>
                <p className={style.items}>
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
              <div className={style.imItem}>
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
          <Spin spinning={loadingTime}>
            <div className={style.imContentRight}>
              <Echarts options={options} style={{ height: 275 + 'px', top: '-49px' }} />
            </div>
          </Spin>
        </div>
      </div>
    );
  }
}

export default Im;
