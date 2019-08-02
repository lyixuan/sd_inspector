import React from 'react';
import { connect } from 'dva';

@connect(({ faguang }) => ({
  faguang,
}))
class faguang extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'faguang/getCollegeList',
      payload: { },
    });
    this.props.dispatch({
      type: 'faguang/getCourseType',
      payload: {  },
    });
  }
  render() {
    return <div>{this.props.children}</div>;
  }
}

export default faguang;
