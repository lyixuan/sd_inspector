import React from 'react';
import { connect } from 'dva';
import TimeManage from '../createIncome/timeManage';
import Archive from '../createIncome/archive';
import styles from './style.less';

@connect(({ createImcome }) => ({
  createImcome
}))
class CreateIncome extends React.Component {
  componentDidMount() {
    // 获取绩效包列表
    this.props.dispatch({
      type: 'createImcome/getAchievementList',
      payload: { params: {} },
    });
  }
  render() {
    const {achievementList=[]} = this.props.createImcome;
    return (
      <div className={styles.createIncomeWrap}>
        <TimeManage achievementList={achievementList}/>
        <Archive achievementList={achievementList}/>
      </div>
    );
  }
}

export default CreateIncome;
