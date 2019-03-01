/*
* 需要参数:
* options【Array】，需要循环的数组
* defaultValue，选择框默认展示的值
* id【string】，非必传，同一页面多次调用改组件时，区分选择框的唯一标识
* keyName【string】，非必传，默认：'name'
* value【string】，非必传，默认：'id'
* */

import React from 'react';
import Select from 'antd/lib/select';

const Option = Select.Option;
export default class SelectComponent extends React.Component {
  handleChange = (value)=> {
    const {id} = this.props;
    this.props.handleChange(value,id)
  };
  render(){
    const {options=[],defaultValue,keyName='name',value='code'} = this.props;
    return (
      <Select value={defaultValue} onChange={this.handleChange} style={{marginRight:'20px'}}>
        {
          options.length>0?options.map(item=>{
            return <Option value={item[value]} key={item[value]}>{item[keyName]}</Option>
          }):null
        }
      </Select>
    );
  }
}
