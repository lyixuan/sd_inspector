import React from 'react';
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
