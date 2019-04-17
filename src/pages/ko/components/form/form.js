import * as React from 'react';
import { Form, Icon, Divider } from 'antd';
import BISelect from '@/ant_components/BISelect';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BIButton from '@/ant_components/BIButton';
import styles from './index.less';
import formStyles from '../formCommon.less';

const { BIRangePicker } = BIDatePicker;
const dateFormat = 'YYYY.MM.DD';
class CommonForm extends React.Component {
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
    const { params } = this.props;
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
                {getFieldDecorator('fromDevice', {
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
                {getFieldDecorator('fromDevice', {
                  initialValue: params.fromDevice,
                })(
                  <BISelect placeholder="请选择" mode="multiple" />
                )}
              </Form.Item>
            </div>
            <div className={styles.itemCls}>
              <Form.Item label='来源应用：'>
                {getFieldDecorator('fromApp', {
                  initialValue: params.fromApp,
                })(
                  <BISelect placeholder="请选择" />
                )}
              </Form.Item>
            </div>
            <div className={styles.itemCls}>
              <Form.Item label='注册时间：'>
                {getFieldDecorator('registerTime', {
                  initialValue: params.registerTime,
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
                {getFieldDecorator('choiceLessonStatus', {
                  initialValue: params.choiceLessonStatus,
                })(
                  <BISelect placeholder="请选择" />
                )}
              </Form.Item>
            </div>
            <div className={styles.itemCls}>
              <Form.Item label='公共课：'>
                {getFieldDecorator('publicLesson', {
                  initialValue: params.publicLesson,
                })(
                  <BISelect placeholder="请选择" />
                )}
              </Form.Item>
            </div>
            <div className={styles.itemCls}>
              <Form.Item label='选课时间：'>
                {getFieldDecorator('publicChoiceLessonTime', {
                  initialValue: params.publicChoiceLessonTime,
                })(
                  <BIRangePicker placeholder={["起始时间", "截止时间"]} format={dateFormat} />
                )}
              </Form.Item>
            </div>
            <div className={styles.itemCls}>
              <Form.Item label='资格证课：'>
                {getFieldDecorator('certificateChoiceLesson', {
                  initialValue: params.certificateChoiceLesson,
                })(
                  <BISelect placeholder="请选择" />
                )}
              </Form.Item>
            </div>
            <div className={styles.itemCls}>
              <Form.Item label='选课时间：'>
                {getFieldDecorator('certificateChoiceLessonTime', {
                  initialValue: params.certificateChoiceLessonTime,
                })(
                  <BIRangePicker placeholder={["起始时间", "截止时间"]} format={dateFormat} />
                )}
              </Form.Item>
            </div>
          </div>
          <div className={styles.rowWrap}>
            <div className={styles.itemCls}>
              <Form.Item label='学员出勤：'>
                {getFieldDecorator('attendanceStatus', {
                  initialValue: params.attendanceStatus,
                })(
                  <BISelect placeholder="请选择" />
                )}
              </Form.Item>
            </div>
            <div className={styles.itemCls}>
              <Form.Item label='出勤次数：'>
                {getFieldDecorator('attendanceNum', {
                  initialValue: params.attendanceNum,
                })(
                  <BISelect placeholder="请选择" />
                )}
              </Form.Item>
            </div>
            <div className={styles.itemCls}>
              <Form.Item label='听课时长：'>
                {getFieldDecorator('listenLessonTime', {
                  initialValue: params.listenLessonTime,
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
                      {getFieldDecorator('payOrder', {
                        initialValue: params.payOrder,
                      })(
                        <BISelect placeholder="请选择" />
                      )}
                    </Form.Item>
                  </div>
                  <div className={styles.itemCls}>
                    <Form.Item label='订单金额：'>
                      {getFieldDecorator('orderMoney', {
                        initialValue: params.orderMoney,
                      })(
                        <BISelect placeholder="请选择" />
                      )}
                    </Form.Item>
                  </div>
                  <div className={styles.itemCls}>
                    <Form.Item label={this.labelTxt('与KO单间隔')}>
                      {getFieldDecorator('koOrderGap', {
                        initialValue: params.koOrderGap,
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
                      {getFieldDecorator('frontBelong', {
                        initialValue: params.frontBelong,
                      })(
                        <BISelect placeholder="请选择" />
                      )}
                    </Form.Item>
                  </div>
                  <div className={styles.itemCls}>
                    <Form.Item label='后端归属：'>
                      {getFieldDecorator('backBelong', {
                        initialValue: params.backBelong,
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


export default Form.create({ name: 'CommonForm' })(CommonForm);
