import React from 'react';
import { connect } from 'dva';
import KoSangJi from './components/KoSangJi';
import BarEcharts from './components/EchartsBar'
@connect(({ behavior, koPlan }) => ({
  behavior,
  tabFromParams: koPlan.tabFromParams,
  params: koPlan.params,
}))
class behavior extends React.Component {
  componentDidMount() {
    this.getInitParams();
    this.getInitData();

  }
  UNSAFE_componentWillReceiveProps(nextProps) {
  }
  getInitParams = () => {
    this.props.dispatch({
      type: 'koPlan/pageParams',
    })
  }
  getInitData = () => {
    this.props.dispatch({
      type: 'behavior/getSankeyList',
      payload: { params: {} }
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
