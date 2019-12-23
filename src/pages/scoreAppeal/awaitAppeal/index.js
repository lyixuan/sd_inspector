import React from 'react';
import { connect } from 'dva/index';
import CSTable from '@/pages/scoreAppeal/components/Table';
import { dealQuarys } from '@/utils/utils';
import router from 'umi/router';
import style from './style.less';
import CSForm from '@/pages/scoreAppeal/awaitAppeal/components/Form';
import AuthButton from '@/components/AuthButton/index';
import storage from '@/utils/storage';
import { jumpMarkingDetails } from '@/pages/ko/utils/utils';
import moment from 'moment/moment';

@connect(({ awaitAppealModel, loading }) => ({
  awaitAppealModel,
  loading: loading.effects['awaitAppealModel/getPreAppealList'],
}))
class AwaitAppeal extends React.Component {
  constructor(props) {
    super(props);
    const { params = null } = this.props.location.query;
    const myParam = JSON.parse(params);

    this.state = {
      page: 1,
      pageSize: 30,
      dimensionType: myParam && myParam.dimensionType ? myParam.dimensionType : 11,
    };

  }

  componentDidMount() {
    const { dimensionType } = this.state;
    let { params = null } =this.props.location.query;
    if (params === null) {
      storage.removeSessonItem('score_tab');
    }
    const pNew = JSON.parse(params);
    if(pNew && pNew.creditBeginDate && pNew.creditEndDate){
      this.initTime = {creditBeginDate:pNew.creditBeginDate,creditEndDate:pNew.creditEndDate};
    } else {
      this.initTime = {creditBeginDate:moment().subtract(6,'days').format('YYYY-MM-DD'),creditEndDate:moment().format('YYYY-MM-DD')};
    }
    params=JSON.stringify({...JSON.parse(params),...this.initTime});
    this.queryData(dimensionType, JSON.parse(params),null,1);
  }

  onFormChange = (value, vname) => {
    if ('creditDate' === vname) {
      this.setState({
        creditBeginDate: value[0],
        creditEndDate: value[1],
      });
    } else if ('appealDate' === vname) {
      this.setState({
        appealBeginDate: value[0],
        appealEndDate: value[1],
      });
    } else if ('organization' === vname) {
      const list1 = [];
      const list2 = [];
      const list3 = [];
      value.forEach(v => {
        if (v.indexOf('a-') >= 0) {
          list1.push(v);
        }
        if (v.indexOf('b-') >= 0) {
          list2.push(v);
        }
        if (v.indexOf('c-') >= 0) {
          list3.push(v);
        }
      });
      this.setState({
        collegeIdList: [...list1],
        familyIdList: [...list2],
        groupIdList: [...list3],
      });
    } else {
      this.setState({
        [vname]: value,
      });
    }
  };

