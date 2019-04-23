import React from 'react';
import { connect } from 'dva';
import KoSangJi from './components/KoSangJi';
import BarEcharts from './components/EchartsBar'
@connect(({ behavior, koPlan }) => ({
  behavior,
}))
class behavior extends React.Component {
  componentDidMount() {
    this.getInitData();
    this.getHotDataList()
  }
  getInitData = () => {
    this.props.dispatch({
      type: 'koPlan/pageParams',
    })

  }
  getHotDataList = () => {
    this.props.dispatch({
      type: 'behavior/getHotDataList',
      payload: {}
    })
  };
  render() {

    return (
      <div>
        {/*------- 图1 桑吉 部分 --------*/}
        <KoSangJi {...this.props}></KoSangJi>
        {/*------- 图2 柱状 部分 --------*/}
        <BarEcharts {...this.props} />
      </div>
    );
  }
}

export default behavior;
