/*
* 需要参数:
* options【Array】，需要循环的数组
* defaultValue，选择框默认展示的值
* id【string】，非必传，同一页面多次调用改组件时，区分选择框的唯一标识
* keyName【string】，非必传，默认：'name'
* value【string】，非必传，默认：'id'
* showName,非必传，传的话表示取的是name字段
* */

import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import BISelect from '@/ant_components/BISelect';
import DatePickerDecorator from 'antd/lib/date-picker';
import styles from './common.less'

const Option = BISelect.Option;
const { RangePicker } = DatePickerDecorator;
const dateFormat = 'YYYY-MM-DD';
@connect(({ home }) => ({
  home,
}))
 class SelectComponent extends React.Component {
  constructor(props){
    super(props);
    this.state={
      beginDate:'2018-10-23',
      endDate: '',
    };
  }
  // 时间控件可展示的时间范围
  disabledDate = current => {
    const day1 = new Date();
    day1.setTime(day1.getTime()-24*60*60*1000);
    return current < moment('2018-10-23') || current > moment(day1,dateFormat);
  };
  // 日期修改
  dateChange=(value, dateString)=> {
    this.setState({
      beginDate:dateString[0],
      endDate:dateString[1],
    });
    console.log(value)
  };
  handleChange = (value)=> {
    console.log(value)
  };
  newData = ()=>{
    const {provinceJson} = this.props.home;
    let newProvinceJson=JSON.parse(JSON.stringify(provinceJson));
    if(provinceJson){
      newProvinceJson.unshift({name:'所有省份',code:null});
    }
    return newProvinceJson
  };
  render(){
    const { beginDate, endDate} =  this.state;
    const {name=[],keyName='name',value='code'} = this.props;
    return (
       <div className={styles.m_contentWrap}>
         <span className={styles.u_titleCls}>{name}</span>
         <div className={styles.u_formCls}>
           <BISelect placeholder='报考省份' onChange={this.handleChange} style={{marginRight:'20px',width:'190px'}}>
             {
               this.newData().length>0?this.newData().map(item=>{
                 return <Option value={item[keyName]} key={item[value]}>{item[keyName]}</Option>
               }):null
             }
           </BISelect>
           <RangePicker
             style={{width:'230px'}}
             placeholder={['开始时间','结束时间']}
             onChange={this.dateChange}
             disabledDate={this.disabledDate}
             value={beginDate&&endDate?[moment(beginDate, dateFormat), moment(endDate, dateFormat)]:''}
           />
         </div>
       </div>
    );
  }
}
export default SelectComponent;
