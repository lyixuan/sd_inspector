import React from 'react';
import Select from 'antd/lib/select';
import PropTypes from 'prop-types';

const { Option } = Select;

/*
* 自定义带全选的多选组件
*  options：多选项 List<Objects>  key:id  label:name eg:[{id:1,name:''}]
*  selecteds: 传入选中项 List<Number||Sting>
*  onProChange: 外层回调，参数1：处理后带label的选中值 eg:[{key:1,label:''}]
* */

function matchLabel(key,options) {
  // 根据keys，返回{key:key,label:label}键值对数组
  const result = [];
  options.forEach((v1)=>{
    if (key === v1.id) {
      result.push({key:key,label:v1.name})
    }
  });
  return result;
}

class MultipleSelect extends React.Component {

  constructor(props) {
    super(props);
  }

  handleCurrencyChange = (currency) => {
    const selected = matchLabel(currency,this.props.options);
    this.props.onProChange(selected);
  };

  render() {
    const { options, selecteds } = this.props;
    return (
      <span>
        <Select
          {...this.props}
          value={selecteds}
          onChange={this.handleCurrencyChange}
        >
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
