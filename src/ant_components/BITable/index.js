import React from 'react';
import { Table } from 'antd';
import styles from './style.less';

/*
* Table 组件
*
* 基于原 ant Table
* 只扩展自定义样式
* */

class BITable extends React.Component {
  render() {
    return (
      <div className={`${styles.BITable} ${this.props.bordered ? '' : styles.BINone} ${this.props.smalled ? styles.BISmall : ''}`}>
        <Table tableLayout ="fixed" {...this.props} />
      </div>
    );
  }
}

export default BITable;
