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
    const formParams={};
    const otherParams={currentActionKeyId:undefined,recordTimeList:["2019-01-01 12:00:00","2019-05-01 12:00:00"]};
    this.props.dispatch({
      type: 'behavior/getSankeyList',
      payload: { params: {belongApp:1,page:'homepage'},formParams,otherParams }
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
