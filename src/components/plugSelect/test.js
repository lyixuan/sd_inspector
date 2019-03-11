import React from 'react';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import SelfSelected from './index';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [{ id: '', name: '全部' }, { id: '1', name: 'name1' }, { id: '2', name: 'name2' }, {
        id: '3',
        name: 'name3',
      }],
      selected1: ['1'],
      selected2: ['2'],
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  checkPrice = (rule, value, callback) => {
    if (value.number > 0) {
      callback();
      return;
    }
    callback('Price must greater than zero!');
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { options, selected1, selected2 } = this.state;

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item label="selected1">
          {getFieldDecorator('selected1', {
            initialValue: selected1,
          })(<SelfSelected options={options}/>)}
        </Form.Item>
        <Form.Item label="selected2">
          {getFieldDecorator('selected2', {
            initialValue: selected2,
          })(<SelfSelected options={options}/>)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: 'horizontal_login' })(Demo);
