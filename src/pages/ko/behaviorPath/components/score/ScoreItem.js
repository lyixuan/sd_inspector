import React from 'react';
import { Icon } from 'antd';
import styles from './style.css';

export default class ScoreItem extends React.Component {

  renderItem = (examDetailList) => {
    return examDetailList.length > 3 ? this.renderGt3(examDetailList) : this.renderLt3(examDetailList);
  };

  renderLt3 = (examDetailList) => {
    const ln = examDetailList.length;
    return (
      <div className={styles.itemContent1}>
        {ln > 0 ? <div>
          <div className={`${examDetailList[0].score < 60 ? styles.redText : ''}`}>{examDetailList[0].score}</div>
          <div>{examDetailList[0].examName}</div>
        </div> : null}
        {ln > 1 ? <div className={styles.row1Line}/> : null}
        {ln > 1 ? <div>
          <div className={`${examDetailList[1].score < 60 ? styles.redText : ''}`}>{examDetailList[1].score}</div>
          <div>{examDetailList[1].examName}</div>
        </div> : null}
        {ln > 2 ? examDetailList[2] ? <div className={styles.row1Line}/> : <div></div> : null}
        {ln > 1 ? <div>
          <div
            className={`${examDetailList[2] && examDetailList[2].score < 60 ? styles.redText : ''}`}>{examDetailList[2] && examDetailList[2].score}</div>
          <div>{examDetailList[2] && examDetailList[2].examName}</div>
        </div> : null}
      </div>
    );
  };
  renderGt3 = (examDetailList) => {
    const ln = examDetailList.length;
    const times = Math.ceil(ln / 3);
    const last1Index = (times - 1) * 3;
    const last2Index = (times - 1) * 3 + 1;
    const last3Index = (times - 1) * 3 + 2;
    const last = ln % 3;
    const middleList = ln>6?examDetailList.slice(3,examDetailList.length-last):[];
    const middleRow = middleList.length/3;
    let middleDiv = [];
    if (middleRow >= 1) {
      for (let i = 0; i < middleRow;i++){
        middleDiv.push(
          <div className={`${styles.row} ${styles.row2} ${styles.row3}`}>
            <div>
              <div
                className={`${examDetailList[3*(i+1)] && examDetailList[3*(i+1)].score < 60 ? styles.redText : ''}`}>{examDetailList[3*(i+1)] && examDetailList[3*(i+1)].score}</div>
              <div>{examDetailList[3*(i+1)] && examDetailList[3*(i+1)].examName}</div>
            </div>
            <div className={styles.row1Line}/>
            <div>
              <div
                className={`${examDetailList[3*(i+1)+1] && examDetailList[3*(i+1)+1].score < 60 ? styles.redText : ''}`}>{examDetailList[3*(i+1)+1] && examDetailList[3*(i+1)+1].score}</div>
              <div>{examDetailList[3*(i+1)+1] && examDetailList[3*(i+1)+1].examName}</div>
            </div>
            <div className={styles.row1Line}/>
            <div>
              <div
                className={`${examDetailList[3*(i+1)+2] && examDetailList[3*(i+1)+2].score < 60 ? styles.redText : ''}`}>{examDetailList[3*(i+1)+2] && examDetailList[3*(i+1)+2].score}</div>
              <div>{examDetailList[3*(i+1)+2] && examDetailList[3*(i+1)+2].examName}</div>
            </div>
          </div>
        )
      }
    }

    return (
      <div className={styles.itemContent2}>
        <div className={`${styles.row} ${styles.row1}`}>
          <div>
            <div
              className={`${examDetailList[0] && examDetailList[0].score < 60 ? styles.redText : ''}`}>{examDetailList[0] && examDetailList[0].score}</div>
            <div>{examDetailList[0] && examDetailList[0].examName}</div>
          </div>
          <div className={styles.row1Line}/>
          <div>
            <div
              className={`${examDetailList[1] && examDetailList[1].score < 60 ? styles.redText : ''}`}>{examDetailList[1] && examDetailList[1].score}</div>
            <div>{examDetailList[1] && examDetailList[1].examName}</div>
          </div>
          <div className={styles.row1Line}/>
          <div>
            <div
              className={`${examDetailList[2] && examDetailList[2].score < 60 ? styles.redText : ''}`}>{examDetailList[2] && examDetailList[2].score}</div>
            <div>{examDetailList[2] && examDetailList[2].examName}</div>
          </div>
        </div>
        {middleDiv}
        <div className={`${styles.row} ${styles.row2}`}>
          <div>
            <div
              className={`${examDetailList[last1Index] && examDetailList[last1Index].score < 60 ? styles.redText : ''}`}>{examDetailList[last1Index] && examDetailList[last1Index].score}</div>
            <div>{examDetailList[last1Index] && examDetailList[last1Index].examName}</div>
          </div>
          <div className={styles.row1Line}/>
          <div>
            <div
              className={`${examDetailList[last2Index] && examDetailList[last2Index].score < 60 ? styles.redText : ''}`}>{examDetailList[last2Index] && examDetailList[last2Index].score}</div>
            <div>{examDetailList[last2Index] && examDetailList[last2Index].examName}</div>
          </div>
          <div className={styles.row1Line}/>
          <div>
            <div
              className={`${examDetailList[last3Index] && examDetailList[last3Index].score < 60 ? styles.redText : ''}`}>{examDetailList[last3Index] && examDetailList[last3Index].score}</div>
            <div>{examDetailList[last3Index] && examDetailList[last3Index].examName}</div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { listItem = {}, index = 0, collapse = false } = this.props;
    const { examDetailList = [] } = listItem || {};
    return (
      <>
        <div className={styles.itemBar} onClick={() => this.props.clickBar(index)}>
          <div><span className={styles.titleLeft}>{listItem.examDate}</span><span
            className={styles.titleRight}>{listItem.examCount}科</span></div>
          <Icon type={collapse ? 'up' : 'down'}/>
        </div>
        {collapse ? this.renderItem(examDetailList) : null}
      </>
    );
  }
}
