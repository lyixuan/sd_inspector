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
        <SangJiEcharts position={'left'}></SangJiEcharts>
        <SangJiEcharts position={'right'}></SangJiEcharts>
      </div>
    );
  }
}

export default KoSangJi;
