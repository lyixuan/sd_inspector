import React from 'react';
import Echarts from '@/components/Echart';
import styles from './style.less';
import { getOption } from './collegeOptions.js';

class College extends React.Component {
  render() {
    const options = getOption({});
    return (
      <div className={styles.collegeWrap}>
        <p className={styles.title}>
          <span></span>
          NPS评分
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Echarts
            options={options}
            style={{ width: '243px', height: 194 + 'px', marginTop: '24px' }}
          />
        </div>
      </div>
    );
  }
}

export default College;
