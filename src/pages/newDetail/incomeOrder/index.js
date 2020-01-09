import React from 'react';
import { connect } from 'dva';
import BIDatePicker from '@/ant_components/BIDatePicker';
import { disabledDate } from '@/pages/indexPage/components/utils/utils';
import CollegeIndex from './components/collegeIndex';
import IncomeOverview from './components/IncomeOverview';
import TopTabs from '@/pages/indexPage/components/topTabs';
import styles from './style.less';
import moment from 'moment/moment';
import { handleDataTrace } from '@/utils/utils';

const { BIRangePicker } = BIDatePicker;

@connect(({ newDetailModal, incomeOrderModal }) => ({
  incomeOrderModal,
  globalUserInfo: newDetailModal.globalUserInfo,
  globalUserType: newDetailModal.globalUserType,
  globalDateMoment: newDetailModal.globalDateMoment,
  globalkpiDateRange: newDetailModal.globalkpiDateRange,
  incomeDateRange: incomeOrderModal.incomeDateRange,
}))
class IncomeOrder extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     globalkpiDateRange:
  //       props.location.query.params && props.location.query.params.dataRange
  //         ? props.location.query.params.dataRange
  //         : props.globalkpiDateRange,
  //   };
  // }
  // componentWillMount() {}
  componentDidMount() {
    const { globalDateMoment } = this.props;
    this.getOverviewData(globalDateMoment);
    // 家族-学院列表
    this.props.dispatch({
      type: 'incomeOrderModal/getIncomeCollegeList',
    });
    this.onFormChange(globalDateMoment);

    // wen 接收url参数
    const val = this.props.location.query.params
      ? [
          moment(JSON.parse(this.props.location.query.params).dateRange[0]),
          moment(JSON.parse(this.props.location.query.params).dateRange[1]),
        ]
      : this.props.incomeDateRange;
    this.props.dispatch({
      type: 'incomeOrderModal/getIncomeDate',
      payload: { date: val },
    });
    // end

    handleDataTrace({
      widgetName: `创收_创收排名`,
      traceName: `2.1/创收_创收排名`,
      traceType: 200,
    });
  }

  // select
  onFormChange = val => {
    this.props.dispatch({
      type: 'incomeOrderModal/getIncomeDate',
      payload: { date: val },
    });
    this.getOverviewData(val);
    handleDataTrace({ widgetName: '创收_时间筛选', traceName: '2.1/创收_时间筛选' });
  };

  getOverviewData = date => {
    this.props.dispatch({
      type: 'incomeOrderModal/getWorkbenchIncome',
      payload: {
        params: {
          startTime: moment(new Date(date[0])).format('YYYY-MM-DD'),
          endTime: moment(new Date(date[1])).format('YYYY-MM-DD'),
        },
      },
    });
    this.props.dispatch({
      type: 'incomeOrderModal/getIncomeOrder',
      payload: {
        params: {
          startTime: moment(new Date(date[0])).format('YYYY-MM-DD'),
          endTime: moment(new Date(date[1])).format('YYYY-MM-DD'),
        },
      },
    });
  };
  getTabParams = () => {
    const tabParams = [
      {
        name: (
          <span data-trace={`{"widgetName":"创收_学院排名","traceName":"2.1/创收_学院排名"}`}>
            学院排名
          </span>
        ),
        key: '1',
        children: <CollegeIndex rankType="college" />,
      },
      {
        name: (
          <span data-trace={`{"widgetName":"创收_家族排名","traceName":"2.1/创收_家族排名"}`}>
            家族排名
          </span>
        ),
        key: '2',
        children: <CollegeIndex rankType="family" />,
      },
      {
        name: (
          <span data-trace={`{"widgetName":"创收_小组排名","traceName":"2.1/创收_小组排名"}`}>
            小组排名
          </span>
        ),
        key: '3',
        children: <CollegeIndex rankType="group" />,
      },
      {
        name: (
          <span data-trace={`{"widgetName":"创收_班主任排名","traceName":"2.1/创收_班主任排名"}`}>
            班主任排名
          </span>
        ),
        key: '4',
        children: <CollegeIndex rankType="class" />,
      },
    ];
    return tabParams;
  };

  render() {
    const {
      IncomeData,
      IncomeOrderCollege,
      IncomeOrderFamily,
      IncomeOrderGroup,
    } = this.props.incomeOrderModal;
    const { globalUserType, globalUserInfo } = this.props;
    return (
      <div className={styles.incomeOrder}>
        <span className={styles.dataRange}>
          <BIRangePicker
            value={this.props.incomeDateRange}
            placeholder={['选择起始时间', '选择截止时间']}
            format="YYYY-MM-DD"
            onChange={val => this.onFormChange(val, 'dataRange')}
            allowClear={false}
            disabledDate={val => disabledDate(val, this.props.globalkpiDateRange)}
            style={{ width: 224 }}
          />
        </span>
        {globalUserType !== 'boss' && (
          <IncomeOverview
            IncomeData={IncomeData}
            IncomeOrderCollege={IncomeOrderCollege}
            IncomeOrderFamily={IncomeOrderFamily}
            IncomeOrderGroup={IncomeOrderGroup}
          />
        )}
        {globalUserInfo && globalUserInfo.userType && <TopTabs tabParams={this.getTabParams()} />}
      </div>
    );
  }
}

export default IncomeOrder;
