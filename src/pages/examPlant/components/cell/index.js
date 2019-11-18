import React from 'react';
import moment from 'moment';
import styles from './style.less'
class Cell extends React.Component {

  componentDidMount() {
    // console.log(17, moment(new Date()).format('MM/DD'))
    this.countColor();
  }
  // onMouseEnter()=>{

  // }
  countColor = () => {
    const { start, end } = this.props.item;
    const currentDate = moment(new Date());
    let style = 'default';
    // currentDate.isBefore(start) 未开始：当前时间<开始时间时
    // currentDate.isAfter(end) 已结束：当前时间>结束时间时
    // currentDate.isAfter(start) && currentDate.isBefore(end) 进行中：当前时间>=开始时间且当前时间<=结束时间时

    if (currentDate.isBefore(start)) {
      //未开始
      style = 'unBegin'
    } else if (currentDate.isAfter(end)) {
      //已结束
      style = 'end'
    } else if ((currentDate.isAfter(start) || currentDate.isSame(start)) && (currentDate.isBefore(end) || currentDate.isSame(start))) {
      console.log(300)
      style = 'ing'
    }
    return style;

  }
  render() {
    const { item, title } = this.props
    return (
      <>
        {
          title ?
            <li className={`${styles.liStyle}`}><span>{title}</span><span className={`${styles.cell} ${styles[this.countColor()]}`}>{moment(item.start).format('MM/DD')}~{moment(item.end).format('MM/DD')}</span></li>
            :
            <li onMouseEnter={this.props.onMouseEnter} className={`${styles.liStyle} ${styles[this.countColor()]}`}>{moment(item.start).format('MM/DD')}~{moment(item.end).format('MM/DD')}</li>
        }
      </>

    )
  }
}
export default Cell;
