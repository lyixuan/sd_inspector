import React from 'react';
import { Skeleton, Form } from 'antd';
import { handleDateFormParams, handleDateParams } from '@/pages/ko/utils/utils';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BIButton from '@/ant_components/BIButton';
import BISelect from '@/ant_components/BISelect';
import moment from 'moment/moment';
import { connect } from 'dva/index';
import formStyles from '../../../components/formCommon.less';
import styles from './style.less';

const { BIRangePicker } = BIDatePicker;
const { Option } = BISelect;
const dateFormat = 'YYYY.MM.DD';

@connect(({ workTableModel, koPlan, loading }) => ({
  koPlanPageParams: koPlan.pageParams,
  loading: loading.effects['workTableModel/getBasicData'],
}))
class AiForm extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'koPlan/pageParams',
    });
    this.handleSearch();
  }

  // 选择时间初始默认时间
  handleDefaultPickerValue = () => {
    const cTime = new Date().getTime() - 2*24*60*60*1000;
    const defTime = moment(cTime);
    return [defTime, defTime];
  };
  // 选择时间可选范围限制
  disabledDate = (current, keyName) => {
    const { KoDateRange } = this.props.koPlanPageParams;
    const dateArr = handleDateFormParams(KoDateRange)[keyName] || [];
    const [startTime, endTime] = dateArr;
    return current.isBefore(moment(startTime)) || current.isAfter(moment(endTime));
  };
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
      if (onSearchChange) {
        const [beginDate, endDate] = this.checkoutParamsType('choiceTime', values.choiceTime);
        onSearchChange({ ...values, beginDate, endDate });
      }
    });
  };
  // 重置事件
  handleReset = () => {
    const { searchParams } = this.props;
    for (let k in searchParams) {
      if (k === 'choiceTime') {
        searchParams[k] = this.handleDefaultPickerValue();
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
    const { markType, searchParams, collegeList, consultList, reasonList, evaluateList } = this.props;
    const { loading } = this.props;
    const choiceTimeInit = searchParams.choiceTime || this.handleDefaultPickerValue();
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
                    initialValue: choiceTimeInit,
                  })(
                    <BIRangePicker
                      placeholder={['起始时间', '截止时间']}
                      format={dateFormat}
                      // disabledDate={(current) => this.disabledDate(current, 'registerTime')}
                    />,
                  )}
                </Form.Item>
              </div>
              <div className={styles.itemCls}>
                <Form.Item label='后端归属：'>
                  {getFieldDecorator('collegeId', {
                    initialValue: searchParams.collegeId,
                  })(
                    <BISelect placeholder="请选择" allowClear>
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
                    <BISelect placeholder="请选择" allowClear>
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
                    <BISelect placeholder="请选择" allowClear>
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
                    <BISelect placeholder="请选择" allowClear>
                      {evaluateList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                    </BISelect>,
                  )}
                </Form.Item>
              </div>}
              <div className={styles.itemCls} />
              {markType == 2 && <div className={styles.itemCls} />}
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

export default Form.create({ name: 'AiForm' })(AiForm);
