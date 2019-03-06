import React from 'react';
import Select from 'antd/lib/select';
import PropTypes from 'prop-types';
import Item from 'antd/lib/list/Item';

const { Option } = Select;


class PlugSelect extends React.Component {

  constructor(props) {
    super(props);
    const value = props.value || {};
    console.log(props);
    this.state = {
      selected: value.selected || [],
    };
  }

  handleCurrencyChange = (currency) => {
    if (!('value' in this.props)) {
      this.setState({ currency });
    }
    this.triggerChange({ currency });
  };

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  };

  render() {
    const { placeholder,size, options } = this.props;
    const { selected } = this.state;
    console.log(selected);
    return (
      <span>
          <Select
            placeholder={placeholder}
            mode="multiple"
            showArrow={true}
            maxTagCount={1}
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
  showArrow:PropTypes.any,
  maxTagCount:PropTypes.any,
  value: PropTypes.any,
  onChange: PropTypes.func,
  multiple: PropTypes.bool,
  size:PropTypes.any,
};
export default PlugSelect;
