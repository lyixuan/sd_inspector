import React from 'react';
import { connect } from 'dva';
import SubOrderDetail from './../../components/subOrderDetail';

class QualityDetail extends React.Component {
  render() {
    return (
      <div>
        <SubOrderDetail />
      </div>
    );
  }
}

export default QualityDetail;
