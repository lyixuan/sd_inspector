import React from 'react';
import { Skeleton, Form, message } from 'antd';
import { handleDateParams, handleDefaultPickerValueMark } from '@/pages/ko/utils/utils';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BICascader from '@/ant_components/BICascader/FormCascader';
import BISelect from '@/ant_components/BISelect';
import BIButton from '@/ant_components/BIButton';
import { connect } from 'dva/index';
import formStyles from '../../../components/formCommon.less';
import styles from './style.less';

const { BIRangePicker } = BIDatePicker;
const { Option } = BISelect;
const dateFormat = 'YYYY.MM.DD';
const robotData = [
  { id: 0, name: '班主任会话' },
  { id: 2, name: '客诉会话' },
  { id: 1, name: '机器人会话' },
]
@connect(({ koPlan, workTableModel, loading }) => ({
  koPlanPageParams: koPlan.pageParams,
  currentServiceTime: koPlan.currentServiceTime,
  globalOrgList: workTableModel.globalOrgList,
  loading: loading.effects['workTableModel/getBasicData'] || loading.effects['koPlan/getCurrentTime'],
}))
class AiForm extends React.Component {
  componentDidMount() {
    if (!this.props.currentServiceTime) {
      this.props.dispatch({
        type: 'koPlan/getCurrentTime',
        callback: (res) => {
          this.props.changeOperatorId('choiceTime', handleDefaultPickerValueMark(2, res));
          this.handleSearch();
          this.onChangeTime(this.props.searchParams.choiceTime)
        }
      });
    } else {
      this.handleSearch();
      this.onChangeTime(this.props.searchParams.choiceTime)
    }

  }
  // 时间间隔不超过四十天
  getChangeTime = (c) => {
    if (c.length === 0 || (c.length === 2 && c[1].diff(c[0], 'day') > 39)) {
      message.error('请选择 ≤ 40 天的时间范围');
      return false
    }
    return true;
  }
  // 处理查询数据
  checkoutParamsType = (key, item) => {
    let returnItem = undefined;
    switch (key) {
      case 'choiceTime':
        returnItem = (Array.isArray(item) && item.length > 0) ? handleDateParams(item) : [];
        break;
      default:
        returnItem = item;
        break;
    }
    return returnItem;
  };
  // 查询事件
  handleSearch = (e) => {
    e && e.preventDefault();
    const { onSearchChange, form } = this.props;
    form.validateFields((err, values) => {
      if (!this.getChangeTime(values.choiceTime)) return;
      if (onSearchChange) {
        const [beginDate, endDate] = this.checkoutParamsType('choiceTime', values.choiceTime);
        onSearchChange({ ...values, beginDate, endDate });
      }
    });
  };
  // 重置事件
  handleReset = () => {
    const { searchParams, currentServiceTime } = this.props;
    for (let k in searchParams) {
      if (k === 'choiceTime') {
        searchParams[k] = handleDefaultPickerValueMark(2, currentServiceTime);
      } else {
        searchParams[k] = undefined;
      }
    }
    const [beginDate, endDate] = this.checkoutParamsType('choiceTime', searchParams.choiceTime);
    this.props.form.resetFields();
    this.props.onSearchChange({ ...searchParams, beginDate, endDate });
  };
  //操作ID
  onChangeTime = (value, flag) => {
    if (!this.getChangeTime(value)) return;
    const [beginDate, endDate] = this.checkoutParamsType('choiceTime', value);
    if (this.props.markType === 4) {
      this.getUserOrgList({ startTime: beginDate, endTime: endDate });
    }
    this.props.dispatch({
      type: 'workTableModel/getOperatorList',
      payload: { params: { beginDate, endDate, type: this.props.markType } },
      callback: () => {

        if (this.props.changeOperatorId && flag) {
          this.props.changeOperatorId('operatorId');
          this.props.form.setFieldsValue({ operatorId: undefined });
        }
      }
    });
  }
  getUserOrgList = (params) => {
    this.props.dispatch({
      type: 'workTableModel/getUserOrgList',
      payload: { params },
    });
  }

