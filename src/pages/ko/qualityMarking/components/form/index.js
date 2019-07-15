import React from 'react';
import { Skeleton, Form, message, Button } from 'antd';
import { handleDateParams, handleDefaultPickerValueMark } from '@/pages/ko/utils/utils';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BISelect from '@/ant_components/BISelect';
import { connect } from 'dva/index';
import btnStyles from '../../../entrancePlatform/btnstyles.less';
import formStyles from '../../../components/formCommon.less';
import styles from './style.less';

const { BIRangePicker } = BIDatePicker;
const { Option } = BISelect;
const dateFormat = 'YYYY.MM.DD';

@connect(({ koPlan, loading }) => ({
  koPlanPageParams: koPlan.pageParams,
  currentServiceTime: koPlan.currentServiceTime,
  loading: loading.effects['workTableModel/getBasicData'],
}))
class AiForm extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.handleSearch();
  }
  // 时间间隔不超过四十天
  getChangeTime = (c) => {
    if (c.length === 0 || (c.length === 2 && c[1].diff(c[0], 'day') > 39) ) {
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
    this.props.onSearchChange({...searchParams, beginDate, endDate});
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { markType, searchParams, collegeList, consultList, reasonList, evaluateList, operatorList } = this.props;
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
                    />,
                  )}
                </Form.Item>
              </div>
              <div className={styles.itemCls}>
                <Form.Item label='后端归属：'>
                  {getFieldDecorator('collegeId', {
                    initialValue: searchParams.collegeId,
                  })(
                    <BISelect placeholder="请选择" dropdownClassName={styles.popupClassName} allowClear>
                      {collegeList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                    </BISelect>,
                  )}
                </Form.Item>
              </div>
              {markType === 1 && <div className={styles.itemCls}>
                <Form.Item label='咨询类型：'>
                  {getFieldDecorator('consultType', {
                    initialValue: searchParams.consultType,
                  })(
                    <BISelect placeholder="请选择" dropdownClassName={styles.popupClassName} allowClear>
                      {consultList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                    </BISelect>,
                  )}
                </Form.Item>
              </div>}
              <div className={styles.itemCls}>
                <Form.Item label='原因分类：'>
                  {getFieldDecorator('reasonType', {
                    initialValue: searchParams.reasonType,
                  })(
                    <BISelect placeholder="请选择" dropdownClassName={styles.popupClassName} allowClear>
                      {reasonList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                    </BISelect>,
                  )}
                </Form.Item>
              </div>
              {markType == 3 && <div className={styles.itemCls}>
                  <Form.Item label='自主评价：'>
                    {getFieldDecorator('evaluateType', {
                      initialValue: searchParams.evaluateType,
                    })(
                      <BISelect placeholder="请选择" dropdownClassName={styles.popupClassName} allowClear>
                        {evaluateList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                      </BISelect>,
                    )}
                  </Form.Item>
                </div>
              }
            </div>
            <div className={styles.rowWrap}>
              {
                markType == 1 &&
                <>
                  <div className={styles.itemCls}>
                    <Form.Item label='操作人：'>
                      {getFieldDecorator('operatorId', {
                        initialValue: searchParams.operatorId,
                      })(
                        <BISelect placeholder="请选择" dropdownClassName={styles.popupClassName} allowClear>
                          {operatorList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                        </BISelect>,
                      )}
                    </Form.Item>
                  </div>
                  <div className={styles.itemCls}>
                    <Form.Item label='满意度：'>
                      {getFieldDecorator('evaluate', {
                        initialValue: searchParams.evaluate,
                      })(
                        <BISelect placeholder="请选择" dropdownClassName={styles.popupClassName} allowClear>
                          {['不满意', '一般'].map((item, index) => <Option key={item} value={index}>{item}</Option>)}
                        </BISelect>,
                      )}
                    </Form.Item>
                  </div>
                </>
              }
            </div>
          </Skeleton>
          <div className={`${styles.rowWrap} ${styles.buttonGroup}`}>
            <Button className={btnStyles.btnCancel} onClick={this.handleReset} style={{ marginRight: '10px' }}>{'重'}{'置'}</Button>
            <Button className={btnStyles.btnPrimary} htmlType="submit">{'查'}{'询'}</Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default Form.create({ name: 'AiForm' })(AiForm);
