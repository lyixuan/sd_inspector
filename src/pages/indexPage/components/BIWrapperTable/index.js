import React from 'react';
import { Table } from 'antd';
import styles from './style.less';

/*
* Table 组件
*
* 基于原 ant Table
* 只扩展自定义样式
* */

class BIWrapperTable extends React.Component {
  render() {
    return (
      <div className={this.props.isEditTd?styles.BIWrapperTable4:styles.BIWrapperTable}>
        <Table {...this.props} />
      </div>
    );
  }
}

export default BIWrapperTable;
