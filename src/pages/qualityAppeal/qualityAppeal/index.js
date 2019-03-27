import React from 'react';
import { connect } from 'dva';
import Page1 from './component/page1';
import Page2 from './component/page2';
import BITabs from '@/ant_components/BITabs';
import AuthButton from '@/components/AuthButton';
import style from '@/pages/qualityAppeal/style.less';
import subStl from './style.less';
import router from 'umi/router';
import moment from 'moment';
import { BiFilter,DeepCopy } from '@/utils/utils';
import BIModal from '@/ant_components/BIModal';
const TabPane = BITabs.TabPane;
const confirm = BIModal.confirm;

function changeState(record) {
  // 合并
  // 后端通过两个字段控制状态，前端只能有一个字段遵循顺序关系，只能这样手动映射，本人也表示很无语
  let myStatue = 1;
  if (record.status === 10) {
    myStatue = 1; // 待申诉
  }
  if (record.status === 1 && record.appealType === 1) {
    myStatue = 2; // 一次SOP待审核
  }
  if (record.status === 2 && record.appealType === 1) {
    myStatue = 3; // 一次SOP已驳回
  }
  if (record.status === 3 && record.appealType === 1) {
    myStatue = 4; // 一次质检主管待审核
  }
  if (record.status === 5 && record.appealType === 1) {
    myStatue = 5; // 一次质检主管已驳回
  }
  if (record.status === 1 && record.appealType === 2) {
    myStatue = 6; // 二次SOP待审核
  }
  if (record.status === 2 && record.appealType === 2) {
    myStatue = 7; // 二次SOP已驳回
  }
  if (record.status === 3 && record.appealType === 2) {
    myStatue = 8; // 二次质检主管待审核
  }
  if (record.status === 4 && record.appealType === 1) {
    myStatue = 9; // 一次申诉审核通过
  }
  if (record.status === 6 && record.appealType === 1) {
    myStatue = 10; // 一次申诉超时
  }
  if (record.status === 4 && record.appealType === 2) {
    myStatue = 11; // 二次申诉审核通过
  }
  if (record.status === 5 && record.appealType === 2) {
    myStatue = 12; // 二次申诉已驳回
  }
  if (record.status === 6 && record.appealType === 2) {
    myStatue = 13; // 二次申诉超时
  }
  return myStatue;
}
function changeState2(status) {
  // 拆分
  let rt = {status:undefined,appealType:undefined};
  if (status === 1) {
    rt.status = 10; // 待申诉
  }
  if (status === 2) {
    rt.status = 1; // 一次SOP待审核
    rt.appealType = 1;
  }
  if (status === 3) {
    rt.status = 2; // 一次SOP已驳回
    rt.appealType = 1;
  }
  if (status === 4) {
    rt.status = 3; // 一次质检主管待审核
    rt.appealType = 1;
  }
  if (status === 5) {
    rt.status = 5; // 一次质检主管已驳回
    rt.appealType = 1;
  }
  if (status === 6) {
    rt.status = 1; // 二次SOP待审核
    rt.appealType = 2;
  }
  if (status === 7) {
    rt.status = 2; // 二次SOP已驳回
    rt.appealType = 2;
  }
  if (status === 8) {
    rt.status = 3; // 二次质检主管待审核
    rt.appealType = 2;
  }
  if (status === 9) {
    rt.status = 4; // 一次申诉审核通过
    rt.appealType = 1;
  }
  if (status === 10) {
    rt.status = 6; // 一次申诉超时
    rt.appealType = 1;
  }
  if (status === 11) {
    rt.status = 4; // 二次申诉审核通过
    rt.appealType = 2;
  }
  if (status === 12) {
    rt.status = 5; // 二次申诉已驳回
    rt.appealType = 2;
  }
  if (status === 13) {
    rt.status = 6; // 二次申诉超时
    rt.appealType = 2;
  }
  return rt;
}
const columns1 = [
  {
    title: '质检单号',
    dataIndex: 'qualityNum',
  },
  {
    title: '质检类型',
    dataIndex: 'qualityType',
    render: (text, record) => {
      return (
        <>
          {BiFilter(`QUALITY_TYPE|id:${record.qualityType}`).name}
        </>
      );
    },
  },
  {
    title: '归属人',
    dataIndex: 'userName',
  },
  {
    title: '归属组织',
    dataIndex: 'collegeName',
    render: (text, record) => {
      return (
        <>
          {`${record.collegeName ?record.collegeName:''} ${record.familyName?`| ${record.familyName}`:''}  ${record.groupName ?`| ${record.groupName}`:''}`}
        </>
      );
    },
  },
  {
    title: '申诉状态',
    dataIndex: 'status',
    render: (text, record) => {
      // 后端拆分状态转前端状态
      let myStatue = changeState(record);

      function dot() {
        let rt = null;
        // 3 一次SOP已驳回 5一次质检主管已驳回 7二次SOP已驳回 8 二次质检主管待审核
        if (myStatue === 3 || myStatue === 5 || myStatue === 7||myStatue === 8) {
          rt = <span className={subStl.dotStl} style={{background: '#FF0000'}}></span>
        } else {
          // 1待申诉 2一次SOP待审核 4一次质检主管待审核 6二次SOP待审核
          rt = <span className={subStl.dotStl} style={{background: '#FAAC14'}}></span>
        }
        return rt;
      }
      return (
        <>
          {dot()}
          {BiFilter(`APPEAL_STATE|id:${myStatue}`).name}
        </>
      );
    },
  },
  {
    title: '质检通过时间',
    dataIndex: 'verifyDate',
    render: (text, record) => {
      return (
        <>
          {record.verifyDate?moment(record.verifyDate).format('YYYY-MM-DD'):'-'}
        </>
      );
    },
  },
  {
    title: '一审截止时间',
    dataIndex: 'firstAppealEndDate',
    render: (text, record) => {
      return (
        <>
          {record.firstAppealEndDate?moment(record.firstAppealEndDate).format('YYYY-MM-DD'):'-'}
        </>
      );
    },
  },
  {
    title: '二审截止时间',
    dataIndex: 'secondAppealEndDate',
    render: (text, record) => {
      return (
        <>
          {record.secondAppealEndDate ? moment(record.secondAppealEndDate).format('YYYY-MM-DD'):'-'}
        </>
      );
    },
  },
];
const columns2 = [
  {
    title: '质检单号',
    dataIndex: 'qualityNum',
  },
  {
    title: '质检类型',
    dataIndex: 'qualityType',
    render: (text, record) => {
      return (
        <>
          {BiFilter(`QUALITY_TYPE|id:${record.qualityType}`).name}
        </>
      );
    },
  },
  {
    title: '归属组织',
    dataIndex: 'collegeName',
    render: (text, record) => {
      return (
        <>
          {`${record.collegeName ?record.collegeName:''} ${record.familyName?`| ${record.familyName}`:''}  ${record.groupName ?`| ${record.groupName}`:''}`}
        </>
      );
    },
  },
  {
    title: '违规等级',
    dataIndex: 'violationLevel',
  },
  {
    title: '申诉状态',
    dataIndex: 'status',
    render: (text, record) => {
      let myStatue = changeState(record);
      function dot() {
        let rt = null;
        if (myStatue === 9||myStatue === 11) {
          rt = <span className={subStl.dotStl} style={{background: '#52C9C2'}}></span>
        } else if (myStatue === 10 || myStatue === 13) {
          rt = <span className={subStl.dotStl} style={{background: '#FAAC14'}}></span>
        } else {
          rt = <span className={subStl.dotStl} style={{background: '#FF0000'}}></span>
        }
        return rt;
      }
      return (
        <>
          {dot()}
          {BiFilter(`APPEAL_STATE|id:${myStatue}`).name}
        </>
      );
    },
  },
  {
    title: '是否警告',
    dataIndex: 'isWarn',
    render: (text, record) => {
      return (
        <>
          {BiFilter(`ISWARN|id:${record.isWarn}`).name}
        </>
      );
    },
  },
];
function dealQuarys(pm){
  const p = DeepCopy(pm);
  if (p.collegeIdList && p.collegeIdList.length>0) {
    p.collegeIdList = p.collegeIdList.map((v)=>{
      return Number(v.replace('a-',''));
    })
  } else{
    p.collegeIdList=undefined;
  }
  if (p.familyIdList&&p.familyIdList.length>0) {
    p.familyIdList = p.familyIdList.map((v)=>{
      return Number(v.replace('b-',''));
    })
  } else {
    p.familyIdList=undefined;
  }
  if (p.groupIdList&&p.groupIdList.length>0) {
    p.groupIdList = p.groupIdList.map((v)=>{
      return Number(v.replace('c-',''));
    })
  } else {
    p.groupIdList=undefined;
  }
  if (p.isWarn && p.isWarn !== 'all') {
    p.isWarn = Number(p.isWarn);
  } else {
    p.isWarn = undefined;
  }
  if (p.qualityType && p.qualityType !== 'all') {
    p.qualityType = Number(p.qualityType);
  } else {
    p.qualityType = undefined;
  }
  if (p.status) {
    const o = changeState2(Number(p.status));
    p.status = o.status;
    p.appealType = o.appealType;
  }
  if (p.violationLevel) {
    p.violationLevel = p.violationLevel.map(v=>Number(v))
  }
  if (p.dimensionIdList) {
    p.dimensionIdList = p.dimensionIdList.map(v=>Number(v))
  }
  return p;
};
@connect(({ qualityAppealHome,qualityCheck,loading }) => ({
  qualityAppealHome,
  qualityCheck,
  loading:loading.effects['qualityCheck/getAppealList'],
  loading2:loading.effects['qualityCheck/exportExcel']
}))

