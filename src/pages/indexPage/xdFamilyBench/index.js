import React from 'react';
import { connect } from 'dva';
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
        here
      </div>
    );
  }
}

export default XdFamily;
