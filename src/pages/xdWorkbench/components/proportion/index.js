import React from 'react';
import styles from './style.less'
import pkImg from '@/assets/xdwork/pk.png'
import { callbackify } from 'util';

const leftNum = 200;
const rightNum = 500; 
class Proportion extends React.Component {
  getPercentage = () => {
    return (leftNum / (leftNum + rightNum)) * 100 + '%';
  }
  render() {
    const { leftNum, rightNum } = this.props;
    const flag = leftNum > rightNum;  // 判断大小
    return (
      <div className={styles.proportion} style={this.props.style}>
        <div className={styles.propTop}>
          <img src={flag ? pkImg : ''}/>
          <img src={pkImg}/>
          <img src={flag ? pkImg : ''}/>
        </div>
        <div className={`${styles.progress} ${flag ? styles.lose : styles.win}`}>
          <div style={{width: `calc(${this.getPercentage()})`}} className={`${styles.left} ${flag ? styles.win : styles.lose}`}>{leftNum}</div>
          <div className={styles.right}>{rightNum}</div>
        </div>
      </div>
    );
  }
}

export default Proportion;
