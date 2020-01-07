import React from 'react';
import { connect } from 'dva';
import PageTab from './components/pageTab';
import ParamsTop from './components/paramsTop';
import DetailsIndex from './components/detailsIndex';
import { handleDataTrace } from '@/utils/utils';
import { getDateObj } from '@/pages/indexPage/components/utils/utils';
import styles from './style.less';
import Cycle from './components/cycle';
import Score from './components/score';
import Tag from './components/tag';
import NPS from './components/NPSeCharts';
import Reson from './components/reson';

const traceName = {
  orgId: '后端归属',
  star: '星级',
  reasonType: '原因分类',
  evaluateType: '自主评价',
  tagId: 'NPS标签',
  dateRange: '时间',
  cycle: '生命周期',
};
@connect(({ newDetailModal, npsAnalyzeModel }) => ({
  globalUserInfo: newDetailModal.globalUserInfo,
  paramsQuery: npsAnalyzeModel.paramsQuery,
}))
class Resubmit extends React.Component {
  componentDidMount() {
    // 搜索学院展示值
    this.props.dispatch({
      type: 'npsAnalyzeModel/getCollegeList',
    });
    // 搜索原因分类展示值
    this.props.dispatch({
      type: 'npsAnalyzeModel/getReasonTypeTree',
    });
    // 搜索NPS标签展示值
    this.props.dispatch({
      type: 'npsAnalyzeModel/getTagSelectList',
    });
    // handleDataTrace({"widgetName": '创收_透视分析',"traceName": '2.2/创收_透视分析', traceType:200});
  }
  // 搜索条件值改变
  onParamsChange = (val, type = 'dateRange') => {
    const payload = { [type]: val };
    // handleDataTrace({ widgetName: `创收_${traceName[type]}筛选`, traceName: `2.2/创收_${traceName[type]}筛选` })
    this.props.dispatch({
      type: 'npsAnalyzeModel/saveParams',
      payload,
    }); // 存值
    this.getInitData(payload); // 请求
  };
  // 时间切换 --- 清空原产品包、续报产品包
  onObjChange = (payload = {}) => {
    // handleDataTrace({ widgetName: '创收_时间筛选', traceName: '2.2/创收_时间筛选' })
    this.props.dispatch({
      type: 'npsAnalyzeModel/saveParams',
      payload,
    }); // 存值
    this.getInitData(payload); // 列表展示
  };
  // 列表数据
  getInitData = newQuery => {
    const params = this.getRequestParams({ ...this.props.paramsQuery, ...newQuery });
    this.getCycleList(params);
    this.getTagList(params);
    this.getNpsData(params);
    this.getRestTrend(params);
    this.statReasonType(params);
    // 学院明细
    this.getQueryStuDetailPage(params);
  };
  // 续费学院生命周期
  getCycleList = params => {
    this.props.dispatch({
      type: 'npsAnalyzeModel/getCycleList',
      payload: { params },
    });
  };
  // 标签
  getTagList = params => {
    this.props.dispatch({
      type: 'npsAnalyzeModel/getTagList',
      payload: { params },
    });
  };

  //词云图 柱状图
  getNpsData = params => {
    this.props.dispatch({
      type: 'npsAnalyzeModel/getNpsData',
      payload: { params },
    });
  };

  // 净推荐值
  getRestTrend = params => {
    this.props.dispatch({
      type: 'npsAnalyzeModel/getRestTrend',
      payload: { params },
    });
  };

  // 原因分类
  statReasonType = params => {
    this.props.dispatch({
      type: 'npsAnalyzeModel/statReasonType',
      payload: { params },
    });
  };

  // 学员明细
  getQueryStuDetailPage = params => {
    const query = !params.pageSize ? { ...params, pageSize: 15, page: 1 } : params;
    this.props.dispatch({
      type: 'npsAnalyzeModel/getNpsAutonomousEvaluation',
      payload: { params: query },
    });
  };

  // 请求参数
  getRequestParams = (params = this.props.paramsQuery) => {
    const { dateRange, reasonType = [], tagId = [], orgId = [], ...others } = params;
    const [collegeId, familyId, groupId] = orgId;
    return {
      ...others,
      ...getDateObj(dateRange),
      collegeId,
      familyId,
      groupId,
      reasonType: reasonType.length > 0 ? reasonType[reasonType.length - 1] : undefined,
      tagId: tagId.length > 0 ? tagId[tagId.length - 1] : undefined,
    };
  };
  getTabs = () => {
    return [
      {
        title: '数据透视',
        children: (
          <>
            <div className={styles.tabTop}>
              <Cycle onParamsChange={this.onParamsChange} />
              <Score onParamsChange={this.onParamsChange} />
              <Tag onParamsChange={this.onParamsChange} />
            </div>
            <div className={styles.tabCenter}>
              <NPS />
              <Reson onParamsChange={this.onParamsChange} />
            </div>
          </>
        ),
        // dataTrace: '{"widgetName":"创收_数据透视","traceName":"2.2/创收_数据透视"}',
      },
      {
        title: '学员明细',
        children: (
          <DetailsIndex
            getQueryStuDetailPage={this.getQueryStuDetailPage}
            getRequestParams={this.getRequestParams}
          />
        ),
        // dataTrace: '{"widgetName":"创收_创收明细","traceName":"2.2/创收_创收明细"}',
      },
    ];
  };
  render() {
    const { globalUserInfo } = this.props;
    return (
      <div className={styles.resubmit}>
        {globalUserInfo && globalUserInfo.userType && (
          <>
            <div className={styles.paramsQuery}>
              <ParamsTop onParamsChange={this.onParamsChange} onObjChange={this.onObjChange} />
            </div>
            <PageTab tabs={this.getTabs()} />
          </>
        )}
      </div>
    );
  }
}

export default Resubmit;
