import React from 'react';
import SangJiEcharts from './components/sangji_echarts';
import Views from './views'
import style from './style.less';

class KoSangJi extends React.Component {

  render() {
    return (
      <div className={style.KoSangJi}>
        <div>
          <Views></Views>
        </div>
        <div className={style.rowWrap}>
          <SangJiEcharts className={style.colWrap} style={{width:'16%',height:'490px'}}  position={'left'}></SangJiEcharts>
          <SangJiEcharts className={style.colWrap} style={{width:'58%',height:'490px'}}  position={'right'}></SangJiEcharts>
        </div>
      </div>
    );
  }
}

export default KoSangJi;
