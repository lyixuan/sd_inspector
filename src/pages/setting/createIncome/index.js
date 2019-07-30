import React from 'react';
import { connect } from 'dva';
import TimeManage from '../createIncome/timeManage';
import Archive from '../createIncome/archive';
import styles from './style.less';

@connect(({ createIncome, loading }) => ({
  createIncome,
  loading: loading.effects['createIncome/getAchievementList'],
}))
class CreateIncome extends React.Component {
  componentDidMount() {
    // 获取绩效包列表
    this.props.dispatch({
      type: 'createIncome/getAchievementList',
      payload: { params: {} },
    });
    // 创收绩效存档-获取所有绩效周期列表
    this.props.dispatch({
      type: 'createIncome/getFindKpiPackageDateList',
      payload: { params: {} },
    });
  }
  render() {
    const { achievementList = [], loading, findKpiPackageDateList = [] } =
      this.props.createIncome || {};
    return (
      <div className={styles.createIncomeWrap}>
        <TimeManage {...this.props} achievementList={achievementList} loading={loading} />
        <Archive findKpiPackageDateList={findKpiPackageDateList} loading={loading} />
      </div>
    );
  }
}

export default CreateIncome;
