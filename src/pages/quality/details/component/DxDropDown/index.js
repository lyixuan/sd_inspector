import React from 'react';
import BIDropDown from '@/ant_components/BIDropDown/index';
import './style.less';

/*
* Dropdown 自定义组件
*
* 基于原 ant Dropdown
* 扩展自定义样式
* 扩展了选择、编辑、删除功能
* */

class DxDropdown extends React.Component {

  render() {
    return (
      <span className='DxDropdown'>
        <BIDropDown {...this.props}>
        </BIDropDown>
      </span>
    );
  }
}

export { DxDropdown as default };
