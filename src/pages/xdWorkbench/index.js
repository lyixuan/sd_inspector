import React from 'react';
import { connect } from 'dva';
import Profit from './profit'
import PerformanceDetail from './performanceDetail';
import Appeal from './appeal';
import Quality from './quality';
import styles from './style.less';
import CurrentCredit from './currentCredit'

@connect(() => ({

}))
class xdWorkbench extends React.Component {

  render() {
    return (
      <div className={styles.workbench}>
        <div className={styles.performanceAppel}>
          <PerformanceDetail></PerformanceDetail>
        </div>
        <CurrentCredit></CurrentCredit>
        <Profit/>
        <div className={styles.qualityAppel}>
          <Quality />
          <Appeal />
        </div>
      </div>
    );
  }
}

export default xdWorkbench;
