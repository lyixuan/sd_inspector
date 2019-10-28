
import LoadingImg from '../../assets/workBench/loading.gif';
import React from 'react';
import styles from './style.less'

class BILoading extends React.Component {
  render() {
    const {isLoading} = this.props
    return (<div className={styles.loadingMain}>{isLoading?<img src={LoadingImg} />:this.props.children} </div>)
  }
}

export default BILoading;
