import React from 'react';
import { Table } from 'antd';
import styles from './style.less';

/*
 * Table 组件
 *
 * 基于原 ant Table
 * 只扩展自定义样式
 * 主要用于统一的table表头颜色样式大小，统一的滚动条效果。其他功能自行在自己组件扩展
 * */

//  ****** 公共组件 不要 随意修改 ******

class BIWrapperTable extends React.Component {
  render() {
    return (
      <div className={styles.BIWrapperTable} >
        <Table  {...this.props} />
      </div>
    );
  }
}

export default BIWrapperTable;
