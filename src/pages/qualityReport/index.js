import React from 'react';
import { connect } from 'dva';

@connect(({ qualityReport }) => ({
  qualityReport,
}))
class qualityReport extends React.Component {
  componentDidMount() {
  }
  render() {
    return <div>{this.props.children}</div>;
  }
}

export default qualityReport;
