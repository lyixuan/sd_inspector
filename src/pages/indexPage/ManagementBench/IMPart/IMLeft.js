import React from 'react';
import { connect } from 'dva';
import styles from './style.less'
@connect((xdWorkModal) => ({
  xdWorkModal,
}))
class IMLeft extends React.Component {
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
      <div className={styles.IMMain}>
        IM负面原因分析

      </div>
    );
  }
}

export default IMLeft;
