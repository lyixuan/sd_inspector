import React from 'react';
import Select from 'antd/lib/select';
import PropTypes from 'prop-types';
import Item from 'antd/lib/list/Item';

const { Option } = Select;


class PlugSelect extends React.Component {

  constructor(props) {
    super(props);
    const value = props.value || {};
    this.state = {
      selected1: value.selected || [],
    };
  }

  handleCurrencyChange = (currency) => {
    const selected1 = [...this.state.selected1, ...currency];
    if (!('value' in this.props)) {
      this.setState({ selected1 });
    }
    this.triggerChange({ selected1 });
  };

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    console.log(this.props);
    if (onChange) {
      onChange(changedValue);
    }
  };

  render() {
    const { placeholder, size, options } = this.props;
    const { selected } = this.state;
    return (
      <span>
        <Select
          placeholder={placeholder}
          showArrow={true}
          maxTagCount={2}
          value={selected}
          onChange={this.handleCurrencyChange}
          size={size}
        >
          {options.map(item => {
            return (
              <Option value={item.id} key={item.id}>{item.name}</Option>
            );
          })}
        </Select>
      </span>
    );
  }
}

PlugSelect.propTypes = {
  placeholder: PropTypes.any,
  mode: PropTypes.string,
  showArrow: PropTypes.any,
  maxTagCount: PropTypes.any,
  value: PropTypes.any,
  onChange: PropTypes.func,
  multiple: PropTypes.bool,
  size: PropTypes.any,
};
export default PlugSelect;
