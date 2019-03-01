import React, { Component } from 'react';
import Form from 'antd/lib/form';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Select from 'antd/lib/select';
import Button from 'antd/lib/button';
import DatePicker from 'antd/lib/date-picker';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state={
      dateRange: null,
      collegeId: null,
    }
  }

  UNSAFE_componentWillMount() {
  }

  // 表单重置
  handleReset = () => {
  };

  // 搜索数据整理
  submitSearch = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
      }
    });
  };

  render() {
    const formLayout = 'inline';
    const options=[{name:'报考省份',id:1},{name:'jucy2',id:2},{name:'jucy3',id:3},];
    const options1=[{name:'学院',id:1},{name:'学院1',id:2},{name:'学院2',id:3},];
    const options2=[{name:'家族',id:1},{name:'家族1',id:2},{name:'家族2',id:3},];
    const WrappedAdvancedSearchForm = Form.create()(props => {
      const { getFieldDecorator } = props.form;
      return (
        <div>
          <Select options={options} defaultValue='报考省份' />
          <Select options={options1} defaultValue='学院' />
          <Select options={options2} defaultValue='家族' />
          <RangePicker
            allowClear={false}
            defaultPickerValue={[this.startT, this.endT]}
          />
        </div>
        // <Form layout={formLayout}>
        // </Form>
      );});
    return (<WrappedAdvancedSearchForm />)
  }
}

export default SearchForm;

