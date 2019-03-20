import React from 'react';
import { connect } from 'dva';

@connect(({ qualityAppealHome }) => ({
  qualityAppealHome,
}))
class qualityAppeal extends React.Component {
  componentDidMount() {
    // 获取组织
    this.props.dispatch({
      type: 'qualityAppealHome/getOrgMapList',
      payload: { params: {} },
    });
    // 获取分维（客诉）
    this.props.dispatch({
      type: 'qualityAppealHome/getDimensionList',
      payload: { params: { qualityType: 1 } },
    });
    // 获取分维（班主任）
    this.props.dispatch({
      type: 'qualityAppealHome/getDimensionList',
      payload: { params: { qualityType: 2 } },
    });
  }
  render() {
    return <div>{this.props.children}</div>;
  }
}

export default qualityAppeal;
