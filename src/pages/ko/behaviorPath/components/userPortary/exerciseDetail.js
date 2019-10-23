import React from 'react';
import Echarts from './component/Echart_User';
import {getOption} from './component/exercise_detail_option';

import styles from './style.css';


export default class ExerciseDetail extends React.Component {
  render() {
    const { exerciseDetail = {}}  = this.props || {};

    const  options = getOption(exerciseDetail);
    return (
      <div className={styles.contentLayout}>
        <div className={styles.boxHead}>
          <span className={styles.boxTitle}>做题分析</span>
        </div>
        <Echarts options={options} style={{ height: '320px' }}/>
      </div>
    );
  }
}
