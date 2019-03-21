import React from 'react';
import { connect } from 'dva';
import {DeepCopy} from '@/utils/utils';
import AuthButton from '@/components/AuthButton';
import Page from './component/page';
import style from '@/pages/qualityAppeal/style.less';
import router from 'umi/router';


const columns = [
  {
    title: '质检单号',
    dataIndex: 'qualityNum',
  },
  {
    title: '质检类型',
    dataIndex: 'qualityType',
  },
  {
    title: '分维',
    dataIndex: 'dimensionName',
  },
  {
    title: '归属组织',
    dataIndex: 'organzitionName',
  },
  {
    title: '质检扣分日期',
    dataIndex: 'reduceScoreDate',
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
    dataIndex: 'statusName',
  },
];

function dealQuarys(pm){
  const p = DeepCopy(pm);
  if (p.collegeIdList.length===0) {
    p.collegeIdList=undefined;
  } else {
    p.collegeIdList = p.collegeIdList.map((v)=>{
      return Number(v.replace('a-',''));
    })
  }
  if (p.familyIdList.length===0) {
    p.familyIdList=undefined;
  } else {
    p.familyIdList = p.familyIdList.map((v)=>{
      return Number(v.replace('b-',''));
    })
  }
  if (p.groupIdList.length===0) {
    p.groupIdList=undefined;
  } else {
    p.groupIdList = p.groupIdList.map((v)=>{
      return Number(v.replace('c-',''));
    })
  }
  if (p.qualityType === 'all') {
    p.qualityType = undefined;
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

@connect(({ qualityAppealHome,qualityNewSheet }) => ({
  qualityAppealHome,
  qualityNewSheet,
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

  queryData = (pm,pg) => {
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
    console.log(params);
    this.props.dispatch({
      type: 'qualityNewSheet/getQualityList',
      payload: { params },
    });
  };

  onDetail = () => {
    router.push({
      pathname: '/qualityAppeal/qualityNewSheet/detail',
      // query: this.props.checkedConditionList,
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
                查看
              </span>
            </AuthButton>
            <AuthButton authority='/qualityAppeal/qualityNewSheet/edit'>
              <span className={style.actionBtn} onClick={() => this.onEdit(record)}>
                编辑
              </span>
            </AuthButton>
            <AuthButton authority='/qualityAppeal/qualityNewSheet/repeal'>
              <span className={style.actionBtn} onClick={() => this.onRepeal(record)}>
                撤销
              </span>
            </AuthButton>
            <AuthButton authority='/qualityAppeal/qualityNewSheet/appealSt'>
              <span className={style.actionBtn} onClick={() => this.onAppeal(record)}>
                审核
              </span>
            </AuthButton>
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
    const {qualityList = []} = this.props.qualityNewSheet;

    return (
      <>
        <Page
          {...this.props}
          columns={this.columnsAction()}
          dataSource={qualityList}
          orgList={orgListTreeData}
          dimensionList1 = {dimensionList1}
          dimensionList2 = {dimensionList2}
          queryData={(params,page)=>this.queryData(params,page)} />
      </>
    );
  }
}

export default NewQualitySheetIndex;
