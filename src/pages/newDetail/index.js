import React, { Component } from 'react';
import RenderRoute from '@/components/RenderRoute';
import { connect } from 'dva';
import styles from './style.less';

const headObj = {
  '/newDetail/analyze': {
    title: '创收产品包',
    falg: true,
  },
  '/newDetail/incomeRank': {
    title: '创收对比',
    falg: true,
  },
  '/newDetail/incomeOrder': {
    title: '创收排名',
    falg: false,
  }
}

@connect(({ newDetailModal }) => ({
  globalDate: newDetailModal.globalDate
}))
class NewDetail extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'newDetailModal/getGlobalUserType',
    });
    this.props.dispatch({
      type: 'newDetailModal/getUserInfo',
    });
    this.props.dispatch({
      type: 'newDetailModal/getCurrentDateRange',
      payload: { params: { userType: 'family' } },
    });
    this.props.dispatch({
      type: 'newDetailModal/getKpiDateRange',
    });
  }
  render() {
    const { globalDate, location = {} } = this.props;
    const item = headObj[location.pathname];
    return (
      <>
        {
          item && <div className={styles.title}>
            <span>{item.title}</span>
            {item.falg && <span>{globalDate.startDate} ~ {globalDate.endDate}</span>}
          </div>
        }
        {globalDate && globalDate.startDate && <RenderRoute {...this.props} />}
      </>
    );
  }
}

export default NewDetail;
