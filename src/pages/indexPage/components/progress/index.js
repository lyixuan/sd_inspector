import React from 'react';
import styles from './style.less';
class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
  }
  render() {
    const { leftNumber,data ,PkName,maxNumMyScore,isIncome} = this.props
    let isFlag = ""
    let leftProgress = ""
    let myScoreLefNum = ""
    let myScoreRightNum = ""
    if (PkName) {
      isFlag = Number(data.myScore) > Number(data.groupScore) ? 1 : Number(data.myScore) < Number(data.groupScore) ? 2 : 3
      if (data.dimensionName === "正面均分" || data.isShowPro || isIncome) {
        myScoreLefNum = Number(data.myScore)
        myScoreRightNum = Number(data.groupScore)
      }
      if (data.dimensionName === "正面均分" || data.isShowPro || isIncome) {
        leftProgress = (((leftNumber?myScoreLefNum:myScoreRightNum )/ maxNumMyScore) * 100).toFixed(2) + '%'
      }
    } else {
      myScoreLefNum = Number(data.myScore);
      myScoreRightNum = Number(data.groupScore);
      const max = myScoreLefNum > myScoreRightNum ? myScoreLefNum : myScoreRightNum
      leftProgress = (((leftNumber?myScoreLefNum:myScoreRightNum )/ max) * 100).toFixed(2) + '%'
    }
    return (
        <div className={`${styles.pkRankMain} ${leftNumber?styles.progressLeft:styles.progressRight}`} >
          <div className={`${leftNumber?styles.progressLeftDiv:styles.progressRightDiv}`}>
            {
              leftNumber?<div style={{ width: leftProgress }} className={`${styles.progress} ${isFlag === 1 ? styles.progressLeftWin : (isFlag === 2 ? styles.progressLeftLose : styles.progressLeftLose)}`}> </div>:<div style={{ width: leftProgress }} className={`${styles.rightProgress} ${isFlag === 1 ? styles.progressRightLose : (isFlag === 2 ? styles.progressRightWin : styles.progressRightWin)}`}></div>
            }
          </div>
        </div>
    );
  }
}

export default Progress;
