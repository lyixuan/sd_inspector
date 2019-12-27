import React from 'react';
import { Tooltip } from 'antd';
import styles from './style.less'

/*
* BIContainer 容器组件
*
* 自定义组件样式
* params *
* style-外层样式
* right-右侧数据
* headStyle-head样式
* propStyle-body样式
*
* 用法
* <BIContainer propStyle={{width: '100px'}} right={<span>BIContainer</span>}>BIContainer</BIContainer>
* */

class BIContainer extends React.Component {
  render() {
    const { headStyle = {}, propStyle = {}, title, right} = this.props;
    return (
      <div className={styles.container} style={this.props.style}>
        <div className={styles.head} style={headStyle}>
          <span className={styles.title}>{title}</span>
          <div>{right}</div>
        </div>
        <div className={styles.content} style={propStyle}>{this.props.children}</div>
      </div>
    );
  }
}

export default BIContainer;
