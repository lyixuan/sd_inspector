import React from 'react';
import styles from './style.less'

class Container extends React.Component {
  render() {
    return (
      <div className={styles.container} style={this.props.style}>
        <div className={styles.head}>
          <span className={styles.title}>{this.props.title}</span>
          <div>{this.props.right}</div>
        </div>
        <div className={styles.content} style={this.props.propStyle}>{this.props.children}</div>
      </div>
    );
  }
}

export default Container;