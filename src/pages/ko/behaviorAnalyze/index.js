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
        {/*------- 图1 部分 --------*/}
        <div>

        </div>
        {/*------- 图2 部分 --------*/}
        <div>

        </div>
      </div>
    );
  }
}

export default behavior;
