import React from 'react';
import styles from './style.less';

/*
* Input 组件
*
* 基于原 ant Input
* 只扩展自定义样式
* */

class BIContent extends React.Component {

  render() {
    return (
      <div className={styles.BIContent}>
        {this.props.head}
        <div className={styles.content}>
          {this.props.children}
        </div> 
      </div>
    );
  }
}

export default BIContent;
