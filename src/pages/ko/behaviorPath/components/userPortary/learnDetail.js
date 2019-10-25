import React from 'react';
import Echarts from './component/Echart_User';
import {getOption} from './component/learn_detail_option';

import styles from './style.css';


export default class LearnDetail extends React.Component {
  render() {
    const { learnDetail = {},height=320}  = this.props || {};

    const  options = getOption(learnDetail);
    return (
      <div className={styles.contentLayout}>
        <div className={styles.boxHead}>
          <span className={styles.boxTitle}>学习状况</span>
        </div>
        <Echarts options={options}  style={{ height: height+'px' }}/>
      </div>
    );
  }
}
