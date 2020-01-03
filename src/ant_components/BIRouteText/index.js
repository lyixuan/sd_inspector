import React from 'react';
import { Button } from 'antd';
import styles from './style.less';

/*
* BIRouteText 组件
*
* 基于原 ant Button
* 只扩展自定义样式
* */

class BIRouteText extends React.Component {
  
  render() {
    let {className, children, ...others } = this.props;
    return (
      <span className={`${styles.BIRouteText} ${className}`} {...others}>
        {children}
      </span>
    );
  }
}

export default BIRouteText;
