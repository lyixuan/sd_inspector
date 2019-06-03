import React from 'react';
import { connect } from 'dva/index';

@connect(({ scoreAppealModel }) => ({
  scoreAppealModel,
}))

class scoreAppeal extends React.Component {
  componentDidMount() {
    // 获取组织
    this.props.dispatch({
      type: 'scoreAppealModel/getOrgMapList',
      payload: { params: {} },
    });
  }
  render() {
    return <div>{this.props.children}</div>;
  }
}

export default scoreAppeal;