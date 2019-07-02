/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Icon, Skeleton } from 'antd';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BISelect from '@/ant_components/BISelect';
import BIButton from '@/ant_components/BIButton';
import { BiFilter } from '@/utils/utils';
import formStyles from '../../../components/formCommon.less';
// import styles from '../style.less';
import styles from './style.less';

const { Option } = BISelect;
const { BIRangePicker } = BIDatePicker;
const dateFormat = 'YYYY.MM.DD';

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
      <div className={`${formStyles.formStyle} ${styles.formCotainer}`}>
        <Form
          layout="inline"
          className="ant-advanced-search-form"
          onSubmit={this.handleSearch}
        >
          <Skeleton loading={false} active>
            <div className={styles.rowWrap}>
              <div className={styles.itemCls}>
                <Form.Item label='选择时间：'>
                  {getFieldDecorator('choiceTime', {
                  })(
                    <BIRangePicker
                      placeholder={['起始时间', '截止时间']}
                      format={dateFormat}
                    />,
                  )}
                </Form.Item>
              </div>
              <div className={styles.itemCls}>
                <Form.Item>
                  {getFieldDecorator('collegeId', {
                  })(
                    <BISelect placeholder="请选择" allowClear>
                      {[].map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                    </BISelect>,
                  )}
                </Form.Item>
              </div>
              <div className={styles.itemCls}>
                <Form.Item>
                  {getFieldDecorator('collegeId', {
                  })(
                    <BISelect placeholder="请选择" allowClear>
                      {[].map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                    </BISelect>,
                  )}
                </Form.Item>
              </div>
              <div className={styles.itemCls}>
                <Form.Item>
                  {getFieldDecorator('collegeId', {
                  })(
                    <BISelect placeholder="请选择" allowClear>
                      {[].map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                    </BISelect>,
                  )}
                </Form.Item>
              </div>
              <div className={styles.itemCls}>
                <Form.Item>
                  {getFieldDecorator('collegeId', {
                  })(
                    <BISelect placeholder="请选择" allowClear>
                      {[].map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                    </BISelect>,
                  )}
                </Form.Item>
              </div>
            </div>
          </Skeleton>
          <div className={`${styles.rowWrap} ${styles.buttonGroup}`}>
            <BIButton onClick={this.handleReset} style={{ marginRight: '10px' }}>重置</BIButton>
            <BIButton type="primary" htmlType="submit">查询</BIButton>
          </div>
        </Form>
      </div>
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
