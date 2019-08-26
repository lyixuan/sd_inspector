import React from 'react';
import { Button } from 'antd';
import styles from './style.less';

/*
* Button 组件
*
* 基于原 ant Button
* 只扩展自定义样式
* */

class BIButton extends React.Component {
  
  render() {
    let {radiused, children, ...others } = this.props;
    if (typeof children === 'string' && children.length === 2) {
      children = ' ' + children + ' ';
    }
    return (
      <span className={`${styles.BIButton} ${radiused ? styles.BIRadius: '' }`}>
        <Button size="large" {...others} children={children}></Button>
      </span>
    );
  }
}

export default BIButton;
