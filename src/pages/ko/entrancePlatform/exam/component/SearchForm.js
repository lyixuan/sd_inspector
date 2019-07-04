/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Icon, Skeleton } from 'antd';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BISelect from '@/ant_components/BISelect';
import BIButton from '@/ant_components/BIButton';
import { BiFilter } from '@/utils/utils';
import formStyles from '../../../components/formCommon.less';
import btnStyles from '../../commom.less';
import styles from './style.less';

const { Option } = BISelect;
const { BIRangePicker } = BIDatePicker;
const dateFormat = 'YYYY.MM.DD';
const searchPramas = {};

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

  handleReset = () => {

  };
  handleSearch = () => {

  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { searchPramas } = this.props;
    return (
      <div>
        <div className={styles.reportExamTable}>
          <div className={`${formStyles.formStyle} ${styles.formCotainer}`}>
            <Form
              layout="inline"
              className="ant-advanced-search-form"
              onSubmit={this.handleSearch}
            >
              <Skeleton loading={false} active>
                <div className={styles.rowWrap}>
                  <div className={`${styles.itemCls} ${styles.itemTips}`}>学员信息：</div>
                  <div className={styles.itemCls}>
                    <Form.Item>
                      {getFieldDecorator('collegeId', {
                        initialValue: searchPramas.collegeId,
                      })(
                        <BISelect placeholder="报考省市" allowClear>
                          {[{ id: 1, name: 'ppppp' }].map(item => <Option key={item.id}
                                                                          value={item.id}>{item.name}</Option>)}
                        </BISelect>,
                      )}
                    </Form.Item>
                  </div>
                  <div className={styles.itemCls}>
                    <Form.Item>
                      {getFieldDecorator('collegeId', {})(
                        <BISelect placeholder="后端归属" allowClear>
                          {[].map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                        </BISelect>,
                      )}
                    </Form.Item>
                  </div>
                  <div className={styles.itemCls}>
                    <Form.Item>
                      {getFieldDecorator('collegeId', {})(
                        <BISelect placeholder="订单状态" allowClear>
                          {[].map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                        </BISelect>,
                      )}
                    </Form.Item>
                  </div>
                  <div className={`${styles.itemCls} ${styles.itemDates}`}>
                    <Form.Item>
                      {getFieldDecorator('choiceTime', {})(
                        <BIRangePicker
                          placeholder={['开始日期', '结束日期']}
                          format={dateFormat}
                        />,
                      )}
                    </Form.Item>
                  </div>
                  <div className={styles.itemCls}>
                    <Form.Item>
                      {getFieldDecorator('collegeId', {})(
                        <BISelect placeholder="是否绑定官微" allowClear>
                          {[].map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                        </BISelect>,
                      )}
                    </Form.Item>
                  </div>
                </div>
                <div className={styles.rowWrap}>
                  <div className={`${styles.itemCls} ${styles.itemTips}`}>通知信息：</div>
                  <div className={styles.itemCls}>
                    <Form.Item>
                      {getFieldDecorator('collegeId', {})(
                        <BISelect placeholder="通知类型" allowClear>
                          {[].map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                        </BISelect>,
                      )}
                    </Form.Item>
                  </div>
                  <div className={styles.itemCls}>
                    <Form.Item>
                      {getFieldDecorator('collegeId', {})(
                        <BISelect placeholder="是否通知" allowClear>
                          {[].map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                        </BISelect>,
                      )}
                    </Form.Item>
                  </div>
                  <div className={styles.itemCls}>
                    <Form.Item>
                      {getFieldDecorator('collegeId', {})(
                        <BISelect placeholder="通知打开状态" allowClear>
                          {[].map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                        </BISelect>,
                      )}
                    </Form.Item>
                  </div>
                </div>
                {this.props.children && <div className={`${styles.rowWrap} ${styles.rowWrapMar}`}>
                  {this.props.children}
                </div>}
                <div className={`${styles.rowWrap} ${styles.actionGroup}`}>
                  <BIButton onClick={this.handleReset} style={{ marginRight: '10px' }}>重置</BIButton>
                  <BIButton type="primary" htmlType="submit">查询</BIButton>
                  <span className={styles.updateDate}>数据更新时间：2019-01-08 01:03:21</span>
                </div>
              </Skeleton>
            </Form>
          </div>
          <div className={styles.searchResult}>
            <div className={styles.totalNumber}>查询结果：共查找出 <span>10,000</span> 个学员</div>
            <div>
              <BIButton className={btnStyles.btnYellow} onClick={this.handleReset} style={{ marginRight: '10px' }}>创建/导出用户群</BIButton>
              <BIButton className={btnStyles.btnBlue} htmlType="submit">查看/导出用户群</BIButton>
            </div>
          </div>
        </div>
      </div>


    );
  }
}

function mapPropsToFields(props) {
  const { params } = props;
  const returnObj = {};
  if (!params || typeof params !== 'object') return returnObj;
  Object.keys(params).forEach(item => {
    returnObj[item] = Form.createFormField({
      value: params[item],
    });
  });
  return returnObj;
}

function onFieldsChange(props, fields, allF) {
  if (props.onChange) {
    const params = {};
    Object.keys(fields).forEach(item => {
      const { value } = fields[item];
      params[item] = value;
    });
    props.onChange(params);
  }

}

const WrappedHorizontalLoginForm = Form.create({
  name: 'Search_Form',
  mapPropsToFields,
  onFieldsChange,
})(HorizontalLoginForm);


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
  deleteFilterItem = e => {
    //删除已选条件
    const delItem = { id: e.currentTarget.id, name: e.currentTarget.dataset.name };
    this.props.onChange({ collegeId: undefined });
  };
  getCheckedConditionList = () => {
    const list = [];
    const { searchPramas } = this.props;
    Object.keys(searchPramas).map(name => {
      if (!searchPramas[name]) {
        return;
      }
      let curObj = searchPramas[name];
      if (curObj instanceof Array) {
        curObj.map(sub => {
          list.push({ ...sub, name: name });
        });
      } else {
        console.log(searchPramas);
        list.push({ key: 1, label: 'ppppp' }, { key: '2', label: '选择时间' });
      }
    });
    return list;
  };

  render() {
    const getCheckedList = this.getCheckedConditionList();
    return (
      <div>
        <WrappedHorizontalLoginForm {...this.props}>
          {getCheckedList.length > 0 ? (<>
              <div className={`${styles.itemCls} ${styles.itemTips}`}>已选条件：</div>
              <div className={styles.selectedContent}>
                {
                  getCheckedList.map(v =>
                    <span className={styles.items} key={v.key}>
                      {v.label}
                      <Icon className={styles.icons} id={v.key} data-name={v.label} onClick={this.deleteFilterItem} type="close"/>
                    </span>
                  )
                }
              </div>
            </>
          ) : null}
        </WrappedHorizontalLoginForm>

      </div>
    );
  }
}

export default SearchForm;
