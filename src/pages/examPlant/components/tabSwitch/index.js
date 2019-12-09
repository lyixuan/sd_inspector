import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import BIDatePicker from '@/ant_components/BIDatePicker';
import { initTimeData } from '@/pages/ko/utils/utils';
import styles from './style.less';

const { BIRangePicker } = BIDatePicker;
const dateFormat = 'YYYY.MM.DD';

@connect(({ examPlant, admissionTicket, loading }) => ({
  examPlant,
  admissionTicket

}))
class TabSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keye: 1
    }
  }
  onTabChange = (keye) => {
    this.setState({ keye })
    if (this.props.onTabChange) {
      this.props.onTabChange(keye);
    }
  };
  // date
  getDate = () => {
    const { startTime, endTime } = this.props.examPlant
    return startTime && endTime ? [startTime, endTime] : [];
  }
  // 选择时间
  onDateChange = (v) => {
    console.log(39, v)
    this.props.dispatch({
      type: 'examPlant/updateDate',
      payload: { params: v }
    })
  }
  // 时间控件可展示的时间范围
  disabledDate = current => {
    const start = '2019-07-01'
    return current > moment().endOf('day') || current < moment(start);
  };

  render() {
    const { tabs = [] } = this.props;
    const { keye } = this.state;
    return (
      <div className={styles.pageTab}>
        <div className={styles.tabTitle}>
          <div className={styles.lefts}>
            {
              tabs.map((item, index) => <><span className={keye === index + 1 ? styles.active : ''} onClick={() => this.onTabChange(index + 1)} key={index}>{item.title}</span> <i>|</i></>)
            }
          </div>
          <div className={styles.rights}>
            <BIRangePicker
              value={this.getDate()}
              placeholder={['选择起始时间', '选择截止时间']}
              format={dateFormat}
              onChange={this.onDateChange}
              allowClear={false}
              disabledDate={this.disabledDate}
              style={{ width: '224px' }}
            />
          </div>
        </div>
        <div className={styles.tabContainer}>
          {tabs.map((item, index) => <div className={keye !== index + 1 ? styles.tabHidden : ''} key={index}>{item.children}</div>)}
        </div>
      </div>
    );
  }
}

export default TabSwitch;
