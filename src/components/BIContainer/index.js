import React from 'react';
import styles from './style.less'

/*
* BIContainer 容器组件
*
* 自定义组件样式
* params *
* style-外层样式
* right-右侧数据
* propStyle-body样式
*
* 用法
* <BIContainer propStyle={{width: '100px'}} right={<span>BIContainer</span>}>BIContainer</BIContainer>
* */

class BIContainer extends React.Component {
  render() {
    return (
      <div className={styles.container} style={this.props.style}>
        {
          this.props.head !== 'none' ? <div className={styles.head}>
            <span className={styles.title}>{this.props.title}</span>
            <div>{this.props.right}</div>
          </div> : null
        }
        <div className={styles.content} style={this.props.propStyle}>{this.props.children}</div>
      </div>
    );
  }
}

export default BIContainer;
