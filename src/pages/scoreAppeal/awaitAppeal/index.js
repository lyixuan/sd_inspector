import React from 'react';
import RenderRoute from '@/components/RenderRoute';
import { connect } from 'dva/index';
import CSTable from '@/pages/scoreAppeal/components/Table';
import moment from 'moment/moment';
import { BiFilter, DeepCopy } from '@/utils/utils';
import router from 'umi/router';

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
    title: '学院姓名',
    dataIndex: 'stuName',
  },
  {
    title: '学院ID',
    dataIndex: 'stuId',
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

@connect(({ awaitAppealModel,loading }) => ({
  awaitAppealModel,
  loading: loading.effects['awaitAppealModel/getPreAppealList'],
}))
class AwaitAppeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 30
    };
  }
  componentDidMount() {
    const initCreditType = BiFilter(`DIMENSION_TYPE|url:specialNewer`).id;
    this.queryData(initCreditType);
  }

  componentWillReceiveProps(nextProps){
    const {pathname:pathname1} = this.props.location;
    const {pathname:pathname2} = nextProps.location;
    if (pathname1!==pathname2) {
      const initCreditType = BiFilter(`DIMENSION_TYPE|url:${pathname2.slice(pathname2.lastIndexOf('/')+1)}`).id;
      this.queryData(initCreditType);
    }
  }

  queryData = (creditType,type, pm, pg) => {
    // type:1 查询 2切换tab
    console.log('creditType',creditType)
    let params = {creditType};
    if(pm){
      params = { ...this.state, ...dealQuarys(pm) };
    }

    if (pg) {
      params = { ...params, ...pg };
      this.setState({
        page: pg.page
      });
    }

    const saveUrlParams =JSON.stringify(params);

    // 请求成功后保留查询条件
    this.props.dispatch({
      type: 'awaitAppealModel/getPreAppealList',
      payload: { params },
    }).then(() => {
      router.replace({
        pathname: this.props.location.pathname,
        query: this.saveUrlParams ? { params: saveUrlParams } : ''
      })
    });
  };

  render() {
    const {loading} = this.props;
    const {awaitList=[],page} = this.props.awaitAppealModel;
    return (
      <>
        <RenderRoute {...this.props}/>
        <CSTable dataSource={awaitList} columns={columns} loading={loading} page={page}></CSTable>
      </>
    );
  }
}

export default AwaitAppeal;
