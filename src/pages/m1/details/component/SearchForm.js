import React, { Component } from 'react';
import Form from 'antd/lib/form';
import Select from 'antd/lib/select';
import Button from 'antd/lib/button';
import DatePicker from 'antd/lib/date-picker';
import { BiFilter } from '../../../../../utils/utils';

import styles from '../style.less'

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      examId: undefined,
      provinceId: undefined,
      collegeId: undefined,
      familyId: undefined,
      orderState: undefined,
      studentType: undefined,
      ticketState: undefined,
      msgState: undefined,
    };
    this.examList = [
      {examId: 1,examName:'考期1904'}
    ];
    this.provinceList = [
      {examId: '全部身份',examName:'全部身份'},
      {examId: '河北省',examName:'河北省'},
      {examId: '北京',examName:'北京'}
    ];
    this.collegeList = [];
    this.familyList = [];
    this.conditionList = [];

  }
  componentDidMount() {
    // To disabled submit button at the beginning.
    // this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator, } = this.props.form;

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <span className={styles.rowTitle}>查询条件：</span>
        <div className={styles.row}>
          {/* 第一行 */}
          <div>
            <Form.Item label="考期">
              {getFieldDecorator('examId', {
                initialValue: this.state.examId,
              })(
                <Select placeholder="考期">
                  {this.examList.map(item => (
                    <Option value={item.examId} key={item.examName}>
                      {item.examName}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </div>
          {/* 第二行 */}
          <div>
            <Form.Item label="学员信息">
              {getFieldDecorator('provinceId', {
              })(
                <Select mode="multiple" showArrow={true} maxTagCount={1} placeholder="报考省份">
                  {this.provinceList.map(item => (
                    <Option value={item.examId} key={item.examName}>
                      {item.examName}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('collegeId', {
              })(
                <Select placeholder="学院">
                  {this.collegeList.map(item => (
                    <Option value={item.examId} key={item.examName}>
                      {item.examName}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('familyId', {
              })(
                <Select placeholder="家族">
                  {this.familyList.map(item => (
                    <Option value={item.examId} key={item.examName}>
                      {item.examName}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('orderState', {
              })(
                <Select placeholder="订单状态">
                  {BiFilter('ORDER_STATE').map(item => (
                    <Option value={item.id} key={item.name}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('studentType', {
              })(
                <Select placeholder="学员身份">
                  {BiFilter('STUDENT_TYPE').map(item => (
                    <Option value={item.id} key={item.name}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </div>
          {/* 第三行 */}
          <div>
            <Form.Item label="业务信息">
              {getFieldDecorator('ticketState', {
              })(
                <Select placeholder="准考证填写状态">
                  {BiFilter('TICKET_STATES').map(item => (
                    <Option value={item.id} key={item.name}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('msgState', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Select placeholder="消息打开状态">
                  {BiFilter('MSG_STATES').map(item => (
                    <Option value={item.id} key={item.name}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </div>
          {/* 第四行 */}
          <div style={{marginTop: '60px'}}>
            <Form.Item label="&nbsp;">
              {getFieldDecorator('searchCondition', {
              })(
                <Select placeholder="我的查询条件">
                  {this.conditionList.map(item => (
                    <Option value={item.id} key={item.name}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item style={{marginLeft:'300px'}}>
              <Button type="primary2">恢复默认</Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary">查询</Button>
            </Form.Item>
          </div>
        </div>
        <span className={styles.rowTitle}>已选条件：</span>
        <div className={styles.row} style={{background:'transparent'}}>
          <span className={styles.spanBtn}>条件我</span> <Button type="primary">保存查询条件</Button>
        </div>
      </Form>
    );
  }
}

const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);

class SearchForm extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <div className={styles.searchWrap}>
          <WrappedHorizontalLoginForm />
        </div>
      </>
    )
  }
}

export default SearchForm;

