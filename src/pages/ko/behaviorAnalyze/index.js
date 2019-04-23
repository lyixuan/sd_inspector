import React from 'react';
import { connect } from 'dva';
import KoSangJi from './components/KoSangJi';
import BarEcharts from './components/EchartsBar'
@connect(({ behavior }) => ({
  behavior,
}))
class behavior extends React.Component {
  componentDidMount() {
    this.getInitData();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.tabType === '2' && nextProps.tabType === '1') {
      this.getInitData()
    }
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
