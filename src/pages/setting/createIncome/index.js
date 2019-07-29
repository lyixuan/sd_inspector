import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import TimeManage from '../createIncome/timeManage';
import Archive from '../createIncome/archive';
import styles from './style.less';

// @connect(({ loading }) => ({
//   loading: loading.models.examOrg,
// }))
class CreateIncome extends React.Component {
  render() {
    return (
      <div className={styles.createIncomeWrap}>
        <TimeManage />
        <Archive />
      </div>
    );
  }
}

export default CreateIncome;
