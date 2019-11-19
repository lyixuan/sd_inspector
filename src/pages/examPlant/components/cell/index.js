import React from 'react';
import moment from 'moment';
import styles from './style.less'
class Cell extends React.Component {
  componentDidMount() {
    this.countColor();
  }
  countColor = () => {
    const { start, end } = this.props.item;
    const currentDate = moment(this.props.systemTime || new Date());
    let style = 'default';
    // 未开始：当前时间<开始时间时
    // 已结束：当前时间>结束时间时
    // 进行中：当前时间>=开始时间且当前时间<=结束时间时
    if (!start || !end) {
      return style;
    }
    if (currentDate.isBefore(start)) {
      //未开始
      style = 'unBegin'
    } else if (currentDate.isAfter(end) && !currentDate.isSame(end, 'day')) {
      //已结束
      style = 'end'
    } else if ((currentDate.isAfter(start, 'day') || currentDate.isSame(start, 'day')) && (currentDate.isBefore(end, 'day') || currentDate.isSame(start, 'day'))) {
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
            <li onMouseEnter={this.props.onMouseEnter} className={`${styles.liStyle}`}><span>{title}</span><span className={`${styles.cell} ${styles[this.countColor()]}`}>{item.start ? moment(item.start).format('MM/DD') : ''}~{item.end ? moment(item.end).format('MM/DD') : ''}</span></li>
            :
            <li onMouseEnter={this.props.onMouseEnter} className={`${styles.liStyle} ${styles[this.countColor()]}`}>{item.start ? moment(item.start).format('MM/DD') : ''}~{item.end ? moment(item.end).format('MM/DD') : ''}</li>
        }
      </>

    )
  }
}
export default Cell;
