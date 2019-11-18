import React from 'react';
import { Table } from 'antd';
import styles from './style.less';
import Scrollbar from 'react-smooth-scrollbar';

/*
 * Table 组件
 *
 * 基于原 ant Table
 * 只扩展自定义样式
 * */

class BIScrollbar extends React.Component {
  constructor(props) {
    super();
    this.state = {
      scrollbar: false
    }
  }
  componentDidMount() {
    const { scrollbar } = this.$container;
    this.setState({ scrollbar })  
  }
  onMouseEnter = e => {
    const { onMouseEnter } = this.props;
    const { scrollbar = {} } = this.state;
    const { limit } = scrollbar;
    if (onMouseEnter && typeof onMouseEnter === 'function') {
      onMouseEnter(e)
    }
    if (limit.x) {
      this.state.scrollbar.track.xAxis.show()  
    }
    if (limit.y) {
      this.state.scrollbar.track.yAxis.show()  
    }
  }
  render() {
    return (
      <Scrollbar
        ref={c => this.$container = c}
        style={{ minHeight: 320 }}
        onMouseEnter={(e) => this.onMouseEnter(e)}
        {...this.props}
      />
    );
  }
}

export default BIScrollbar;
