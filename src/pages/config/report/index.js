import React from 'react';
import {
  Form,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Button,
  AutoComplete,
  Spin,
  message,
} from 'antd';
import BIModal from '@/ant_components/BIModal';
import { connect } from 'dva';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BIButton from '@/ant_components/BIButton';
import BISelect from '@/ant_components/BISelect';
import style from './style.less';
import moment from 'moment';
import { Input, Checkbox } from 'antd/lib/index';
const confirm = BIModal.confirm;
const { BIRangePicker } = BIDatePicker;

const { Option } = BISelect;

@connect(report => ({
  report,
}))
class Report extends React.Component {
  state = {
    disabled: true,
    beginDate: null,
    endDate: null,
  };

  componentDidMount() {
    this.checkMail();
    this.getIgnoreUser();
  }

  getIgnoreUser() {
    this.props
      .dispatch({
        type: 'report/getIgnoreUser',
      })
      .then(res => {
        this.props.form.setFieldsValue({
          ignoreUsers: res,
        });
      });
  }
  checkMail = () => {
    this.props
      .dispatch({
        type: 'report/checkMail',
      })
      .then(res => {
        this.setState({ disabled: res });
      });
  };

  handleSubmit = e => {
    let { beginDate, endDate } = this.state;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      // if (!err) {
      //   console.log('Received values of form: ', values);
      // }
      const time = values.time;
      values.beginDate = moment(time[0]).format('x');
      values.endDate = moment(time[1]).format('x');
      if (endDate - beginDate > 2 * 30 * 24 * 60 * 60 * 1000) {
        message.error('日期范围不能超过 60天');
        return;
      }
      delete values.time;
      const that = this;
      confirm({
        className: 'BIConfirm',
        // okType: 'danger',
        title: '是否确定发送？',
        cancelText: '取消',
        okText: '确定',
        onOk() {
          that.props
            .dispatch({
              type: 'report/sendMail',
              payload: { params: values },
            })
            .then(res => {
              if (res.code === 20000) {
                that.props.form.resetFields();
                that.checkMail();
                that.getIgnoreUser();
              } else {
                message.error(res.msg);
              }
            });
        },
        onCancel() {},
      });
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { disabled } = this.state;

    const options = [
      { label: '院长&副院长', value: '1' },
      { label: '家族长', value: '2' },
      { label: '运营长', value: '3' },
      { label: '班主任', value: '4' },
      { label: '我自己', value: '5' },
    ];

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 4,
        },
      },
    };

    return (
      <>
        <Spin spinning={false}>
          <div className={style.box}>
            <div className={style.title}></div>
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item label="开始日期：">
                {getFieldDecorator('time', {
                  rules: [
                    {
                      required: true,
                      message: '请选择日期',
                    },
                  ],
                })(
                  <BIRangePicker
                    style={{ width: 330 }}
                    allowClear={false}
                    placeholder={['选择起始时间', '选择截止时间']}
                    // onChange={(val, valStr) => this.onTimeChange(val, valStr, 'startDate')}
                  />
                )}
              </Form.Item>
              <Form.Item label="邮件标题：">
                {getFieldDecorator('title', {
                  rules: [
                    {
                      required: true,
                      message: '请输入邮件标题',
                    },
                  ],
                })(
                  <Input
                    maxLength={50}
                    // value={'1'}
                    // onInput={e => this.inputChange(e, 'title')}
                    style={{ width: 330 }}
                  />
                )}
              </Form.Item>
              <Form.Item label="发送范围：">
                {getFieldDecorator('roleList', {
                  rules: [{ required: true, message: '请选择发送范围' }],
                })(
                  <Checkbox.Group
                    style={{ width: 570, height: ' 32px', lineHeight: '32px' }}
                    options={options}
                    // onChange={val => this.onChange(val)}
                  />
                )}
              </Form.Item>
              <Form.Item label="屏蔽用户：">
                {getFieldDecorator('ignoreUsers', {
                  rules: [
                    {
                      required: true,
                      message: '请输入屏蔽用户',
                      // pattern: new RegExp(/^[\d\s]+$/, 'g'),
                    },
                  ],
                  getValueFromEvent: event => {
                    console.log();
                    return event.target.value.replace(/[^\d\r\ ]/g, '');
                  },
                  // initialValue: '',
                })(<Input style={{ width: 330 }} />)}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" disabled={disabled} htmlType="submit">
                  发送
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Spin>
      </>
    );
  }
}

export default Form.create({ name: 'register' })(Report);
