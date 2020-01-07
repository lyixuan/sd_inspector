import React from 'react';
import stylefather from '../indexPage.less';
import chuangshou from '@/assets/newIndex/chuangshou@2x.png';
import gengduo from '@/assets/newIndex/gengduo@2x.png';
import bingtu from '@/assets/newIndex/bingtu@2x.png';
import Echarts from './Echart_WorkBentch';
import { handleDataTrace, changeToThousandsForIncome } from '@/utils/utils';
import { getOptionBossR } from './income_boss_option';
import { getOptioBossL } from './income_boss_option_l';

import { getOptionR2 } from './income_normal_option';
import { getOptionL2 } from './income_normal_option_l';
import style from './style.less';
import { jumpGobalRouter } from '@/pages/ko/utils/utils';

class Income extends React.Component {
  jump = () => {
    handleDataTrace({ widgetName: `创收_进入详情`, traceName: `2.0/创收_进入详情` });
    // jumpGobalRouter('newDetail/incomeRank' );
    jumpGobalRouter('newDetail/incomeOrder');
  };

  render() {
    const { WorkbenchIncome, userType } = this.props;
    const { sumData, pieData = [], rank, boss = [] } = WorkbenchIncome || {};
    let { sumAmount = 0, sumOrder } = sumData || {};
    sumAmount = sumAmount === null ? 0 : sumAmount;
    const { rankList = [] } = rank || {};

    const optionL = getOptionL2(rankList);
    const optionR = getOptionR2(pieData);
    const optionBossL = getOptioBossL(boss);
    const optionBossR = getOptionBossR(pieData, sumAmount);

    const dot = pieData.map((item, idx) => {
      return (
        <span key={idx}>
          {' '}
          <i
            style={{
              backgroundColor: `${
                item.name === '好推' ? '#45D199' : item.name === '续报' ? '#FEC350' : '#6769DA'
              }`,
            }}
          />
          {changeToThousandsForIncome(item.value, 1) + '万'}
        </span>
      );
    });
    const dotName = pieData.map((item, i) => {
      if (item.name == '成考专本套') {
        item.name = '成考';
      }
      return (
        <span key={i}>
          <i />
          {item.name}
        </span>
      );
    });
    return (
      <div className={stylefather.boxRight}>
        <div className={stylefather.boxHeader}>
          <img src={chuangshou} alt="" />
          <span className={stylefather.headerTitle}>创收</span>
          <img src={gengduo} alt="" onClick={() => this.jump()} />
        </div>

        {userType === 'boss' && (
          <div className={style.crossRow}>
            <Echarts options={optionBossL} style={{ height: 250, width: 265, float: 'left' }} />
            <Echarts options={optionBossR} style={{ height: 250, width: 260, float: 'left' }} />
            <div className={style.footer}>{dot}</div>
            <div className={style.footer2}>{dotName}</div>
          </div>
        )}
        {userType !== 'boss' && (
          <div className={style.crossRow}>
            <div className={style.ScoreLeft}>
              <div className={style.incomeTotal}>
                <div>
                  <p className={style.red}>+3.5万</p>
                  <div>
                    {changeToThousandsForIncome(sumAmount, 1)}{' '}
                    <span style={{ fontSize: 14 }}>万</span>
                  </div>
                  <div>总流水</div>
                </div>
                <div>
                  <p className={style.red}>+3.5万</p>
                  <div>
                    {changeToThousandsForIncome(sumAmount, 1)}{' '}
                    <span style={{ fontSize: 14 }}>万</span>
                  </div>
                  <div>总流水</div>
                </div>
                <div>
                  <p className={style.green}>+3.5万</p>
                  <div>{sumOrder}</div>
                  <div>总单量</div>
                </div>
              </div>
              <Echarts options={optionL} style={{ height: 150 }} />
            </div>
            <div className={style.incomeRight}>
              {pieData.length > 0 ? (
                <Echarts options={optionR} style={{ height: 250, width: 260, float: 'left' }} />
              ) : (
                <img
                  src={bingtu}
                  alt=""
                  style={{ height: 150, width: 150, display: 'block', margin: '60px auto 0' }}
                />
              )}
            </div>
            <div className={style.footer}>{dot}</div>
            <div className={style.footer2}>{dotName}</div>
          </div>
        )}
      </div>
    );
  }
}

export default Income;
