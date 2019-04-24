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
    this.getData();

  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.tabFromParams) !== JSON.stringify(this.props.tabFromParams)) {
      this.getData(nextProps.tabFromParams);
    }
  }
  getInitParams = () => {
    this.props.dispatch({
      type: 'koPlan/pageParams',
    })
  };
  getData = (params = this.props.tabFromParams) => {
    if (JSON.stringify(params) === '{}') return;
    const { formParams = {}, page, belongApp, ...others } = params;
    const otherParams = { ...others };
    this.props.dispatch({
      type: 'behavior/getSankeyList',
      payload: { params: { belongApp, page: page.actionValue }, formParams, otherParams }
    })
  };
  render() {
    const { upPage, downPage, currentPage } = this.props.behavior;
    return (
      <div>
        {/*------- 图1 桑吉 部分 --------*/}
        <KoSangJi {...this.props} upPage={upPage} downPage={downPage} currentPage={currentPage}></KoSangJi>
        {/*------- 图2 柱状 部分 --------*/}
        <BarEcharts {...this.props} />
      </div>
    );
  }
}

export default behavior;
