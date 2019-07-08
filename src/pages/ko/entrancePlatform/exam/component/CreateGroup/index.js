import React, { Component } from 'react';
import { Form, Icon, Skeleton } from 'antd';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BISelect from '@/ant_components/BISelect';
import BIButton from '@/ant_components/BIButton/index';
import CreateModal from '../CreateModal/index';
import btnStyles from '../../../commom.less';
import styles from '../style.less';
import BICascader from '@/ant_components/BICascader/FormCascader';
import { connect } from 'dva';
import router from 'umi/router';

const { Option } = BISelect;
const { BIRangePicker } = BIDatePicker;
const dateFormat = 'YYYY-MM-DD';

function onFieldsChange(props, fields) {
  if (props.onChange) {
    const params = {};
    Object.keys(fields).forEach(item => {
      const { value } = fields[item];
      params[item] = value;
    });
    props.onChange(params);
  }
}

@connect(({ examPlatformModal, loading }) => ({
  userCount: examPlatformModal.userCount,
  userConfigData: examPlatformModal.userConfigData,
  configloading: loading.effects['examPlatformModal/getKOEnumList'],
  queryloading: loading.effects['examPlatformModal/getUserCount'],
}))
class BasicForm extends React.Component {
  constructor(props) {
    super(props);
  }
  // 多级渲染
  renderCascader = (label) => {
    if (Array.isArray(label) && label.length === 0) return;
    let labelStr = label.join('/');
    labelStr = labelStr.length >= 6 ? `${labelStr.substr(0, 6)}...` : labelStr;
    return <span>{labelStr}</span>;
  };
  // handle date
  handleFormatDate = (dateTime = []) => {
    if (dateTime.length > 0) {
      return {beginDate: dateTime[0].format(dateFormat), endDate: dateTime[0].format(dateFormat)};
    }
    return {}
  }
  // handle pramas
  handlePramas = (pramas) => {
    const {choiceTime, orgIdList, ...others} = pramas;
    return {
      ...others,
      orgIdList: orgIdList && orgIdList.map(item => item.value),
      ...this.handleFormatDate(choiceTime)
    }
  }
  // 已选条件
  getCheckedConditionList = () => {
    const { queryCondition, userConfigData } = this.props;
    const list = []
    Object.keys(queryCondition).map(name => {
      const val = queryCondition[name];
      if (val !== undefined) {
        let label = '';
        const config = userConfigData[name];
        if (name === 'orgIdList') {
          if (val instanceof Array) {
            val.forEach((item, index) => label+= item.name + (index === val.length -1 ? '' : '/'))
          }
        } else if (name === 'ordStatusCode') {
          label = config.find(item => val === item.id).name;
        } else if (name === 'choiceTime') {
          label = `订单时间：${val[0].format(dateFormat)} ~ ${val[0].format(dateFormat)}`
        } else if (name !== 'province'){
          label = config[val];
        } else {
          label = val
        }
        list.push({key: name, label: label})
      }
    });
    return list;
  };
  // 删除已选条件
  deleteFilterItem = e => {
    //删除已选条件
    this.props.form.setFieldsValue({[e.currentTarget.id]: undefined})
  };
  // 查询
  handleSearch = (e) => {
    e && e.preventDefault();
    this.props.dispatch({
      type: 'examPlatformModal/getUserCount',
      payload: { params: this.handlePramas(this.props.queryCondition) },
    });
  };
  // 重置
  handleReset = () => {
    this.props.form.resetFields();
  };
  format (num) {
    var reg=/\d{1,3}(?=(\d{3})+$)/g;
    return (num + '').replace(reg, '$&,');
  }
  onHandleRoute () {
    router.push({
      pathname: '/koUserOperation/userOperation',
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { queryCondition, userCount, userConfigData, configloading, queryloading} = this.props;
    const getCheckedList = this.getCheckedConditionList();
    return (
      <>
        <div className={`${styles.formStyle} ${styles.formCotainer}`}>
          <Form
            layout="inline"
            className="ant-advanced-search-form"
            onSubmit={this.handleSearch}
          >
            <Skeleton loading={configloading} active>
              <div className={styles.rowWrap}>
                <div className={`${styles.itemCls} ${styles.itemTips}`}>学员信息：</div>
                <div className={styles.itemCls}>
                  <Form.Item>
                    {getFieldDecorator('province', {
                      initialValue: queryCondition.province,
                    })(
                      <BISelect placeholder="报考省市" allowClear>
                        {userConfigData.province.map(item => <Option key={item} value={item}>{item}</Option>)}
                      </BISelect>,
                    )}
                  </Form.Item>
                </div>
                <div className={styles.itemCls}>
                  <Form.Item>
                    {getFieldDecorator('orgIdList', {
                      initialValue: queryCondition.orgIdList,
                    })(
                      <BICascader placeholder="后端归属" changeOnSelect options={userConfigData.orgIdList}
                                  fieldNames={{ label: 'name', value: 'id', children: 'nodeList' }}
                                  displayRender={this.renderCascader}/>,
                    )}
                  </Form.Item>
                </div>
                <div className={styles.itemCls}>
                  <Form.Item>
                    {getFieldDecorator('ordStatusCode', {
                      initialValue: queryCondition.ordStatusCode,
                    })(
                      <BISelect placeholder="订单状态" allowClear>
                        {userConfigData.ordStatusCode.map(item => <Option key={item.id}
                                                                          value={item.id}>{item.name}</Option>)}
                      </BISelect>,
                    )}
                  </Form.Item>
                </div>
                <div className={`${styles.itemCls} ${styles.itemDates}`}>
                  <Form.Item>
                    {getFieldDecorator('choiceTime', {})(
                      <BIRangePicker
                        placeholder={['订单起始时间', '订单截止时间']}
                        format={dateFormat}
                      />,
                    )}
                  </Form.Item>
                </div>
                <div className={styles.itemCls}>
                  <Form.Item>
                    {getFieldDecorator('wechatBinded', {
                      initialValue: queryCondition.wechatBinded,
                    })(
                      <BISelect placeholder="是否绑定官微" allowClear>
                        {userConfigData.wechatBinded.map((item, index) => <Option key={index} value={index}>{item}</Option>)}
                      </BISelect>,
                    )}
                  </Form.Item>
                </div>
              </div>
              <div className={styles.rowWrap}>
                <div className={`${styles.itemCls} ${styles.itemTips}`}>通知信息：</div>
                <div className={styles.itemCls}>
                  <Form.Item>
                    {getFieldDecorator('pushType', {
                      initialValue: queryCondition.pushType,
                    })(
                      <BISelect placeholder="通知类型" allowClear>
                        {userConfigData.pushType.map((item, index) => <Option key={index} value={index}>{item}</Option>)}
                      </BISelect>,
                    )}
                  </Form.Item>
                </div>
                <div className={styles.itemCls}>
                  <Form.Item>
                    {getFieldDecorator('pushed', {})(
                      <BISelect placeholder="是否通知" allowClear>
                        {userConfigData.pushed.map((item, index) => <Option key={index} value={index}>{item}</Option>)}
                      </BISelect>,
                    )}
                  </Form.Item>
                </div>
                <div className={styles.itemCls}>
                  <Form.Item>
                    {getFieldDecorator('pushOpenStatus', {})(
                      <BISelect placeholder="通知打开状态" allowClear>
                        {userConfigData.pushOpenStatus.map((item, index) => <Option key={index} value={index}>{item}</Option>)}
                      </BISelect>,
                    )}
                  </Form.Item>
                </div>
              </div>
              {
                getCheckedList.length > 0 && (
                  <div className={`${styles.rowWrap} ${styles.rowWrapMar}`}>
                    <div className={`${styles.itemCls} ${styles.itemTips}`}>已选条件：</div>
                    <div className={styles.selectedContent}>
                      {
                        getCheckedList.map(v =>
                          <span className={styles.items} key={v.key}>
                            {v.label}
                            <Icon className={styles.icons} id={v.key} data-name={v.label}
                                  onClick={this.deleteFilterItem} type="close"/>
                          </span>,
                        )
                      }
                    </div>
                  </div>
                )}
              <div className={`${styles.rowWrap} ${styles.actionGroup}`}>
                <BIButton onClick={this.handleReset} style={{ marginRight: '10px' }}>重置</BIButton>
                <BIButton type="primary" htmlType="submit" loading={queryloading}>查询</BIButton>
                <span className={styles.updateDate}>数据更新时间：2019-01-08 01:03:21</span>
              </div>
            </Skeleton>
          </Form>
        </div>
        <div className={styles.searchResult}>
          <div className={styles.totalNumber}>查询结果：共查找出 <span>{this.format(userCount)}</span> 个学员</div>
          <div>
            <CreateModal queryloading={queryloading} handlePramas={this.handlePramas} queryCondition={queryCondition} userCount={userCount}></CreateModal>
            <BIButton onClick={this.onHandleRoute} className={btnStyles.btnBlue}>查看/导出用户群</BIButton>
          </div>
        </div>
      </>
    );
  }
}

const SearchForm = Form.create({ name: 'BasicForm', onFieldsChange })(BasicForm);

// 数据提取
@connect(({ examPlatformModal, loading }) => ({}))
class CreateGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryCondition: {},
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'examPlatformModal/getKOEnumList',
    });
  }

  onChange = (paramas) => {
    this.setState({
      queryCondition: { ...this.state.queryCondition, ...paramas },
    });
  };

  render() {
    return (
      <SearchForm onChange={this.onChange} queryCondition={this.state.queryCondition}></SearchForm>
    );
  }
}

export default CreateGroup;
