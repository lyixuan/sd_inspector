import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import styles from './style.less';
import SmallProgress from '../progress';
import examNotice from '@/assets/examNotice.png';
import examTime from '@/assets/examTime.png';
import { Tooltip } from 'antd';
import Cell from '../cell';

@connect((xdWorkModal) => ({
  xdWorkModal,
}))

class TableLine extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showHover: false
    }
  }
  componentDidMount() {
    console.log(23, this.countHoverData())
  }
  countHoverData() {
    const { lineData, tHead } = this.props;
    let obj = {};

    if (this.countDate(lineData.registerBegindate, lineData.registerEnddate) == 1) {
      obj.register = {
        name: tHead[2],
        flag: '即将开始',
        time: `${lineData.registerBegindate}-${lineData.registerEnddate}`
      }
    }


    if (this.countDate(lineData.registerBegindate, lineData.registerEnddate) == 2) {
      obj.register = {
        name: tHead[2],
        flag: '即将结束',
        time: `${lineData.registerBegindate}-${lineData.registerEnddate}`
      }
    }
    return obj;


    // if (this.countDate(lineData.registerBegindate, lineData.registerEnddate) == 1) {
    //   obj.register = {
    //     name: tHead[2],
    //     flag: '即将开始',
    //     time: `${lineData.registerBegindate}-${lineData.registerEnddate}`
    //   }
    // }
    // if (this.countDate(lineData.registerBegindate, lineData.registerEnddate) == 2) {
    //   obj.register = {
    //     name: tHead[2],
    //     flag: '即将结束',
    //     time: `${lineData.registerBegindate}-${lineData.registerEnddate}`
    //   }
    // }

  }
  // 计算开始时间和结束时间
  countDate(startDate, endDate) {
    let flag = 0
    const currentDate = moment(new Date()).format('YYYY-MM-DD');
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
      <p>新生确认即将结束<img src={examTime} width="16" height="16" />12/14-02/20</p>
      <p>新生确认即将结束<img src={examTime} width="16" height="16" />12/14-02/20</p>
    </div>
  }
  liContent(lineData, hover) {
    const { tHead } = this.props;
    return (
      <>
        <li className={hover ? styles.progressCell : ''}>
          <Tooltip placement="top" title={this.tooltipText()}>
            <img className={styles.examIcon} src={examNotice} />
          </Tooltip>
          {lineData.province}
        </li>
        <li onMouseEnter={this.mouseHover} className={styles.progressCell}><SmallProgress text={lineData.stuNum} isColor='green' percent='20%' style={{ width: '100%' }}></SmallProgress></li>
        <Cell title={hover ? tHead[2] : null} onMouseEnter={this.mouseHover} item={{ start: lineData.registerBegindate, end: lineData.registerEnddate }}></Cell>
        <Cell title={hover ? tHead[3] : null} onMouseEnter={this.mouseHover} item={{ start: lineData.enrollBegindate, end: lineData.enrollEnddate }}></Cell>
        <Cell title={hover ? tHead[4] : null} onMouseEnter={this.mouseHover} item={{ start: lineData.oldEnrollBegindate, end: lineData.oldEnrollEnddate }}></Cell>
        <Cell title={hover ? tHead[5] : null} onMouseEnter={this.mouseHover} item={{ start: lineData.sceneBegindate, end: lineData.sceneEnddate }}></Cell>
        <Cell title={hover ? tHead[6] : null} onMouseEnter={this.mouseHover} item={{ start: lineData.oldSceneBegindate, end: lineData.oldSceneBegindate }}></Cell>
        <Cell title={hover ? tHead[7] : null} onMouseEnter={this.mouseHover} item={{ start: lineData.practiceEnrollBegindate, end: lineData.practiceEnrollEnddate }}></Cell>
        <Cell title={hover ? tHead[8] : null} onMouseEnter={this.mouseHover} item={{ start: lineData.payBegindate, end: lineData.payEnddate }}></Cell>
        <Cell title={hover ? tHead[9] : null} onMouseEnter={this.mouseHover} item={{ start: lineData.repairEnrollBegindate, end: lineData.repairEnrollEnddate }}></Cell>
      </>
    )
  }
  mouseHover = () => {
    this.setState({
      showHover: true
    })
  }
  mouseOut = () => {
    this.setState({
      showHover: false
    })
  }

  render() {
    const { lineData } = this.props;
    return (
      <div className={styles.examLine} onMouseLeave={() => this.mouseOut()}>
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
