import React from 'react';
import { connect } from 'dva';
import Profit from './profit'
import PerformanceDetail from './performanceDetail';
import Appeal from './appeal';
import Quality from './quality';
import styles from './style.less';
import CurrentCredit from './currentCredit'
import storage from '../../utils/storage';

@connect(() => ({
}))
class xdWorkbench extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: storage.getItem('admin_user').userId 
    }
  }
  render() {
    const { userId } = this.state;
    return (
      <div className={styles.workbench}>
        <div className={styles.performanceAppel}>
          <PerformanceDetail></PerformanceDetail>
        </div>
        <CurrentCredit></CurrentCredit>
        <Profit userId={userId} />
        <div className={styles.qualityAppel}>
          <Quality userId={userId} />
          <Appeal userId={userId} />
        </div>
      </div>
    );
  }
}

export default xdWorkbench;
