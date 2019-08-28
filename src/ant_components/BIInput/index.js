import React from 'react';
import { Input } from 'antd';
import styles from './style.less';

/*
* Input 组件
*
* 基于原 ant Input
* 只扩展自定义样式
* */

class BIInput extends React.Component {

  render() {
    return (
      <span className={styles.BIInput}>
        <Input {...this.props} />
      </span>
    );
  }
}
class TextArea extends React.Component {

  render() {
    return (
      <span className={styles.BITextArea}>
        <Input.TextArea {...this.props} />
      </span>
    );
  }
}
export default BIInput;
BIInput.TextArea = TextArea;
