import React from 'react';
import Echarts from './component/Echart_User';
import {getOption} from './component/active_option';

import styles from './style.css';


export default class ActiveStat extends React.Component {
  constructor(props) {
    super(props);
    const {activeStat=[]} = props;

    this.state = {
      current:activeStat[0]?activeStat[0].time:'',
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
    const { activeStat = [],height=320}  = this.props || {};
    const activeStat1 = activeStat[0] || {};
    const activeStat2 = activeStat[1] || {};

    const  options = getOption(idx===1?activeStat1:activeStat2);
    return (
      <div className={styles.contentLayout}>
        <div className={styles.boxHead}>
          <span className={styles.boxTitle}>活跃汇总</span>
          <span className={current===activeStat2.time ? styles.btnActive : styles.btn} onClick={()=>this.changeCheck(activeStat2.time,2)}>{activeStat2.time} <i></i></span>
          <span className={current!==activeStat2.time ? styles.btnActive : styles.btn} onClick={()=>this.changeCheck(activeStat1.time,1)}>{activeStat1.time} <i></i> </span>
        </div>
        <Echarts options={options} style={{ height: height+'px' }}/>
      </div>
    );
  }
}
