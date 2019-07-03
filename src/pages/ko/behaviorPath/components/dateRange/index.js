import React from 'react';
import moment from 'moment';
import { connect } from 'dva';
import BIDatePicker from '@/ant_components/BIDatePicker';
import { message } from 'antd';

const { BIRangePicker } = BIDatePicker;

@connect(({ behaviorPath, loading }) => ({
  loading,
  behaviorPath,
  isLoading: loading.effects['behaviorPath/getDateList'],
}))
class Index extends React.Component {
  constructor(props) {
    super(props);
    const beginDate = this.props.behaviorPath.dateRange ? this.props.behaviorPath.dateRange.beginDate : new Date(new Date().getTime());
    const endDate = this.props.behaviorPath.dateRange ? this.props.behaviorPath.dateRange.endDate : new Date(new Date().getTime());
    this.state = {
      defaultBeginDate: beginDate,
      defaultEndDate: endDate,
      beginDate: beginDate,
      endDate: endDate,
    };

  }

  componentDidMount() {
    this.props.dispatch({
      type: 'behaviorPath/getDateRange',
      payload: {},
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      JSON.stringify(nextProps.behaviorPath.dateRange) !==
      JSON.stringify(this.props.behaviorPath.dateRange)
    ) {
      this.setState({
        beginDate: nextProps.behaviorPath.dateRange.beginDate,
        endDate: nextProps.behaviorPath.dateRange.endDate,
        defaultBeginDate: nextProps.behaviorPath.dateRange.beginDate,
        defaultEndDate: nextProps.behaviorPath.dateRange.endDate,
      });
    }
  }

  callback = (total) => {
    if (total < 1) {
      message.info('该学员在您选择的日期中没有数据');

    } else {
      message.info(`该学员在您选择的日期中共有${total}天的数据`);

    }
  };
  refreshData = (params, source) => {
    let type = this.props.type;
    let stuId = this.props.stuId;
    if (source == 'dateChange') {
      this.props.dispatch({
        type: 'behaviorPath/getDateList',
        payload: {
          fn: this.callback,
          params: {
            stuId: stuId,
            type: type,
            startDate: params.beginDate,
            endDate: params.endDate,
            page: params.page,
            pageSize: params.pageSize,
          },
        },
      });
    } else {
      this.props.dispatch({
        type: 'behaviorPath/getDateList',
        payload: {
          params: {
            stuId: stuId,
            type: type,
            startDate: params.beginDate,
            endDate: params.endDate,
            page: params.page,
            pageSize: params.pageSize,
          },
        },
      });
    }
    this.props.onClick();

  };
  // 时间控件可展示的时间范围
  disabledDate = current => {
    return current < moment(this.state.defaultBeginDate) || current > moment(this.state.defaultEndDate);
  };
  // 日期修改
  dateChange = (value, dateString) => {
    let beginDate = dateString[0] ? dateString[0] : this.state.defaultBeginDate;
    let endDate = dateString[1] ? dateString[1] : this.state.defaultEndDate;
    this.setState({
      beginDate: beginDate,
      endDate: endDate,
      page: 1,
    });
    let params = {
      beginDate: beginDate,
      endDate: endDate,
      page: 1,
      pageSize: this.state.pageSize,
    };
    this.refreshData(params, 'dateChange');
  };

  render() {
    const dateFormat = 'YYYY-MM-DD';
    return (
      <BIRangePicker
        style={{ width: '230px', textAlign: 'left' }}
        placeholder={['开始日期', '结束日期']}
        onChange={this.dateChange}
        allowClear
        defaultValue={[moment(this.state.beginDate, dateFormat), moment(this.state.endDate, dateFormat)]}
        value={[moment(this.state.beginDate, dateFormat), moment(this.state.endDate, dateFormat)]}
        disabledDate={this.disabledDate}
      />
    );
  }
}

export default Index;
