import React from 'react';
import styles from './style.less'

class Container extends React.Component {
  render() {
    console.log(6, this.props)
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

export default Container;
