import React from 'react';
import Echart from '@/components/Echart';
import style from './style.less';
import { options } from './component/bar_echarts';
import TitleName  from './component/titleName';

class BarEcharts extends React.Component {
  eConsole = (e) => {
    this.props.history.push({
      pathname:'/ko/userList',
    });
 };
  render() {
    return (
      <div className={style.barWrap}>
        <TitleName name='用户行为事件分析'/>
        <div className={style.barContent}>
          <Echart
            isEmpty={false}
            clickEvent={this.eConsole}
            style={{ width: '100%', height:'297px' }}
            options={options()} />
        </div>

      </div>
    );
  }
}

export default BarEcharts;
