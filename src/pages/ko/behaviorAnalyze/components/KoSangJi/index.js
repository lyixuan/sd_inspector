import React from 'react';
import SangJiEcharts from './components/sangji_echarts';
import Views from './views'
import KoDetail from './components/HotImg/KO_detail';
import style from './style.less';

class KoSangJi extends React.Component {

  render() {
    return (
      <div className={style.KoSangJi}>
        <div>
          <Views></Views>
        </div>
        <div className={style.rowWrap}>
          <SangJiEcharts className={style.colWrap} style={{width:'18%',height:'525px'}}  position={'left'}></SangJiEcharts>
          <KoDetail />
          <SangJiEcharts className={style.colWrap} style={{width:'60%',height:'525px'}}  position={'right'}></SangJiEcharts>
        </div>
      </div>
    );
  }
}

export default KoSangJi;