  queryData = (dimensionType, pm, pg,flag) => {
    let params = this.state;
    let paramsUrl = this.state;
    if (pm) {
      paramsUrl = { ...this.state, ...pm };
      params = { ...this.state, ...dealQuarys(pm) };
    }
    if (pg) {
      paramsUrl = { ...paramsUrl, ...pg };
      params = { ...params, ...pg };
      this.setState({
        page: pg.page,
      });
    }

    if (dimensionType) {
      paramsUrl = { ...paramsUrl, ...{ dimensionType } };
      params = { ...params, ...{ dimensionType } };
      this.setState({
        dimensionType,
      });
    }

    const saveUrlParams = JSON.stringify(paramsUrl);

    const timeParams = JSON.stringify(this.initTime);
    let score_tab = storage.getSessionItem('score_tab');
    if (score_tab) {
      score_tab = saveUrlParams;
      if(flag===1){
        score_tab = timeParams;
      }
      storage.setSessonItem('score_tab', score_tab);
    } else {
      storage.setSessonItem('score_tab', saveUrlParams);
      if(flag===1){
        storage.setSessonItem('score_tab', timeParams);
      }
    }
    // 请求成功后保留查询条件
    this.props
      .dispatch({
        type: 'awaitAppealModel/getPreAppealList',
        payload: { params },
      })
      .then(() => {
        router.replace({
          pathname: this.props.location.pathname,
          query: saveUrlParams ? { params: saveUrlParams } : {},
        });
      });
  };
  onJumpPage = (query, pathname) => {
    router.push({
      pathname,
      query,
    });
  };
  onDetail = record => {
    // 跳转到待申诉详情
    const { dimensionType } = this.state;
    const query = {
      dimensionId: record.metaDimensionId, // id
      creditDate: record.creditDate,
      creditType: record.creditType,
      dimensionType, // 申诉维度
    };
    this.onJumpPage(query, '/scoreAppeal/awaitAppeal/detail');
  };
  onCreateAppeal = record => {
    // 到首次发起申诉。一申、无申诉审核记录
    const { dimensionType } = this.state;
    const query = {
      type: 1, // 一申
      creditType: record.creditType, // 学分维度
      creditDate: record.creditDate,
      dimensionType, // 申诉维度
      creditAppealId: record.metaDimensionId, // 学分申诉id（待申诉数据ID）
      dimensionId: record.metaDimensionId, // 获取详情用
    };
    this.onJumpPage(query, '/scoreAppeal/awaitAppeal/appeal');
  };
  columnsAction = () => {
    const {dimensionType} = this.state;
    const actionObj = [
      {
        title: '学分日期',
        dataIndex: 'creditDate',
      },
      {
        title: '学分维度',
        dataIndex: 'creditName',
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
        render: (text, record) => {
          return (
            <>
              {dimensionType == 14 ?<span data-trace='{"widgetName":"im待申诉列表进学员档案","traceName":"学分管理/待申诉/im/列表页/学员姓名"}' style={{color:'#00CCC3',cursor:'pointer'}} onClick={()=>jumpMarkingDetails(record.stuId,{target:'im'} )} >{text}</span>:<span>{text}</span>}
            </>
          );
        },
      },
      {
        title: '学员ID',
        dataIndex: 'stuId',
      },
      {
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
            <span className={style.actionBtn} onClick={() => this.onCreateAppeal(record)}>
              申诉
            </span>
              </AuthButton>
            </>
          );
        },
      }];
    return [...actionObj];
  };


  changeTab(dimensionType) {
    const score_tab = storage.getSessionItem('score_tab');
    if (score_tab ) {
      const tabParams = JSON.parse(score_tab);
      delete tabParams.creditType;
      this.setState(
        {
          dimensionType,
        },
        () => this.queryData(undefined, tabParams, undefined),
      );
    } else {
      this.setState(
        {
          dimensionType,
        },
        () => this.queryData(dimensionType, undefined, { page: 1 }),
      );
    }
  }

  formSubmit(dimensionType, params, pg) {
    this.queryData(dimensionType, params, pg);
  }

  changePage(dimensionType, params, pg) {
    const score_tab = storage.getSessionItem('score_tab');
    if (score_tab) {
      const tabParams = JSON.parse(score_tab);
      delete tabParams.creditType;
      this.setState(
        {
          dimensionType: this.state.dimensionType,
        },
        () => this.queryData(dimensionType, tabParams, pg),
      );
    } else {
      this.setState(
        {
          dimensionType: this.state.dimensionType,
        },
        () => this.queryData(dimensionType, undefined, pg),
      );
    }
  }

  render() {
    const { dimensionType } = this.state;
    const { loading } = this.props;
    const { awaitList = [], page } = this.props.awaitAppealModel;
    return (
      <>
        <p className={style.wrap}>
          <AuthButton authority="/scoreAppeal/awaitAppeal/specialNewer">
            <span
              onClick={() => this.changeTab(11)}
              className={11 === dimensionType ? style.active : null}
            >
              优新
            </span>
          </AuthButton>
          <AuthButton authority="/scoreAppeal/awaitAppeal/IM">
            <span
              onClick={() => this.changeTab(14)}
              className={14 === dimensionType ? style.active : null}
            >
              IM
            </span>
          </AuthButton>
          <AuthButton authority="/scoreAppeal/awaitAppeal/order">
            <span
              onClick={() => this.changeTab(19)}
              className={19 === dimensionType ? style.active : null}
            >
              工单
            </span>
          </AuthButton>
          <AuthButton authority="/scoreAppeal/awaitAppeal/baseline">
            <span
              onClick={() => this.changeTab(23)}
              className={23 === dimensionType ? style.active : null}
            >
              底线
            </span>
          </AuthButton>
          <AuthButton authority="/scoreAppeal/awaitAppeal/createIncome">
            <span
              onClick={() => this.changeTab(42)}
              className={42 === dimensionType ? style.active : null}
            >
              创收
            </span>
          </AuthButton>
        </p>
        <CSForm
          {...this.props}
          dimensionType={dimensionType}
          onSubmit={(params, pg) => {
            this.formSubmit(undefined, params, pg);
          }}
        />
        <CSTable
          dataSource={awaitList}
          columns={this.columnsAction()}
          loading={loading}
          page={page}
          changePage={pg => {
            this.changePage(undefined, undefined, pg);
          }}
        />
      </>
    );
  }
}

export default AwaitAppeal;
