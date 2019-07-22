import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Form, Icon, Skeleton, Button, Cascader } from 'antd';
import {
  handleDefaultPickerExamValue,
  handleTNDateValue,
  initRecordTimeListData,
} from '../../../utils/utils';
import BICascader from '@/ant_components/BICascader/FormCascader';
import BIDatePicker from '@/ant_components/BIDatePicker';
import AuthButton from '@/components/AuthButton';
import BISelect from '@/ant_components/BISelect';
import CreateModal from '../CreateModal';
import btnStyles from '../../btnstyles.less';
import styles from '../style.less';
import moment from 'moment';

const { Option } = BISelect;
const { BIRangePicker } = BIDatePicker;
const dateFormat = 'YYYY-MM-DD';

function onFieldsChange(props, fields) {
  if (props.onChange) {
    const params = {};
    Object.keys(fields).forEach(item => {
      const { value } = fields[item];
      params[item] = value;
      if (item === 'pushed' && value === 0) {
        params.pushOpenStatus = undefined;
        props.form.setFieldsValue({pushOpenStatus: undefined})
      }
    });
    props.onChange(params);
  }
}

@connect(({ examPlatformModal, koPlan, loading,  }) => ({
  userCount: examPlatformModal.userCount,
  userConfigData: examPlatformModal.userConfigData,
  koDateRange: examPlatformModal.koDateRange,
  currentServiceTime: koPlan.currentServiceTime,
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
      return {beginDate: dateTime[0].format(dateFormat), endDate: dateTime[1].format(dateFormat)};
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
  // getCheckedConditionList = () => {
  //   const { queryCondition, userConfigData } = this.props;
  //   const list = [];
  //   Object.keys(queryCondition).map(name => {
  //     const val = queryCondition[name];
  //     const bul = val instanceof Array;
  //     if ((bul && val.length > 0) ||  (!bul && val !== undefined)) {
  //       let label = '';
  //       const config = userConfigData[name];
  //       if (name === 'orgIdList') {
  //         if (val instanceof Array) {
  //           val.forEach((item, index) => label+= item.name + (index === val.length -1 ? '' : '/'))
  //         }
  //       } else if (name === 'ordStatusCode') {
  //         label = config.find(item => val === item.id).name;
  //       } else if (name === 'choiceTime') {
  //         label = `订单时间：${val[0].format(dateFormat)} ~ ${val[0].format(dateFormat)}`
  //       } else if (name !== 'province'){
  //         label = config[val];
  //       } else {
  //         label = val
  //       }
  //       list.push({key: name, label: label})
  //     }
  //   });
  //   return list;
  // };
  // 删除已选条件
  deleteFilterItem = e => {
    //删除已选条件
    this.props.form.setFieldsValue({[e.currentTarget.id]: undefined})
    this.props.onChange({[e.currentTarget.id]: undefined})
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
  // 千分展示数值
  userCountformat = (num) => {
    var reg=/\d{1,3}(?=(\d{3})+$)/g;
    return (num + '').replace(reg, '$&,');
  }
  // 权限允许，则跳转到群组管理
  onHandleRoute = () => {
    const pathname = '/koUserOperation/userOperation';
    if (AuthButton.checkPathname(pathname)) {
      router.push({ pathname });
    }
  }
  // 时间置灰
  dateDisabledDate = (current) => {
    return current.isBefore(moment('2015-01-01')) || current.isAfter(moment(handleTNDateValue(1, this.props.currentServiceTime)))
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { queryCondition, userCount, userConfigData, configloading, queryloading, currentServiceTime, querySelected} = this.props;
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
                      <BISelect
                        placeholder="报考省市"
                        dropdownClassName={styles.popupClassName}
                        getPopupContainer={triggerNode => triggerNode.parentNode}
                        allowClear>
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
                      <BICascader placeholder="后端归属"
                                  popupClassName={styles.popupClassName}
                                  changeOnSelect options={userConfigData.orgIdList}
                                  fieldNames={{ label: 'name', value: 'id', children: 'nodeList' }}
                                  getPopupContainer={triggerNode => triggerNode.parentNode}
                                  displayRender={this.renderCascader}/>,
                    )}
                  </Form.Item>
                </div>
                <div className={styles.itemCls}>
                  <Form.Item>
                    {getFieldDecorator('ordStatusCode', {
                      initialValue: queryCondition.ordStatusCode,
                    })(
                      <BISelect placeholder="订单状态"
                                dropdownClassName={styles.popupClassName}
                                getPopupContainer={triggerNode => triggerNode.parentNode}
                                allowClear>
                        {userConfigData.ordStatusCode.map(item => <Option key={item.id}
                                                                          value={item.id}>{item.name}</Option>)}
                      </BISelect>,
                    )}
                  </Form.Item>
                </div>
                <div className={`${styles.itemCls} ${styles.itemDates}`}>
                  <Form.Item>
                    {getFieldDecorator('choiceTime', {
                      initialValue: queryCondition.choiceTime,
                    })(
                      <BIRangePicker
                        placeholder={['订单起始时间', '订单截止时间']}
                        format={dateFormat}
                        defaultPickerValue={handleDefaultPickerExamValue(currentServiceTime)}
                        disabledDate={this.dateDisabledDate}
                        dropdownClassName={styles.popupClassName}
                        getCalendarContainer={triggerNode => triggerNode.parentNode}
                      />,
                    )}
                  </Form.Item>
                </div>
                <div className={styles.itemCls}>
                  <Form.Item>
                    {getFieldDecorator('wechatBinded', {
                      initialValue: queryCondition.wechatBinded,
                    })(
                      <BISelect
                        placeholder="是否绑定官微"
                        dropdownClassName={styles.popupClassName}
                        getPopupContainer={triggerNode => triggerNode.parentNode}
                        allowClear>
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
                      <BISelect
                        placeholder="通知类型"
                        dropdownClassName={styles.popupClassName}
                        getPopupContainer={triggerNode => triggerNode.parentNode}
                        allowClear>
                        {userConfigData.pushType.map((item, index) => <Option key={index} value={index}>{item}</Option>)}
                      </BISelect>,
                    )}
                  </Form.Item>
                </div>
                <div className={styles.itemCls}>
                  <Form.Item>
                    {getFieldDecorator('pushed', {
                      initialValue: queryCondition.pushed,
                    })(
                      <BISelect
                        placeholder="是否通知"
                        dropdownClassName={styles.popupClassName}
                        getPopupContainer={triggerNode => triggerNode.parentNode}
                        allowClear>
                        {userConfigData.pushed.map((item, index) => <Option key={index} value={index}>{item}</Option>)}
                      </BISelect>,
                    )}
                  </Form.Item>
                </div>
                <div className={styles.itemCls}>
                  <Form.Item>
                    {getFieldDecorator('pushOpenStatus', {
                      initialValue: queryCondition.pushOpenStatus,
                    })(
                      <BISelect
                        placeholder="通知打开状态"
                        dropdownClassName={styles.popupClassName}
                        disabled={queryCondition.pushed === 0}
                        getPopupContainer={triggerNode => triggerNode.parentNode}
                        allowClear>
                        {userConfigData.pushOpenStatus.map((item, index) => <Option key={index} value={index}>{item}</Option>)}
                      </BISelect>,
                    )}
                  </Form.Item>
                </div>
              </div>
              {
                querySelected.length > 0 && (
                  <div className={`${styles.rowWrap} ${styles.rowWrapMar}`}>
                    <div className={`${styles.itemCls} ${styles.itemTips}`}>已选条件：</div>
                    <div className={styles.selectedContent}>
                      {
                        querySelected.map(v =>
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
                <Button className={btnStyles.btnCancel} onClick={this.handleReset} style={{ marginRight: '10px' }}>{'重'}{'置'}</Button>
                <Button className={btnStyles.btnPrimary} htmlType="submit" loading={queryloading}>{'查'}{'询'}</Button>
                <span className={styles.updateDate}>数据更新时间：{handleTNDateValue(2, currentServiceTime)}</span>
              </div>
            </Skeleton>
          </Form>
        </div>
        <div className={styles.searchResult}>
          <div className={styles.totalNumber}>查询结果：共查找出 <span>{this.userCountformat(userCount)}</span> 个学员</div>
          <div>
            <CreateModal onHandleRoute={this.onHandleRoute} queryloading={queryloading} handlePramas={this.handlePramas} queryCondition={queryCondition} userCount={userCount}></CreateModal>
            <AuthButton authority='/koUserOperation/userOperation'>
              <Button onClick={this.onHandleRoute} className={btnStyles.btnBlue}>查看/导出用户群</Button>
            </AuthButton>
          </div>
        </div>
      </>
    );
  }
}

const SearchForm = Form.create({ name: 'BasicForm', onFieldsChange })(BasicForm);

// 数据提取
@connect(({ examPlatformModal }) => ({
  userConfigData: examPlatformModal.userConfigData,
}))
class CreateGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryCondition: {},
      querySelected: []
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'examPlatformModal/getKOEnumList',
    });
  }

  // 已选条件
  getCheckedConditionList = (paramas) => {
    const { userConfigData } = this.props;
    const list = [];
    let querySelectedNew = this.state.querySelected;
    Object.keys(paramas).map(currentKey => {
      const val = paramas[currentKey];
      const bul = val instanceof Array;
      if (currentKey && (bul && val.length > 0) ||  (!bul && val !== undefined)) {
        let label = '';
        const config = userConfigData[currentKey];
        if (currentKey === 'orgIdList') {
          if (val instanceof Array) {
            val.forEach((item, index) => label+= item.name + (index === val.length -1 ? '' : '/'))
          }
        } else if (currentKey === 'ordStatusCode') {
          label = config.find(item => val === item.id).name;
        } else if (currentKey === 'choiceTime') {
          label = `订单时间：${val[0].format(dateFormat)} ~ ${val[1].format(dateFormat)}`
        } else if (currentKey !== 'province'){
          label = config[val];
        } else {
          label = val
        }
        list.push({key: currentKey, label: label});
      }
      querySelectedNew = querySelectedNew.filter(item => item.key !== currentKey);
    })
    return querySelectedNew.concat(list);
  };
  onChange = (paramas) => {
    this.setState({
      queryCondition: { ...this.state.queryCondition, ...paramas },
      querySelected: this.getCheckedConditionList(paramas)
    });
  };

  render() {
    return (
      <SearchForm onChange={this.onChange} querySelected={this.state.querySelected} queryCondition={this.state.queryCondition}></SearchForm>
    );
  }
}

export default CreateGroup;
