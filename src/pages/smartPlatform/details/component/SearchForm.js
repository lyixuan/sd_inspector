/* eslint-disable no-unused-expressions */
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
import Message from 'antd/lib/message';
import { BiFilter, DeepCopy } from '@/utils/utils';

import styles from '../style.less'

const { Option } = Select;
const confirm = Modal.confirm;
let isEdit = false; // 判断是重置后的新增，还是选择了查询条件的编辑
let editId = undefined;
let editName = undefined;
let menuCheckedName = '我的查询条件';
@connect(({ home, dataDetail }) => ({
  home,
  dataDetail,
}))

class HorizontalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exam: undefined,
      collegeId: undefined,
      familyIdList: undefined,
      orderStatus: undefined,
      stuType: undefined,
      admissionStatus: undefined,
      msgState: undefined,
    };
    this.examList = [];
    this.collegeList = [];
    this.familyList = [];
    this.conditionList = [];
    this.checkedConditionList = {};
  }
  UNSAFE_componentWillMount() {
    // 获取考期
    this.props.dispatch({
      type: 'dataDetail/getExamList',
      payload: { params: {} },
    });
    // 获取我的查询条件
    this.props.dispatch({
      type: 'dataDetail/getQueryConditionList',
      payload: { params: undefined },
    });
  }

  menuDel = (id) => {
    const that = this;
    confirm({
      title: '是否删除当前查询条件?',
      onOk() {
        that.props.dispatch({
          type: 'dataDetail/deleteQueryCondition',
          payload: { params: { id } },
        });
        if (id === editId) {
          menuCheckedName = '我的查询条件';
        }
        that.handleReset();
      },
      onCancel() { },
    });
  };

  menuEdit = (e) => {
    this.props.menuEdit(e);
  };

  menuCheck = (val) => {
    this.checkedConditionList = {};
    val.exam ? this.checkedConditionList.exam = { keys: val.exam, labels: val.exam2 } : '';
    val.collegeId ? this.checkedConditionList.collegeId = { keys: val.collegeId, labels: val.collegeName } : '';
    val.familyIdList ? this.checkedConditionList.familyIdList = { keys: val.familyIdList, labels: val.familyNameList } : '';
    val.orderStatus ? this.checkedConditionList.orderStatus = { keys: val.orderStatus, labels: val.orderStatusName } : '';
    val.stuType ? this.checkedConditionList.stuType = { keys: val.stuType, labels: val.stuTypeName } : '';
    val.admissionStatus ? this.checkedConditionList.admissionStatus = { keys: val.admissionStatus, labels: val.admissionStatusName } : '';
    val.msgStatusList ? this.checkedConditionList.msgStatusList = { keys: val.msgStatusList, labels: val.msgStatusName } : '';

    let arr = undefined;
    if (val.familyIdList) {
      arr = [];
      val.familyIdList.split(',').forEach((v, i) => {
        arr.push({ key: v, label: val.familyNameList[i] })
      });
    }
    let arr2 = undefined;
    if (val.msgStatusList) {
      arr2 = [];
      val.msgStatusList.split(',').forEach((v, i) => {
        arr2.push({ key: v, label: val.msgStatusName[i] })
      });
    }
    this.props.form.setFieldsValue({
      exam: val.exam ? { key: val.exam, label: val.exam2 } : undefined,
      collegeId: val.collegeId ? { key: val.collegeId, label: val.collegeName } : undefined,
      orderStatus: val.orderStatus ? { key: val.orderStatus, label: val.orderStatusName } : undefined,
      stuType: val.stuType ? { key: val.stuType, label: val.stuTypeName } : undefined,
      admissionStatus: val.admissionStatus ? { key: val.admissionStatus, label: val.admissionStatusName } : undefined,
      msgStatusList: arr2,
    });

    this.collegeList.forEach((v) => {
      if (v.id === Number(val.collegeId)) {
        this.familyList = v.sub;
      }
    });

    this.props.form.setFieldsValue({
      familyIdList: arr,
    });

    menuCheckedName = val.paramName;
    this.props.updateCC(this.checkedConditionList);
    isEdit = true;  // 点击我的查询条件后，保存时是编辑
    editId = val.id;
    editName = val.paramName;
  };

  formValChange = (val, key) => {
    if (val === undefined) {
      delete this.checkedConditionList[key];
      if (key === 'collegeId') {
        this.props.form.setFieldsValue({
          familyIdList: undefined
        });
        delete this.checkedConditionList['familyIdList'];
      }
      this.props.updateCC(this.checkedConditionList);
      return
    }
    // 学院家族联动
    if (key === 'collegeId') {
      this.collegeList.forEach((v) => {
        if (v.id === Number(val.key)) {
          this.familyList = v.sub;
        }
      });
      this.props.form.setFieldsValue({
        familyIdList: undefined
      })
    }

    // 收集条件
    let labels = undefined;
    let keys = undefined;
    if (val instanceof Array) {
      // 处理多选类型
      const list = [];
      const list2 = [];
      val.forEach((v) => {
        list.push(v.label);
        list2.push(v.key);
      });
      labels = list.join(',');
      keys = list2.join(',');
    } else {
      labels = val.label;
      keys = val.key;
    }
    if (labels && keys) {
      this.checkedConditionList[key] = { labels, keys };
    } else {
      delete this.checkedConditionList[key];
    }
    const obj = {
      exam: undefined,
      collegeId: undefined,
      familyIdList: undefined,
      orderStatus: undefined,
      stuType: undefined,
      admissionStatus: undefined,
      msgStatusList: undefined,
    };
    for (let key in obj) {
      for (let key2 in this.checkedConditionList) {
        if (key === key2) {
          if (this.checkedConditionList[key2]) {
            obj[key] = this.checkedConditionList[key2];
          } else {
            delete obj[key];
          }
        }
      }
    }
    this.checkedConditionList = {...obj};
    this.props.updateCC(this.checkedConditionList);
  };


  handleReset = () => {
    this.checkedConditionList = {};
    isEdit = false;   // 重置后，保存条件为新增
    this.props.updateCC(this.checkedConditionList);
    this.props.form.resetFields();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.handlePropSubmit) {
      this.props.handlePropSubmit();
    }
  };
  render() {
    this.examList = this.props.dataDetail.examList;
    this.conditionList = this.props.dataDetail.queryConditionList || [];
    this.collegeList = this.props.home.orgList;

    const { getFieldDecorator, } = this.props.form;
    const menu = (
      <Menu>
        {
          this.conditionList.length > 0 ?
            this.conditionList.map(item => (
              <Menu.Item key={item.id}>
                <span onClick={() => this.menuCheck(item)} >{item.paramName}</span><Icon onClick={() => this.menuDel(item.id)} style={{ marginLeft: '5px' }} type="delete" />  <Icon onClick={() => this.menuEdit(item)} type="edit" />
              </Menu.Item>
            )) : (
              <Menu.Item>
                <span>暂无数据</span>
              </Menu.Item>
            )
        }
      </Menu>
    );

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
                  <Select allowClear placeholder="考期" labelInValue onChange={(val) => this.formValChange(val, 'exam')}>
                    {this.examList.map(item => (
                      <Option key={item.examYearmonth}>
                        {item.exam}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </div>
            {/*第二行*/}
            <div>
              <Form.Item label="学员信息">
                {getFieldDecorator('collegeId', {
                  initialValue: this.state.collegeId,
                })(
                  <Select allowClear placeholder="学院" labelInValue onChange={(val) => this.formValChange(val, 'collegeId')}>
                    {this.collegeList.map(item => (
                      <Option key={item.id}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('familyIdList', {
                  initialValue: this.state.familyIdList,
                })(
                  <Select placeholder="家族" mode="multiple" showArrow={true} maxTagCount={1} labelInValue onChange={(val) => this.formValChange(val, 'familyIdList')}>
                    {this.familyList.map(item => (
                      <Option key={item.id}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('orderStatus', {
                  initialValue: this.state.orderStatus,
                })(
                  <Select allowClear placeholder="订单状态" labelInValue onChange={(val) => this.formValChange(val, 'orderStatus')}>
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
                  <Select allowClear placeholder="学员身份" labelInValue onChange={(val) => this.formValChange(val, 'stuType')}>
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
                  <Select allowClear placeholder="准考证填写状态" labelInValue onChange={(val) => this.formValChange(val, 'admissionStatus')}>
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
                  <Select placeholder="消息打开状态"
                    mode="multiple"
                    showArrow={true}
                    maxTagCount={1}
                    labelInValue
                    onChange={(val) => this.formValChange(val, 'msgStatusList')}
                  // onSelect={(val)=>this.checkAllMsg(val)}
                  // onDeselect={(val)=>this.uncheckAllMsg(val)}
                  >
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
                    {menuCheckedName} <Icon type="down" />
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
      </Form>
    );
  }
}

const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);

@connect(({ home, dataDetail }) => ({
  home,
  dataDetail,
}))

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      conditionName: '',
      titleType: 1,  // 1 添加查询条件 2 编辑查询条件
      checkedConditionList: {},
    };
    this.tId = undefined;
  }
  updateCheckedConditions = (val) => {
    this.setState({
      checkedConditionList: val,
    });
    this.props.updateCheckedConditions(val)
  };

  conditionEdit = (item) => {
    this.setState({
      visible: true,
      titleType: 2,
      conditionName: item.paramName
    });
    this.tId = item.id;
  };

  conditionAdd = () => {
    if (!this.state.checkedConditionList.exam) {
      Message.warning('请选择考期');
      return
    }

    if (isEdit) {
      const checkedConditionList = DeepCopy(this.state.checkedConditionList);
      const obj = {
        id: editId,
        paramName: editName,
      };
      for (let key in checkedConditionList) {
        obj[key] = checkedConditionList[key].keys;
        if (key === 'collegeId') {
          obj['collegeName'] = checkedConditionList[key].labels;
        }
        if (key === 'familyIdList') {
          obj['familyNameList'] = checkedConditionList[key].labels;
        }
      }
      this.props.dispatch({
        type: 'dataDetail/updateQueryCondition',
        payload: { params: obj },
      });
    } else {
      this.setState({
        visible: true,
        titleType: 1,
        conditionName: ''
      });
    }
  };

  onChangeUserName = (e) => {
    this.setState({
      conditionName: e.target.value,
    });
  };

  handleOk = () => {
    // 添加查询条件
    if (this.state.titleType === 1) {
      const checkedConditionList = DeepCopy(this.state.checkedConditionList);
      if (!this.state.conditionName) {
        Message.warning('请输入名称');
      }
      const obj = {
        paramName: this.state.conditionName,
      };
      for (let key in checkedConditionList) {
        obj[key] = checkedConditionList[key].keys;
        if (key === 'collegeId') {
          obj['collegeName'] = checkedConditionList[key].labels;
        }
        if (key === 'familyIdList') {
          obj['familyNameList'] = checkedConditionList[key].labels;
        }
      }
      this.props.dispatch({
        type: 'dataDetail/addQueryCondition',
        payload: { params: obj },
      });
    } else if (this.state.titleType === 2) {
      const obj2 = {
        id: this.tId,
        paramName: this.state.conditionName,
      };
      this.props.dispatch({
        type: 'dataDetail/updateQueryCondition',
        payload: { params: obj2 },
      });
      if (this.tId === editId) {
        menuCheckedName = this.state.conditionName;
      }
    }
    this.setState({
      visible: false,

    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { checkedConditionList } = this.state;
    // 构造 checkedConditionList 的node
    function getCheckedConditionList() {
      const list = [];
      for (let key in checkedConditionList) {
        checkedConditionList[key] && list.push(checkedConditionList[key]);
      }
      return list;
    }
    const checkedBtn = getCheckedConditionList().map((v) => (
      <span className={styles.spanBtn} key={v.labels}>{v.labels}</span>
    ));
    return (
      <>
        <div className={styles.searchWrap}>
          <WrappedHorizontalLoginForm
            {...this.props}
            updateCC={(p) => this.updateCheckedConditions(p)}
            menuEdit={(item) => this.conditionEdit(item)}
          />
          {
            getCheckedConditionList().length > 0 ? (
              <div className={styles.searchBoxSeletected}>
                <span className={styles.rowTitle}>已选条件：</span>
                <div className={styles.row}>
                  <span style={{ display: 'inline-flex' }} >{checkedBtn}</span>  <Button type="primary" style={{ marginLeft: '20px' }} onClick={() => this.conditionAdd()}>保存查询条件</Button>
                </div>
              </div>
            ) : null
          }
        </div>

        <Modal
          title={this.state.titleType === 1 ? '添加查询条件' : '编辑查询条件'}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button size="small" onClick={this.handleCancel}>取消</Button>,
            <Button size="small" type="primary" onClick={this.handleOk}>
              确定
            </Button>
          ]}
        >
          <div className={styles.modalWrap}>
            <Input placeholder="输入名称" maxLength={11} value={this.state.conditionName} onChange={this.onChangeUserName} />
          </div>
        </Modal>
      </>
    )
  }
}
export default SearchForm;

