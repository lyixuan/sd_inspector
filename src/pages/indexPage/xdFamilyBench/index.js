import React from 'react';
import { connect } from 'dva';
import PerformanceDetail from './performanceDetail';
import styles from './style.less';
@connect((xdWorkModal) => ({
  xdWorkModal,
}))
// Current credits
class XdFamily extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {

  }
  render() {
    return (
      <div className={styles.familyBench}>
        <PerformanceDetail></PerformanceDetail>
      </div>
    );
  }
}

export default XdFamily;
