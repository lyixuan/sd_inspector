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
    // if (this.props.name) {
    //   this.countHeight(); //计算表格高度
    // }
    // window.addEventListener('resize', this.debounce(this.countWidth, 300));
  }
  componentWillUnmount() {
    // window.removeEventListener('resize', this.countWidth);
  }

  // debounce(func, wait) {
  //   let timeout;
  //   return () => {
  //     let args = arguments;
  //     if (timeout) clearTimeout(timeout);
  //     timeout = setTimeout(() => {
  //       func.apply(this, args);
  //     }, wait);
  //   };
  // }

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
    const tableHeight =
      document.getElementById(this.props.name) &&
      document.getElementById(this.props.name).offsetHeight;
    this.setState({
      tableHeight: tableHeight,
    });
  };
  // onMouseEnter = () => {
  //   const dom = document.getElementById(this.props.name).querySelector('.ant-table-body');
  //   dom.style.overflowX = 'scroll';
  // };
  // onMouseLeave = () => {
  //   console.log(1);
  //   const dom = document.getElementById(this.props.name).querySelector('.ant-table-body');
  //   console.log(dom, 'dom');
  //   dom.style.overflowX = 'hidden';
  // };
  render() {
    return (
      <div
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
