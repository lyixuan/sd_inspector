import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import TimeManage from '../createIncome/timeManage';
import Archive from '../createIncome/archive';

// @connect(({ loading }) => ({
//   loading: loading.models.examOrg,
// }))
class AppealCheck extends React.Component {
  render() {
    return (
      <div>
        <TimeManage />
        <Archive />
      </div>
    );
  }
}

export default AppealCheck;
