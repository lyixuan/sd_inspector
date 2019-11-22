import React from 'react';
import {Tooltip } from 'antd';
import Echarts from './component/Echart_User';
import {getOption} from './component/learn_detail_option';

import styles from './style.css';


export default class LearnDetail extends React.Component {
  render() {
    const { learnDetail = {},height=320}  = this.props || {};

    const  options = getOption(learnDetail);
    return (
      <div className={styles.contentLayoutbase2}>
        <div className={styles.boxHead}>
          <Tooltip placement="right" title={`学员最近两个月查看直播和重播课程的时长趋势，面积越大时间越长。`}>
            <span className={styles.boxTitle}>学习状况</span>
          </Tooltip>
        </div>
        <Echarts options={options}  style={{ height: height+'px' }}/>
      </div>
    );
  }
}
