import React from 'react';
import echarts from 'echarts';
import styles from './index.less';
import { connect } from 'dva';

@connect(() => ({

}))
class performanceDetail extends React.Component {

  render() {
    return (
      <div className={styles.performance}>
        <div className={styles.titleBar}>
          <h4>绩效详情</h4>
          <p>2019.07.29 - 2019.08.10 (最新学分日期)</p>
        </div>
        <div class={styles.detailContent}>
          <div class={styles.chart}>

          </div>
        </div>
      </div>
    );
  }
}

export default performanceDetail;