  render() {
    console.log(117, this.props)
    const { getFieldDecorator } = this.props.form;
    const { markType, searchParams, collegeList, consultList, reasonList, evaluateList, operatorList, evaluationList = [], globalOrgList = [] } = this.props;
    const { loading } = this.props;
    return (
      <div className={`${formStyles.formStyle} ${styles.formCotainer}`}>
        <Form
          layout="inline"
          className="ant-advanced-search-form"
          onSubmit={this.handleSearch}
        >
          <Skeleton loading={loading !== false} active>
            <div className={styles.rowWrap}>
              <div className={styles.itemCls}>
                <Form.Item label='选择时间：'>
                  {getFieldDecorator('choiceTime', {
                    initialValue: searchParams.choiceTime,
                  })(
                    <BIRangePicker
                      placeholder={['起始时间', '截止时间']}
                      format={dateFormat}
                      onChange={this.onChangeTime}
                      getCalendarContainer={triggerNode => triggerNode.parentNode}
                    />,
                  )}
                </Form.Item>
              </div>
              {
                markType !== 4 && <div className={styles.itemCls}>
                  <Form.Item label='后端归属：'>
                    {getFieldDecorator('collegeId', {
                      initialValue: searchParams.collegeId,
                    })(
                      <BISelect
                        placeholder="请选择"
                        dropdownClassName={styles.popupClassName}
                        getPopupContainer={triggerNode => triggerNode.parentNode}
                        allowClear>
                        {collegeList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                      </BISelect>,
                    )}
                  </Form.Item>
                </div>
              }
              {
                markType === 4 && <div className={styles.itemCls}>
                  <Form.Item label='后端归属：'>
                    {getFieldDecorator('collegeId', {
                      initialValue: searchParams.collegeId,
                    })(
                      <BICascader
                        placeholder="选择组织"
                        changeOnSelect
                        options={globalOrgList}
                        fieldNames={{ label: 'name', value: 'id', children: 'nodeList' }}
                        allowClear
                      />
                    )}
                  </Form.Item>
                </div>
              }
              {(markType === 1 || markType === 4) && <div className={styles.itemCls}>
                <Form.Item label='咨询类型：'>
                  {getFieldDecorator('consultType', {
                    initialValue: searchParams.consultType,
                  })(
                    <BICascader placeholder="请选择" changeOnSelect options={consultList} fieldNames={{ label: 'name', value: 'id', children: 'nodeList' }} />
                  )}
                </Form.Item>
              </div>}
              <div className={styles.itemCls}>
                <Form.Item label='原因分类：'>
                  {getFieldDecorator('reasonType', {
                    initialValue: searchParams.reasonType,
                  })(
                    <BICascader placeholder="请选择" changeOnSelect options={reasonList} fieldNames={{ label: 'name', value: 'id', children: 'nodeList' }} />
                  )}
                </Form.Item>
              </div>
              {markType == 3 && <div className={styles.itemCls}>
                <Form.Item label='自主评价：'>
                  {getFieldDecorator('evaluateType', {
                    initialValue: searchParams.evaluateType,
                  })(
                    <BISelect
                      placeholder="请选择"
                      dropdownClassName={styles.popupClassName}
                      getPopupContainer={triggerNode => triggerNode.parentNode}
                      allowClear>
                      {evaluateList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                    </BISelect>,
                  )}
                </Form.Item>
              </div>
              }
            </div>
            <div className={styles.rowWrap}>
              <div className={styles.itemCls}>
                <Form.Item label='操作人：'>
                  {getFieldDecorator('operatorId', {
                    initialValue: searchParams.operatorId,
                  })(
                    <BISelect
                      placeholder="请选择"
                      dropdownClassName={styles.popupClassName}
                      getPopupContainer={triggerNode => triggerNode.parentNode}
                      allowClear>
                      {operatorList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                    </BISelect>,
                  )}
                </Form.Item>
              </div>
              {
                markType === 4 && <div className={styles.itemCls}>
                  <Form.Item label='问题分类：'>
                    {getFieldDecorator('operatorId', {
                      initialValue: searchParams.operatorId,
                    })(
                      <BISelect
                        placeholder="请选择"
                        dropdownClassName={styles.popupClassName}
                        getPopupContainer={triggerNode => triggerNode.parentNode}
                        allowClear>
                        {operatorList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                      </BISelect>,
                    )}
                  </Form.Item>
                </div>
              }
              {
                markType == 1 &&
                <div className={styles.itemCls}>
                  <Form.Item label='满意度：'>
                    {getFieldDecorator('evaluate', {
                      initialValue: searchParams.evaluate,
                    })(
                      <BISelect
                        placeholder="请选择"
                        dropdownClassName={styles.popupClassName}
                        getPopupContainer={triggerNode => triggerNode.parentNode}
                        allowClear>
                        {['不满意', '一般'].map((item, index) => <Option key={item} value={index}>{item}</Option>)}
                      </BISelect>,
                    )}
                  </Form.Item>
                </div>
              }
              {
                markType == 1 &&
                <div className={styles.itemCls}>
                  <Form.Item label='会话类型：'>
                    {getFieldDecorator('robot', {
                      initialValue: searchParams.robot,
                    })(
                      <BISelect
                        placeholder="请选择"
                        dropdownClassName={styles.popupClassName}
                        getPopupContainer={triggerNode => triggerNode.parentNode}
                        allowClear>
                        {robotData.map((item, index) => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                      </BISelect>,
                    )}
                  </Form.Item>
                </div>
              }
              <div className={styles.itemCls}>
                <Form.Item label='评价性质：'>
                  {getFieldDecorator('evaluationNature', {
                    initialValue: searchParams.evaluationNature,
                  })(
                    <BISelect placeholder="请选择"
                      dropdownClassName={styles.popupClassName}
                      getPopupContainer={triggerNode => triggerNode.parentNode}
                      allowClear>
                      {evaluationList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                    </BISelect>,
                  )}
                </Form.Item>
              </div>
            </div>
          </Skeleton>
          <div className={`${styles.rowWrap} ${styles.buttonGroup}`}>
            <BIButton type='reset' onClick={this.handleReset} style={{ marginRight: '8px' }}>{'重'}{'置'}</BIButton>
            <BIButton type='primary' htmlType="submit">{'查'}{'询'}</BIButton>
          </div>
        </Form>
      </div>
    );
  }
}

export default Form.create({ name: 'AiForm' })(AiForm);
