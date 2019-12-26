import React from 'react';
import { connect } from 'dva/index';
import router from 'umi/router';
import CSTable from '@/pages/scoreAppeal/components/Table';
import { BiFilter,dealQuarys } from '@/utils/utils';
import style from './style.less'
import AuthButton from '@/components/AuthButton/index';
import CSForm from '@/pages/scoreAppeal/components/Form';
import storage from '@/utils/storage';
import moment from 'moment/moment';

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
    dataIndex: 'creditName',
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

@connect(({ scoreAppealModel,finishAppealModel,loading }) => ({
  scoreAppealModel,finishAppealModel,
  loading: loading.effects['finishAppealModel/getFinishAppealList'],
  exportLoading: loading.effects['scoreAppealModel/exportExcel'],
}))
class FinishAppeal extends React.Component {
  constructor(props) {
    super(props);
    const {params=null} = this.props.location.query;
    const myParam = JSON.parse(params);
    this.state = {
      page: 1,
      pageSize: 30,
      dimensionType: (myParam&&myParam.dimensionType)?myParam.dimensionType:AuthButton.checkPathname('/scoreAppeal/onAppeal/specialNewer')?11:23
    };
  }
  componentDidMount() {
    const {dimensionType} = this.state;
    let {params=null} = this.props.location.query;
    if(params===null){storage.removeSessonItem('score_tab3')}
    const pNew = JSON.parse(params);
    if(pNew && pNew.creditBeginDate && pNew.creditEndDate){
      this.initTime = {creditBeginDate:pNew.creditBeginDate,creditEndDate:pNew.creditEndDate};
    } else {
      this.initTime = {creditBeginDate:moment().subtract(6,'days').format('YYYY-MM-DD'),creditEndDate:moment().format('YYYY-MM-DD')};
    }

    params=JSON.stringify({...JSON.parse(params),...this.initTime})
    this.queryData(dimensionType,JSON.parse(params),null,null,1);
  }

  queryData = (dimensionType, pm, pg,exp,flag) => {
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
    const timeParams = JSON.stringify(this.initTime);
    let score_tab = storage.getSessionItem('score_tab3');
    if (score_tab) {
      score_tab = saveUrlParams;
      if(flag===1){
        score_tab = timeParams;
      }
      storage.setSessonItem('score_tab3',score_tab);
    } else {
      storage.setSessonItem('score_tab3',saveUrlParams);
      if(flag===1){
        storage.setSessonItem('score_tab3', timeParams);
      }
    }
    const that = this;
    // 请求成功后保留查询条件
    if (!exp){
      this.props.dispatch({
        type: 'finishAppealModel/getFinishAppealList',
        payload: { params },
      }).then(() => {
        router.replace({
          pathname: this.props.location.pathname,
          query: saveUrlParams ? { params: saveUrlParams } : {}
        })
      });
    } else {
      this.props.dispatch({
        type: 'scoreAppealModel/exportExcel',
        payload: {params:{ ...params,...{type:2} }},
      })
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
    const query={
      id: record.id, // 获取审核记录用id
      dimensionId: record.metaDimensionId, // 获取详情用id
      dimensionType,   // 申诉维度
      creditDate:record.creditDate,
      creditType:record.creditType,  // 学分维度
      secondAppealEndDate:record.secondAppealEndDate,  // 详情展示
    };
    this.onJumpPage(query, '/scoreAppeal/finishAppeal/detail');
  };

  columnsAction = () => {
    const actionObj = [{
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
          <>
            <AuthButton authority='/scoreAppeal/finishAppeal/detail'>
              <span style={{marginLeft:'-5px'}} className={style.actionBtn} onClick={() => this.onDetail(record)}>
                详情
              </span>
            </AuthButton>
          </>
        );
      },
    }];
    return [...columns, ...actionObj];
  };

  changeTab(dimensionType){
    const score_tab = storage.getSessionItem('score_tab3');
    if (score_tab) {
      const tabParams = JSON.parse(score_tab);
      delete tabParams.creditType;
      this.setState({
        dimensionType
      },()=>this.queryData(dimensionType,tabParams,undefined))
    } else {
      this.setState({
        dimensionType
      },()=>this.queryData(dimensionType,undefined,{page:1}))
    }
  }
  formSubmit(dimensionType,params,pg,exp){
    this.queryData(dimensionType,params,pg,exp)
  }
  changePage(dimensionType,params,pg){
    const score_tab = storage.getSessionItem('score_tab3');
    if (score_tab) {
      const tabParams = JSON.parse(score_tab);
      delete tabParams.creditType;
      this.setState({
        dimensionType:this.state.dimensionType
      },()=>this.queryData(dimensionType,tabParams,pg))
    } else {
      this.setState({
        dimensionType:this.state.dimensionType
      },()=>this.queryData(dimensionType,undefined,pg))
    }
  }
  render() {
    const {dimensionType} = this.state;
    const {loading} = this.props;
    const {finishList=[],page} = this.props.finishAppealModel;
    return (
      <>
        <p className={style.wrap}>
          <AuthButton authority='/scoreAppeal/finishAppeal/specialNewer'>
            <span onClick={()=>this.changeTab(11)} className={11===dimensionType?style.active:null}>优新</span>
          </AuthButton>
          <AuthButton authority='/scoreAppeal/finishAppeal/IM'>
            <span onClick={()=>this.changeTab(14)} className={14===dimensionType?style.active:null}>IM</span>
          </AuthButton>
          <AuthButton authority='/scoreAppeal/finishAppeal/order'>
            <span onClick={()=>this.changeTab(19)}  className={19===dimensionType?style.active:null}>工单</span>
          </AuthButton>
          <AuthButton authority='/scoreAppeal/finishAppeal/baseline'>
            <span onClick={()=>this.changeTab(23)}  className={23===dimensionType?style.active:null}>底线</span>
          </AuthButton>
          <AuthButton authority='/scoreAppeal/finishAppeal/createIncome'>
            <span onClick={()=>this.changeTab(42)}  className={42===dimensionType?style.active:null}>创收</span>
          </AuthButton>
        </p>
        <CSForm {...this.props} dimensionType={dimensionType} progress={'finishAppeal'} onSubmit={(params,pg,exp)=>{this.formSubmit(undefined,params,pg,exp)}}/>
        <CSTable dataSource={finishList} columns={this.columnsAction()} loading={loading} page={page} changePage={(pg)=>{this.changePage(undefined,undefined,pg)}}/>
      </>
    );
  }
}

export default FinishAppeal;
