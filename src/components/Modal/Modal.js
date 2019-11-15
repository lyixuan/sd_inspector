/*
* title：字符串，弹框标题
* visible：布尔值，弹框显隐
* showModal：函数，控制弹框显隐
* modalContent：html，弹框中间内容
* clickOK点击确认按钮回调
* footButton：数组，['是'，'否']
* */
import React from 'react';
import { Modal, Input } from 'antd';
import styles from './Modal.css';
import BIButton from '@/ant_components/BIButton'

class ModalDemo extends React.Component {
  handleOk = e => {
    const { clickOK } = this.props;
    if (clickOK) {
      clickOK(e);
    }
    // this.handleCancel(false);
  };
  handleCancel = () => {
    if (this.props.showModal) {
      this.props.showModal(false);
    } else {
      console.warn('传入showModal方法');
    }
  };
  checkoutFootButton = footButton => {
    if (footButton && typeof footButton === 'object' && !Array.isArray(footButton)) {
      // 判断传入的是node
      return footButton;
    } else {
      const buttonArray = !footButton ? ['取消', '确定'] : footButton;
      if (Array.isArray(buttonArray) && buttonArray.length === 1) {
        return [
          <BIButton key={0} type="primary" onClick={this.handleOk}>查询</BIButton>
        ];
      } else if (Array.isArray(buttonArray) && buttonArray.length === 2) {
        return [
          <BIButton key={0} onClick={this.handleCancel} style={{marginRight:10}}>{buttonArray[0]}</BIButton>,
          <BIButton key={1} type="primary" onClick={this.handleOk}>{buttonArray[1]}</BIButton>
        ];
      } else {
        console.warn('传入数组');
      }
    }
  };

  render() {
    const { title, name, modalContent, footButton, visible, maskClosable } = this.props;
    const defaultModal = (
      <div>
        <p className={styles.name}> {name} </p>
        <Input className={styles.shotName} />
      </div>
    );
    return !visible ? null : (
      <div>
        <Modal
          title={title}
          maskClosable={maskClosable || false}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel.bind(this, false)}
          footer={this.checkoutFootButton(footButton)}
        >
          {!modalContent ? (
            defaultModal
          ) : (
              <div style={{ textAlign: 'center' }} className={styles.modalContent}>
                {modalContent}
              </div>
            )}
        </Modal>
      </div>
    );
  }
}

export default ModalDemo;
