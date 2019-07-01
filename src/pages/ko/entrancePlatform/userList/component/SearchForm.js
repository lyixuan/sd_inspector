/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Icon } from 'antd';
import BISelect from '@/ant_components/BISelect';
import BIButton from '@/ant_components/BIButton';
import { BiFilter } from '@/utils/utils';

import styles from '../style.less';

const { Option } = BISelect;

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
    this.checkedConditionList = {
      exam: undefined,
      collegeId: undefined,
      familyIdList: undefined,
      orderStatus: undefined,
      stuType: undefined,
      admissionStatus: undefined,
      msgStatusList: undefined,
    };
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
  menuEdit = e => {
    this.props.menuEdit(e);
  };
  formValChange = (val, key) => {
    if (val === undefined) {
      delete this.checkedConditionList[key];
      if (key === 'collegeId') {
        this.props.form.setFieldsValue({
          familyIdList: undefined,
        });
        delete this.checkedConditionList['familyIdList'];
      }
      this.props.updateCC(this.checkedConditionList);
      return;
    }
    this.checkedConditionList[key] = val;
    this.props.updateCC(this.checkedConditionList);
  };
  handleReset = () => {

  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline" onSubmit={this.handleSubmit} className="dxForm">
        <div className={styles.searchBoxBg}>
          <div className={styles.row}>
            {/*第二行*/}
            <div>
              <Form.Item label="学员信息" className={styles.formItem}>
                {getFieldDecorator('collegeId', {
                  initialValue: this.state.collegeId,
                })(
                  <BISelect
                    allowClear
                    placeholder="报考省市"
                    style={{ width: 190 }}
                    labelInValue
                    onChange={val => this.formValChange(val, 'collegeId')}
                  >
                    {[].map(item => (
                      <Option key={item.id}>{item.name}</Option>
                    ))}
                  </BISelect>,
                )}
              </Form.Item>
              <Form.Item className={styles.formItem}>
                {getFieldDecorator('familyIdList', {
                  initialValue: this.state.familyIdList,
                })(
                  <BISelect
                    placeholder="所属学院"
                    mode="multiple"
                    allowClear
                    style={{ width: 190 }}
                    showArrow
                    maxTagCount={1}
                    labelInValue
                    onChange={val => this.formValChange(val, 'familyIdList')}
                  >
                    {[].map(item => (
                      <Option key={item.id}>{item.name}</Option>
                    ))}
                  </BISelect>,
                )}
              </Form.Item>
              <Form.Item className={styles.formItem}>
                {getFieldDecorator('orderStatus', {
                  initialValue: this.state.orderStatus,
                })(
                  <BISelect
                    allowClear
                    placeholder="订单状态"
                    style={{ width: 190 }}
                    labelInValue
                    onChange={val => this.formValChange(val, 'orderStatus')}
                  >
                    {BiFilter('ORDER_STATE').map(item => (
                      <Option value={item.id} key={item.name}>
                        {item.name}
                      </Option>
                    ))}
                  </BISelect>,
                )}
              </Form.Item>
              <Form.Item className={styles.formItem}>
                {getFieldDecorator('stuType', {
                  initialValue: this.state.stuType,
                })(
                  <BISelect
                    allowClear
                    placeholder="是否绑定官微"
                    style={{ width: 190 }}
                    labelInValue
                    onChange={val => this.formValChange(val, 'stuType')}
                  >
                    {BiFilter('STUDENT_TYPE').map(item => (
                      <Option value={item.id} key={item.name}>
                        {item.name}
                      </Option>
                    ))}
                  </BISelect>,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('stuType', {
                  initialValue: this.state.stuType,
                })(
                  <BISelect
                    allowClear
                    placeholder="是否绑定官微"
                    style={{ width: 190 }}
                    labelInValue
                    onChange={val => this.formValChange(val, 'stuType')}
                  >
                    {BiFilter('STUDENT_TYPE').map(item => (
                      <Option value={item.id} key={item.name}>
                        {item.name}
                      </Option>
                    ))}
                  </BISelect>,
                )}
              </Form.Item>
            </div>
            {/* 第三行 */}
            <div>
              <Form.Item label="业务信息" className={styles.formItem}>
                {getFieldDecorator('admissionStatus', {
                  initialValue: this.state.admissionStatus,
                })(
                  <BISelect
                    allowClear
                    placeholder="通知类型"
                    style={{ width: 190 }}
                    labelInValue
                    onChange={val => this.formValChange(val, 'admissionStatus')}
                  >
                    {BiFilter('TICKET_STATES').map(item => (
                      <Option value={item.id} key={item.name}>
                        {item.name}
                      </Option>
                    ))}
                  </BISelect>,
                )}
              </Form.Item>
              <Form.Item className={styles.formItem}>
                {getFieldDecorator('msgStatusList', {
                  initialValue: this.state.msgStatusList,
                })(
                  <BISelect
                    placeholder="是否通知"
                    style={{ width: 190 }}
                    mode="multiple"
                    showArrow
                    allowClear
                    maxTagCount={1}
                    labelInValue
                    onChange={val => this.formValChange(val, 'msgStatusList')}
                  >
                    {BiFilter('MSG_STATES').map(item => (
                      <Option key={item.id}>{item.name}</Option>
                    ))}
                  </BISelect>,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('stuType', {
                  initialValue: this.state.stuType,
                })(
                  <BISelect
                    allowClear
                    placeholder="是否绑定官微"
                    style={{ width: 190 }}
                    labelInValue
                    onChange={val => this.formValChange(val, 'stuType')}
                  >
                    {BiFilter('STUDENT_TYPE').map(item => (
                      <Option value={item.id} key={item.name}>
                        {item.name}
                      </Option>
                    ))}
                  </BISelect>,
                )}
              </Form.Item>
            </div>
            {/* 第四行 */}
            <div style={{ marginTop: '40px', marginBottom: 0 }}>
              <div style={{ float: 'right', marginTop: 3 }}>
                <BIButton style={{ marginRight: 10 }} type="primary" htmlType="submit">
                  查询
                </BIButton>
                <BIButton onClick={this.handleReset}>重置</BIButton>
              </div>
            </div>
          </div>
        </div>
      </Form>
    );
  }
}

