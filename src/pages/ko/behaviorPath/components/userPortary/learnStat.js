import React from 'react';
import {Tooltip } from 'antd';
import Echarts from './component/Echart_User';
import {getOption} from './component/learn_option';
import styles from './style.css';


export default class LearnStat extends React.Component {
  constructor(props) {
    super(props);
    const {learnStat=[]} = props;

    this.state = {
      current:learnStat[0]?learnStat[0].time:'',
      idx:1,
    }
  }
  changeCheck = (v,i)=>{
    this.setState({
      current:v,
      idx:i
    })
  };

  render() {
    const {current,idx} = this.state;
    const { learnStat = [],height=320}  = this.props || {};
    const learnStat1 = learnStat[0] || {};
    const learnStat2 = learnStat[1] || {};

    const  options = getOption(idx===1?learnStat1:learnStat2);
    return (
      <div className={styles.contentLayout}>
        <div className={styles.boxHead}>
          <Tooltip placement="right" title={`学员直播或重播的年度活跃比例：活跃天数/月份天数。`}>
            <span className={styles.boxTitle}>学习汇总</span>
          </Tooltip>
          <span className={current===learnStat2.time ? styles.btnActive : styles.btn} onClick={()=>this.changeCheck(learnStat2.time,2)}>{learnStat2.time} <i></i></span>
          <span className={current!==learnStat2.time ? styles.btnActive : styles.btn} onClick={()=>this.changeCheck(learnStat1.time,1)}>{learnStat1.time} <i></i> </span>
        </div>
        <Echarts options={options} style={{ height: height+'px' }}/>
      </div>
    );
  }
}
