import React from 'react';
import { connect } from 'dva';
import styles from './style.less'
@connect((xdWorkModal) => ({
  xdWorkModal,
}))
class EchartBottom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
  }
  render() {
    // const { userId} = this.state;
    return (
      <div className={styles.echartBottom}>
        <div className={styles.blue}>
          <span/>正面
        </div>
        <div className={styles.yellow}>
          <span/>负面
        </div>
      </div>
    );
  }
}

export default EchartBottom;
