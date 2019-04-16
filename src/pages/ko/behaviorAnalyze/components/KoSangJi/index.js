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
        <SangJiEcharts style={{width:'300px',height:'300px'}}  position={'left'}></SangJiEcharts>
        <KoDetail />
        <SangJiEcharts style={{width:'700px',height:'300px',marginLeft:50}}  position={'right'}></SangJiEcharts>
      </div>
    );
  }
}

export default KoSangJi;
