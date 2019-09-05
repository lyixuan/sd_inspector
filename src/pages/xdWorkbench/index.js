import React from 'react';
import { connect } from 'dva';
import PerformanceDetail from './performanceDetail';
import Appeal from './appeal';
import Quality from './quality';
import styles from './style.less';

@connect(() => ({

}))
class xdWorkbench extends React.Component {

  render() {
    return (
      <div className={styles.workbench}>
        <div className={styles.performanceAppel}>
          <PerformanceDetail></PerformanceDetail>
        </div>
        <div className={styles.qualityAppel}>
          <Quality />
          <Appeal />
        </div>
      </div>

    );
  }
}

export default xdWorkbench;
