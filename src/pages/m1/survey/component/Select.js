import React from 'react';
import Select from 'antd/lib/select';

const Option = Select.Option;
export default class SelectComponent extends React.Component {

  handleChange = (value)=> {
    console.log(`selected ${value}`);
  };
  render(){
    const {options,defaultValue,style} = this.props;
    return (
      <Select defaultValue={defaultValue} onChange={this.handleChange} style={{...style}}>
        {
          options.map(item=>{
            return <Option value={item.id} key={item.id}>{item.name}</Option>
          })
        }
      </Select>
    );
  }
}
