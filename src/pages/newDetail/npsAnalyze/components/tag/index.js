import React from 'react';
import { connect } from 'dva';
import Echart from '@/components/Echart';
import { getOption } from './tagOptions.js';

@connect(({ npsAnalyzeModel }) => ({
  npsAnalyzeModel,
  paramsQuery: npsAnalyzeModel.paramsQuery || {},
  getTagListData: npsAnalyzeModel.getTagListData,
}))
class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { getTagListData = [] } = this.props;
    const options = getOption(getTagListData);
    return (
      <div
        style={{
          width: '310px',
          height: '213px',
          background: 'rgba(255,255,255,1)',
          boxShadow: '0px 0px 4px 0px rgba(0,0,0,0.14)',
          borderRadius: '20px',
        }}
      >
        <Echart options={options} style={{ height: '213px', width: '310px' }} />
      </div>
    );
  }
}

export default Tag;
