import React from 'react';
import { connect } from 'dva';
import RenderRoute from '@/components/RenderRoute';

@connect(({ qualityReport }) => ({
  qualityReport,
}))
class qualityReport extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'qualityReport/save',
      payload: { organization:null},
    });
    this.props.dispatch({
      type: 'qualityReport/getCurrentDateRange',
      payload: { ...{userType:'family'}},
    });

    this.props.dispatch({
      type: 'qualityReport/getTimeRange',
      payload: { },
    });
  }
  render() {
    const {startDate:beginDate, endDate } = this.props.qualityReport;
    return <div>
      {beginDate && endDate && <RenderRoute {...this.props} />}
      </div>;
  }
}

export default qualityReport;
