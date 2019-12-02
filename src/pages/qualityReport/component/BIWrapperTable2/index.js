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
    super(props);
    this.state = {
      scrollWidth: 0,
      tableHeight: 0,
    }
  }
  componentDidMount() {
    if (this.props.name) {
      this.countWidth();//计算表格滚动区域的宽度
      this.countHeight()//计算表格高度
      this.onMouseLeave();
      const dom = document.getElementById(this.props.name).querySelector('.ant-table-body');
      dom.style.overflowY = 'scroll';
      window.addEventListener('resize', this.debounce(this.countWidth, 300));
    }
  }
  componentWillUnmount() {
    if (this.props.name) {
      window.removeEventListener('resize', this.countWidth);
    }
  }
  debounce(func, wait) {
    let timeout;
    return () => {
      let args = arguments;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args)
      }, wait);
    }
  }
  countWidth = () => {
    const tableWidth = document.querySelector(`#${this.props.name} .ant-table-body`).offsetWidth;
    let scrollWidth1 = this.props && this.props.columns.reduce(function (prev, curr, idx, arr) {
      return prev.width ? prev.width : prev + curr.width;
    })
    this.setState({
      scrollWidth: Math.floor(tableWidth - scrollWidth1)
    })
  }
  countHeight = () => {
    const tableHeight = document.querySelector(`#${this.props.name} .ant-table-body`).offsetHeight;
    this.setState({
      tableHeight: tableHeight
    })
  }
  onMouseEnter = () => {
    const dom = document.getElementById(this.props.name).querySelector('.ant-table-body');
    dom.style.overflowY = 'scroll';
  }
  onMouseLeave = () => {
    const dom = document.getElementById(this.props.name).querySelector('.ant-table-body');
    dom.style.overflowY = 'hidden';
  }
  render() {
    return (
      <div
        id={this.props.name}
        // onMouseEnter={this.onMouseEnter}
        // onMouseLeave={this.onMouseLeave}
        // style={{ minHeight: this.props.xScroll ? this.props.xScroll + 'px' : '' }}
        className={`${styles.BIWrapperTable} 'scorll-enter'`}
      >
          <Table  {...this.props} />
      </div>
    );
  }
}

export default BIWrapperTable;
