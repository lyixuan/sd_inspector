import React from 'react';
import Echart from '@/components/Echart';
import style from './style.less';
import { options } from './component/bar_echarts';
import TitleName  from './component/titleName';

class BarEcharts extends React.Component {
  eConsole = (e) => {
    this.props.history.push({
      pathname:'/ko/userList',
      query:{actionKey:e.data.name.actionKey}
    });
 };
  render() {
    const{behaviourData} = this.props.behavior
    return (
      <div className={style.barWrap}>
        <TitleName name='用户行为事件分析'/>
        <div className={style.barContent}>
          <Echart
            isEmpty={behaviourData.length===0}
            clickEvent={this.eConsole}
            style={{ width: '100%', height:'267px' }}
            options={options(behaviourData)} />
        </div>
      </div>
    );
  }
}

export default BarEcharts;
