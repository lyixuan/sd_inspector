import React from 'react';
import { Pagination } from 'antd';
import './style.less';

/*
* Pagination 组件
*
* 基于原 ant Pagination
* 只扩展自定义样式
* */

class BIPagination extends React.Component {

  render() {
    return (
      <span className='BIPagination'>
        <Pagination {...this.props} />
      </span>
    );
  }
}

export default BIPagination;
