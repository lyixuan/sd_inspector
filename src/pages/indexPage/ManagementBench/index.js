import React from 'react';
import { connect } from 'dva';
import storage from '../../../utils/storage';
import styles from './style.less'
@connect((xdWorkModal) => ({
  xdWorkModal,
}))
// Current credits
class ManagementBench extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: storage.getItem('admin_user').userId,
    }
  }
  componentDidMount() {
  }
  render() {
    // const { userId} = this.state;
    return (
      <div className={styles.workbench}>
      </div>
    );
  }
}

export default ManagementBench;
