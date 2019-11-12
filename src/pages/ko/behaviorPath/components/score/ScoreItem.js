import React from 'react';
import { Icon } from 'antd';
import styles from './style.css';

export default class ScoreItem extends React.Component {
  render() {
    const { listItem = {},index=0,collapse=false}  = this.props;

    return (
      <>
        <div className={styles.itemBar} onClick={()=>this.props.clickBar(index)}>
          <div><span className={styles.titleLeft}>{listItem.examDate}</span><span className={styles.titleRight}>{listItem.examCount}科</span></div><Icon type={collapse ? 'up' : 'down'} />
        </div>
        {collapse?<div className={styles.itemContent}>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </div>:null}
      </>
    );
  }
}
