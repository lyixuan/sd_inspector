import React from 'react';
import { connect } from 'dva';
import Container from './components/container';
import Profit from './profit'
import Appeal from './appeal';
import Quality from './quality';
import styles from './style.less';

@connect(() => ({

}))
class xdWorkbench extends React.Component {
  
  render() {
    return (
      <div className={styles.workbench}>
        <Profit/>
        <div className={styles.qualityAppel}>
          <Quality/>
          <Appeal/>
        </div>
      </div>
      
    );
  }
}

export default xdWorkbench;
