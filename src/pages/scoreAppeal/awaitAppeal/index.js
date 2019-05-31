import React from 'react';
import { connect } from 'dva/index';
import CSTable from '@/pages/scoreAppeal/components/Table';
import moment from 'moment/moment';
import { BiFilter, DeepCopy } from '@/utils/utils';
import router from 'umi/router';
import style from './style.less'
import CSForm from '@/pages/scoreAppeal/awaitAppeal/components/Form';
import AuthButton from '@/components/AuthButton/index';

const columns = [
  {
    title: '学分日期',
    dataIndex: 'creditDate',
  },
  {
    title: '学分维度',
    dataIndex: 'dimensionName',
  },
  {
    title: '学分归属人',
    dataIndex: 'userName',
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
    title: '学员姓名',
    dataIndex: 'stuName',
  },
  {
    title: '学院ID',
    dataIndex: 'stuId',
  },
];
function dealQuarys(pm) {
  const p = DeepCopy(pm);
  if (!p.stuName) {
    p.stuName = undefined
  }
  if (!p.stuId) {
    p.stuId = undefined
  }
  if (!p.creditBeginDate||!p.creditEndDate) {
    p.creditBeginDate = undefined
    p.creditEndDate = undefined
  }
  return p;
};

@connect(({ awaitAppealModel,loading }) => ({
  awaitAppealModel,
  loading: loading.effects['awaitAppealModel/getPreAppealList'],
}))
class AwaitAppeal extends React.Component {
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
    // 初始化，只有申诉维度，无参
    this.queryData(dimensionType,undefined,{page:1});
  }

  queryData = (dimensionType, pm, pg) => {
    let params = this.state;
    if(pm){
      params = { ...this.state, ...dealQuarys(pm) };
    }
    if (pg) {
      params = { ...params, ...pg };
      this.setState({
        page: pg.page
      });
    }

    if (dimensionType) {
      params = { ...params, ...{dimensionType} };
    }

    const saveUrlParams =JSON.stringify(params);

    console.log('params',params)
    // 请求成功后保留查询条件
    router.replace({
      pathname: this.props.location.pathname,
      query: saveUrlParams ? { params: saveUrlParams } : {}
    })
    this.props.dispatch({
      type: 'awaitAppealModel/getPreAppealList',
      payload: { params },
    }).then(() => {
      router.replace({
        pathname: this.props.location.pathname,
        query: saveUrlParams ? { params: saveUrlParams } : {}
      })
    });
  };
  onJumpPage = (query, pathname) => {
    router.push({
      pathname,
      query
    });
  };
  onDetail = (record) => {
    this.onJumpPage({ id: record.id }, '/scoreAppeal/appeal_detail');
  };
  columnsAction = () => {
    const actionObj = [{
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
          <>
            <AuthButton authority='/scoreAppeal/awaitAppeal/detail'>
              <span style={{marginLeft:'-5px'}} className={style.actionBtn} onClick={() => this.onDetail(record)}>
                详情
              </span>
            </AuthButton>
            <AuthButton authority='/scoreAppeal/awaitAppeal/appeal'>
              <span className={style.actionBtn} onClick={() => this.onEdit(record)}>
                申诉
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
    console.log('oldParams',oldParams)
    const {dimensionType:oldDem,...others} = JSON.parse(oldParams);
    this.setState({
      dimensionType
    },()=>this.queryData(dimensionType,others,{page:1}))
  }
  formSubmit(dimensionType,params,pg){
    this.queryData(dimensionType,params,pg)
  }
  changePage(dimensionType,params,pg){
    this.queryData(dimensionType,params,pg)
  }
  render() {
    const {dimensionType} = this.state;
    const {loading} = this.props;
    // const {awaitList=[],page} = this.props.awaitAppealModel;
    const awaitList = [
      {id:'1',creditDate:'2019-09-09',dimensionName:'学分分维',userName:'学分归属人',collegeName:'归属组织。。。。。',stuName:'学员姓名',stuId:'2328323023'},
    ]
    const page = {
      total:12,
      pageNum:1
    }
    return (
      <>
        <p className={style.wrap}>
          <AuthButton authority='/scoreAppeal/awaitAppeal/specialNewer'>
            <span onClick={()=>this.changeTab(11)} className={11===dimensionType?style.active:null}>优新</span>
          </AuthButton>
          <AuthButton authority='/scoreAppeal/awaitAppeal/IM'>
            <span onClick={()=>this.changeTab(14)} className={14===dimensionType?style.active:null}>IM</span>
          </AuthButton>
          <AuthButton authority='/scoreAppeal/awaitAppeal/order'>
            <span onClick={()=>this.changeTab(19)}  className={19===dimensionType?style.active:null}>工单</span>
          </AuthButton>
          <AuthButton authority='/scoreAppeal/awaitAppeal/baseline'>
            <span onClick={()=>this.changeTab(23)}  className={23===dimensionType?style.active:null}>底线</span>
          </AuthButton>
          <AuthButton authority='/scoreAppeal/awaitAppeal/createIncome'>
            <span onClick={()=>this.changeTab(42)}  className={42===dimensionType?style.active:null}>创收</span>
          </AuthButton>
        </p>
        <CSForm {...this.props} dimensionType={dimensionType} onSubmit={(params,pg)=>{this.formSubmit(undefined,params,pg)}}></CSForm>
        <CSTable dataSource={awaitList} columns={this.columnsAction()} loading={loading} page={page} changePage={(pg)=>{this.changePage(undefined,undefined,pg)}}></CSTable>
      </>
    );
  }
}

export default AwaitAppeal;
