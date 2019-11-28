import React from 'react';
import {Tooltip } from 'antd';
import Echarts from './component/Echart_User';
import {getOption} from './component/exercise_detail_option';

import styles from './style.css';


export default class ExerciseDetail extends React.Component {
  render() {
    const { exerciseDetail = {},height=320}  = this.props || {};

    const  options = getOption(exerciseDetail);
    return (
      <div className={styles.contentLayout}>
        <div className={styles.boxHead}>
          <Tooltip placement="right" title={`学员最近两个月做题数量和做题正确数量趋势。`}>
            <span className={styles.boxTitle}>做题分析</span>
          </Tooltip>
        </div>
        <Echarts options={options} style={{ height: height+'px' }}/>
      </div>
    );
  }
}
