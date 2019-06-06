import React from 'react';
import RenderRoute from '@/components/RenderRoute';
import CSTable from '@/pages/scoreAppeal/components/Table';
import { connect } from 'dva/index';
import { BiFilter, DeepCopy } from '@/utils/utils';
import router from 'umi/router';
import style from './style.less'
import AuthButton from '@/components/AuthButton/index';
import CSForm from '@/pages/scoreAppeal/components/Form';
import BIModal from '@/ant_components/BIModal';
import {dealQuarys} from '@/utils/utils';
import { queryOnAppealList } from '@/pages/scoreAppeal/onAppeal/services';
const confirm = BIModal.confirm;

const columns = [
  {
    title: '申诉单号',
    dataIndex: 'appealOrderNum',
  },
  {
    title: '学分日期',
    dataIndex: 'creditDate',
  },
  {
    title: '学分维度',
    dataIndex: 'dimensionName',
  },
  {
    title: '归属组织',
    dataIndex: 'collegeName',
    render: (text, record) => {
      return (
        <>
          {`${record.collegeName ? record.collegeName : ''} ${record.familyName ? `| ${record.familyName}` : ''}  ${record.groupName ? `| ${record.groupName}` : ''}`}
        </>
      );
    },
  },
  {
    title: '申诉日期',
    dataIndex: 'appealDate',
  },
  {
    title: '二申截止日期',
    dataIndex: 'secondAppealEndDate',
  },
  {
    title: '申诉状态',
    dataIndex: 'status',
    render: (text, record) => {
      return (
        <>
          {BiFilter(`SCORE_APPEAL_STATE|id:${text}`).name}
        </>
      );
    },
  },
];


