import React, { Component } from 'react';
import { connect } from 'dva';
import Form from 'antd/lib/form';
import Select from 'antd/lib/select';
import Button from 'antd/lib/button';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import Modal from 'antd/lib/modal';
import Input from 'antd/lib/input';

import { BiFilter } from '@/utils/utils';

import styles from '../style.less'

const { Option } = Select;

@connect(({ global,dataDetail }) => ({
  global,
  dataDetail,
}))

class HorizontalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exam: undefined,
      provinceList: undefined,
      collegeId: undefined,
      familyIdList: undefined,
      orderStatus: undefined,
      stuType: undefined,
      admissionStatus: undefined,
      msgState: undefined,
      menuCheckedName: '我的查询条件',
    };
    this.examList = [];
    this.provinceAllList = BiFilter('provinceJson');
    this.collegeList = [];
    this.familyList = [];
    this.conditionList = [
      { id: 1, name: '我的条件1' },
      { id: 22, name: '我的条件22' }
    ];
    this.checkedConditionList = {};
  }
  UNSAFE_componentWillMount() {
    this.props.dispatch({
      type: 'global/getExamList',
      payload: { params: {} },
    });
    this.props.dispatch({
      type: 'dataDetail/getQueryConditionList',
      payload: { params: {} },
    });
  }

  menuDel = (e) => {
    this.props.menuDel(e);
  };

  menuEdit = (e) => {
    this.props.menuEdit(e);
  };

  menuAdd = (e) => {
    this.props.menuAdd(e);
  };

  menuCheck = (val) => {
    this.setState({
      menuCheckedName:val.name
    })
  };

  formValChange = (val, key) => {
    let labels = undefined;
    if (val instanceof Array) {
      // 处理多选类型
      const list = [];
      val.forEach((v) => {
        list.push(v.label);
      });
      labels = list.join(',');
    } else {
      labels = val.label;
    }
    this.checkedConditionList[key] = labels;
  };

  handleReset = () => {
    this.checkedConditionList= {};
    this.props.form.resetFields();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.dispatch({
          type: 'dataDetail/getDetailData',
          payload: { params: values },
        });
      }
    });
  };

  render() {
    this.examList = this.props.global.examList;
    // this.conditionList = this.props.dataDetail.queryConditionList;

    const checkedConditionList = this.checkedConditionList;

    const { getFieldDecorator, } = this.props.form;
    const menu = (
      <Menu>
        {this.conditionList.map(item => (
          <Menu.Item key={item.id}>
            <span onClick={() => this.menuCheck(item)} >{item.name}</span><Icon onClick={() => this.menuDel(item.id)} style={{marginLeft:'5px'}}  type="delete" />  <Icon onClick={() => this.menuEdit(item.id)} type="edit" />
          </Menu.Item>
        ))}
      </Menu>
    );
    function getCheckedConditionList() {
      const list = [];
      for (let key in checkedConditionList) {
        checkedConditionList[key] && list.push(checkedConditionList[key]);
      }
      return list.map((v) => (
        <span className={styles.spanBtn} key={v}>{v}</span>
      ))
    }

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <div className={styles.searchBoxBg}>
          <span className={styles.rowTitle}>查询条件：</span>
          <div className={styles.row}>
            {/* 第一行 */}
            <div>
              <Form.Item label="考期">
                {getFieldDecorator('exam', {
                  initialValue: this.state.exam,
                })(
                  <Select placeholder="考期" labelInValue onChange={(val) => this.formValChange(val,'exam')}>
                    {this.examList.map(item => (
                      <Option key={item.id}>
                        {item.exam}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </div>
            {/* 第二行 */}
            <div>
              <Form.Item label="学员信息">
                {getFieldDecorator('provinceList', {
                  initialValue: this.state.provinceList,
                })(
                  <Select placeholder="报考省份"  mode="multiple" showArrow={true} maxTagCount={1} labelInValue onChange={(val) => this.formValChange(val,'provinceList')}>
                    {this.provinceAllList.map(item => (
                      <Option key={item.code}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('collegeId', {
                  initialValue: this.state.collegeId,
                })(
                  <Select placeholder="学院" labelInValue onChange={(val) => this.formValChange(val,'collegeId')}>
                    {this.collegeList.map(item => (
                      <Option value={item.examId} key={item.examName}>
                        {item.examName}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('familyIdList', {
                  initialValue: this.state.familyIdList,
                })(
                  <Select placeholder="家族" labelInValue onChange={(val) => this.formValChange(val,'familyIdList')}>
                    {this.familyList.map(item => (
                      <Option value={item.examId} key={item.examName}>
                        {item.examName}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('orderStatus', {
                  initialValue: this.state.orderStatus,
                })(
                  <Select placeholder="订单状态" labelInValue onChange={(val) => this.formValChange(val,'orderStatus')}>
                    {BiFilter('ORDER_STATE').map(item => (
                      <Option value={item.id} key={item.name}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('stuType', {
                  initialValue: this.state.stuType,
                })(
                  <Select placeholder="学员身份" labelInValue onChange={(val) => this.formValChange(val,'stuType')}>
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
                {getFieldDecorator('admissionStatus', {
                  initialValue: this.state.admissionStatus,
                })(
                  <Select placeholder="准考证填写状态" labelInValue onChange={(val) => this.formValChange(val,'admissionStatus')}>
                    {BiFilter('TICKET_STATES').map(item => (
                      <Option value={item.id} key={item.name}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('msgStatusList', {
                  initialValue: this.state.msgStatusList,
                })(
                  <Select placeholder="消息打开状态"  mode="multiple" showArrow={true} maxTagCount={1} labelInValue onChange={(val) => this.formValChange(val,'msgStatusList')}>
                    {BiFilter('MSG_STATES').map(item => (
                      <Option key={item.id}>{item.name}</Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </div>
            {/* 第四行 */}
            <div style={{ marginTop: '60px' }}>
              <Form.Item label="&nbsp;">
                <Dropdown overlay={menu}>
                  <Button>
                    {this.state.menuCheckedName} <Icon type="down" />
                  </Button>
                </Dropdown>
              </Form.Item>
              <Form.Item style={{ marginLeft: '300px' }}>
                <Button type="primary2" onClick={this.handleReset}>恢复默认</Button>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit"><Icon type="search" />查询</Button>
              </Form.Item>
            </div>
          </div>
        </div>
        {
          getCheckedConditionList().length > 0 ? (
            <div className={styles.searchBoxSeletected}>
              <span className={styles.rowTitle}>已选条件：</span>
              <div className={styles.row}>
                {getCheckedConditionList()} <Button type="primary" style={{marginLeft:'20px'}} onClick={this.menuAdd}>保存查询条件</Button>
              </div>
            </div>
          ):null
        }
      </Form>
    );
  }
}

const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  conditionDel = (e) => {
    console.log('menu', e);
  };

  conditionEdit = (e) => {
    console.log('menue', e);
  };

  conditionAdd = (e) => {
    console.log('menuadd', e);
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <div className={styles.searchWrap}>
          <WrappedHorizontalLoginForm
            menuDel={this.conditionDel}
            menuEdit={this.conditionEdit}
            menuAdd={this.conditionAdd}
          />
        </div>
        <Modal
          title="添加查询条件"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div>
            <Input placeholder="Basic usage" />
          </div>
        </Modal>
      </>
    )
  }
}

export default SearchForm;

