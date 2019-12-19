import React, { Component } from 'react';
import RenderRoute from '@/components/RenderRoute';
import { connect } from 'dva';
import styles from './style.less';

const headObj = {
  '/newDetail/analyze': '创收分析',
  '/newDetail/incomeRank': '创收对比'
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
  }
  render() {
    const { globalDate, location = {} } = this.props;
    const title = headObj[location.pathname];
    return (
      <>
        {
          title && <div className={styles.title}>
            <span>{title}</span>
            <span>{globalDate.startDate} ~ {globalDate.endDate}</span>
          </div> 
        }
        <RenderRoute {...this.props} />
      </>
    );
  }
}

export default NewDetail;
