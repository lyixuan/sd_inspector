import React from 'react';
import { connect } from 'dva';
import PerformanceDetail from './performanceDetail';

@connect(() => ({

}))
class koPlan extends React.Component {

  render() {
    return (
      <div>
        <PerformanceDetail></PerformanceDetail>
      </div>
    );
  }
}

export default koPlan;
