import React from 'react';
import Echart from '@/components/Echart';
import { connect } from 'dva';

@connect(({ userList }) => ({
  userList,
}))
class userList extends React.Component {
  render() {

    return <div>用户列表</div>;
  }
}

export default userList;
