import React from 'react';
import { Modal } from 'antd';
import './style.less';

const confirm = Modal.confirm;
/*
* Modal 组件
*
* 基于原 ant Modal
* 只扩展自定义样式
* */

class BIModal extends React.Component {

  render() {
    return (
      <span className='BIModal'>
        <Modal {...this.props} wrapClassName='BIModalWrap'>
          {this.props.children}
        </Modal>
      </span>
    );
  }
}

export { BIModal as default };
BIModal.confirm = confirm;
