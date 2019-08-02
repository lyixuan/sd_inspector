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
    title: '课程编号',
    dataIndex: 'id',
  },
  {
    title: '课程分类',
    dataIndex: 'videoType',
    render: (text, record) => {
      return (
        <>
          {BiFilter(`QUALITY_TYPE|id:${record.qualityType}`).name}
        </>
      );
    },
  },
  {
    title: '课程名称',
    dataIndex: 'videoName',
  },
  {
    title: '课程简介',
    dataIndex: 'videoDesc',
    render: (text, record) => {
      return (
        <>
          {`${record.collegeName ? record.collegeName : ''} ${record.familyName ? `| ${record.familyName}` : ''}  ${record.groupName ? `| ${record.groupName}` : ''}`}
        </>
      );
    },
  },
  {
    title: '讲师',
    dataIndex: 'videoRealname',
  },
  {
    title: '讲师组织',
    dataIndex: 'videoUserCollege',
  },
  {
    title: '讲师角色',
    dataIndex: 'videoUserRole',
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
  {
    title: '课程顺序',
    dataIndex: 'sort',
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

@connect(({ faguang, course, loading }) => ({
  faguang,
  course,
  loading: loading.effects['course/getList'],
  loading2: loading.effects['qualityNewSheet/exportExcel']
}))

class Course extends React.Component {
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

  queryData = (pm, pg) => {
    const dealledPm = pm && dealQuarys(pm);
    let params = { ...this.state };
    if (dealledPm) {
      params = { ...params, ...dealledPm };
    }
    if (pg) {
      params = { ...params, ...pg };
      this.setState({
        page: pg.page
      });
    }
    this.props.dispatch({
      type: 'course/getList',
      payload: { params },
    });
  };

  onRepeal = (record) => {
    const that = this;
    const { p = null } = this.props.location.query;
    confirm({
      className: 'BIConfirm',
      title: '是否删除当前数据状态?',
      cancelText: '取消',
      okText: '确定',
      onOk() {
        that.props.dispatch({
          type: 'course/cancelQuality',
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
            <AuthButton authority='/qualityAppeal/qualityNewSheet/edit'>
                <span className={style.actionBtn} onClick={() => this.onEdit(record)}>
                  编辑
                </span>
            </AuthButton>
            <AuthButton authority='/qualityAppeal/qualityNewSheet/repeal'>
                <span className={style.actionBtn} onClick={() => this.onRepeal(record)}>
                  删除
              </span>
            </AuthButton>
          </>
        );
      },
    }];
    return [...columns, ...actionObj];
  };

  render() {
    const { collegeList = [],courseList=[] } = this.props.faguang||{};
    const { dataList = [], page } = this.props.course;
    return (
      <>
        <Page
          {...this.props}
          columns={this.columnsAction()}
          dataSource={dataList}
          page={page}
          courseList={courseList}
          queryData={(params, page) => this.queryData(params, page)}/>
      </>
    );
  }
}

export default Course;
