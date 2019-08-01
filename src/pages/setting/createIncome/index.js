import React from 'react';
import { connect } from 'dva';
import TimeManage from '../createIncome/timeManage';
import Archive from '../createIncome/archive';
import styles from './style.less';

@connect(({ createIncome, loading }) => ({
  createIncome,
  loading: loading.effects['createIncome/getArchiveList'],
}))
class CreateIncome extends React.Component {
  componentDidMount() {
    // 获取绩效包列表
    this.props.dispatch({
      type: 'createIncome/getArchiveList',
      payload: { params: {} },
    });
  }
  render() {
    const { archiveList = [] } = this.props.createIncome || {};
    const {loading} = this.props;
    return (
      <div className={styles.createIncomeWrap}>
        <TimeManage achievementList={archiveList} loading={loading} />
        <Archive achievementList={archiveList} loading={loading} />
      </div>
    );
  }
}

export default CreateIncome;
