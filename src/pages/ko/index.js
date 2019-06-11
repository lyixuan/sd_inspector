import React from 'react';
import { connect } from 'dva';
import styles from './style.less';
import RenderRoute from '@/components/RenderRoute';
import KoTab from '@/pages/ko/components/KoRadio/KoTab';
import KoForm from '@/pages/ko/components/KoForm';
import { handleInitParams, handleFormParams, initRecordTimeListData } from './utils/utils';
import CommonForm from './components/form';
import EventGroup from './components/eventGroup';

@connect(({ koPlan, loading }) => ({
  loading,
  koPlan,
  pageList: koPlan.pageList,
  pageParams: koPlan.pageParams,
  tabFromParams: koPlan.tabFromParams,
  enumData: koPlan.enumData,
  KOMessage: koPlan.KOMessage,
  pageDetailTotal: koPlan.pageDetailTotal,
  usersData: koPlan.usersData,
  chooseEventData: koPlan.chooseEventData,
  isLoadEnumData: loading.effects['koPlan/pageParams'],
  userGroupListData: koPlan.userGroupListData,
}))
class koPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originParams: {},      //  储存原始form的params
      filterActionParams: {},
    }
  }
  componentDidMount() {
    const { pageParams } = this.props;
    this.getInitData();
    this.handleOriginParams(pageParams);
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.pageParams) !== JSON.stringify(this.props.pageParams)) {
      this.handleOriginParams(nextProps.pageParams);
    }
    if (JSON.stringify(nextProps.tabFromParams.page) !== JSON.stringify(this.props.tabFromParams.page)) {
      this.onSavefFlterActionParams({ page: nextProps.tabFromParams.page });
    }
  }
  // componentWillUnmount() {
  //   this.props.dispatch({
  //     type: 'koPlan/saveTabFromParams',
  //     payload: { params: {} },
  //   })
  // }
  handleOriginParams = (params = {}) => {
    if (JSON.stringify(params) === '{}') return;
    const { KoDateRange } = params;
    const { recordTimeList, ...others } = handleInitParams(params);
    const tabFromParams = { recordTimeList, ...others, formParams: handleFormParams(KoDateRange) };
    if (JSON.stringify(this.props.tabFromParams) !== JSON.stringify(tabFromParams)) {
      this.onSaveTabFromParams(tabFromParams, KoDateRange);
    }
    // this.onSaveOriginParams(handleDateFormParams(KoDateRange));
    this.onSavefFlterActionParams({ ...others });
  }
  getInitData = () => {
    this.props.dispatch({
      type: 'koPlan/getKOMessage',
    })
    this.props.dispatch({
      type: 'koPlan/getUserGroupList'
    });
  }
  onSaveOriginParams = (params = {}) => {
    const { originParams } = this.state;
    this.setState({ originParams: { ...originParams, ...params } });
  }
  onSavefFlterActionParams = (params = {}) => {
    const { filterActionParams } = this.state;
    this.setState({ filterActionParams: { ...filterActionParams, ...params } });
  }
  onSaveTabFromParams = (params, KoDateRange = this.props.pageParams.KoDateRange) => {
    this.handleDateParams(params.formParams, KoDateRange);


    const recordTimeList = this.handleRecordTime(params, KoDateRange);
    this.clearChooseEvent();
    this.props.dispatch({
      type: 'koPlan/saveTabFromParams',
      payload: { ...params, recordTimeList }
    })
  }
  handleRecordTime = (params, KoDateRange) => {
    const recordTimeList = initRecordTimeListData(KoDateRange);
    return params['recordTimeList'] && params['recordTimeList'].length > 0 ? params['recordTimeList'] : recordTimeList;
  }
  handleDateParams = (params, KoDateRange) => {
    const dateObj = handleFormParams(KoDateRange);
    const { choiceLessonStatus, publicLesson, certificateChoiceLesson } = params;
    Object.keys(dateObj).forEach(item => {
      switch (item) {
        case 'certificateChoiceLessonTime':
          const certificateChoiceLessonTimeDisable = Number(choiceLessonStatus) === 0 || Number(publicLesson) === 0;
          params[item] = certificateChoiceLessonTimeDisable ? (params[item] || undefined) : (params[item] && params[item].length > 0 ? params[item] : dateObj[item])
          break;
        case 'publicChoiceLessonTime':
          const publicChoiceLessonTimeDisable = Number(choiceLessonStatus) === 0 || certificateChoiceLesson === 'javascript';
          params[item] = publicChoiceLessonTimeDisable ? (params[item] || undefined) : (params[item] && params[item].length > 0 ? params[item] : dateObj[item])
          break;
        default:
          params[item] = params[item] && params[item].length > 0 ? params[item] : dateObj[item];
          break;
      }
    });
  }
  changeFilterAction = (params, originParams = {}) => {
    const tabFromParams = JSON.parse(JSON.stringify(this.props.tabFromParams));
    const { formParams, ...others } = tabFromParams;
    const newParams = { ...others, ...params };
    this.onSaveTabFromParams({ formParams, ...newParams });
    this.onSavefFlterActionParams(originParams);
  }
  clearChooseEvent = (obj = {}) => {
    // let { hooseEventData = [] } = this.props;
    // const index = hooseEventData.findIndex(item => item.id === obj.id);
    // if (index >= 0) {
    //   hooseEventData.splice(index, 1);
    // } else {
    //   hooseEventData = [];
    // }
    this.props.dispatch({
      type: 'koPlan/saveChooseEventData',
      payload: {
        chooseEventData: [],
      }
    });
  }
  onSubmit = (params, originParams) => {
    const tabFromParams = JSON.parse(JSON.stringify(this.props.tabFromParams));
    const { formParams } = tabFromParams;
    tabFromParams.formParams = { ...formParams, ...params };
    this.onSaveTabFromParams(tabFromParams)
    this.setState({ originParams: { ...this.state.originParams, ...originParams } });
    this.props.dispatch({
      type: 'koPlan/saveOriginParams',
      payload: { originParams }
    })
  };
  jumpTo = (pathname) => {
    this.props.history.push({
      pathname,
    });
  };
  render() {
    const { enumData, pageParams, isLoadEnumData, location: { pathname }, chooseEventData = [], tabFromParams } = this.props;
    const { originParams, filterActionParams } = this.state;
    return (
      <div>
        {/*------- 公共 form 部分 --------*/}
        {(pathname === '/ko/dailyReport') || (pathname === '/ko/behaviorPath') ? null : <> <div className={styles.commonBox}>
          <CommonForm onSubmit={this.onSubmit} enumData={enumData} originParams={originParams} usersData={this.props.usersData} pageParams={pageParams} loading={isLoadEnumData} userGroupListData={this.props.userGroupListData} />
        </div>
          <div className={styles.tabBox}>
            <KoTab {...this.props} />
            {(pathname === '/ko/behaviorAnalyze' || pathname === '/ko') && <KoForm {...this.props} originParams={filterActionParams} onChange={this.changeFilterAction} loading={isLoadEnumData} />}
            {pathname === '/ko/userList' ? <div>
              <EventGroup data={chooseEventData} onChange={this.clearChooseEvent} />
            </div> : null}

          </div>
        </>
        }
        <RenderRoute {...this.props} />
      </div>
    );
  }
}

export default koPlan;
