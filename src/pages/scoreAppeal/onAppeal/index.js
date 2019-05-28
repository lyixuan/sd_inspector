import React from 'react';
import RenderRoute from '@/components/RenderRoute';
import CSTable from '@/pages/scoreAppeal/components/Table';
import { connect } from 'dva/index';
import { DeepCopy } from '@/utils/utils';
import router from 'umi/router';

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

@connect(({ scoreAppealModel,loading }) => ({
  scoreAppealModel,
  loading: loading.effects['qualityNewSheet/getQualityList'],
}))
class OnAppeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
  }
  queryData = (pm, pg, isExport) => {
    this.saveUrlParams = (pm && !isExport) ? JSON.stringify(pm) : undefined;
    const dealledPm = pm && dealQuarys(pm);
    let params = { ...this.state };
    if (dealledPm) {
      params = { ...params, ...dealledPm };
    }
    if (pg) {
      params = { ...params, ...pg };
      this.saveUrlParams =JSON.stringify({...JSON.parse(this.saveUrlParams),...pg});
      this.setState({
        page: pg.page
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
      }).then(() => {
        router.replace({
          pathname: this.props.location.pathname,
          query: this.saveUrlParams ? { p: this.saveUrlParams } : ''
        })
      });
    }
  };
  render() {
    const {tableList=[]} = this.props
    return (
      <>
        <RenderRoute {...this.props}  />
        <CSTable dataSource={tableList} columns={columns}></CSTable>
      </>
    );
  }
}

export default OnAppeal;
