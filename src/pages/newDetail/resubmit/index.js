import React from 'react';
import { connect } from 'dva';
import PageTab from './components/pageTab';
import ParamsTop from './components/paramsTop';
import OriginIndex from './components/originIndex';
import PackageIndex from './components/packageIndex';
import DetailsIndex from './components/detailsIndex';
import CollegeFamily from './components/collegeFamily';
import CyclePath from './components/cyclePath';
import { handleDataTrace } from '@/utils/utils';
import { getDateObj } from '@/pages/indexPage/components/utils/utils';
import styles from './style.less';

const traceName = {
  orgId: '后端归属',
  originPackageName: '原产品包',
  packageName: '续报产品包',
  path: '续报路径',
  lifeCycle: '生命周期',
};
@connect(({ newDetailModal, resubmitModal }) => ({
  resubmitModal,
  globalUserInfo: newDetailModal.globalUserInfo,
  paramsQuery: resubmitModal.paramsQuery,
}))
class Resubmit extends React.Component {
  componentDidMount() {
    // 搜索学院展示值
    this.props.dispatch({
      type: 'resubmitModal/getCollegeList',
    });
    handleDataTrace({
      widgetName: '创收_透视分析',
      traceName: '2.2/创收_透视分析',
      traceType: 200,
    });
  }
  componentWillUnmount() {
    this.props.dispatch({
      type: 'resubmitModal/saveClearParams',
    });
  }
  // 搜索条件值改变
  onParamsChange = (val, type = 'dateRange') => {
    const payload = { [type]: val };
    handleDataTrace({
      widgetName: `创收_${traceName[type]}筛选`,
      traceName: `2.2/创收_${traceName[type]}筛选`,
    });
    this.props.dispatch({
      type: 'resubmitModal/saveParams',
      payload,
    }); // 存值
    this.getInitData(payload); // 请求
  };
  // 时间切换 --- 清空原产品包、续报产品包
  onObjChange = (payload = {}) => {
    handleDataTrace({ widgetName: '创收_时间筛选', traceName: '2.2/创收_时间筛选' });
    this.props.dispatch({
      type: 'resubmitModal/saveParams',
      payload,
    }); // 存值
    this.getSelectData({ ...getDateObj(payload.dateRange), flag: true }); // 参数值展示
    this.getInitData(payload); // 列表展示
  };
  // 参数基础数据
  getSelectData = params => {
    this.props.dispatch({
      type: 'resubmitModal/getOriginPackageList',
      payload: { params },
    });
    // 续报分析 - 续报热销榜单
    this.props.dispatch({
      type: 'resubmitModal/getPackageList',
      payload: { params },
    });
  };
  // 列表数据
  getInitData = newQuery => {
    const params = this.getRequestParams({ ...this.props.paramsQuery, ...newQuery });
    // 续报分析 - 原产品包榜单
    this.getSelectData(params);
    // 学院分析
    this.getCollegeAnalyze(params);
    // 家族分析
    this.getFamilyAnalyze(params);
    // 续费学院生命周期
    this.getCycleList(params);
    // 转班路径分析
    this.getPathList(params);
    // 创收明细
    this.getQueryStuDetailPage(params);
  };

  // 学院分析
  getCollegeAnalyze = params => {
    this.props.dispatch({
      type: 'resubmitModal/getCollegeAnalyze',
      payload: { params },
    });
  };

  // 家族分析
  getFamilyAnalyze = params => {
    this.props.dispatch({
      type: 'resubmitModal/getFamilyAnalyze',
      payload: { params },
    });
  };

  // 续费学院生命周期
  getCycleList = params => {
    this.props.dispatch({
      type: 'resubmitModal/getCycleList',
      payload: { params },
    });
  };

  // 转班路径分析
  getPathList = params => {
    this.props.dispatch({
      type: 'resubmitModal/getPathList',
      payload: { params },
    });
  };
  // 创收明细
  getQueryStuDetailPage = params => {
    const query = !params.pageSize ? { ...params, pageSize: 15, page: 1 } : params;
    this.props.dispatch({
      type: 'resubmitModal/getQueryStuDetailPage',
      payload: { params: query },
    });
  };
  // 请求参数
  getRequestParams = (params = this.props.paramsQuery) => {
    const { dateRange, orgId = [], ...others } = params;
    const [collegeId, familyId] = orgId;
    return {
      ...others,
      ...getDateObj(dateRange),
      collegeId,
      familyId,
    };
  };
  getTabs = () => {
    return [
      {
        title: '数据透视',
        children: (
          <>
            <div className={styles.OriginTab}>
              <OriginIndex onParamsChange={this.onParamsChange} />
              <PackageIndex onParamsChange={this.onParamsChange} />
            </div>
            <CollegeFamily onParamsChange={this.onParamsChange} />
            <CyclePath onParamsChange={this.onParamsChange} />
          </>
        ),
        dataTrace: '{"widgetName":"创收_数据透视","traceName":"2.2/创收_数据透视"}',
      },
      {
        title: '创收明细',
        children: (
          <DetailsIndex
            getQueryStuDetailPage={this.getQueryStuDetailPage}
            getRequestParams={this.getRequestParams}
          />
        ),
        dataTrace: '{"widgetName":"创收_创收明细","traceName":"2.2/创收_创收明细"}',
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
