import React from 'react';
import { connect } from 'dva';
import styles from './style'

class koPlan extends React.Component {
  render() {
    return (
      <div className={styles.style}>
        <span>{this.props.title}</span>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default koPlan;
