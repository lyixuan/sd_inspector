import React from 'react';
import { connect } from 'dva';
import styles from './style.less';

class qualityAppeal extends React.Component {
  render() {
    console.log(this.props);
    return <div>{this.props.children}</div>;
  }
}

export default qualityAppeal;
