import React from 'react';
import Echarts from '@/components/Echart';
import styles from './style.less';

class Cycle extends React.Component {
  render() {
    // const options1 = getOption1(xdOperationNpsData);
    return (
      <div className={styles.collegeWrap}>
        <p className={styles.title}>
          <span></span>
          续费学员生命周期分布
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {/* <Echarts
            options={options1}
            style={{ width: '243px', height: 194 + 'px', marginTop: '24px' }}
          /> */}
        </div>
      </div>
    );
  }
}

export default Cycle;
