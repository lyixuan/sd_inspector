import React from 'react';
import CSTable from '@/pages/scoreAppeal/components/Table';
import { connect } from 'dva/index';
import { BiFilter } from '@/utils/utils';
import { Popconfirm } from 'antd';
import router from 'umi/router';
import style from './style.less'
import AuthButton from '@/components/AuthButton/index';
import CSForm from '@/pages/scoreAppeal/components/Form';
import BIModal from '@/ant_components/BIModal';
import {dealQuarys} from '@/utils/utils';
import storage from '@/utils/storage';
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


@connect(({ scoreAppealModel,onAppealModel,loading }) => ({
  scoreAppealModel,onAppealModel,
  loading: loading.effects['onAppealModel/queryOnAppealList'],
  exportLoading: loading.effects['scoreAppealModel/exportExcel'],
}))
class OnAppeal extends React.Component {
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
    const {params=null} = this.props.location.query;
    if(params===null){storage.removeSessonItem('score_tab2')}
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
    const score_tab = storage.getSessionItem('score_tab2');
    if (score_tab) {
      score_tab[paramsUrl.dimensionType] = saveUrlParams;
      storage.setSessonItem('score_tab2',score_tab);
    } else {
      storage.setSessonItem('score_tab2',{[paramsUrl.dimensionType]:saveUrlParams});
    }
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
        type: 'scoreAppealModel/exportExcel',
        payload: {params:{ ...params,...{type:1} }},
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
    const {idList=[]} = this.props.onAppealModel;
    const {dimensionType} = this.state;
    const query={
      id: record.id, // 获取审核记录用id
      dimensionId: record.metaDimensionId, // 获取详情用id
      creditType:record.creditType,  // 学分维度
      dimensionType,   // 申诉维度
      status:record.status,
      isOnAppeal:true,
      idList: JSON.stringify(idList),
      secondAppealEndDate:record.secondAppealEndDate,  // 详情展示
    };
    this.onJumpPage(query, '/scoreAppeal/onAppeal/detail');
  };
  onCreateAppeal = (record) => {
    const {dimensionType} = this.state;
    const query={
      type:record.status === 3?1:2,  // 1:一申 2：二申
      creditType:record.creditType,    // 学分维度
      dimensionType,                    // 申诉维度
      creditAppealId: record.id,        // 学分申诉id（待申诉数据ID）
      dimensionId:record.metaDimensionId,        // 获取详情用
      secondAppealEndDate:record.secondAppealEndDate,  // 详情展示
    };
    this.onJumpPage(query, '/scoreAppeal/onAppeal/appeal');
  };
  onCheck = (record) => {
    const {dimensionType} = this.state;
    const query={
      id:record.id,
      dimensionId:record.metaDimensionId,        // 获取详情用
      creditType:record.creditType,  // 学分维度
      dimensionType,            // 申诉维度
      status:record.status,
      firstOrSec:(record.status === 1||record.status === 5)?1:(record.status === 2||record.status === 6)?2:null,// 1 一申，2 二申
      sopOrMaster:(record.status === 1||record.status === 2)?1:(record.status === 5||record.status === 6)?2:null,// 1 sop，2 master
      secondAppealEndDate:record.secondAppealEndDate,  // 详情展示
    };
    this.onJumpPage(query, '/scoreAppeal/onAppeal/checkAppeal');
  };
  onRepeal = (record) => {
    const that = this;
    that.props.dispatch({
      type: 'onAppealModel/cancelAppeal',
      payload: { params: { id: record.id } },
    }).then(() => {
      that.componentDidMount()
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
            {(record.status === 3||record.status === 4||record.status === 7) && (
              <AuthButton authority='/scoreAppeal/onAppeal/appeal'>
              <span className={style.actionBtn} onClick={() => this.onCreateAppeal(record)}>
                申诉
              </span>
              </AuthButton>
            )}
            {(record.status === 1||record.status === 2) && (
              <AuthButton authority='/scoreAppeal/onAppeal/repeal'>
                <Popconfirm
                  title="是否撤销当前数据状态?"
                  onConfirm={() => this.onRepeal(record)}
                  okText="确定"
                  cancelText="取消"
                >
                  <span className={style.actionBtn}>
                    撤销
                  </span>
                </Popconfirm>
              </AuthButton>
            )}
            {(record.status === 1||record.status === 2) && (
              <AuthButton authority='/scoreAppeal/appeal/dockingMan'>
              <span className={style.actionBtn} onClick={() => this.onCheck(record)}>
                审核
              </span>
              </AuthButton>
            )}
            {(record.status === 5||record.status === 6) && (
              <AuthButton authority='/scoreAppeal/appeal/master'>
              <span className={style.actionBtn} onClick={() => this.onCheck(record)}>
                审核
              </span>
              </AuthButton>
            )}
          </>
        );
      },
    }];
    return [...columns, ...actionObj];
  };
  changeTab(dimensionType){
    const score_tab = storage.getSessionItem('score_tab2');
    if (score_tab&&score_tab[dimensionType]) {
      const tabParams = score_tab[dimensionType];
      this.setState({
        dimensionType
      },()=>this.queryData(undefined,JSON.parse(tabParams),undefined))
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
    const score_tab = storage.getSessionItem('score_tab2');
    if (score_tab&&score_tab[this.state.dimensionType]) {
      const tabParams = score_tab[this.state.dimensionType];
      this.setState({
        dimensionType:this.state.dimensionType
      },()=>this.queryData(dimensionType,JSON.parse(tabParams),pg))
    } else {
      this.setState({
        dimensionType:this.state.dimensionType
      },()=>this.queryData(dimensionType,undefined,pg))
    }
  }

  render() {
    const {dimensionType} = this.state;
    const {loading} = this.props;
    const {onList=[],page,countPreCheckNum} = this.props.onAppealModel;
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
        <CSForm {...this.props} dimensionType={dimensionType} progress={'onAppeal'} onSubmit={(params,pg,exp)=>{this.formSubmit(undefined,params,pg,exp)}} />
        <CSTable dataSource={onList} columns={this.columnsAction()} loading={loading} page={page} countPreCheckNum={countPreCheckNum} changePage={(pg)=>{this.changePage(undefined,undefined,pg)}}/>
      </>
    );
  }
}

export default OnAppeal;
