import React from 'react';
import { connect } from 'dva';
import {DeepCopy,BiFilter} from '@/utils/utils';
import AuthButton from '@/components/AuthButton';
import Page from './component/page';
import style from '@/pages/qualityAppeal/style.less';
import subStl from '@/pages/qualityAppeal/qualityNewSheet/style.less';
import router from 'umi/router';
import BIModal from '@/ant_components/BIModal';
import moment from 'moment/moment';

const confirm = BIModal.confirm;
const columns = [
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
    title: '分维',
    dataIndex: 'violationName',
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
    title: '质检扣分日期',
    dataIndex: 'reduceScoreDate',
    render: (text, record) => {
      return (
        <>
          {record.reduceScoreDate?moment(record.reduceScoreDate).format('YYYY-MM-DD'):'-'}
        </>
      );
    },
  },
  {
    title: '质检发起人',
    dataIndex: 'operateName',
  },
  {
    title: '违规等级',
    dataIndex: 'violationLevel',
  },
  {
    title: '质检状态',
    dataIndex: 'status',
    render: (text, record) => {
      function dot() {
        let rt = null;
        if (record.status === 1) {
          rt = <span className={subStl.dotStl} style={{background: '#FAAC14'}}></span>
        }
        if (record.status === 2) {
          rt = <span className={subStl.dotStl} style={{background: '#52C9C2'}}></span>
        }
        if (record.status === 3) {
          rt = <span className={subStl.dotStl} style={{background: '#D9D9D9'}}></span>
        }
        if (record.status === 4) {
          rt = <span className={subStl.dotStl} style={{background: '#FF0000'}}></span>
        }
        return rt;
      }
      return (
        <>
          {dot()}
          {BiFilter(`QUALITY_STATE|id:${record.status}`).name}
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
  if (p.qualityType === 'all') {
    p.qualityType = undefined;
  } else {
    p.qualityType = Number(p.qualityType);
  }
  if (p.statusList) {
    p.statusList = p.statusList.map(v=>Number(v))
  }
  if (p.violationLevelList) {
    p.violationLevelList = p.violationLevelList.map(v=>Number(v))
  }
  if (p.dimensionIdList) {
    p.dimensionIdList = p.dimensionIdList.map(v=>Number(v))
  }
  return p;
};

@connect(({ qualityAppealHome,qualityNewSheet,loading }) => ({
  qualityAppealHome,
  qualityNewSheet,
  loading: loading.effects['qualityNewSheet/getQualityList']
}))

class NewQualitySheetIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 30
    };
  }
  componentDidMount() {
    this.queryData();
  }

  queryData = (pm,pg,isExport) => {
    const pmm = pm && dealQuarys(pm);
    // 获取数据
    let params = {...this.state};
    if (pmm) {
      params = {...params,...pmm};
    }
    if (pg) {
      params = {...params,...pg};
      this.setState({
        page:pg.page
      });
    }

    if (isExport) {
      this.props.dispatch({
        type: 'qualityNewSheet/exportExcel',
        payload: { params },
      });
    } else {
      this.props.dispatch({
        type: 'qualityNewSheet/getQualityList',
        payload: { params },
      });
    }
  };

  onDetail = (record) => {
    router.push({
      pathname: '/qualityAppeal/qualityNewSheet/detail',
      query: {id:record.id},
    });
  };

  onEdit = (record) => {
    router.push({
      pathname: '/qualityAppeal/qualityNewSheet/edit',
      query: {id:record.id},
    });
  };

  onAppeal = (record) => {
    router.push({
      pathname: '/qualityAppeal/qualityNewSheet/appealSt',
      query: {id:record.id},
    });
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
          type: 'qualityNewSheet/cancelQuality',
          payload: { params: { id:record.id } },
        }).then(()=>{
          that.queryData(that.lastParams)
        });
      },
      onCancel() { },
    });
  };

  columnsAction = () => {
    const actionObj = [{
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
          <>
            <AuthButton authority='/qualityAppeal/qualityNewSheet/detail'>
              <span className={style.actionBtn} onClick={() => this.onDetail(record)}>
                详情
              </span>
            </AuthButton>
            {record.status === 3||record.status === 4?(
              <AuthButton authority='/qualityAppeal/qualityNewSheet/edit'>
                <span className={style.actionBtn} onClick={() => this.onEdit(record)}>
                  编辑
                </span>
              </AuthButton>
            ):null}
            {record.status === 1?(
              <AuthButton authority='/qualityAppeal/qualityNewSheet/repeal'>
              <span className={style.actionBtn} onClick={() => this.onRepeal(record)}>
                撤销
              </span>
              </AuthButton>
            ):null}
            {record.status === 1?(
              <AuthButton authority='/qualityAppeal/qualityNewSheet/appealSt'>
                <span className={style.actionBtn} onClick={() => this.onAppeal(record)}>
                  审核
                </span>
              </AuthButton>
            ):null}
          </>
        );
      },
    }];

    if (!AuthButton.checkPathname('/qualityAppeal/qualityNewSheet/showQR')) {
      columns.splice(5,1);
    }
    return [...columns,...actionObj];
  };
  render() {
    const {orgListTreeData = [], dimensionList1 = [],dimensionList2 = []} = this.props.qualityAppealHome;
    const {qualityList = [],page} = this.props.qualityNewSheet;

    return (
      <>
        <Page
          {...this.props}
          columns={this.columnsAction()}
          dataSource={qualityList}
          page={page}
          orgList={orgListTreeData}
          dimensionList1 = {dimensionList1}
          dimensionList2 = {dimensionList2}
          queryData={(params,page,isExport)=>this.queryData(params,page,isExport)}/>
      </>
    );
  }
}

export default NewQualitySheetIndex;
