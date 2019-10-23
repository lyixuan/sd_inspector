import React from 'react';
import Echarts from './component/Echart_User';
import {getOption} from './component/im_detail_option';

import styles from './style.css';


export default class ImDetail extends React.Component {
  render() {
    const { imDetail = {}}  = this.props || {};

    const  options = getOption(imDetail);
    return (
      <div className={styles.contentLayout}>
        <div className={styles.boxHead}>
          <span className={styles.boxTitle}>IM情绪值</span>
        </div>
        <Echarts options={options} style={{ height: '350px' }}/>
      </div>
    );
  }
}
