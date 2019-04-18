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
    this.getKOEnumList();

  }
  componentWillUnmount() {
    this.props.dispatch({
      type: 'koPlan/saveParams',
      payload: { params: {} },
    })
  }
  getKOEnumList = () => {
    this.props.dispatch({
      type: 'koPlan/getKOEnumList',
      payload: { type: null }
    })
  }
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
    const { route, enumData, isLoadEnumData, location: { pathname } } = this.props;
    const { pageRedirect } = route;


    return (
      <div>
        {/*------- 公共 form 部分 --------*/}
        {!pageRedirect ? null : <div className={styles.commonBox}>
          <Spin tip="Loading..." spinning={isLoadEnumData}>
            <CommonForm onSubmit={this.onSubmit} enumData={enumData} />
          </Spin>

        </div>}
        <div className={styles.tabBox}>
          <KoTab {...this.props} />
          {(pathname === '/ko/behaviorAnalyze' || pathname === '/ko') && <KoForm {...this.props} />}
        </div>
        <RenderRoute {...this.props} />
      </div>
    );
  }
}

export default koPlan;