class QualityAppeal extends React.Component {
  constructor(props) {
    super(props);
    const {p='{}'} = this.props.location.query;
    const {tabType = '1'} = JSON.parse(p);
    this.state = {
      page: 1,
      pageSize: 30,
      type: 1,         // 1:在途，2:结案
      tabType: tabType
    };
    this.saveUrlParams = undefined;
  }
  componentDidMount() {
    const {p=null} = this.props.location.query;
    this.queryData(JSON.parse(p));
  }

  queryData = (pm,pg,isExport) => {
    this.saveUrlParams = (pm && !isExport) ? JSON.stringify(pm):undefined;
    const dealledPm = pm && dealQuarys(pm);
    // 获取数据
    let params = {...this.state};
    if (dealledPm) {
      params = {...params,...dealledPm};
    }
    if (pg) {
      params = {...params,...pg};
      this.setState({
        page:pg.page
      });
    }
    if (isExport){
      this.props.dispatch({
        type: 'qualityCheck/exportExcel',
        payload: {params },
      });
    } else {
      this.props.dispatch({
        type: 'qualityCheck/getAppealList',
        payload: { params },
      }).then(()=>{
        router.replace({
          pathname:this.props.location.pathname,
          query:this.saveUrlParams ? {p:this.saveUrlParams}:''
        })
      });
    }
  };

