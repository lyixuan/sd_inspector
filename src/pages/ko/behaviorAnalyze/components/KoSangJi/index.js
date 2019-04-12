import React from 'react';
import SangJiEcharts from './components/sangji_echarts';
import style from './style.less';

class KoSangJi extends React.Component {

  render() {
    return (
      <div className={style.KoSangJi}>
        <SangJiEcharts position={'left'}></SangJiEcharts>
        <SangJiEcharts position={'right'}></SangJiEcharts>
      </div>
    );
  }
}

export default KoSangJi;