const WrappedHorizontalLoginForm = Form.create({ name: 'Search_Form' })(HorizontalLoginForm);

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
      titleType: 1, // 1 添加查询条件 2 编辑查询条件
      checkedConditionList: {},
      itemName: null, //删除已保存的选项时，更新已选择的过滤条件
    };
    this.tId = undefined;
    this.formRef = undefined;
  }

  updateCheckedConditions = val => {
    this.setState({
      checkedConditionList: val,
    });
    console.log(val, '------', this.state.checkedConditionList);
    this.props.updateCheckedConditions(val);
  };

  conditionEdit = item => {
    this.setState({
      visible: true,
      titleType: 2,
      conditionName: item.paramName,
    });
    this.tId = item.id;
  };
  deleteFilterItem = e => {
    //删除已选条件
    const delItem = { id: e.currentTarget.id, name: e.currentTarget.dataset.name };
    const checkedConditionList = this.state.checkedConditionList;
    Object.keys(checkedConditionList).forEach(name => {
      if (name === e.currentTarget.dataset.name) {
        if (checkedConditionList[name] instanceof Array) {
          checkedConditionList[name] = this.getFilterArr(
            checkedConditionList[delItem.name],
            delItem,
          );
        } else {
          if (name === 'collegeId') {
            checkedConditionList[name] = undefined;
            checkedConditionList['familyIdList'] = undefined;
          } else {
            checkedConditionList[name] = undefined;
          }
        }
      }
    });
    this.formRef.props.form.setFieldsValue({ ...checkedConditionList });
    this.setState({ checkedConditionList: checkedConditionList });
  };

  render() {
    let { checkedConditionList } = this.state;

    // 构造 checkedConditionList 的node
    function getCheckedConditionList() {
      const list = [];
      Object.keys(checkedConditionList).map(name => {
        if (!checkedConditionList[name]) {
          return;
        }
        let curObj = checkedConditionList[name];
        if (curObj instanceof Array) {
          curObj.map(sub => {
            list.push({ ...sub, name: name });
          });
        } else {
          checkedConditionList[name]['name'] = name;
          list.push(checkedConditionList[name]);
        }
      });
      return list;
    }

    const checkedBtn = getCheckedConditionList().map(v => {
      return (
        <span className={styles.spanBtn} key={v.label}>
          {v.label}
          <Icon
            id={v.key}
            data-name={v.name}
            onClick={this.deleteFilterItem}
            style={{ marginLeft: '5px' }}
            type="close"
          />
        </span>
      );
    });
    return (
      <>
        <div>
          <WrappedHorizontalLoginForm
            {...this.props}
            updateFormItem={this.state.itemName}
            wrappedComponentRef={inst => (this.formRef = inst)}
            updateCC={p => this.updateCheckedConditions(p)}
            menuEdit={item => this.conditionEdit(item)}
          />
          {getCheckedConditionList().length > 0 ? (
            <div className={styles.searchBoxSeletected}>
              <span className={styles.rowTitle2}>已选条件</span>
              <div className={styles.row11}>
                <span style={{ display: 'inline-flex' }}>{checkedBtn}</span>{' '}
              </div>
            </div>
          ) : null}
        </div>
      </>
    );
  }
}

export default SearchForm;
