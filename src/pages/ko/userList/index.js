import React from 'react';
import { connect } from 'dva';

@connect(({ userList }) => ({
  userList,
}))
class userList extends React.Component {
  componentDidMount() {}
  render() {
    return <div>用户列表</div>;
  }
}

export default userList;
