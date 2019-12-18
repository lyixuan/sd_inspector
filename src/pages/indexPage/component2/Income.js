import React from 'react';
import stylefather from '../indexPage.less';
import chuangshou from '@/assets/newIndex/chuangshou@2x.png';
import gengduo from '@/assets/newIndex/gengduo@2x.png';
import Echarts from './Echart_WorkBentch';
import { getOptionR } from './income_boss_option';
import { getOptionL } from './income_boss_option_l';

import { getOptionR2 } from './income_normal_option';
import { getOptionL2 } from './income_normal_option_l';
import style from './style.less';

class Income extends React.Component {
  render() {
    const { WorkbenchIncome, userType } = this.props;
    const optionR = getOptionR(1);
    const optionL = getOptionL(1);
    const optionR2 = getOptionR2(1);
    const optionL2 = getOptionL2(1);
    return (
      <div className={stylefather.boxRight}>
        <div className={stylefather.boxHeader}>
          <img src={chuangshou} alt=""/>
          <span className={stylefather.headerTitle}>创收</span>
          <img src={gengduo} alt=""/>
        </div>

        {userType==='boss'&&<div className={style.crossRow}>
          <Echarts options={optionL} style={{ height: 250, width:265,float:'left'}}/>
          <Echarts options={optionR} style={{ height: 250, width:260,float:'left'}}/>
          <div className={style.footer}>
            <span><i style={{backgroundColor:'#45D199'}}/>823.1</span>
            <span><i style={{backgroundColor:'#FEC350'}}/>823.1</span>
            <span><i style={{backgroundColor:'#6769DA'}}/>823.1</span>
          </div>
          <div className={style.footer2}>
            <span><i/>好推</span>
            <span><i/>续报</span>
            <span><i/>成本套</span>
          </div>
        </div>}
        {userType!=='boss'&&<div className={style.crossRow}>
          <div className={style.ScoreLeft}>
            <div className={style.incomeTotal}>
              <div>
                <div>612</div>
                <div>总流水(元)</div>
              </div>
              <div>
                <div>56</div>
                <div>总单量</div>
              </div>
            </div>
            <Echarts options={optionL2} style={{ height: 190}}/>
          </div>
          <div className={style.incomeRight}>
          <Echarts options={optionR2} style={{ height: 250, width:260,float:'left'}}/>
          </div>
          <div className={style.footer}>
            <span><i style={{backgroundColor:'#45D199'}}/>823.1</span>
            <span><i style={{backgroundColor:'#FEC350'}}/>823.1</span>
            <span><i style={{backgroundColor:'#6769DA'}}/>823.1</span>
          </div>
          <div className={style.footer2}>
            <span><i/>好推</span>
            <span><i/>续报</span>
            <span><i/>成本套</span>
          </div>
        </div>}
      </div>
    );
  }
}

export default Income;
