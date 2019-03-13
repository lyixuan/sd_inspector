/*
* 需要参数:
* options【Array】，需要循环的数组
* defaultValue，选择框默认展示的值
* id【string】，非必传，同一页面多次调用改组件时，区分选择框的唯一标识
* keyName【string】，非必传，默认：'name'
* value【string】，非必传，默认：'id'
* showName,非必传，传的话表示取的是name字段
* */

import React from 'react';
import { Progress } from 'antd';
import styles from './common.less'

export default class SelfProgress extends React.Component {
  render(){
    const {dataList} = this.props;
    return (
      <>
        {
          dataList.map((item,i)=>{
            return (
              <div className={styles.m_progressCls} key={i}>
                <div className={styles.u_name}><span className={styles.u_iconCls} style={{backgroundColor:item.color?item.color:'#52c9c2'}}>{i+1}</span>{item.name}</div>
                <Progress
                  percent={item.per}
                  strokeColor={item.color?item.color:'#52c9c2'}
                  strokeWidth={20}
                  format={percent=>percent.toFixed(2) + '%'}
                />
              </div>
            )
          })
        }
      </>
    );
  }
}
