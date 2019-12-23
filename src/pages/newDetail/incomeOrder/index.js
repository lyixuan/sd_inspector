import React from 'react';
import { connect } from 'dva';
import BIDatePicker from '@/ant_components/BIDatePicker';
import { disabledDate } from '@/pages/indexPage/components/utils/utils';
import CollegeIndex from './components/collegeIndex';
import TopTabs from '@/pages/indexPage/components/topTabs';
import styles from './style.less';

const { BIRangePicker } = BIDatePicker;
@connect(({ newDetailModal, incomeOrderModal }) => ({
  globalUserType: newDetailModal.globalUserType,
  globalDateMoment: newDetailModal.globalDateMoment,
  globalkpiDateRange: newDetailModal.globalkpiDateRange,
  incomeDateRange: incomeOrderModal.incomeDateRange
}))
class IncomeOrder extends React.Component {
  componentDidMount() {
    // 家族-学院列表
    this.props.dispatch({
      type: 'incomeOrderModal/getIncomeCollegeList',
    });
    this.onFormChange(this.props.globalDateMoment)
  }
  // select
  onFormChange = (val) => {
    this.props.dispatch({
      type: 'incomeOrderModal/getIncomeDate',
      payload: { date: val },
    });
  }
  getTabParams = () => {
    const tabParams = [
      {
        name:<span data-trace={`{"widgetName":"创收_学院排名","traceName":"2.0/创收_学院排名"}`}>学院排名</span>,
        key:'1',
        children: <CollegeIndex rankType="college"/>,
      },
      {
        name:<span data-trace={`{"widgetName":"创收_家族排名","traceName":"2.0/创收_家族排名"}`}>家族排名</span>,
        key:'2',
        children: <CollegeIndex rankType="family"/>,
      },
      {
        name:<span data-trace={`{"widgetName":"创收_小组排名","traceName":"2.0/创收_小组排名"}`}>小组排名</span>,
        key:'3',
        children: <CollegeIndex rankType="group"/>,
      },
      {
        name:<span data-trace={`{"widgetName":"创收_班主任排名","traceName":"2.0/创收_班主任排名"}`}>班主任排名</span>,
        key:'4',
        children: <CollegeIndex rankType="class"/>,
      }
    ];
    return tabParams
  }
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
            style={{ width: 224,}}
          />
        </span>
        <TopTabs tabParams={this.getTabParams()}/>
      </div>
    );
  }
}

export default IncomeOrder;
