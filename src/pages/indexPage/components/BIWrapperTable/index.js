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
      isEnter:false
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
    // const dom = document.querySelector(`#wb-table`);
    // // const dom2 = document.querySelector(`#${this.props.name} .ant-table-header`);
    // dom.classList.add('scorll-enter');
    this.setState({
      isEnter:true
    })
  };
  onMouseLeave = () => {
    // const dom = document.querySelector(`#wb-table`);
    // // const dom2 = document.querySelector(`#${this.props.name} .ant-table-header`);
    // dom.setAttribute("class", "scorll-leave")
    this.setState({
      isEnter:false
    })
  };
  render() {
    return (
      <div
        id={this.props.name}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        style={{ minHeight: this.props.xScroll ? this.state.tableHeight + 'px' : '' }}
        className={`${styles.BIWrapperTable} ${this.props.isEditTd ? styles.BIWrapperTable4 : ''} ${this.state.isEnter?'scorll-enter':'scorll-leave'}`}
      >
          <Table  {...this.props} />
      </div>
    );
  }
}

export default BIWrapperTable;
