import React from 'react';
import { connect } from 'dva';
import BIDatePicker from '@/ant_components/BIDatePicker';
import { disabledDate } from '@/pages/indexPage/components/utils/utils';
import { handleDataTrace } from '@/utils/utils';
import styles from './style.less';

const { BIRangePicker } = BIDatePicker;

@connect(({ newDetailModal, incomeOrderModal }) => ({
  incomeOrderModal,
  // globalUserInfo: newDetailModal.globalUserInfo,
  // globalUserType: newDetailModal.globalUserType,
  globalDateMoment: newDetailModal.globalDateMoment,
  globalkpiDateRange: newDetailModal.globalkpiDateRange,
  incomeDateRange: incomeOrderModal.incomeDateRange,
}))
class Resubmit extends React.Component {
  componentDidMount() {
    const { globalDateMoment } = this.props;
    this.onFormChange(globalDateMoment);
    handleDataTrace({"widgetName":`创收_创收排名`,"traceName":`2.1/创收_创收排名`,traceType:200});
  }

  // select
  onFormChange = (val) => {
    this.props.dispatch({
      type: 'incomeOrderModal/getIncomeDate',
      payload: { date: val },
    });
  };

  render() {
    return (
      <div className={styles.incomeOrder}>
        <span className={styles.dataRange}>
          <BIRangePicker
            value={this.props.incomeDateRange}
            placeholder={['选择起始时间', '选择截止时间']}
            format='YYYY-MM-DD'
            onChange={val => this.onFormChange(val, 'dataRange')}
            allowClear={false}
            disabledDate={val => disabledDate(val, this.props.globalkpiDateRange)}
            style={{ width: 224 }}
          />
        </span>
        
      </div>
    );
  }
}

export default Resubmit;
