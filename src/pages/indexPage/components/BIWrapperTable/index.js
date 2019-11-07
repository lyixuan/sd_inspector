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
  constructor(props) {
    super();
    this.state = {
      scrollWidth: 0,
      tableHeight: 0
    }
  }
  componentDidMount() {

    if (this.props.name) {
      this.countWidth();
      this.onMouseLeave();
    }
  }
  countWidth = () => {
    const tableWidth = document.querySelector(`#${this.props.name} .ant-table-body`).offsetWidth;
    this.setState({
      tableWidth: tableWidth,
    });
  };
  onMouseEnter = () => {
    const dom = document.querySelector(`#${this.props.name} .ant-table-body`);
    const dom2 = document.querySelector(`#${this.props.name} .ant-table-header`);
    if (dom) {
      dom.style.overflowY = 'scroll'
      dom.style.overflowX = 'auto'
    }
    if (dom2) {
      dom2.style.overflowY = 'scroll'
    }
  };
  onMouseLeave = () => {
    const dom = document.querySelector(`#${this.props.name} .ant-table-body`);
    const dom2 = document.querySelector(`#${this.props.name} .ant-table-header`);
    console.log(dom2, 'dom');
    if (dom) {
      dom.style.overflow = 'hidden'
      dom.style.overflowX = 'hidden'

    }
    if (dom2) {
      dom2.style.overflowY = 'hidden'
    }
  };
  render() {
    return (
      <div
        id={this.props.name}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        style={{ minWidth: this.state.tableWidth + 'px' }}
        className={`${styles.BIWrapperTable} ${this.props.isEditTd ? styles.BIWrapperTable4 : ''}`}
      >
        <Table {...this.props} />
      </div>
    );
  }
}

export default BIWrapperTable;
