import React from 'react';
import { connect } from 'dva';

@connect(({ qualityAppealHome }) => ({
  qualityAppealHome,
}))
class qualityAppeal extends React.Component {
  componentDidMount() {
    // 获取组织
    this.props.dispatch({
      type: 'qualityAppealHome/orgList',
      payload: { params: {} },
    });
  }
  render() {
    return <div>{this.props.children}</div>;
  }
}

export default qualityAppeal;
