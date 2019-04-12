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
      <div>
        {/*------- 图1 桑吉 部分 --------*/}
        <div>
tu1
        </div>
        {/*------- 图2 柱状 部分 --------*/}
        <div>
tu2
        </div>
      </div>
    );
  }
}

export default behavior;
