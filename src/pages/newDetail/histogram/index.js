import React from 'react';
import { connect } from 'dva';
import ScoreContrast from './scoreContrast';

@connect(({ newDetailModal }) => ({
  globalDate: newDetailModal.globalDate
}))
class Histogram extends React.Component {
  render() {
    return (
      <>
       { this.props.globalDate.startDate && <ScoreContrast globalDate={this.props.globalDate} location={this.props.location}/> }
      </>
    );
  }
}
export default Histogram;
