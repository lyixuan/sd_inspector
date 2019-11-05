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
  }

  checkMail = () => {
    this.setState({ disabled: false });
    // this.props
    //   .dispatch({
    //     type: 'report/checkMail',
    //   })
    //   .then(res => {
    //     console.log(res);
    //   });
  };

  handleSubmit = e => {
    let { beginDate, endDate } = this.state;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      const time = values.time;
      values.beginDate = moment(time[0]).format('x');
      values.endDate = moment(time[1]).format('x');
      if (endDate - beginDate > 2 * 30 * 24 * 60 * 60 * 1000) {
        message.error('日期范围不能超过 60天');
        return;
      }
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
              payload: { params: { values } },
            })
            .then(() => {
              this.checkMail();
              this.form.setFieldFormValue({});
            });
        },
        onCancel() {},
      });
    });
  };

  // onTimeChange = (value, vname) => {
  //   console.log(value, vname, 'onTimeChange');
  //   // this.props.dispatch({
  //   //   type: '/saveTime',
  //   //   payload: { [vname]: value },
  //   // });
  // // };

  // handleConfirmBlur = e => {
  //   const { value } = e.target;
  //   this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  // };

  // compareToFirstPassword = (rule, value, callback) => {
  //   const { form } = this.props;
  //   if (value && value !== form.getFieldValue('password')) {
  //     callback('Two passwords that you enter is inconsistent!');
  //   } else {
  //     callback();
  //   }
  // };

  // validateToNextPassword = (rule, value, callback) => {
  //   const { form } = this.props;
  //   if (value && this.state.confirmDirty) {
  //     form.validateFields(['confirm'], { force: true });
  //   }
  //   callback();
  // };

  // onChange = paramas => {
  //   console.log(paramas, 'paramas');
  //   // this.from.setFieldsValue({
  //   //   paramas,
  //   // });
  // };

  // handleWebsiteChange = value => {
  //   let autoCompleteResult;
  //   if (!value) {
  //     autoCompleteResult = [];
  //   } else {
  //     autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
  //   }
  //   this.setState({ autoCompleteResult });
  // };

  // inputChange = (e, key) => {
  //   const obj = {};
  //   // const value = e.target.value;
  //   // if (isNaN(Number(value)) && value !== '-') {
  //   //   this.props.onError && this.props.onError();
  //   //   return;
  //   // }
  //   obj[key] = e.target.value;
  //   this.setState({ ...obj });
  //   e.stopPropagation();
  // };

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
        sm: { span: 8 },
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
          offset: 8,
        },
      },
    };

    return (
      <>
        <Spin spinning={false}>
          <div className={style.box}>
            <div className={style.title}>发周报</div>
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
                    },
                  ],
                })(
                  <Input
                    // value={'1'}
                    // onInput={e => this.inputChange(e, 'title')}
                    style={{ width: 330 }}
                  />
                )}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" disabled={disabled} htmlType="submit">
                  发送
                </Button>
              </Form.Item>
            </Form>
            {/* <div className={style.line}>
              <span>开始日期：</span>
              <BIRangePicker
                style={{ width: 330 }}
                allowClear={false}
                placeholder={['选择起始时间', '选择截止时间']}
                // value={startDate ? moment(startDate) : undefined}
                onChange={(val, valStr) => this.onTimeChange(val, valStr, 'startDate')}
              />
            </div>
            <div className={style.line}>
              <span>邮件标题：</span>
              <Input
                value={'1'}
                onInput={e => this.inputChange(e, 'title')}
                style={{ width: 330 }}
              />
            </div>
            <div className={style.line}>
              <span>发送范围：</span>
              <Checkbox.Group
                style={{ width: 440, height: ' 32px', lineHeight: '32px' }}
                options={options}
                defaultValue={['Apple']}
                onChange={() => this.onChange}
              />
            </div>
            <div className={style.line}>
              <span>屏蔽用户：</span>
              <Input
                style={{ width: 440 }}
                value={ignoreUsers}
                onInput={e => this.inputChange(e, 'ignoreUsers')}
              />
            </div>
            <div style={{ width: 440, textAlign: 'center' }}>
              <BIButton type="primary" onClick={this.sendFn}>
                发送
              </BIButton>
            </div>
           */}
          </div>
        </Spin>
      </>
    );
  }
}

export default Form.create({ name: 'register' })(Report);

// @connect(({ examPlatformModal }) => ({
//   userConfigData: examPlatformModal.userConfigData,
// }))
// class CreateGroup extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       queryCondition: {},
//       querySelected: []
//     };
//   }

//   componentDidMount() {
//     this.props.dispatch({
//       type: 'examPlatformModal/getKOEnumList',
//     });
//   }

//   // 已选条件
//   getCheckedConditionList = (paramas) => {
//     const { userConfigData } = this.props;
//     const list = [];
//     let querySelectedNew = this.state.querySelected;
//     Object.keys(paramas).map(currentKey => {
//       const val = paramas[currentKey];
//       const bul = val instanceof Array;
//       if (currentKey && (bul && val.length > 0) ||  (!bul && val !== undefined)) {
//         let label = '';
//         const config = userConfigData[currentKey];
//         if (currentKey === 'orgIdList') {
//           if (val instanceof Array) {
//             val.forEach((item, index) => label+= item.name + (index === val.length -1 ? '' : '/'))
//           }
//         } else if (currentKey === 'ordStatusCode') {
//           label = config.find(item => val === item.id).name;
//         } else if (currentKey === 'choiceTime') {
//           label = `订单时间：${val[0].format(dateFormat)} ~ ${val[1].format(dateFormat)}`
//         } else if (currentKey !== 'province'){
//           label = config[val];
//         } else {
//           label = val
//         }
//         list.push({key: currentKey, label: label});
//       }
//       querySelectedNew = querySelectedNew.filter(item => item.key !== currentKey);
//     })
//     return querySelectedNew.concat(list);
//   };
//   onChange = (paramas) => {
//     this.setState({
//       queryCondition: { ...this.state.queryCondition, ...paramas },
//       querySelected: this.getCheckedConditionList(paramas)
//     });
//   };

//   render() {
//     return (
//       <SearchForm onChange={this.onChange} querySelected={this.state.querySelected} queryCondition={this.state.queryCondition}></SearchForm>
//     );
//   }
// }

// export default CreateGroup;
