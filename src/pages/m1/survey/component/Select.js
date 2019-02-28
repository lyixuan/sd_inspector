import React from 'react';
import Select from 'antd/lib/select';

const Option = Select.Option;
export default class SelectComponent extends React.Component {
  handleChange = (value)=> {
    const {id} = this.props;
    this.props.handleChange(value,id)
  };
  render(){
    const {options,defaultValue} = this.props;
    return (
      <Select value={defaultValue} onChange={this.handleChange} style={{marginRight:'20px'}}>
        {
          options.map(item=>{
            return <Option value={item.id} key={item.id}>{item.name}</Option>
          })
        }
      </Select>
    );
  }
}
