import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import styles from './style.less';
import SmallProgress from '../progress';
import examNotice from '@/assets/examNotice.png';
import examTime from '@/assets/examTime.png';
import { Tooltip } from 'antd';
import Cell from '../cell';


class TableLine extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showHover: false
    }
  }
  componentDidMount() {
    // console.log(23, this.countHoverData())
    // console.log(21, this.liContent(this.props.lineData))
  }
  countHoverData() {
    const { lineData, tHead } = this.props;
    let obj = [];
    for (let i in lineData) {
      if (typeof lineData[i] == 'object') {
        if (this.countDate(lineData[i].start, lineData[i].end) == 1) {
          obj.push({
            name: lineData[i].name,
            flag: '即将开始',
            time: `${moment(lineData[i].start).format('MM/DD')}-${moment(lineData[i].end).format('MM/DD')}`

          })
        }
        if (this.countDate(lineData[i].start, lineData[i].end) == 2) {
          obj.push({
            name: lineData[i].name,
            flag: '即将结束',
            time: `${moment(lineData[i].start).format('MM/DD')}-${moment(lineData[i].end).format('MM/DD')}`
          })
        }
      }

    }
    return obj;
  }
  // 计算开始时间和结束时间
  countDate(startDate, endDate) {
    let flag = 0
    const currentDate = moment(this.props.systemTime || new Date()).format('YYYY-MM-DD');
    const begin1 = moment(startDate).subtract(2, 'days').format('YYYY-MM-DD');
    const begin2 = moment(startDate).subtract(1, 'days').format('YYYY-MM-DD');
    const end1 = moment(endDate).subtract(1, 'days').format('YYYY-MM-DD');
    const end2 = moment(endDate).format('YYYY-MM-DD');
    if (currentDate == begin1 || currentDate == begin2) {
      // return '即将开始'
      flag = 1;
    }
    if (currentDate == end1 || currentDate == end2) {
      // return '即将结束'
      flag = 2;
    }
    return flag
  }
  tooltipText = () => {
    return <div className={styles.tooltipContent}>
      {
        this.countHoverData().length > 0 && this.countHoverData().map((item, index) => {
          return <p key={index}>{item.name}{item.flag}<img src={examTime} width="16" height="16" />{item.time}</p>
        })
      }
    </div>
  }
  liContent(lineData, hover) {
    const { tHead, systemTime, maxNum } = this.props;
    const isShowIcon = this.countHoverData().length;
    const precent = `${lineData.stuNum / maxNum * 100}%`
    // const keys = Object.keys(lineData)
    // const layout = keys.map((item, index) => {
    //   if (item === 'province') {
    //     return <li key={index} className={hover ? styles.progressCell : ''}>
    //       {
    //         isShowIcon > 0 && <Tooltip placement="top" title={this.tooltipText()}>
    //           <img className={styles.examIcon} src={examNotice} />
    //         </Tooltip>
    //       }

    //       {lineData[item]}
    //     </li>
    //   } else if (item === 'stuNum') {
    //     return <li key={index} onMouseEnter={this.mouseHover} className={styles.progressCell}><SmallProgress text={lineData[item]} isColor='green' percent='20%' style={{ width: '100%' }}></SmallProgress></li>;
    //   } else {
    //     console.log(95, lineData[item].name)
    //     return <Cell key={index} systemTime={systemTime} title={hover ? lineData[item].name : null} onMouseEnter={this.mouseHover} item={{ start: lineData[item].start, end: lineData[item].end }}></Cell>;
    //   }
    // })
    // return layout;
    return (
      <>
        <li className={`${styles.li} ${hover ? styles.progressCell : ''}`}>
          {
            isShowIcon > 0 && <Tooltip placement="top" title={this.tooltipText()}>
              <img className={styles.examIcon} src={examNotice} />
            </Tooltip>
          }
          {lineData.province}
        </li>
        <li onMouseEnter={this.mouseHover} className={styles.progressCell}><SmallProgress text={lineData.stuNum} isColor='green' percent={precent} style={{ width: '100%' }}></SmallProgress></li>
        <Cell systemTime={systemTime} title={hover ? tHead[2] : null} onMouseEnter={this.mouseHover} item={{ start: lineData.register.start, end: lineData.register.end }}></Cell>
        <Cell systemTime={systemTime} title={hover ? tHead[3] : null} onMouseEnter={this.mouseHover} item={{ start: lineData.enroll.start, end: lineData.enroll.end }}></Cell>
        <Cell systemTime={systemTime} title={hover ? tHead[4] : null} onMouseEnter={this.mouseHover} item={{ start: lineData.oldEnroll.start, end: lineData.oldEnroll.end }}></Cell>
        <Cell systemTime={systemTime} title={hover ? tHead[5] : null} onMouseEnter={this.mouseHover} item={{ start: lineData.scene.start, end: lineData.scene.end }}></Cell>
        <Cell systemTime={systemTime} title={hover ? tHead[6] : null} onMouseEnter={this.mouseHover} item={{ start: lineData.oldScene.start, end: lineData.oldScene.end }}></Cell>
        <Cell systemTime={systemTime} title={hover ? tHead[7] : null} onMouseEnter={this.mouseHover} item={{ start: lineData.practice.start, end: lineData.practice.end }}></Cell>
        <Cell systemTime={systemTime} title={hover ? tHead[8] : null} onMouseEnter={this.mouseHover} item={{ start: lineData.pay.start, end: lineData.pay.end }}></Cell>
        <Cell systemTime={systemTime} title={hover ? tHead[9] : null} onMouseEnter={this.mouseHover} item={{ start: lineData.repairEnroll.start, end: lineData.repairEnroll.end }}></Cell>
      </>
    )
  }
  mouseHover = () => {
    setTimeout(() => {
      this.setState({
        showHover: true
      })
    }, 200);

  }
  mouseOut = () => {
    setTimeout(() => {
      this.setState({
        showHover: false
      })
    }, 200);
  }

  render() {
    const { lineData } = this.props;
    return (
      <div className={`${styles.examLine} ${this.state.showHover ? styles.examLineHover : null}`} onMouseLeave={() => this.mouseOut()} >
        <ul className={styles.tbody}>
          {this.liContent(lineData)}
        </ul>
        {
          this.state.showHover && <ul className={`${styles.tbody} ${styles.hoverLine}`}>
            {this.liContent(lineData, 'hover')}
          </ul>
        }

      </div>
    );
  }
}
export default TableLine;
