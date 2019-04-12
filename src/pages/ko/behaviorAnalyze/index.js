import React from 'react';
import { connect } from 'dva';

@connect(({ behavior }) => ({
  behavior,
}))
class behavior extends React.Component {
  componentDidMount() {
    console.log(this)
  }
  render() {

    return (
      <div>行为轨迹</div>
    );
  }
}

export default behavior;
