import React from 'react';
import { connect } from 'dva';
import PageTab from './components/pageTab';
import ParamsTop from './components/paramsTop';
import OriginIndex from './components/originIndex';
import PackageIndex from './components/packageIndex';
import DetailsIndex from './components/detailsIndex';
import CollegeFamily from './components/collegeFamily';
import CyclePath from './components/cyclePath';
import { getDateObj } from '@/pages/indexPage/components/utils/utils';
import styles from './style.less';

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
  }
  // 搜索条件值改变
  onParamsChange = (val, type = 'dateRange') => {
    const payload = { [type]: val };
    this.props.dispatch({
      type: 'resubmitModal/saveParams',
      payload,
    }); // 存值
    this.getInitData(payload); // 请求
  };
  // 时间切换 --- 清空原产品包、续报产品包
  onObjChange = (payload = {}) => {
    this.props.dispatch({
      type: 'resubmitModal/saveParams',
      payload,
    }); // 存值
    this.getSelectData(getDateObj(payload.dateRange)); // 参数值展示
    this.getInitData(payload); // 列表展示
  };
  // 参数基础数据
  getSelectData = params => {
    console.log(params, 'mmmmm');
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
              <OriginIndex />
              <PackageIndex />
            </div>
            <CollegeFamily onParamsChange={this.onParamsChange} />
            <CyclePath onParamsChange={this.onParamsChange} />
          </>
        ),
        dataTrace: '{"widgetName":"学分分析","traceName":"家族长工作台/学分分析"}',
      },
      {
        title: '创收明细',
        children: <DetailsIndex />,
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
