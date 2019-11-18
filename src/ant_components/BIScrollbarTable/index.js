import React from 'react';
import BITable from '@/ant_components/BITable';
import BIScrollbar from '@/ant_components/BIScrollbar';
import SmoothScrollbar from 'smooth-scrollbar';
import styles from './style.less';

/*
 * BIScrollbarTable 组件
 *
 * 基于原 ant Table
 * 只扩展自定义样式
 *  scrollBar={{ height: 1000 }}// 这两个参数必须一致
            scroll={{y: 1000}} // 这两个参数必须一致
 * */


class BIScrollbarTable extends React.Component {
  constructor(props) {
    super();
    this.state = {
      scrollbar: false,
      tableId: `BIScrollbar${new Date().getTime()}`,
    }
  }
  componentDidMount() {
    const ele = document.querySelector(`#${this.state.tableId} .ant-table-body`)
    if (ele) {
      const scrollbar = SmoothScrollbar.init(ele, this.props );
      this.setState({ scrollbar });
      ele.addEventListener('mouseenter', this.onMouseEnter);
      ele.addEventListener('mouseleave', this.onMouseLeave);
    }
  }
  componentWillUnmount() {
    if (this.scrollbar) {
        this.scrollbar.destroy();
    }
  }
  onMouseEnter = e => {
    const { scrollbar = {} } = this.state;
    const { scroll } = this.props;
    const { limit } = scrollbar;
    if (limit.x && scroll.x) {
      this.state.scrollbar.track.xAxis.show()  
    }
    if (limit.y && scroll.y) {
      this.state.scrollbar.track.yAxis.show()  
    }
  }
  onMouseLeave = e => {
    const { scrollbar = {} } = this.state;
    const { scroll } = this.props;
    const { limit } = scrollbar;
    if (limit.x && scroll.x) {
      this.state.scrollbar.track.xAxis.hide()  
    }
    if (limit.y && scroll.y) {
      this.state.scrollbar.track.yAxis.hide()  
    }
  }
  render() {
    const { components, ...props} = this.props;
    const { tableId } = this.state;
    return (
      <span className={styles.BIScrollbarTable} id={tableId}>
        <BITable
          {...props}
        />
      </span>
    );
  }
}

export default BIScrollbarTable;
