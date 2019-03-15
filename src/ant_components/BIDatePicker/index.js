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

class BIRangePicker extends React.Component {

  render() {
    return (
      <span className='BIDatePicker'>
        <RangePicker {...this.props} />
      </span>
    );
  }
}

class BIMonthPicker extends React.Component {

  render() {
    return (
      <span className='BIDatePicker'>
        <MonthPicker {...this.props} />
      </span>
    );
  }
}

class BIWeekPicker extends React.Component {

  render() {
    return (
      <span className='BIDatePicker'>
        <WeekPicker {...this.props} />
      </span>
    );
  }
}
BIDatePicker.BIMonthPicker = BIMonthPicker;
BIDatePicker.BIRangePicker = BIRangePicker;
BIDatePicker.BIWeekPicker = BIWeekPicker;
export { BIDatePicker as default };

