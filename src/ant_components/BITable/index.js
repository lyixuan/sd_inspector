import React from 'react';
import { Table } from 'antd';
import './style.less';

/*
 * Table 组件
 *
 * 基于原 ant Table
 * 只扩展自定义样式
 * */

class BITable extends React.Component {
  render() {
    return (
      <div className="BITable">
        <Table {...this.props} />
      </div>
    );
  }
}

export default BITable;
