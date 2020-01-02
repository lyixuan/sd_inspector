import React from 'react';
import { connect } from 'dva';
import BIDatePicker from '@/ant_components/BIDatePicker';
import Top from './block/top';
import Surge from './block/surge';
import { disabledDate } from '@/pages/indexPage/components/utils/utils';
import styles from './style.less';

const { BIRangePicker } = BIDatePicker;

@connect(({ newDetailModal, analyzeModel }) => ({
  dateRange: analyzeModel.dateRange,
  globalUserInfo: newDetailModal.globalUserInfo,
  globalDate: newDetailModal.globalDate,
  globalDateMoment: newDetailModal.globalDateMoment,
  globalkpiDateRange: newDetailModal.globalkpiDateRange,
}))
class IncomeCompare extends React.Component {
  componentDidMount() {
    this.onFormChange(this.props.globalDateMoment);
  }
  // 时间
  onFormChange = (val) => {
    this.props.dispatch({
      type: 'analyzeModel/saveDate',
      payload: { dateRange: val },
    });
  };

  render() {
    const { globalUserInfo, globalDate, dateRange} = this.props;
    return (
      <div className={styles.analyze}>
        <span className={styles.dataRange}>
          <BIRangePicker
            value={dateRange}
            placeholder={['选择起始时间', '选择截止时间']}
            format='YYYY-MM-DD'
            onChange={val => this.onFormChange(val, 'dataRange')}
            allowClear={false}
            disabledDate={val => disabledDate(val, this.props.globalkpiDateRange)}
            style={{ width: 224 }}
          />
        </span>
        {dateRange && dateRange.length > 0 && (
          <>
            <Top date={globalDate} userInfo={globalUserInfo} />
            <Surge date={globalDate} userInfo={globalUserInfo} />
          </>
        )}
      </div>
    );
  }
}

export default IncomeCompare;
