import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import styles from './style.less';
import RenderRoute from '@/components/RenderRoute';
import KoTab from '@/pages/ko/components/KoRadio/KoTab';
import KoForm from '@/pages/ko/components/KoForm';
import CommonForm from './components/form';

@connect(({ koPlan, loading }) => ({
  loading,
  koPlan,
  enumData: koPlan.enumData,
  pageList: koPlan.pageList,
  isLoadEnumData: loading.effects['koPlan/getKOEnumList'],
}))
class koPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originParams: {},      //  储存原始form的params
    }
  }
  componentDidMount() {
    this.getInitParams();
  }
  componentWillUnmount() {
    this.props.dispatch({
      type: 'koPlan/saveParams',
      payload: { params: {} },
    })
  }
  getInitParams = () => {
    this.getKOEnumList();
  }
  getKOEnumList = () => {
    this.props.dispatch({
      type: 'koPlan/getKOEnumList',
      payload: { type: null }
    })
  };
  getPageList = () => {
    this.props.dispatch({
      type: 'koPlan/getPageList',
      payload: { params: {} }
    });
  };
  queryMapData = () => {
    this.props.dispatch({
      type: 'koPlan/getPageList',
      payload: { params: {} }
    });
    this.props.dispatch({
      type: 'koPlan/getPageList',
      payload: { params: {} }
    })
  };
  queryTabelData = () => {
    this.props.dispatch({
      type: 'koPlan/getPageList',
      payload: { params: {} }
    });
  };
  onSubmit = (params) => {
    this.props.dispatch({
      type: 'koPlan/saveParams',
      payload: { params },
    });
    this.setState({ originParams: params });

  };
  jumpTo = (pathname) => {
    this.props.history.push({
      pathname,
    });
  };
  render() {
    const { enumData, isLoadEnumData, location: { pathname } } = this.props;
    return (
      <div>
        {/*------- 公共 form 部分 --------*/}
        {(pathname === '/ko/behaviorPath') ? null : <> <div className={styles.commonBox}>
          <Spin tip="Loading..." spinning={isLoadEnumData}>
            <CommonForm onSubmit={this.onSubmit} enumData={enumData} />
          </Spin>
        </div>
          <div className={styles.tabBox}>
            <KoTab {...this.props} />
            {(pathname === '/ko/behaviorAnalyze' || pathname === '/ko') && <KoForm {...this.props} />}
          </div>
        </>
        }

        <RenderRoute {...this.props} />
      </div>
    );
  }
}

export default koPlan;
