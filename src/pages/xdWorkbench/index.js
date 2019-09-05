import React from 'react';
import { connect } from 'dva';
import Appeal from './appeal';
import Quality from './quality';
import styles from './style.less';

@connect(() => ({

}))
class xdWorkbench extends React.Component {
  
  render() {
    return (
      <div className={styles.workbench}>
        <div className={styles.qualityAppel}>
          <Quality/>
          <Appeal/>
        </div>
      </div>
      
    );
  }
}

export default xdWorkbench;
