import * as React from 'react';
import { Form, Icon, Divider } from 'antd';
import BISelect from '@/ant_components/BISelect';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BIButton from '@/ant_components/BIButton';
import styles from './index.less';
import formStyles from '../formCommon.less';

const { BIRangePicker } = BIDatePicker;
const dateFormat = 'YYYY.MM.DD';
export default class CommonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,      //  储存原始form的params
    }
  }
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }
  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };
  labelTxt = (txt) => {
    return <div className={styles.scaleTxt}><span>{txt}</span></div>
  };
  render() {
    const { expand } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={`${formStyles.formStyle} ${styles.formCotainer}`}>
        <Form
          layout="inline"
          className="ant-advanced-search-form"
          onSubmit={this.handleSearch}
        >
          <div className={styles.rowWrap}>
            {/* <div className={styles.itemCls}> */}
            {/* <Form.Item label='来源渠道：'>
                {getFieldDecorator('name1', {
                  rules: [{
                    required: true,
                    message: 'Input something!',
                  }],
                })(
                  <BISelect placeholder="请选择" />
                )}
              </Form.Item> */}
            {/* </div> */}
            <div className={styles.itemCls}>
              <Form.Item label='来源设备：'>
                {getFieldDecorator('name2', {
                  rules: [{
                    required: true,
                    message: 'Input something!',
                  }],
                })(
                  <BISelect placeholder="请选择" />
                )}
              </Form.Item>
            </div>
            <div className={styles.itemCls}>
              <Form.Item label='来源应用：'>
                {getFieldDecorator('name3', {
                  rules: [{
                    required: true,
                    message: 'Input something!',
                  }],
                })(
                  <BISelect placeholder="请选择" />
                )}
              </Form.Item>
            </div>
            <div className={styles.itemCls}>
              <Form.Item label='注册时间：'>
                {getFieldDecorator('time', {
                  rules: [{
                    required: true,
                    message: 'Input something!',
                  }],
                })(
                  <BIRangePicker placeholder={["起始时间", "截止时间"]} format={dateFormat} />
                )}
              </Form.Item>
            </div>
            {/* 空元素占位(待修改) */}
            <div className={styles.itemCls} />
            <div className={styles.itemCls} />
          </div>
          <div className={styles.rowWrap}>
            <div className={styles.itemCls}>
              <Form.Item label='选课状态：'>
                {getFieldDecorator('status1', {
                  rules: [{
                    required: true,
                    message: 'Input something!',
                  }],
                })(
                  <BISelect placeholder="请选择" />
                )}
              </Form.Item>
            </div>
            <div className={styles.itemCls}>
              <Form.Item label='公共课：'>
                {getFieldDecorator('name6', {
                  rules: [{
                    required: true,
                    message: 'Input something!',
                  }],
                })(
                  <BISelect placeholder="请选择" />
                )}
              </Form.Item>
            </div>
            <div className={styles.itemCls}>
              <Form.Item label='选课时间：'>
                {getFieldDecorator('name7', {
                  rules: [{
                    required: true,
                    message: 'Input something!',
                  }],
                })(
                  <BIRangePicker placeholder={["起始时间", "截止时间"]} format={dateFormat} />
                )}
              </Form.Item>
            </div>
            <div className={styles.itemCls}>
              <Form.Item label='资格证课：'>
                {getFieldDecorator('name8', {
                  rules: [{
                    required: true,
                    message: 'Input something!',
                  }],
                })(
                  <BISelect placeholder="请选择" />
                )}
              </Form.Item>
            </div>
            <div className={styles.itemCls}>
              <Form.Item label='选课时间：'>
                {getFieldDecorator('name9', {
                  rules: [{
                    required: true,
                    message: 'Input something!',
                  }],
                })(
                  <BIRangePicker placeholder={["起始时间", "截止时间"]} format={dateFormat} />
                )}
              </Form.Item>
            </div>
          </div>
          <div className={styles.rowWrap}>
            <div className={styles.itemCls}>
              <Form.Item label='学员出勤：'>
                {getFieldDecorator('ee1', {
                  rules: [{
                    required: true,
                    message: 'Input something!',
                  }],
                })(
                  <BISelect placeholder="请选择" />
                )}
              </Form.Item>
            </div>
            <div className={styles.itemCls}>
              <Form.Item label='出勤次数：'>
                {getFieldDecorator('ee2', {
                  rules: [{
                    required: true,
                    message: 'Input something!',
                  }],
                })(
                  <BISelect placeholder="请选择" />
                )}
              </Form.Item>
            </div>
            <div className={styles.itemCls}>
              <Form.Item label='听课时长：'>
                {getFieldDecorator('ee3', {
                  rules: [{
                    required: true,
                    message: 'Input something!',
                  }],
                })(
                  <BISelect placeholder="请选择" />
                )}
              </Form.Item>
            </div>
            <div className={styles.itemCls} />
            <div className={styles.itemCls} />
          </div>
          {
            expand ? (
              <>
                <div className={styles.rowWrap}>
                  <div className={styles.itemCls}>
                    <Form.Item label='付费订单：'>
                      {getFieldDecorator('ww22', {
                        rules: [{
                          required: true,
                          message: 'Input something!',
                        }],
                      })(
                        <BISelect placeholder="请选择" />
                      )}
                    </Form.Item>
                  </div>
                  <div className={styles.itemCls}>
                    <Form.Item label='订单金额：'>
                      {getFieldDecorator('w33', {
                        rules: [{
                          required: true,
                          message: 'Input something!',
                        }],
                      })(
                        <BISelect placeholder="请选择" />
                      )}
                    </Form.Item>
                  </div>
                  <div className={styles.itemCls}>
                    <Form.Item label={this.labelTxt('与KO单间隔')}>
                      {getFieldDecorator('w1', {
                        rules: [{
                          required: true,
                          message: 'Input something!',
                        }],
                      })(
                        <BISelect placeholder="请选择" />
                      )}
                    </Form.Item>
                  </div>
                  <div className={styles.itemCls} />
                  <div className={styles.itemCls} />
                </div>
                <div className={styles.rowWrap}>
                  <div className={styles.itemCls}>
                    <Form.Item label='前端归属：'>
                      {getFieldDecorator('w71', {
                        rules: [{
                          required: true,
                          message: 'Input something!',
                        }],
                      })(
                        <BISelect placeholder="请选择" />
                      )}
                    </Form.Item>
                  </div>
                  <div className={styles.itemCls}>
                    <Form.Item label='后端归属：'>
                      {getFieldDecorator('w51', {
                        rules: [{
                          required: true,
                          message: 'Input something!',
                        }],
                      })(
                        <BISelect placeholder="请选择" />
                      )}
                    </Form.Item>
                  </div>
                  <div className={styles.itemCls} />
                  <div className={styles.itemCls} />
                  <div className={styles.itemCls} />
                </div>

              </>
            ) : null
          }
          <Divider className={styles.collapCls} dashed onClick={this.toggle}>{expand ? '收起' : '展开'} <Icon type={expand ? 'up' : 'down'} /></Divider>
          <div className={styles.rowWrap}>
            <div>
              <BIButton onClick={this.handleReset}>重置</BIButton>
              <BIButton type="primary" htmlType="submit">
                查询
              </BIButton>

            </div>
          </div>
        </Form>
      </div>
    )
  }
}