  onTabChange = (val) => {
    this.setState({
      type: Number(val),
      tabType: val,
    },() => {
      this.queryData({tabType:val,type: Number(val)});
    })
  };

  onDetail = (record) => {
    router.push({
      pathname: '/qualityAppeal/qualityAppeal/detail',
      query: {id:record.id},
    });
  };

  onSubmitAppeal = (record) => {
    router.push({
      pathname: '/qualityAppeal/qualityAppeal/edit',
      query: {id:record.id},
    });
  };

  onAppeal = (record) => {
    router.push({
      pathname: '/qualityAppeal/qualityAppeal/appeal',
      query: {id:record.id},
    });
  };

  onRepeal = (record) => {
    const that = this;
    const {p=null} = this.props.location.query;
    confirm({
      className: 'BIConfirm',
      title: '是否撤销当前数据状态?',
      cancelText: '取消',
      okText: '确定',
      onOk() {
        that.props.dispatch({
          type: 'qualityCheck/cancelQuality',
          payload: { params: { id:record.id } },
        }).then(()=>{
          that.queryData(JSON.parse(p))
        });
      },
      onCancel() { },
    });
  };

  columnsAction1 = () => {
    const actionObj = [{
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
          <>
            <AuthButton authority='/qualityAppeal/qualityAppeal/detail'>
              <span className={style.actionBtn} onClick={() => this.onDetail(record)}>
                详情
              </span>
            </AuthButton>
            {record.status === 1||record.status === 3||record.status === 5||record.status === 7?(
              <AuthButton authority='/qualityAppeal/qualityAppeal/edit'>
                <span className={style.actionBtn} onClick={() => this.onSubmitAppeal(record)}>
                  提交申诉
                </span>
              </AuthButton>
            ):null}
            {record.status === 2||record.status === 4||record.status === 6||record.status === 8?(
              <AuthButton authority='/qualityAppeal/qualityAppeal/appeal'>
                <span className={style.actionBtn} onClick={() => this.onAppeal(record)}>
                  审核
                </span>
              </AuthButton>
            ):null}
            {record.status === 2||record.status === 6?(
              <AuthButton authority='/qualityAppeal/qualityAppeal/repeal'>
                <span className={style.actionBtn} onClick={() => this.onRepeal(record)}>
                  撤销
                </span>
              </AuthButton>
            ):null}
          </>
        );
      },
    }];
    if (!AuthButton.checkPathname('/qualityAppeal/qualityAppeal/showQA')) {
      columns1.splice(2,1);
    }
    return [...columns1,...actionObj];
  };
  columnsAction2 = () => {
    const actionObj = [{
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
          <>
            <AuthButton authority='/qualityAppeal/qualityAppeal/detail'>
              <span className={style.actionBtn} onClick={() => this.onDetail(record)}>
                详情
              </span>
            </AuthButton>
          </>
        );
      },
    }];
    return [...columns2,...actionObj];
  };
  render() {
    const {orgListTreeData = [], dimensionList1 = [],dimensionList2 = []} = this.props.qualityAppealHome;
    const {qualityAppealList = [],page} = this.props.qualityCheck;
    return (
      <>
        <div className={subStl.topTab}>
          <BITabs onChange={this.onTabChange} defaultActiveKey={this.state.tabType} animated={false}>
            <TabPane tab="在途质检申诉" key={1}>
              <div className={subStl.tabBlank}>&nbsp;</div>
              <Page1
                {...this.props}
                tabType={this.state.tabType}
                columns={this.columnsAction1()}
                orgList={orgListTreeData}
                dataSource={qualityAppealList}
                page={page}
                queryData={(params,page,isExport)=>this.queryData(params,page,isExport)} />
            </TabPane>
            <TabPane tab="结案质检申诉" key={2}>
              <div className={subStl.tabBlank}>&nbsp;</div>
              <Page2
                {...this.props}
                tabType={this.state.tabType}
                dimensionList1 = {dimensionList1}
                dimensionList2 = {dimensionList2}
                columns={this.columnsAction2()}
                dataSource={qualityAppealList}
                page={page}
                queryData={(params,page)=>this.queryData(params,page)} />
            </TabPane>
          </BITabs>
        </div>
      </>

    );
  }
}

export default QualityAppeal;

