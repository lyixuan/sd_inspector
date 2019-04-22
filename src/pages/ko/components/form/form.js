import * as React from 'react';
import { Form, Icon, Divider } from 'antd';
import memoizeOne from 'memoize-one';
import BISelect from '@/ant_components/BISelect/formSelect';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BIButton from '@/ant_components/BIButton';
import BICascader from '@/ant_components/BICascader/FormCascader';
import ConditionSelect from '@/ant_components/ConditionSelect';
import ButtonGroupCom from '../buttonGroup';
import styles from './index.less';
import formStyles from '../formCommon.less';
import customData from './utils/unitData';

const { BIRangePicker } = BIDatePicker;
const dateFormat = 'YYYY.MM.DD';
const { Option } = BISelect;
class CommonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,      //  储存原始form的params
    }
    this.filterEnumData = memoizeOne(type => this.chooseEnumData(type));
    this.buttonGroup = this.renderButtonGroup();
  }
  handleSearch = (e) => {
    e.preventDefault();
    const { expand } = this.state;
    this.props.form.validateFields((err, values) => {
      if (this.props.onSubmit) {
        const { payOrder, orderMoney, koOrderGap, frontBelong, backBelong, ...others } = values;
        const newParams = expand ? { ...values } : { ...others };
        this.props.onSubmit(newParams)
      }

    });

  }
  onDelete = (name, value) => {
    const returnParams = {}
    if (this.props.onChange) {
      returnParams[name] = value;
      this.props.onChange(returnParams)
    }
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
  chooseEnumData = (type) => {
    const { enumData = {} } = this.props;
    let returnData = [];
    if (type >= 1 && type <= 10) {
      if (type === 5) {
        return Array.isArray(enumData[type]) ? enumData[type].map(item => ({ ...item, value: item.id })) : [];
      }
      returnData = Array.isArray(enumData[type]) ? enumData[type] : [];
    }
    return returnData;
  }
  checkoutHasChooseClass = () => {
    const { getFieldValue } = this.props.form;
    const params = getFieldValue('choiceLessonStatus') || {};
    return params.value ? Number(params.value) === 0 : false;
  }
  renderCascader = (label) => {
    if (Array.isArray(label) && label.length === 0) return;
    let labelStr = label.join('/');
    labelStr = labelStr.length >= 6 ? `${labelStr.substr(0, 6)}...` : labelStr;
    return <span>{labelStr}</span>
  }
  renderButtonGroup = () => {
    const { expand } = this.state;
    const top = expand ? 420 : 320
    return (
      <ButtonGroupCom params={this.props.params} top={top} onDelete={this.onDelete}></ButtonGroupCom>
    )
  }
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
                  <BISelect placeholder="请选择" mode="multiple" allowClear showArrow maxTagCount={1} maxTagPlaceholder={(omittedValues) => (<span>{`+${omittedValues.length}`}</span>)}>
                    {this.filterEnumData(1).map(item => <Option key={item.value} value={item.value}>{item.name}</Option>)}
                  </BISelect>
                )}
              </Form.Item>
            </div>
            <div className={styles.itemCls}>
              <Form.Item label='来源应用：'>
                {getFieldDecorator('fromApp', {
                  initialValue: params.fromApp,
                })(
                  <BISelect placeholder="请选择" mode="multiple" allowClear showArrow maxTagCount={1} maxTagPlaceholder={(omittedValues) => (<span>{`+${omittedValues.length}`}</span>)}>
                    {this.filterEnumData(2).map(item => <Option key={item.value} value={item.value}>{item.name}</Option>)}
                  </BISelect>
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
                  <BISelect placeholder="请选择" allowClear>
                    {this.filterEnumData(3).map(item => <Option key={item.value} value={item.value}>{item.name}</Option>)}
                  </BISelect>
                )}
              </Form.Item>
            </div>
            <div className={styles.itemCls}>
              <Form.Item label='公共课：'>
                {getFieldDecorator('publicLesson', {
                  initialValue: params.publicLesson,
                })(
                  <BISelect placeholder="请选择" allowClear disabled={this.checkoutHasChooseClass()}>
                    {this.filterEnumData(4).map(item => <Option key={item.value} value={item.value}>{item.name}</Option>)}
                  </BISelect>
                )}
              </Form.Item>
            </div>
            <div className={styles.itemCls}>
              <Form.Item label='选课时间：'>
                {getFieldDecorator('publicChoiceLessonTime', {
                  initialValue: params.publicChoiceLessonTime,
                })(
                  <BIRangePicker placeholder={["起始时间", "截止时间"]} format={dateFormat} disabled={this.checkoutHasChooseClass()} />
                )}
              </Form.Item>
            </div>
            <div className={styles.itemCls}>
              <Form.Item label='资格证课：'>
                {getFieldDecorator('certificateChoiceLesson', {
                  initialValue: params.certificateChoiceLesson,
                })(
                  <BISelect placeholder="请选择" allowClear disabled={this.checkoutHasChooseClass()}>
                    {this.filterEnumData(5).map(item => <Option key={item.value} value={item.value}>{item.name}</Option>)}
                  </BISelect>
                )}
              </Form.Item>
            </div>
            <div className={styles.itemCls}>
              <Form.Item label='选课时间：'>
                {getFieldDecorator('certificateChoiceLessonTime', {
                  initialValue: params.certificateChoiceLessonTime,
                })(
                  <BIRangePicker placeholder={["起始时间", "截止时间"]} format={dateFormat} disabled={this.checkoutHasChooseClass()} />
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
                  <BISelect placeholder="请选择" allowClear >
                    {this.filterEnumData(6).map(item => <Option key={item.value} value={item.value}>{item.name}</Option>)}
                  </BISelect>
                )}
              </Form.Item>
            </div>
            <div className={styles.itemCls}>
              <Form.Item label='出勤次数：'>
                {getFieldDecorator('attendanceNum', {
                  initialValue: params.attendanceNum,
                })(
                  <ConditionSelect placeholder="请选择" defaultUnit={customData.defaultAttendanceNumUnit} options={customData.defaultAttendanceNumOptions} />
                )}
              </Form.Item>
            </div>
            <div className={styles.itemCls}>
              <Form.Item label='听课时长：'>
                {getFieldDecorator('listenLessonTime', {
                  initialValue: params.listenLessonTime,
                })(
                  <ConditionSelect placeholder="请选择" defaultUnit={customData.defaultListenLessonTimeUnit} options={customData.defaultListenLessonTimeOptions} unitData={customData.listenLessonTimeUnits} />
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
                        <BISelect placeholder="请选择" allowClear>
                          {this.filterEnumData(7).map(item => <Option key={item.value} value={item.value}>{item.name}</Option>)}
                        </BISelect>
                      )}
                    </Form.Item>
                  </div>
                  <div className={styles.itemCls}>
                    <Form.Item label='订单金额：'>
                      {getFieldDecorator('orderMoney', {
                        initialValue: params.orderMoney,
                      })(
                        <ConditionSelect placeholder="请选择" defaultUnit={customData.defaultOrderMoneyUnit} />
                      )}
                    </Form.Item>
                  </div>
                  <div className={styles.itemCls}>
                    <Form.Item label={this.labelTxt('与KO单间隔')}>
                      {getFieldDecorator('koOrderGap', {
                        initialValue: params.koOrderGap,
                      })(
                        <ConditionSelect placeholder="请选择" defaultUnit={customData.defaultKoOrderGapUnit} options={customData.defaultKoOrderGapOptions} unitData={customData.KoOrderGapunits} />
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
                        <BICascader placeholder="请选择" changeOnSelect options={this.filterEnumData(8)} fieldNames={{ label: 'name', value: 'id', children: 'nodeList' }} displayRender={this.renderCascader} />
                      )}
                    </Form.Item>
                  </div>
                  <div className={styles.itemCls}>
                    <Form.Item label='后端归属：'>
                      {getFieldDecorator('backBelong', {
                        initialValue: params.backBelong,
                      })(
                        <BICascader placeholder="请选择" changeOnSelect options={this.filterEnumData(9)} fieldNames={{ label: 'name', value: 'id', children: 'nodeList' }} displayRender={this.renderCascader} />
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
          {/* 已选项设置 */}
          <div className={styles.rowWrap}>{
            this.renderButtonGroup()
          }</div>

          <div className={styles.rowWrap}>

            <BIButton onClick={this.handleReset} style={{ marginRight: '10px' }}>重置</BIButton>
            <BIButton type="primary" htmlType="submit">
              查询
              </BIButton>
          </div>
        </Form>
      </div>
    )
  }
}

function mapPropsToFields(props) {
  const { params } = props
  const returnObj = {};
  if (!params || typeof params !== 'object') return returnObj;
  Object.keys(params).forEach(item => {
    returnObj[item] = Form.createFormField({
      value: params[item],
    });
  })
  return returnObj
}
function onFieldsChange(props, fields) {
  if (props.onChange) {
    const params = {}
    Object.keys(fields).forEach(item => {
      const { value } = fields[item];
      params[item] = value
    })
    props.onChange(params);
  }

}
export default Form.create({ name: 'CommonForm', mapPropsToFields, onFieldsChange, })(CommonForm);
