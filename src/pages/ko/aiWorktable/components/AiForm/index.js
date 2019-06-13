import React from 'react';
import BISelect from '@/ant_components/BISelect';
import styles from './style.less';
import formStyles from '../../../components/formCommon.less';
import { Skeleton, Form } from 'antd'
import BIDatePicker from '@/ant_components/BIDatePicker';
import BIButton from '@/ant_components/BIButton';
import moment from 'moment/moment';
import { handleDateFormParams } from '@/pages/ko/utils/utils';

const { BIRangePicker } = BIDatePicker;
const { Option } = BISelect;
const dateFormat = 'YYYY.MM.DD';
class AiForm extends React.Component {
  constructor(props) {
    super(props);
  }
  handleDefaultPickerValue = (keyName) => {
    return
    const { KoDateRange } = this.props.pageParams;
    const dateArr = handleDateFormParams(KoDateRange)[keyName] || [];
    const [startTime, endTime] = dateArr;
    return [moment(endTime).subtract(1, 'months'), moment(endTime)]
  }
  disabledDate = (current, keyName) => {
    return
    const { KoDateRange } = this.props.pageParams;
    const dateArr = handleDateFormParams(KoDateRange)[keyName] || [];
    const [startTime, endTime] = dateArr;
    return current.isBefore(moment(startTime)) || current.isAfter(moment(endTime))
  }
  handleSearch = (e) => {
    e.preventDefault();
    const {onSearchChange, form} = this.props;
    form.validateFields((err, values) => {
      console.log(values)
      if (onSearchChange) {
        const { registerTime, ...others } = values;
        onSearchChange({...others})
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { workType, searchParams } = this.props;
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
                    {getFieldDecorator('registerTime', {
                      initialValue: '',
                    })(
                      <BIRangePicker
                        placeholder={["起始时间", "截止时间"]}
                        format={dateFormat}
                        defaultPickerValue={this.handleDefaultPickerValue('registerTime')}
                        disabledDate={(current) => this.disabledDate(current, 'registerTime')}
                      />
                    )}
                  </Form.Item>
                </div>
                <div className={styles.itemCls}>
                  <Form.Item label='后端归属：'>
                    {getFieldDecorator('collegeId', {
                      initialValue: searchParams.collegeId,
                    })(
                      <BISelect placeholder="请选择" allowClear >
                        {[{value: '1', name: 'yyyy'}, {value: '3', name: 'yyy'}].map(item => <Option key={item.value} value={item.value}>{item.name}</Option>)}
                      </BISelect>
                    )}
                  </Form.Item>
                </div>
                {workType === 1 && <div className={styles.itemCls}>
                  <Form.Item label='咨询类型：'>
                    {getFieldDecorator('consultType', {
                      initialValue: searchParams.consultType,
                    })(
                      <BISelect placeholder="请选择" allowClear >
                        {[{value: '1', name: 'yyyy'}].map(item => <Option key={item.value} value={item.value}>{item.name}</Option>)}
                      </BISelect>
                    )}
                  </Form.Item>
                </div>}
                <div className={styles.itemCls}>
                  <Form.Item label='原因分类：'>
                    {getFieldDecorator('reasonType', {
                      initialValue: searchParams.reasonType,
                    })(
                      <BISelect placeholder="请选择" allowClear >
                        {[{value: '1', name: 'yyyy'}].map(item => <Option key={item.value} value={item.value}>{item.name}</Option>)}
                      </BISelect>
                    )}
                  </Form.Item>
                </div>
                {workType == 3 && <div className={styles.itemCls}>
                  <Form.Item label='自主评价：'>
                    {getFieldDecorator('evaluateType', {
                      initialValue: searchParams.evaluateType,
                    })(
                      <BISelect placeholder="请选择" allowClear >
                        {[{value: '1', name: 'yyyy'}].map(item => <Option key={item.value} value={item.value}>{item.name}</Option>)}
                      </BISelect>
                    )}
                  </Form.Item>
                </div>}
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
export default Form.create({ name: 'AiForm'})(AiForm);
