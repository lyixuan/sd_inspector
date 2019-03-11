import React from 'react';
import Select from 'antd/lib/select';
import PropTypes from 'prop-types';

const { Option } = Select;
const AllKey = 'all';

/*
* 自定义带全选的多选组件
*  options：多选项 List<Objects>  key:id  label:name eg:[{id:1,name:''}]
*  selecteds: 传入选中项 List<Number||Sting>
*  onProChange: 外层回调，参数1：处理后带label的选中值 eg:[{key:1,label:''}]
*  allName: 全部选项名称
* */

function matchLabel(keys,options) {
  // 根据keys，返回{key:key,label:label}键值对数组
  const result = [];
  let ol = options.length;
  const kl = keys.length;
  keys.forEach((v)=>{
    options.forEach((v1)=>{
      if (v === v1.id) {
        result.push({key:v,label:v1.name})
      }
      if (v === AllKey) {
        ol += 1;
      }
    });
  });
  if(ol === kl) {
    result.unshift({key:AllKey,label:AllKey});
  }
  return result;
}

function selectAll(options) {
  // 触发全选
  const result = [];
  options.forEach((v)=>{
    result.push({key:v.id,label:v.name});
  });
  result.unshift({key:AllKey,label:AllKey});
  return result;
}

class MultipleSelect extends React.Component {

  constructor(props) {
    super(props);
    this.AllTouchFlag = 0;  // all选项触发标记
  }

  handleSelect = (currency) => {
    if (currency === AllKey) {
      this.AllTouchFlag = 1;
      const selected = selectAll(this.props.options);
      this.props.onProChange(selected);
    }
  };

  handleDeselect = (currency) => {
    if (currency === AllKey) {
      this.AllTouchFlag = 1;
      const selected = [];
      this.props.onProChange(selected);
    }
  };

  handleCurrencyChange = (currency) => {
    if (!this.AllTouchFlag) {
      const selected = matchLabel(currency,this.props.options);
      this.props.onProChange(selected);
    }
    this.AllTouchFlag = 0;
  };

  render() {
    const { options, allName, selecteds } = this.props;
    return (
      <span>
        <Select
          {...this.props}
          mode="multiple"
          showArrow={true}
          value={selecteds}
          onChange={this.handleCurrencyChange}
          onSelect={this.handleSelect}
          onDeselect={this.handleDeselect}
        >
          <Option key={AllKey}>{allName}</Option>
          {options.map(item => {
            return (
              <Option key={item.id}>{item.name}</Option>
            );
          })}
        </Select>
      </span>
    );
  }
}

MultipleSelect.propTypes = {
};
export default MultipleSelect;
