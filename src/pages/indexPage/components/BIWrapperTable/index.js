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
      // scrollWidth: 0,
      tableWidth: 0,
    };
  }
  componentDidMount() {
    // this.countWidth(); //计算表格滚动区域的宽度
    if (this.props.name) {
      this.countHeight(); //计算表格高度
      this.onMouseLeave();
    }
    // window.addEventListener('resize', this.debounce(this.countWidth, 300));
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.countWidth);
  }

  debounce(func, wait) {
    let timeout;
    return () => {
      let args = arguments;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    };
  }

  // countWidth = () => {
  //   const tableWidth =
  //     document.getElementById('tableWrap') && document.getElementById('tableWrap').offsetWidth;
  //   let scrollWidth1 =
  //     this.props &&
  //     this.props.columns.reduce(function(prev, curr, idx, arr) {
  //       return prev.width ? prev.width : prev + curr.width;
  //     });
  //   this.setState({
  //     scrollWidth: Math.floor(tableWidth - scrollWidth1),
  //   });
  // };
  countHeight = () => {
    const tableWidth = document.querySelector(`#${this.props.name} .ant-table-body`).offsetWidth;
    console.log(56, tableWidth)
    this.setState({
      tableWidth: tableWidth,
    });
  };
  onMouseEnter = () => {
    console.log(63, document.querySelector(`#${this.props.name} .ant-table-body`))
    const dom = document.querySelector(`#${this.props.name} .ant-table-body`);
    const dom2 = document.querySelector(`#${this.props.name} .ant-table-header`);
    if (dom) {
      dom.style.overflow = 'scroll!important'
      dom2.style.overflowY = 'scroll!important'
    }
  };
  onMouseLeave = () => {
    console.log(1);
    const dom = document.querySelector(`#${this.props.name} .ant-table-body`);
    const dom2 = document.querySelector(`#${this.props.name} .ant-table-header`);
    console.log(dom2, 'dom');
    if (dom) {
      dom.style.overflow = 'hidden!important'
      dom2.style.overflowY = 'hidden!important'
    }
  };
  render() {
    return (
      <div
        styles={{ minWidth: this.state.tableWidth }}
        id={this.props.name}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        className={`${styles.BIWrapperTable} ${this.props.isEditTd ? styles.BIWrapperTable4 : ''}`}
      >
        <Table {...this.props} />
      </div>
    );
  }
}

export default BIWrapperTable;
