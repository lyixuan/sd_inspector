import React from 'react';
import { connect } from 'dva';

@connect(({ userList }) => ({
  userList,
}))
class userList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  };
  render() {

    return (
      <div>
        ddd
      </div>
    );
  }
}

export default userList;
