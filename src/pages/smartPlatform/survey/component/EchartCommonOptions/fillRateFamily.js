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
import Empty from '@/components/Empty';
import styles from './common.less'

export default class SelfProgress extends React.Component {
  chooseMaxData = () => {
    const { dataList } = this.props;
    return Math.max.apply(null, dataList.map(item => item.per));
  }
  renderPercent = (per) => {
    // const { dataList } = this.props;
    // let maxData = dataList.length > 0 ? this.chooseMaxData() : 0;
    // if (maxData === 0) {
    //   return 0
    // }
    // // 处理非100
    // if (maxData / 5 < 1) {
    //   maxData = 5;
    // } else if (maxData / 5 >= 1 && maxData / 5 < 20) {
    //   maxData = (maxData / 5 + 1) * 5;
    // }
    // return Number(per) / maxData * 100;
    return Number(per)
  }
  render() {
    const { dataList, isEmpty } = this.props;
    return (
      <>
        {isEmpty ? <span className={styles.empty}><Empty isEmpty={isEmpty} /></span> : (
          <div className={styles.progressCotainer}>
          {
            dataList.map((item, i) => {
              const color = item.color[0] ? item.color[0].color : '#52c9c2';
              return (
                <div className={styles.m_progressCls} key={i}>
                  <div className={styles.u_name}><span className={styles.u_iconCls} style={{ backgroundColor: color }}>{i + 1}</span>{item.name}</div>
                  <Progress
                    percent={this.renderPercent(item.per)}
                    strokeColor={color}
                    strokeWidth={20}
                    format={percent => percent.toFixed(2) + '%'}
                  />
                </div>
              )
          })
        }
          </div>
        )}

      </>
    );
  }
}
