import React from 'react';
import { Spin } from 'antd';
import { connect } from 'dva';

@connect(({ qualityReport,loading }) => ({
  qualityReport,
  loading: loading.effects['qualityReport/getCurrentDateRange']||loading.effects['qualityReport/getOrgMapTreeByRole']||loading.effects['qualityReport/getTimeRange'],
}))
class qualityReport extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'qualityReport/getCurrentDateRange',
      payload: { ...{userType:'family'}},
    });
    this.props.dispatch({
      type: 'qualityReport/getOrgMapTreeByRole',
      payload: { },
    });
    this.props.dispatch({
      type: 'qualityReport/getTimeRange',
      payload: { },
    });
  }
  render() {
    return <Spin spinning={this.props.loading}>{this.props.children}</Spin>;
  }
}

export default qualityReport;
