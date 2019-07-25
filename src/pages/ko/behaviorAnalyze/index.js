import React from 'react';
import { Spin } from 'antd';
import { connect } from 'dva';
import KoSangJi from './components/KoSangJi';
import BarEcharts from './components/EchartsBar'
const pageDetailTotal = {
  1: [
    'homepage',//首页
    'storelist',//商城
    'studypage',//学习列表
    'kogoodsdetail',//ko课程详情
    'kolist',//ko课程列表
    'majordetail',// 自考课程（专业）详情
    'livefeedpage',//直播瀑布流页
    'livebroadcastpage',//直播
    'newPage',],
  2: [
    'homepage_main',//首页
    'storelistpage_main',//商城
    'studypage_main',//学习列表
    'kogoodsdetailspage_main',//ko课程详情
    'kogoodslistpage_main',//ko课程列表
    'majordetailpage_main', ]// 自考课程（专业）详情,
};
@connect(({ behavior, koPlan, loading }) => ({
  behavior,
  tabFromParams: koPlan.tabFromParams,
  params: koPlan.params,
  loading: loading.effects['behavior/getSankeyList'],
}))
class behavior extends React.Component {
  componentDidMount() {
    this.getInitParams();
    this.getData();

  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.tabFromParams) !== JSON.stringify(this.props.tabFromParams)) {
      this.getData(nextProps.tabFromParams);
      if (nextProps.tabFromParams.belongApp !== this.props.tabFromParams.belongApp) {
        this.props.dispatch({
          type: 'koPlan/getPageList',
          payload: { belongApp: nextProps.tabFromParams.belongApp }
        });
      }
    }
  }
  componentWillUnmount() {
    this.props.dispatch({
      type: 'koPlan/saveTabFromParamsPage',
      payload: { formParams: { } },
    });
  }

  getInitParams = () => {
    this.props.dispatch({
      type: 'koPlan/pageParams',
    });
    this.props.dispatch({
      type: 'koPlan/getPageList',
      payload: { belongApp: this.props.tabFromParams.belongApp }
    });
  };
  gotoUserList = (params) => {
    this.props.dispatch({
      type: 'koPlan/saveChooseEventData',
      payload: {
        chooseEventData: [{ id: params.data.name.actionKey, name: params.data.name.name }],
      }
    });
    this.props.history.push({
      pathname: '/koUserData/userList'
    });
  }

  getData = (params = this.props.tabFromParams) => {
    if (JSON.stringify(params) === '{}') return;
    const { formParams = {}, page, belongApp = 1, ...others } = params;
    const otherParams = { ...others };
    if (!page || !pageDetailTotal[belongApp].includes(page.actionValue)) return; // 主-页面对应时在发出请求。
    this.props.dispatch({
      type: 'behavior/getSankeyList',
      payload: { params: { belongApp, page: page.actionValue }, formParams, otherParams }
    })
  };
  render() {
    const { upPage, downPage, currentPage } = this.props.behavior;
    return (
      <div>
        <Spin tip="Loading..." spinning={this.props.loading}>
          {/*------- 图1 桑吉 部分 --------*/}
          <KoSangJi {...this.props} upPage={upPage} downPage={downPage} currentPage={currentPage+'$-1'}></KoSangJi>
        </Spin>
        {/*------- 图2 柱状 部分 --------*/}
        <Spin tip="Loading..." spinning={this.props.loading}>
          <BarEcharts {...this.props} gotoUserList={this.gotoUserList} />
        </Spin>
      </div>
    );
  }
}

export default behavior;
