import React from 'react';
import { Carousel } from 'antd';
import './style.less';
/*
 * 扩展为数字翻页的走马灯
 * */
class BICarousel extends React.Component {
  render() {
    return (
      <span className="BICarousel">
        <Carousel {...this.props}>{this.props.children}</Carousel>
      </span>
    );
  }
}

export default BICarousel;
