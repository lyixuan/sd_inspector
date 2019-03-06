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

@connect(({ home,dataDetail }) => ({
  home,
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

  menuDel = (e) => {
    this.props.menuDel(e);
  };

  menuEdit = (e) => {
    this.props.menuEdit(e);
  };

  menuCheck = (val) => {
    this.checkedConditionList = {
      exam: {labels:val.exam2,keys:val.exam},
      provinceList: val.provinceList.split(','),
      collegeId: val.collegeId,
      familyIdList: arr,
      orderStatus: val.orderStatus,
      stuType: val.stuType,
      admissionStatus: val.admissionStatus,
      msgState: arr2,
    };
    let arr = undefined;
    if (val.familyIdList) {
      arr = val.familyIdList.split(',');
      arr.forEach((v,i) => {
        arr[i] = Number(arr[i]);
      });
    }
    let arr2 = undefined;
    if (val.msgStatusList) {
      arr2 = val.msgStatusList.split(',');
      arr2.forEach((v,i) => {
        arr2[i] = Number(arr2[i]);
      });
    }
    let arr3 = undefined;
    if (val.provinceList) {
      arr3 = val.provinceList.split(',');
    }
    this.props.form.setFieldsValue({
      exam: {key:val.exam,label:val.exam2},
      provinceList: {key:arr3,label:val.arr3},
      collegeId: {key:val.collegeId,label:val.collegeName},
      familyIdList: arr,
      orderStatus: val.orderStatus,
      stuType: val.stuType,
      admissionStatus: val.admissionStatus,
      msgState: arr2,
    });
    this.setState({
      menuCheckedName:val.paramName
    });
  };

  formValChange = (val, key) => {
    console.log(1111);
    // 学院家族联动
    if (key === 'collegeId') {
      this.collegeList.forEach((v)=>{
        if (v.id === Number(val.key)) {
          this.familyList = v.sub;
        }
      });
      this.props.form.setFieldsValue({
        familyIdList: []
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
      this.checkedConditionList[key] = {labels,keys};
    } else {
      delete this.checkedConditionList[key];
    }
    this.props.updateCC(this.checkedConditionList);
  };

  handleReset = () => {
    this.checkedConditionList= {};
    this.props.form.resetFields();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.checkedConditionList.exam) {
      Message.warning('请选择考期');
      return
    }
    const obj = {};
    const  checkedConditionList = DeepCopy(this.checkedConditionList);
    for (let key in checkedConditionList) {
      if ('provinceList' === key) {
        obj[key] = checkedConditionList[key].keys.split(',');
      }else if ('familyIdList' === key) {
        obj[key] = checkedConditionList[key].keys.split(',');
        obj[key].forEach((v,i) => {
          obj[key][i] = Number(obj[key][i]);
        })
      } else if ('msgStatusList' === key) {
        obj[key] = checkedConditionList[key].keys.split(',');
        obj[key].forEach((v,i) => {
          obj[key][i] = Number(obj[key][i]);
        })
      } else {
        obj[key] = checkedConditionList[key].keys
      }
    }
    this.props.dispatch({
      type: 'dataDetail/getDetailData',
      payload: { params: obj },
    });
  };

  render() {
    this.examList = this.props.dataDetail.examList;
    this.conditionList = this.props.dataDetail.queryConditionList || [];
    this.collegeList = this.props.home.orgList;

    const { getFieldDecorator, } = this.props.form;
    const menu = (
      <Menu>
        {this.conditionList.map(item => (
          <Menu.Item key={item.id}>
            <span onClick={() => this.menuCheck(item)} >{item.paramName}</span><Icon onClick={() => this.menuDel(item.id)} style={{marginLeft:'5px'}}  type="delete" />  <Icon onClick={() => this.menuEdit(item)} type="edit" />
          </Menu.Item>
        ))}
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
                  <Select placeholder="考期" labelInValue onChange={(val) => this.formValChange(val,'exam')}>
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
                {getFieldDecorator('provinceList', {
                  initialValue: this.state.provinceList,
                })(
                  <Select placeholder="报考省份"  mode="multiple" showArrow={true} maxTagCount={1} labelInValue onChange={(val) => this.formValChange(val,'provinceList')}>
                    {this.provinceAllList.map(item => (
                      <Option key={item.name}>
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
                  <Select placeholder="家族" mode="multiple" showArrow={true} maxTagCount={1} labelInValue onChange={(val) => this.formValChange(val,'familyIdList')}>
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
      </Form>
    );
  }
}

const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);

@connect(({ home,dataDetail }) => ({
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
      checkedConditionList: {}
    };
    this.tId = undefined;
  }

  updateCheckedConditions = (val) => {
    console.log('updateCheckedConditions', val);
    this.setState({
      checkedConditionList: val,
    });

    const obj = {};
    const  checkedConditionList = DeepCopy(val);
    for (let key in checkedConditionList) {
      if ('provinceList' === key) {
        obj[key] = checkedConditionList[key].keys.split(',');
      }else if ('familyIdList' === key) {
        obj[key] = checkedConditionList[key].keys.split(',');
        obj[key].forEach((v,i) => {
          obj[key][i] = Number(obj[key][i]);
        })
      } else if ('msgStatusList' === key) {
        obj[key] = checkedConditionList[key].keys.split(',');
        obj[key].forEach((v,i) => {
          obj[key][i] = Number(obj[key][i]);
        })
      } else {
        obj[key] = checkedConditionList[key].keys
      }
    }
    this.props.updateCheckedConditions(obj)
  };

  conditionDel = (id) => {
    const that = this;
    confirm({
      title: '是否删除当前查询条件?',
      onOk() {
        that.props.dispatch({
          type: 'dataDetail/deleteQueryCondition',
          payload: { params: {id} },
        });
      },
      onCancel() {},
    });
  };

  conditionEdit = (item) => {
    console.log(item.paramName);
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
    this.setState({
      visible: true,
      titleType: 1,
      conditionName: ''
    });
  };

  onChangeUserName = (e) => {
    this.setState({
      conditionName: e.target.value,
    });
  };

  handleOk = () => {
    // 添加查询条件
    if (this.state.titleType === 1) {
      const  checkedConditionList = DeepCopy(this.state.checkedConditionList);
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
    }
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
    const  {checkedConditionList}   = this.state;
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
            updateCC={(p)=>this.updateCheckedConditions(p)}
            menuDel={(id) => this.conditionDel(id)}
            menuEdit={(item) => this.conditionEdit(item)}
          />
          {
            getCheckedConditionList().length > 0 ? (
              <div className={styles.searchBoxSeletected}>
                <span className={styles.rowTitle}>已选条件：</span>
                <div className={styles.row}>
                  {checkedBtn} <Button type="primary" style={{marginLeft:'20px'}} onClick={() => this.conditionAdd()}>保存查询条件</Button>
                </div>
              </div>
            ):null
          }
        </div>
        <Modal
          title={this.state.titleType === 1 ? '添加查询条件' : '编辑查询条件'}
          visible={this.state.visible}
          footer={[
            <Button size="small" onClick={this.handleCancel}>取消</Button>,
            <Button size="small" type="primary" onClick={this.handleOk}>
              确定
            </Button>
          ]}
        >
          <div className={styles.modalWrap}>
            <Input placeholder="输入名称" maxLength={11} value={this.state.conditionName} onChange={this.onChangeUserName}/>
          </div>
        </Modal>
      </>
    )
  }
}

export default SearchForm;

