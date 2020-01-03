import React from 'react';
import { connect } from 'dva';
import PageTab from './components/pageTab';
import ParamsTop from './components/paramsTop';
import { handleDataTrace } from '@/utils/utils';
import { getDateObj } from '@/pages/indexPage/components/utils/utils';
import styles from './style.less';

const traceName = {
  orgId: '后端归属',
  star: '星级',
  reasonType: '原因分类',
  evaluateType: '自主评价',
  tagId: 'NPS标签',
  dateRange: '时间',
  cycle: '生命周期'
}
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
    // this.getSelectData({...getDateObj(payload.dateRange), flag: true}) // 参数值展示
    this.getInitData(payload); // 列表展示
  };
  // 参数基础数据
  // getSelectData = (params) => {
  //   this.props.dispatch({
  //     type: 'npsAnalyzeModel/getOriginPackageList',
  //     payload: { params },
  //   });
  //   // 续报分析 - 续报热销榜单
  //   this.props.dispatch({
  //     type: 'npsAnalyzeModel/getPackageList',
  //     payload: { params },
  //   });
  // };
  // 列表数据
  getInitData = newQuery => {
    const params = this.getRequestParams({ ...this.props.paramsQuery, ...newQuery });
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
            
          </>
        ),
        dataTrace: '{"widgetName":"创收_数据透视","traceName":"2.2/创收_数据透视"}',
      },
      {
        title: '创收明细',
        children: <></>,
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
