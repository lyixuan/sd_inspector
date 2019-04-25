import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import styles from './style.less';
import RenderRoute from '@/components/RenderRoute';
import KoTab from '@/pages/ko/components/KoRadio/KoTab';
import KoForm from '@/pages/ko/components/KoForm';
import { handleInitParams, handleFormParams, handleDateFormParams } from './utils/utils';
import CommonForm from './components/form';

@connect(({ koPlan, loading }) => ({
  loading,
  koPlan,
  pageList: koPlan.pageList,
  pageParams: koPlan.pageParams,
  tabFromParams: koPlan.tabFromParams,
  enumData: koPlan.enumData,
  KOMessage: koPlan.KOMessage,
  pageDetailInfo: koPlan.pageDetailInfo,
  usersData: koPlan.usersData,
  isLoadEnumData: loading.effects['koPlan/pageParams'],
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
    const tabFromParams = { ...handleInitParams(params), formParams: handleFormParams(KoDateRange) };
    if (JSON.stringify(this.props.tabFromParams) !== JSON.stringify(tabFromParams)) {
      this.onSaveTabFromParams(tabFromParams);
    }
    this.onSaveOriginParams(handleDateFormParams(KoDateRange));
    this.onSavefFlterActionParams(handleInitParams(params));
  }
  getInitData = () => {
    this.props.dispatch({
      type: 'koPlan/getKOMessage',
    })
  }
  onSaveOriginParams = (params = {}) => {
    const { originParams } = this.state;
    this.setState({ originParams: { ...originParams, ...params } });
  }
  onSavefFlterActionParams = (params = {}) => {
    const { filterActionParams } = this.state;
    this.setState({ filterActionParams: { ...filterActionParams, ...params } });

  }
  onSaveTabFromParams = (params) => {
    this.props.dispatch({
      type: 'koPlan/saveTabFromParams',
      payload: { ...params }
    })
  }
  changeFilterAction = (params, originParams = {}) => {
    const tabFromParams = JSON.parse(JSON.stringify(this.props.tabFromParams));
    const { formParams, ...others } = tabFromParams;
    const newParams = { ...others, ...params };
    this.onSaveTabFromParams({ formParams, ...newParams });
    this.onSavefFlterActionParams(originParams);


  }

  onSubmit = (params, originParams) => {
    const tabFromParams = JSON.parse(JSON.stringify(this.props.tabFromParams));
    const { formParams } = tabFromParams;
    tabFromParams.formParams = { ...formParams, ...params };
    this.onSaveTabFromParams(tabFromParams)
    this.setState({ originParams: { ...this.state.originParams, ...originParams } });
  };
  jumpTo = (pathname) => {
    this.props.history.push({
      pathname,
    });
  };
  render() {
    const { enumData, isLoadEnumData, location: { pathname } } = this.props;
    const { originParams, filterActionParams } = this.state;

    return (
      <div>
        {/*------- 公共 form 部分 --------*/}
        {(pathname === '/ko/behaviorPath') ? null : <> <div className={styles.commonBox}>
          <Spin tip="Loading..." spinning={isLoadEnumData}>
            <CommonForm onSubmit={this.onSubmit} enumData={enumData} originParams={originParams} usersData={this.props.usersData} />
          </Spin>
        </div>
          <div className={styles.tabBox}>
            <KoTab {...this.props} />
            {(pathname === '/ko/behaviorAnalyze' || pathname === '/ko') && <KoForm {...this.props} originParams={filterActionParams} onChange={this.changeFilterAction} />}
          </div>
        </>
        }
        <RenderRoute {...this.props} />
      </div>
    );
  }
}

export default koPlan;