@connect(({ scoreAppealModel,onAppealModel,loading }) => ({
  scoreAppealModel,onAppealModel,
  loading: loading.effects['onAppealModel/queryOnAppealList'],
  exportLoading: loading.effects['onAppealModel/exportExcel'],
}))
class OnAppeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 30,
      dimensionType: 11
    };
  }
  componentDidMount() {
    const {dimensionType} = this.state;
    const {params=null} = this.props.location.query;
    this.queryData(dimensionType,JSON.parse(params));
  }

  queryData = (dimensionType, pm, pg, exp) => {
    let params = this.state;
    let paramsUrl = this.state;
    if(pm){
      paramsUrl = { ...this.state, ...pm };
      params = { ...this.state, ...dealQuarys(pm) };
    }
    if (pg) {
      paramsUrl = { ...paramsUrl, ...pg };
      params = { ...params, ...pg };
      this.setState({
        page: pg.page
      });
    }

    if (dimensionType) {
      paramsUrl = { ...paramsUrl, ...{dimensionType} };
      params = { ...params, ...{dimensionType} };
      this.setState({
        dimensionType
      });
    }

    const saveUrlParams =JSON.stringify(paramsUrl);

    // 请求成功后保留查询条件
    const that = this;
    if (!exp){
      this.props.dispatch({
        type: 'onAppealModel/queryOnAppealList',
        payload: { params },
      }).then(() => {
        router.replace({
          pathname: this.props.location.pathname,
          query: saveUrlParams ? { params: saveUrlParams } : {}
        })
      });
    } else {
      this.props.dispatch({
        type: 'onAppealModel/exportExcel',
        payload: { params },
      }).then(() => {
        that.componentDidMount()
      });
    }
  };
  onJumpPage = (query, pathname) => {
    router.push({
      pathname,
      query
    });
  };
  onDetail = (record) => {
    const {dimensionType} = this.state;
    this.onJumpPage({ dimensionId: record.metaDimensionId,dimensionType,isAwait:false }, '/scoreAppeal/appeal_detail');
  };
  onCreateAppeal = (record) => {
    const {dimensionType} = this.state;
    this.onJumpPage({ dimensionId: record.metaDimensionId,dimensionType,isAwait:false,creditType:record.creditType }, '/scoreAppeal/appeal_create');
  };
  onAppeal = (record) => {
    const {dimensionType} = this.state;
    this.onJumpPage({ id:record.id,dimensionId: record.metaDimensionId,dimensionType,isAwait:false,creditType:record.creditType }, '/scoreAppeal/appeal_check');
  };
  onRepeal = (record) => {
    const that = this;
    confirm({
      className: 'BIConfirm',
      title: '是否撤销当前数据状态?',
      cancelText: '取消',
      okText: '确定',
      onOk() {
        that.props.dispatch({
          type: 'onAppealModel/cancelAppeal',
          payload: { params: { id: record.id } },
        }).then(() => {
          that.componentDidMount()
        });
      },
    });
  };
  columnsAction = () => {
    const actionObj = [{
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
          <>
            <AuthButton authority='/scoreAppeal/onAppeal/detail'>
              <span style={{marginLeft:'-5px'}} className={style.actionBtn} onClick={() => this.onDetail(record)}>
                详情
              </span>
            </AuthButton>
            <AuthButton authority='/scoreAppeal/onAppeal/appeal'>
              <span className={style.actionBtn} onClick={() => this.onCreateAppeal(record)}>
                申诉
              </span>
            </AuthButton>
            <AuthButton authority='/scoreAppeal/onAppeal/repeal'>
              <span className={style.actionBtn} onClick={() => this.onRepeal(record)}>
                撤销
              </span>
            </AuthButton>
            <AuthButton authority='/scoreAppeal/appeal/dockingMan'>
              <span className={style.actionBtn} onClick={() => this.onAppeal(record)}>
                对接人审核
              </span>
            </AuthButton>
            <AuthButton authority='/scoreAppeal/appeal/master'>
              <span className={style.actionBtn} onClick={() => this.onAppeal(record)}>
                主管审核
              </span>
            </AuthButton>
          </>
        );
      },
    }];
    return [...columns, ...actionObj];
  };
  changeTab(dimensionType){
    const {params:oldParams} = this.props.location.query;
    const {dimensionType:oldDem,...others} = JSON.parse(oldParams);
    this.setState({
      dimensionType
    },()=>this.queryData(dimensionType,{...others,creditType:undefined},{page:1}))
  }
  formSubmit(dimensionType,params,pg,exp){
    this.queryData(dimensionType,params,pg,exp)
  }
  changePage(dimensionType,params,pg){
    this.queryData(dimensionType,params,pg)
  }

  render() {
    const {dimensionType} = this.state;
    const {loading} = this.props;
    const {onList=[],page} = this.props.onAppealModel;
    return (
      <>
        <p className={style.wrap}>
          <AuthButton authority='/scoreAppeal/onAppeal/specialNewer'>
            <span onClick={()=>this.changeTab(11)} className={11===dimensionType?style.active:null}>优新</span>
          </AuthButton>
          <AuthButton authority='/scoreAppeal/onAppeal/IM'>
            <span onClick={()=>this.changeTab(14)} className={14===dimensionType?style.active:null}>IM</span>
          </AuthButton>
          <AuthButton authority='/scoreAppeal/onAppeal/order'>
            <span onClick={()=>this.changeTab(19)}  className={19===dimensionType?style.active:null}>工单</span>
          </AuthButton>
          <AuthButton authority='/scoreAppeal/onAppeal/baseline'>
            <span onClick={()=>this.changeTab(23)}  className={23===dimensionType?style.active:null}>底线</span>
          </AuthButton>
          <AuthButton authority='/scoreAppeal/onAppeal/createIncome'>
            <span onClick={()=>this.changeTab(42)}  className={42===dimensionType?style.active:null}>创收</span>
          </AuthButton>
        </p>
        <CSForm {...this.props} dimensionType={dimensionType} onSubmit={(params,pg,exp)=>{this.formSubmit(undefined,params,pg,exp)}} />
        <CSTable dataSource={onList} columns={this.columnsAction()} loading={loading} page={page} changePage={(pg)=>{this.changePage(undefined,undefined,pg)}}/>
      </>
    );
  }
}

export default OnAppeal;
