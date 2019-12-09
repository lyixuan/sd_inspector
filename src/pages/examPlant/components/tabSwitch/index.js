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
      keye: 1,
      // startTime: moment('2019-09-01'),
      // endTime: moment(new Date().getTime())
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
    // if (this.props.startTime) {
    //   const { startTime, endTime } = this.props;
    //   return startTime && endTime ? [moment(startTime), moment(endTime)] : [];
    // } else {
    //   const { startTime, endTime } = this.props.examPlant
    //   return startTime && endTime ? [startTime, endTime] : [];
    // }
    const startTime = this.props.examPlant.startTime || moment(this.props.startTime);
    const endTime = this.props.examPlant.endTime || moment(this.props.endTime);
    return startTime && endTime ? [startTime, endTime] : [];

  }
  // 选择时间
  onDateChange = (v) => {
    console.log(39, v)
    this.props.dispatch({
      type: 'examPlant/updateDate',
      payload: { params: v }
    }).then(() => {
      this.props.getList();
      this.props.getDetailList()
    })
  }
  // 时间控件可展示的时间范围
  disabledDate = current => {
    const start = this.props.beginDate
    return current > moment().endOf('day') || current < moment(start);
  };

  render() {
    const { tabs = [] } = this.props;
    const { keye } = this.state;
    console.log(58, tabs)
    return (
      <div className={styles.pageTab}>
        <div className={styles.tabTitle}>
          <div className={styles.lefts}>
            {
              tabs.map((item, index) => <div className={styles.tabDiv} key={index}><span className={keye === index + 1 ? styles.active : ''} onClick={() => this.onTabChange(index + 1)}>{item.title}</span> <i>|</i></div>)
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
