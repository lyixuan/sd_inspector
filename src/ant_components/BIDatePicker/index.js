import React from 'react';
import { DatePicker } from 'antd';
import './style.less';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
/*
* DatePicker 组件
*
* 基于原 ant DatePicker
* 只扩展自定义样式
* */

class BIDatePicker extends React.Component {

  render() {
    return (
      <span className='BIDatePicker'>
        <DatePicker {...this.props} />
      </span>
    );
  }
}

export { BIDatePicker as default };
BIDatePicker.MonthPicker = MonthPicker;
BIDatePicker.RangePicker = RangePicker;
BIDatePicker.WeekPicker = WeekPicker;
