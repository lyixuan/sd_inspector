import React from 'react';
import { connect } from 'dva';
import Dimension from './dimension';
import BISelect from '@/ant_components/BISelect';
import BIButton from '@/ant_components/BIButton';
import BIDatePicker from '@/ant_components/BIDatePicker';
import styles from './style.less';

const { Option } = BISelect;
const { BIRangePicker } = BIDatePicker;
const dateFormat = 'YYYY-MM-DD';
@connect(( xdWorkModal) => ({
  xdWorkModal,
}))
// Current credits
class XdCredit extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount(){
    
  }
  render() {
    return (
      <div className={styles.credit}>
        <div className={styles.form} data-trace='{"widgetName":"本期创收-选择对比小组","traceName":"小德工作台/本期创收/选择对比小组"}'>
          <span className={styles.change}>
            选择对比小组：
            <BISelect
              value={this.props.pkListType}
              placeholder="请选择"
              onChange={this.onChangeParams}
              style={{ width: '136px', marginLeft: '8px' }}
              allowClear
            >
              {['pppp'].map((item, index) => <Option key={index} value={index + 1}>{item}</Option>)}
            </BISelect>
          </span>
          <span className={styles.change}>
            选择时间：
            <BIRangePicker
              placeholder={['订单起始时间', '订单截止时间']}
              format={dateFormat}
              // defaultPickerValue={handleDefaultPickerExamValue(currentServiceTime)}
              // disabledDate={this.dateDisabledDate}
              dropdownClassName={styles.popupClassName}
              getCalendarContainer={() => document.getElementById('area')}
            />
          </span>
          <BIButton type='reset' onClick={this.handleReset} style={{ marginRight: '8px' }}>重置</BIButton>
          <BIButton type='primary' htmlType="submit">查询</BIButton>
        </div>
        <Dimension/>
      </div>
    );
  }
}

export default XdCredit;
