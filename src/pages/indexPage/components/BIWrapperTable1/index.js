import React from 'react';
import { Table } from 'antd';
import styles from './style.less';

/*
 * Table 组件
 *
 * 基于原 ant Table
 * 只扩展自定义样式
 * */

class BIWrapperTable1 extends React.Component {
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
    const tableHeight = document.querySelector(`#${this.props.name} .ant-table-body`).offsetHeight + 52;
    this.setState({
      tableWidth: tableWidth,
      tableHeight: tableHeight
    });
  };
  onMouseEnter = () => {
    const dom = document.querySelector(`#${this.props.name} .ant-table-body`);
    const dom2 = document.querySelector(`#${this.props.name} .ant-table-header`);
    if (dom) {
      dom.style.overflowY = 'auto'
      dom.style.overflowX = 'auto'
    }
    if (dom2) {
      dom2.style.overflowY = 'auto'
      dom2.style.overflowX = 'hidden'
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
      dom2.style.overflowX = 'hidden'
    }
  };
  render() {
    return (
      <div
        id={this.props.name}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        style={{ minHeight: this.props.xScroll ? this.state.tableHeight + 'px' : '' }}
        className={`${styles.BIWrapperTable} ${this.props.isEditTd ? styles.BIWrapperTable4 : ''}`}
      >
        <Table {...this.props} />
      </div>
    );
  }
}

export default BIWrapperTable1;
