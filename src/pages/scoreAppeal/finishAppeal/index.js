import React from 'react';
import RenderRoute from '@/components/RenderRoute';
import { connect } from 'dva/index';
import router from 'umi/router';
import CSTable from '@/pages/scoreAppeal/components/Table';
import { DeepCopy } from '@/utils/utils';
import style from './style.less'
import AuthButton from '@/components/AuthButton/index';
import CSForm from '@/pages/scoreAppeal/components/Form';

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
  },
];
function dealQuarys(pm) {
  const p = DeepCopy(pm);
  if (p.collegeIdList && p.collegeIdList.length > 0) {
    p.collegeIdList = p.collegeIdList.map((v) => {
      return Number(v.replace('a-', ''));
    })
  } else {
    p.collegeIdList = undefined;
  }
  if (p.familyIdList && p.familyIdList.length > 0) {
    p.familyIdList = p.familyIdList.map((v) => {
      return Number(v.replace('b-', ''));
    })
  } else {
    p.familyIdList = undefined;
  }
  if (p.groupIdList && p.groupIdList.length > 0) {
    p.groupIdList = p.groupIdList.map((v) => {
      return Number(v.replace('c-', ''));
    })
  } else {
    p.groupIdList = undefined;
  }
  if (p.qualityType && p.qualityType !== 'all') {
    p.qualityType = Number(p.qualityType);
  } else {
    p.qualityType = undefined;
  }
  if (p.statusList && p.statusList.length > 0) {
    p.statusList = p.statusList.map(v => Number(v))
  } else {
    p.statusList = undefined;
  }
  if (p.violationLevelList&&p.violationLevelList.length>0) {
    p.violationLevelList = p.violationLevelList.map(v => Number(v))
  } else {
    p.violationLevelList = undefined;
  }

  if (p.dimensionIdList&&p.dimensionIdList.length>0) {
    p.dimensionIdList = p.dimensionIdList.map(v => Number(v))
  } else {
    p.dimensionIdList = undefined
  }
  if (p.qualityNum && p.qualityNum !== '') {
    p.qualityNum = p.qualityNum.trim();
  } else {
    p.qualityNum = undefined
  }
  return p;
};

@connect(({ scoreAppealModel,finishAppealModel,loading }) => ({
  scoreAppealModel,finishAppealModel,
  loading: loading.effects['finishAppealModel/getFinishAppealList'],
}))
class FinishAppeal extends React.Component {
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
      type: 'finishAppealModel/getFinishAppealList',
      payload: { params },
    }).then(() => {
      router.replace({
        pathname: this.props.location.pathname,
        query: saveUrlParams ? { params: saveUrlParams } : {}
      })
    });
  };

  changeTab(dimensionType){
    const {params:oldParams} = this.props.location.query;
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
        <CSForm {...this.props} dimensionType={dimensionType} onSubmit={(params,pg)=>{this.formSubmit(undefined,params,pg)}}></CSForm>
        <CSTable dataSource={finishList} columns={columns} loading={loading} page={page} changePage={(pg)=>{this.changePage(undefined,undefined,pg)}}></CSTable>
      </>
    );
  }
}

export default FinishAppeal;
