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
        <SangJiEcharts position={'left'}></SangJiEcharts>
        <SangJiEcharts position={'right'}></SangJiEcharts>

        <KoDetail />
      </div>
    );
  }
}

export default KoSangJi;
