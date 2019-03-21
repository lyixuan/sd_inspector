import React from 'react';
import { Dropdown } from 'antd';
import './style.less';

/*
* Dropdown 组件
*
* 基于原 ant Dropdown
* 只扩展自定义样式
* */

class BIDropdown extends React.Component {

  render() {
    return (
      <span className='BIDropdown'>
        <Dropdown {...this.props}>
          {this.props.children}
        </Dropdown>
      </span>
    );
  }
}

export { BIDropdown as default };
