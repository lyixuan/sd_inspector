import React from 'react';
import { connect } from 'dva';
import TimeManage from './timeManage/index';
import styles from './style.less';

@connect(({ createIncome, loading }) => ({
  createIncome,
  loading: loading.effects['createIncome/getArchiveList'],
}))
class Report extends React.Component {
  componentDidMount() {
    // 获取绩效包列表
    this.props.dispatch({
      type: 'createIncome/getArchiveList',
      payload: { params: {} },
    });
  }
  render() {
    const { archiveList = [] } = this.props.createIncome || {};
    const { loading } = this.props;
    return (
      <div className={styles.createIncomeWrap}>
        <TimeManage achievementList={archiveList} loading={loading} />
      </div>
    );
  }
}

export default Report;
