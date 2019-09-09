import React from 'react';
import styles from './style.less'
import { thousandsFormat } from '@/utils/utils'
import pkImg from '@/assets/xdwork/pk.png';
import lose1 from '@/assets/xdwork/lose1.png';
import lose2 from '@/assets/xdwork/lose2.png';
import win from '@/assets/xdwork/win.png';
import win1 from '@/assets/xdwork/win1.png';
import win2 from '@/assets/xdwork/win2.png';


// leftNum 左侧数值, leftCollege左侧数据   rightNum右侧数值 rightCollege右侧数据
// iconed 样式不用---上方显示图标  默认左右两侧显示图标
const leftImgObj = {
  1: win1,
  2: lose1,
  3: win
};
const rightImgObj = {
  1: lose2,
  2: win2,
  3: win
};
class Proportion extends React.Component {

  proporContent = () => {
    const { leftNum, rightNum, iconed, leftCollege, rightCollege } = this.props;
    const flag = this.getFlag();
    return <div className={styles.proporContent} style={this.props.style}>
      <div className={styles.propTop}>
        {iconed ? <img src={leftImgObj[flag]}/> : <span>{leftCollege}</span> }
        <img src={pkImg} style={{ width: '32px'}}/>
        {iconed ? <img src={rightImgObj[flag]}/> : <span>{ rightCollege }</span> }
      </div>
      <div className={`${styles.progress} ${flag === 1 ? styles.lose : styles.win}`}>
        <div style={{width: `calc(${this.getPercentage()})`}} className={`${styles.left} ${flag === 1 ? styles.win : styles.lose}`}>{this.getNumber(leftNum)}</div>
        <div className={styles.right}>{this.getNumber(rightNum)}</div>
      </div>
    </div>
  }
  getPercentage = () => {
    const leftNum = Number(this.props.leftNum);
    const rightNum = Number(this.props.rightNum);
    return (leftNum / (leftNum + rightNum)) * 100 + '%';
  }
  getFlag = () => {
    const leftNum = Number(this.props.leftNum);
    const rightNum = Number(this.props.rightNum);
    let flag = 3;
    if (leftNum > rightNum) { // 大于
      flag = 1;
    }  else if (leftNum < rightNum){ // 小于
      flag = 2;
    }
    return flag;
  }
  getNumber = (n) => {
    if (this.props.iconed) {
      return '￥' + thousandsFormat(n);
    }
    return n;
  }

  render() {
    const { iconed } = this.props;
    const flag = this.getFlag();
    return (
      <>
        {
          iconed ? this.proporContent() : <div className={styles.proportion}>
            <img src={leftImgObj[flag]} style={{marginRight: '24px'}}/>
            {this.proporContent()}
            <img src={rightImgObj[flag]} style={{marginLeft: '24px'}}/>
          </div>
        }
      </>


    );
  }
}

export default Proportion;
