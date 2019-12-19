import React from 'react';
import stylefather from '../indexPage.less';
import chuangshou from '@/assets/newIndex/chuangshou@2x.png';
import gengduo from '@/assets/newIndex/gengduo@2x.png';
import Echarts from './Echart_WorkBentch';
import { handleDataTrace, thousandsFormatDot } from '@/utils/utils';
import { getOptionBossR } from './income_boss_option';
import { getOptioBossL } from './income_boss_option_l';

import { getOptionR2 } from './income_normal_option';
import { getOptionL2 } from './income_normal_option_l';
import style from './style.less';
import { jumpGobalRouter } from '@/pages/ko/utils/utils';

class Income extends React.Component {
  jump = () =>{
    handleDataTrace({"widgetName":`创收_进入详情`,"traceName":`2.0/创收_进入详情`});
    jumpGobalRouter('newDetail/incomeRank' );
  };

  render() {
    const { WorkbenchIncome, userType } = this.props;
    const { sumData, pieData=[], rank,boss=[]} = WorkbenchIncome || {};
    const {sumAmount,sumOrder} = sumData || {};
    const {rankList=[]} = rank || {};

    const optionL = getOptionL2(rankList);
    const optionR = getOptionR2(pieData);
    const optionBossL = getOptioBossL(boss);
    const optionBossR = getOptionBossR(pieData,sumAmount);

    const dot = pieData.map((item)=>{
      return <span> <i style={{backgroundColor: `${item.name==='好推'?'#45D199':item.name==='续报'?'#FEC350':'#6769DA'}`}}/>{sumAmount>999999?thousandsFormatDot((item.value/10000).toFixed(2))+'万':item.value}</span>
    });
    const dotName = pieData.map((item)=>{
      return <span><i/>{item.name}</span>
    });
    return (
      <div className={stylefather.boxRight}>
        <div className={stylefather.boxHeader}>
          <img src={chuangshou} alt=""/>
          <span className={stylefather.headerTitle}>创收</span>
          <img src={gengduo} alt="" onClick={()=>this.jump()}/>
        </div>

        {userType==='boss'&&<div className={style.crossRow}>
          <Echarts options={optionBossL} style={{ height: 250, width:265,float:'left'}}/>
          <Echarts options={optionBossR} style={{ height: 250, width:260,float:'left'}}/>
          <div className={style.footer}>
            {dot}
          </div>
          <div className={style.footer2}>
            {dotName}
          </div>
        </div>}
        {userType!=='boss'&&<div className={style.crossRow}>
          <div className={style.ScoreLeft}>
            <div className={style.incomeTotal}>
              <div>
                <div>{sumAmount>999999?thousandsFormatDot((sumAmount/10000).toFixed(2)):sumAmount}</div>
                <div>总流水({sumAmount>999999?'万元':'元'})</div>
              </div>
              <div>
                <div>{sumOrder}</div>
                <div>总单量</div>
              </div>
            </div>
            <Echarts options={optionL} style={{ height: 190}}/>
          </div>
          <div className={style.incomeRight}>
          <Echarts options={optionR} style={{ height: 250, width:260,float:'left'}}/>
          </div>
          <div className={style.footer}>
            {dot}
          </div>
          <div className={style.footer2}>
            {dotName}
          </div>
        </div>}
      </div>
    );
  }
}

export default Income;
