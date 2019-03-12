import React from 'react';
import BIMenu from '@/ant_components/BIMenu/index';
import './style.less';

const Item = BIMenu.Item;
/*
* Menu 组件
*
* 基于原 ant Menu
* 扩展自定义样式
* */

class DxMenu extends React.Component {

  render() {
    return (
      <div className='DxMenu'>
        <BIMenu {...this.props}>
          {this.props.children}
        </BIMenu>
      </div>
    );
  }
}

export { DxMenu as default };
DxMenu.Item = Item;
