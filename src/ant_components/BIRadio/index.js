import React from 'react';
import { Radio } from 'antd';
import './style.less';

/*
* Input 组件
*
* 基于原 ant Input
* 只扩展自定义样式
* */

class BIRadio extends React.Component {

  render() {
    return (
      <span className='BIRadio'>
        <Radio {...this.props}></Radio>
      </span>
    );
  }
}

export default BIRadio;
