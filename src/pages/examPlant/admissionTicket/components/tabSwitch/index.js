import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import BIDatePicker from '@/ant_components/BIDatePicker';
import { initTimeData } from '@/pages/ko/utils/utils';
import styles from './style.less';

const { BIRangePicker } = BIDatePicker;
const dateFormat = 'YYYY.MM.DD';

@connect(({ admissionTicket, loading }) => ({
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
    const { startTime, endTime } = this.state;
    return startTime && endTime ? [moment(startTime), moment(endTime)] : [];
  }
  // 选择时间
  onDateChange = (v) => {
    const [startTime, endTime] = initTimeData(v);
    this.setState({ startTime, endTime, }, () => {
      const params = {
        startTime: startTime,
        endTime: endTime
      }
      this.props.dispatch({
        type: 'xdCreditModal/getUserOrgList',
        payload: { params: params },
        callback: res => {
          if (res && res.length > 0) {
            this.setState({
              userOrgConfig: res,
              ...this.getResetGroupMsg(res),
            })
          }

        }
      })
    });
  }
  // 时间控件可展示的时间范围
  disabledDate = current => {
    return;
    return current > moment(this.props.kpiDateRange.endDate) || current < moment(this.props.kpiDateRange.startDate);
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
