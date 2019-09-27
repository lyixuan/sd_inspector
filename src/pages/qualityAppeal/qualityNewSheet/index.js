import React from 'react';
import { connect } from 'dva';
import { DeepCopy, BiFilter } from '@/utils/utils';
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
          {`${record.collegeName ? record.collegeName : ''} ${record.familyName ? `| ${record.familyName}` : ''}  ${record.groupName ? `| ${record.groupName}` : ''}`}
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
          {record.reduceScoreDate ? moment(record.reduceScoreDate).format('YYYY-MM-DD') : '-'}
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
        if (record.status === 2) {
          rt = <span className={subStl.dotStl} style={{ background: '#FAAC14' }}></span>
        }
        if (record.status === 4) {
          rt = <span className={subStl.dotStl} style={{ background: '#52C9C2' }}></span>
        }
        if (record.status === 3) {
          rt = <span className={subStl.dotStl} style={{ background: '#D9D9D9' }}></span>
        }
        if (record.status === 1) {
          rt = <span className={subStl.dotStl} style={{ background: '#FF0000' }}></span>
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

@connect(({ qualityAppealHome, qualityNewSheet, loading }) => ({
  qualityAppealHome,
  qualityNewSheet,
  loading: loading.effects['qualityNewSheet/getQualityList'],
  loading2: loading.effects['qualityNewSheet/exportExcel']
}))

class NewQualitySheetIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 30
    };
    this.saveUrlParams = undefined;
    // this.columnsAction = this.columnsAction()
  }
  componentDidMount() {
    const { p = null } = this.props.location.query;
    this.queryData(JSON.parse(p));
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

  onRepeal = (record) => {
    const that = this;
    const { p = null } = this.props.location.query;
    confirm({
      className: 'BIConfirm',
      title: '是否撤销当前数据状态?',
      cancelText: '取消',
      okText: '确定',
      onOk() {
        that.props.dispatch({
          type: 'qualityNewSheet/cancelQuality',
          payload: { params: { id: record.id } },
        }).then(() => {
          that.queryData(JSON.parse(p))
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
              <span style={{marginLeft:'-5px'}} className={style.actionBtn} onClick={() => this.onDetail(record)}>
                查看详情
              </span>
            </AuthButton>
            {record.status === 1 || record.status === 3 ? (
              <AuthButton authority='/qualityAppeal/qualityNewSheet/edit'>
                <span className={style.actionBtn} onClick={() => this.onEdit(record)}>
                  编辑
                </span>
              </AuthButton>
            ) : null}
            {record.status === 2 ? (
              <AuthButton authority='/qualityAppeal/qualityNewSheet/repeal'>
                <span className={style.actionBtn} onClick={() => this.onRepeal(record)}>
                  撤销
              </span>
              </AuthButton>
            ) : null}
            {record.status === 2 ? (
              <AuthButton authority='/qualityAppeal/qualityNewSheet/appealSt'>
                <span className={style.actionBtn} onClick={() => this.onAppeal(record)}>
                  审核
                </span>
              </AuthButton>
            ) : null}
          </>
        );
      },
    }];
    if (!AuthButton.checkPathname('/qualityAppeal/qualityNewSheet/showQR')) {
      const index = columns.findIndex(item => item.dataIndex === 'operateName');
      if (index >= 0) {
        columns.splice(index, 1);
      }
    }
    return [...columns, ...actionObj];
  };

  onJumpPage = (query, pathname) => {
    router.push({
      pathname,
      query
    });
  };
  onDetail = (record) => {
    this.onJumpPage({ id: record.id }, '/qualityAppeal/qualityNewSheet/detail');
  };

  onEdit = (record) => {
    this.onJumpPage({ id: record.id }, '/qualityAppeal/qualityNewSheet/edit');
  };

  onAppeal = (record) => {
    this.onJumpPage({ id: record.id }, '/qualityAppeal/qualityNewSheet/appealSt');
  };
  render() {
    const { orgListTreeData = [], dimensionList1 = [], dimensionList2 = []} = this.props.qualityAppealHome;
    const { qualityList = [], page } = this.props.qualityNewSheet;
    return (
      <>
        <Page
          {...this.props}
          columns={this.columnsAction()}
          dataSource={qualityList}
          page={page}
          orgList={orgListTreeData}
          dimensionList1={dimensionList1}
          dimensionList2={dimensionList2}
          queryData={(params, page, isExport) => this.queryData(params, page, isExport)}
          onJumpPage={(query, pathname) => this.onJumpPage(query, pathname)} />
      </>
    );
  }
}

export default NewQualitySheetIndex;
