import React from 'react';
import BITable from '@/ant_components/BITable';
// import BIScrollbar from '@/ant_components/BIScrollbar';
import SmoothScrollbar from 'smooth-scrollbar';
import styles from './style.less';

/*
 * BIScrollbarTable 组件
 *
 * 基于原 ant Table
 * 只扩展自定义样式
 * 
 * */


class BIScrollbarTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollbar: false,
      tableId: props.name ? props.name : `BIScrollbar${new Date().getTime()}`,
    }
  }
  componentDidMount() {
    const ele = document.querySelector(`#${this.state.tableId} .ant-table-body`);
    if (ele) {
      const scrollbar = SmoothScrollbar.init(ele, this.props );
      this.setState({ scrollbar });
      ele.addEventListener('mouseenter', this.onMouseEnter);
      ele.addEventListener('mouseleave', this.onMouseLeave);
      scrollbar.addListener(this.handleScroll.bind(this));
    }
  }
  componentWillUnmount() {
    if (this.scrollbar) {
        this.scrollbar.destroy();
    }
  }
  componentDidUpdate() {
    const { scrollbar } = this.state;
    scrollbar && scrollbar.update();
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
  handleScroll(status) {
    const { onScrollProps } = this.props;
    if (onScrollProps && typeof onScrollProps === 'function') {
      onScrollProps(status, this.scrollbar);
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
