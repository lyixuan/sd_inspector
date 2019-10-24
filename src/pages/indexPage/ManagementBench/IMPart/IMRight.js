import React from 'react';
import { connect } from 'dva';
import styles from './style.less'
@connect((xdWorkModal) => ({
  xdWorkModal,
}))
class IMRight extends React.Component {
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
        IM负面数据对比
      </div>
    );
  }
}

export default IMRight;
